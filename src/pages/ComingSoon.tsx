import DashboardLayout from '@/components/DashboardLayout';
import { Sparkles } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  kicker?: string;
}

export default function ComingSoon({ title, subtitle, kicker }: Props) {
  return (
    <DashboardLayout title={title} subtitle={subtitle} kicker={kicker || title}>
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-12 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6 text-[#10B981]" />
        </div>
        <h3 className="text-xl font-bold mb-2">Em construção</h3>
        <p className="text-sm text-white/60">
          Esta área está sendo redesenhada e chegará em breve com a nova experiência.
        </p>
      </div>
    </DashboardLayout>
  );
}
