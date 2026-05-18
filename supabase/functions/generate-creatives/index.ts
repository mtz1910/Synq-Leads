// Edge function: generate ad creatives via Lovable AI Gateway
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const auth = req.headers.get("Authorization");
    if (!auth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: auth } } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { product, audience, differential } = await req.json();

    const prompt = `Você é um copywriter sênior brasileiro, expert em anúncios para WhatsApp e Meta Ads, especializado em e-commerce, dropshipping, infoprodutos e afiliados.

Briefing:
- Produto/oferta: ${product || "não informado"}
- Público-alvo: ${audience || "não informado"}
- Diferencial: ${differential || "não informado"}

Gere 4 criativos PT-BR de alta conversão, com gatilhos mentais (urgência, prova social, curiosidade). Responda APENAS um JSON válido neste formato exato, sem markdown:
{"creatives":[{"type":"Headline","content":"..."},{"type":"Hook UGC","content":"..."},{"type":"Copy Meta","content":"..."},{"type":"CTA","content":"..."}]}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (aiRes.status === 429) return new Response(JSON.stringify({ error: "Rate limit excedido, tente em alguns segundos" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (aiRes.status === 402) return new Response(JSON.stringify({ error: "Créditos de IA insuficientes" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI error:", t);
      return new Response(JSON.stringify({ error: "Erro ao gerar criativos" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const aiData = await aiRes.json();
    let text: string = aiData.choices?.[0]?.message?.content ?? "";
    text = text.replace(/```json|```/g, "").trim();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) text = text.slice(start, end + 1);

    let parsed: { creatives: { type: string; content: string }[] };
    try { parsed = JSON.parse(text); } catch {
      return new Response(JSON.stringify({ error: "Resposta inválida da IA" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const briefing = { product, audience, differential };
    const rows = parsed.creatives.map(c => ({ user_id: user.id, type: c.type, content: c.content, briefing }));
    const { error: insErr } = await supabase.from("creatives").insert(rows);
    if (insErr) console.error("insert error", insErr);

    return new Response(JSON.stringify({ creatives: parsed.creatives }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
