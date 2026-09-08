"use client";

import { useId } from "react";
import { getLetterInfo } from "@/lib/mock/letters";

/**
 * The dashed stroke-order guide for one letter: numbered start markers,
 * direction arrows, and diacritic dots. Pure SVG in a 0–100 viewBox, so it
 * scales cleanly whether it's a small per-letter box or a big single-letter
 * trace area — render it under a DrawCanvas of any size.
 */
export default function LetterStrokeGuide({
  glyph,
  className,
}: {
  glyph: string;
  className?: string;
}) {
  const arrowId = useId();
  const info = getLetterInfo(glyph);

  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <marker
          id={arrowId}
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#B9B2A6" />
        </marker>
      </defs>
      {info.strokes.map((s, i) => (
        <g key={i}>
          <path
            d={s.d}
            fill="none"
            stroke="#B9B2A6"
            strokeWidth={3}
            strokeDasharray="5 5"
            strokeLinecap="round"
            markerEnd={`url(#${arrowId})`}
          />
          <circle
            cx={s.startX}
            cy={s.startY}
            r={7}
            fill="#fff"
            stroke="#3F9142"
            strokeWidth={2}
          />
          <text
            x={s.startX}
            y={s.startY + 3}
            textAnchor="middle"
            fontSize={9}
            fontWeight={700}
            fill="#3F9142"
          >
            {i + 1}
          </text>
        </g>
      ))}
      {info.dots.map((d, i) => (
        <rect
          key={i}
          x={d.x - 4}
          y={d.y - 4}
          width={8}
          height={8}
          fill="none"
          stroke="#B9B2A6"
          strokeWidth={2}
          transform={`rotate(45 ${d.x} ${d.y})`}
        />
      ))}
    </svg>
  );
}
