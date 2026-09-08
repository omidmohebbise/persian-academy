"use client";

import { useEffect, useId, useRef } from "react";
import { Volume2, ChevronLeft, Star, Eraser } from "lucide-react";
import { getLetterInfo } from "@/lib/mock/letters";
import { toPersianDigits } from "@/lib/format";
import type { PracticeWord } from "@/types";

/**
 * A transparent freehand drawing surface (mouse, touch and pen, via the
 * Pointer Events API) meant to sit absolutely-positioned on top of a dashed
 * trace guide. Remount it (change `key`) to clear it — simpler than exposing
 * an imperative clear() method.
 */
function DrawCanvas({
  className,
  strokeWidth = 5,
  onDraw,
}: {
  className?: string;
  strokeWidth?: number;
  onDraw?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.getContext("2d")?.scale(dpr, dpr);
  }, []);

  function pointFromEvent(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    canvasRef.current?.setPointerCapture(e.pointerId);
    lastPoint.current = pointFromEvent(e);
    onDraw?.();
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!lastPoint.current) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const point = pointFromEvent(e);
    ctx.strokeStyle = "#2F7A3D";
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPoint.current = point;
  }

  function stopDrawing() {
    lastPoint.current = null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`touch-none ${className ?? ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDrawing}
      onPointerLeave={stopDrawing}
      onPointerCancel={stopDrawing}
    />
  );
}

/** One letter's dashed trace guide + a canvas to draw it on top of. */
function LetterTraceBox({
  glyph,
  resetToken,
  onDraw,
}: {
  glyph: string;
  resetToken: number;
  onDraw: () => void;
}) {
  const arrowId = useId();
  const info = getLetterInfo(glyph);

  return (
    <div
      title={info.name}
      className="flex w-[30%] min-w-[84px] flex-col items-center gap-1 rounded-2xl border border-black/5 bg-cream/60 p-2"
    >
      <span className="text-2xl font-extrabold text-ink">{glyph}</span>
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-20 w-20">
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
        <DrawCanvas
          key={resetToken}
          className="absolute inset-0 h-20 w-20 cursor-crosshair"
          onDraw={onDraw}
        />
      </div>
    </div>
  );
}

/** The combined word — a bigger canvas over faded guide letters, for free tracing. */
function WordTraceArea({
  word,
  resetToken,
  onDraw,
}: {
  word: PracticeWord;
  resetToken: number;
  onDraw: () => void;
}) {
  return (
    <div className="relative mt-5 h-32 overflow-hidden rounded-2xl border-2 border-dashed border-black/10 bg-cream/60">
      <div
        dir="rtl"
        className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1"
      >
        {word.letters.map((glyph, i) => (
          <span key={i} className="text-5xl font-extrabold text-ink/15">
            {glyph}
          </span>
        ))}
      </div>
      <DrawCanvas
        key={resetToken}
        className="absolute inset-0 h-full w-full cursor-crosshair"
        strokeWidth={6}
        onDraw={onDraw}
      />
    </div>
  );
}

export default function LetterWritingPractice({
  word,
  wordNumber,
  totalWords,
  checked,
  hasDrawn,
  resetToken,
  xpEarned,
  onDraw,
  onClear,
  onCheck,
  onNext,
}: {
  word: PracticeWord;
  wordNumber: number;
  totalWords: number;
  checked: boolean;
  /** Whether the learner has drawn anything yet this word — gates the check button. */
  hasDrawn: boolean;
  /** Bumped by the parent to remount (and so clear) every canvas on this screen. */
  resetToken: number;
  xpEarned: number;
  onDraw: () => void;
  onClear: () => void;
  onCheck: () => void;
  onNext: () => void;
}) {
  function speakWord() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = "fa-IR";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-bold text-ink/60">
          کلمه {toPersianDigits(wordNumber)} / {toPersianDigits(totalWords)}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 text-xs font-bold text-ink/60 transition active:scale-95"
          >
            <Eraser size={14} />
            پاک کن
          </button>
          <button
            onClick={speakWord}
            className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-600 transition active:scale-95"
          >
            <Volume2 size={14} />
            صدای کلمه
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-lg font-extrabold text-ink">
          کلمه «{word.word}» را بنویس
        </h2>
        <p className="mt-1 text-xs text-ink/45">
          با موس یا انگشتت روی خط‌چین‌ها بکش و مسیر حرکت را دنبال کن.
        </p>
      </div>

      <div dir="rtl" className="mt-5 flex flex-wrap justify-center gap-3">
        {word.letters.map((glyph, i) => (
          <LetterTraceBox
            key={i}
            glyph={glyph}
            resetToken={resetToken}
            onDraw={onDraw}
          />
        ))}
      </div>

      <WordTraceArea word={word} resetToken={resetToken} onDraw={onDraw} />

      {!checked ? (
        <>
          <button
            onClick={onCheck}
            disabled={!hasDrawn}
            className="mt-5 w-full rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98] disabled:opacity-40"
          >
            نوشتم! بررسی کن
          </button>
          {!hasDrawn && (
            <p className="mt-2 text-center text-xs text-ink/40">
              اول با موس یا انگشتت حرف‌ها را بکش ✏️
            </p>
          )}
        </>
      ) : (
        <>
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
              <Star size={18} className="fill-gold-500 text-gold-500" />
            </span>
            <div className="flex-1 text-right">
              <p className="text-sm font-extrabold text-brand-700">
                آفرین! خیلی خوب نوشتی!
              </p>
              <p className="text-xs text-ink/45">
                کلمه «{word.word}» را نوشتی.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-gold-500 px-3 py-1 text-xs font-extrabold text-white">
              +{toPersianDigits(xpEarned)} XP
            </span>
          </div>
          <button
            onClick={onNext}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]"
          >
            کلمه بعدی
            <ChevronLeft size={18} />
          </button>
        </>
      )}
    </div>
  );
}
