import { Star, Flame } from "lucide-react";

export default function StatsPill({
  xp = 1250,
  streak = 7,
}: {
  xp?: number;
  streak?: number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-card">
      <div className="flex items-center gap-1.5">
        <Star size={18} className="fill-gold-500 text-gold-500" />
        <div className="leading-tight">
          <div className="text-sm font-bold text-ink">
            {xp.toLocaleString("en-US")}
          </div>
          <div className="text-[10px] text-ink/40">XP</div>
        </div>
      </div>
      <div className="h-6 w-px bg-black/10" />
      <div className="flex items-center gap-1.5">
        <Flame size={18} className="fill-orange-500 text-orange-500" />
        <div className="leading-tight">
          <div className="text-sm font-bold text-ink">{streak}</div>
          <div className="text-[10px] text-ink/40">روز متوالی</div>
        </div>
      </div>
    </div>
  );
}
