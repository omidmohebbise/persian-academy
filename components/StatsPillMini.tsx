import { Star } from "lucide-react";

export default function StatsPillMini({ xp }: { xp: number }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 shadow-card">
      <Star size={14} className="fill-gold-500 text-gold-500" />
      <span className="text-xs font-bold">{xp.toLocaleString("en-US")}</span>
    </div>
  );
}
