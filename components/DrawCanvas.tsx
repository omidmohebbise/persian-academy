"use client";

import { useEffect, useRef } from "react";

/**
 * A transparent freehand drawing surface (mouse, touch and pen, via the
 * Pointer Events API) meant to sit absolutely-positioned on top of a dashed
 * trace guide. Remount it (change `key`) to clear it — simpler than exposing
 * an imperative clear() method.
 */
export default function DrawCanvas({
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
