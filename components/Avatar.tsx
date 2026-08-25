export default function Avatar({
  size = 56,
  waving = false,
  className = "",
}: {
  size?: number;
  waving?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-visible ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="50" fill="#D7EEDD" />
        {/* hoodie */}
        <path
          d="M14 100c0-22 16-34 36-34s36 12 36 34z"
          fill="#3F9142"
        />
        <path
          d="M50 66c-8 0-15 2-20 6 5 6 12 10 20 10s15-4 20-10c-5-4-12-6-20-6z"
          fill="#357A38"
        />
        {/* tree icon on hoodie */}
        <path d="M50 78l-4 7h8z" fill="#2F6B32" />
        <rect x="49" y="85" width="2" height="4" fill="#2F6B32" />
        {/* neck */}
        <rect x="43" y="55" width="14" height="14" rx="6" fill="#E8B48C" />
        {/* head */}
        <ellipse cx="50" cy="42" rx="21" ry="22" fill="#F0C39A" />
        {/* ears */}
        <circle cx="29" cy="43" r="4" fill="#F0C39A" />
        <circle cx="71" cy="43" r="4" fill="#F0C39A" />
        {/* hair */}
        <path
          d="M29 40c-2-16 10-25 21-25s23 9 21 25c-3-6-8-8-8-8s-2 6-9 6-9-6-9-6-2 4-8 5-6 3-8 3z"
          fill="#3A2A20"
        />
        <path d="M29 40c0-3 1-6 3-8 0 4 1 7 2 9-3 1-4 0-5-1z" fill="#3A2A20" />
        <path d="M71 40c0-3-1-6-3-8 0 4-1 7-2 9 3 1 4 0 5-1z" fill="#3A2A20" />
        {/* eyes */}
        <circle cx="42" cy="43" r="2.6" fill="#2D2A26" />
        <circle cx="58" cy="43" r="2.6" fill="#2D2A26" />
        {/* cheeks */}
        <circle cx="37" cy="49" r="3" fill="#F3A688" opacity="0.6" />
        <circle cx="63" cy="49" r="3" fill="#F3A688" opacity="0.6" />
        {/* smile */}
        <path
          d="M43 50c2 3 12 3 14 0"
          stroke="#2D2A26"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {waving && (
          <g>
            <circle cx="83" cy="66" r="9" fill="#F0C39A" />
            <path d="M18 100c2-14 8-22 8-22l10 6s-6 10-6 16z" fill="#3F9142" />
          </g>
        )}
      </svg>
    </div>
  );
}
