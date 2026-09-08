"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Rocket, Eraser, Loader2, ChevronLeft } from "lucide-react";
import Avatar from "@/components/Avatar";
import DrawCanvas from "@/components/DrawCanvas";
import LetterStrokeGuide from "@/components/LetterStrokeGuide";
import { useAuth } from "@/lib/store/AuthContext";
import { requestOtp, verifyOtp } from "@/lib/api/auth";
import { mockPracticeWords } from "@/lib/mock/practiceWords";
import { mockStories } from "@/lib/mock/stories";
import { mockFacts } from "@/lib/mock/facts";
import { COVER_GRADIENTS } from "@/lib/theme";

type Step = "intro" | "letters" | "words" | "stories" | "phone" | "otp" | "success";
const STEPS: Step[] = [
  "intro",
  "letters",
  "words",
  "stories",
  "phone",
  "otp",
  "success",
];

const sampleWord = mockPracticeWords.find((w) => w.id === "w_nan")!;
const sampleStory = mockStories[0];
const sampleFact = mockFacts[0];

/** Four auto-advancing digit boxes for the OTP step. */
function OtpInputs({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = [0, 1, 2, 3].map((i) => value[i] ?? "");

  function handleChange(i: number, raw: string) {
    const d = raw.replace(/\D/g, "").slice(-1);
    const next = digits.slice();
    next[i] = d;
    onChange(next.join(""));
    if (d && i < 3) inputsRef.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  }

  return (
    <div dir="ltr" className="flex items-center justify-center gap-3">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          inputMode="numeric"
          maxLength={1}
          className="h-14 w-12 rounded-2xl border-2 border-black/10 bg-white text-center text-2xl font-extrabold text-ink focus:border-brand-500 focus:outline-none"
        />
      ))}
    </div>
  );
}

export default function WelcomePage() {
  const router = useRouter();
  const { login } = useAuth();

  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];

  const [drawResetToken, setDrawResetToken] = useState(0);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [requesting, setRequesting] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  async function handleRequestOtp() {
    if (phone.length !== 11 || requesting) return;
    setRequesting(true);
    setPhoneError("");
    const result = await requestOtp(phone);
    setRequesting(false);
    if (!result.success) {
      setPhoneError(result.message);
      return;
    }
    goNext();
  }

  async function handleVerifyOtp() {
    if (otp.length !== 4 || verifying) return;
    setVerifying(true);
    setOtpError("");
    const result = await verifyOtp(phone, otp);
    setVerifying(false);
    if (!result.success) {
      setOtpError(result.message);
      return;
    }
    login(phone);
    goNext();
  }

  async function handleResend() {
    setResendMessage("");
    const result = await requestOtp(phone);
    setResendMessage(result.success ? "کد دوباره ارسال شد ✅" : result.message);
  }

  useEffect(() => {
    if (step !== "success") return;
    const t = setTimeout(() => router.replace("/"), 1200);
    return () => clearTimeout(t);
  }, [step, router]);

  const showDots = step !== "intro" && step !== "success";

  return (
    <main dir="rtl" className="px-6 pt-10">
      {showDots && (
        <div dir="ltr" className="flex items-center justify-center gap-1.5">
          {STEPS.slice(1, 6).map((s, i) => {
            const dotIndex = i + 1;
            return (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  dotIndex === stepIndex
                    ? "w-6 bg-brand-500"
                    : dotIndex < stepIndex
                    ? "w-1.5 bg-brand-400"
                    : "w-1.5 bg-black/10"
                }`}
              />
            );
          })}
        </div>
      )}

      {step === "intro" && (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          <Avatar size={160} waving />
          <h1 className="mt-6 text-3xl font-extrabold text-brand-600">
            آکادمی پارسی
          </h1>
          <p className="mt-2 text-base text-ink/50">
            یادگیری فارسی، بازی‌بازی! 🎈
          </p>
          <button
            onClick={goNext}
            className="mt-8 flex items-center gap-2 rounded-2xl bg-brand-500 px-8 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]"
          >
            <Rocket size={18} />
            بزن بریم!
          </button>
        </div>
      )}

      {step === "letters" && (
        <div className="mt-8 text-center">
          <p className="text-2xl">✍️</p>
          <h2 className="mt-2 text-xl font-extrabold">
            حرف‌ها رو با انگشتت بنویس
          </h2>
          <p className="mt-1 text-sm text-ink/50">همین الان امتحان کن!</p>
          <div className="relative mx-auto mt-5 h-40 w-40 overflow-hidden rounded-2xl border-2 border-dashed border-black/10 bg-white">
            <LetterStrokeGuide glyph="ا" className="absolute inset-0 h-full w-full" />
            <DrawCanvas
              key={drawResetToken}
              className="absolute inset-0 h-full w-full cursor-crosshair"
              strokeWidth={7}
            />
          </div>
          <button
            onClick={() => setDrawResetToken((t) => t + 1)}
            className="mx-auto mt-3 flex items-center gap-1.5 text-xs font-bold text-ink/50"
          >
            <Eraser size={13} />
            پاک کن
          </button>
          <button
            onClick={goNext}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]"
          >
            بعدی
            <ChevronLeft size={18} />
          </button>
        </div>
      )}

      {step === "words" && (
        <div className="mt-8 text-center">
          <p className="text-2xl">📝</p>
          <h2 className="mt-2 text-xl font-extrabold">
            کلمه‌های قشنگ فارسی رو بساز
          </h2>
          <p className="mt-1 text-sm text-ink/50">حرف به حرف، کلمه به کلمه!</p>
          <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-2xl border-2 border-dashed border-black/10 bg-white px-6 py-6">
            {sampleWord.letters.map((l, i) => (
              <span key={i} className="text-4xl font-extrabold text-brand-500">
                {l}
              </span>
            ))}
          </div>
          <p className="mt-3 text-lg font-extrabold text-ink">
            {sampleWord.word} {sampleWord.emoji}
          </p>
          <button
            onClick={goNext}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]"
          >
            بعدی
            <ChevronLeft size={18} />
          </button>
        </div>
      )}

      {step === "stories" && (
        <div className="mt-8 text-center">
          <p className="text-2xl">📖</p>
          <h2 className="mt-2 text-xl font-extrabold">
            داستان و دانستنی‌های جالب
          </h2>
          <p className="mt-1 text-sm text-ink/50">
            صدها داستان و دانستنی منتظرته!
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <div
              className={`flex h-28 w-28 items-center justify-center rounded-2xl ${COVER_GRADIENTS[sampleStory.coverTheme]}`}
            >
              <span className="text-4xl">{sampleStory.emoji}</span>
            </div>
            <div
              className={`flex h-28 w-28 items-center justify-center rounded-2xl ${COVER_GRADIENTS[sampleFact.coverTheme]}`}
            >
              <span className="text-4xl">{sampleFact.emoji}</span>
            </div>
          </div>
          <p className="mt-3 text-sm font-bold text-ink">{sampleStory.title}</p>
          <button
            onClick={goNext}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]"
          >
            بعدی
            <ChevronLeft size={18} />
          </button>
        </div>
      )}

      {step === "phone" && (
        <div className="mt-8">
          <p className="text-center text-2xl">📱</p>
          <h2 className="mt-2 text-center text-xl font-extrabold">
            وقتشه وارد بشیم!
          </h2>
          <p className="mt-1 text-center text-sm text-ink/50">
            شماره موبایل والدین رو وارد کن تا کدی برات بفرستیم.
          </p>
          <input
            dir="ltr"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 11));
              setPhoneError("");
            }}
            placeholder="09xxxxxxxxx"
            className="mt-5 w-full rounded-2xl bg-white px-4 py-3.5 text-center text-lg font-bold tracking-widest text-ink shadow-card placeholder:text-ink/25 focus:outline-none"
          />
          {phoneError && (
            <p className="mt-2 text-center text-xs text-red-500">{phoneError}</p>
          )}
          <button
            onClick={handleRequestOtp}
            disabled={phone.length !== 11 || requesting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98] disabled:opacity-40"
          >
            {requesting && <Loader2 size={18} className="animate-spin" />}
            ارسال کد
          </button>
        </div>
      )}

      {step === "otp" && (
        <div className="mt-8">
          <p className="text-center text-2xl">🔐</p>
          <h2 className="mt-2 text-center text-xl font-extrabold">
            کد رو وارد کن
          </h2>
          <p className="mt-1 text-center text-sm text-ink/50">
            کد ۴ رقمی که به{" "}
            <span dir="ltr" className="font-bold text-ink">
              {phone}
            </span>{" "}
            فرستادیم رو وارد کن.
          </p>
          <div className="mt-5">
            <OtpInputs value={otp} onChange={setOtp} />
          </div>
          {otpError && (
            <p className="mt-2 text-center text-xs text-red-500">{otpError}</p>
          )}
          <p className="mt-3 text-center text-[11px] text-ink/35">
            برای تست، هر کد ۴ رقمی رو وارد کن 😉
          </p>
          <button
            onClick={handleVerifyOtp}
            disabled={otp.length !== 4 || verifying}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98] disabled:opacity-40"
          >
            {verifying && <Loader2 size={18} className="animate-spin" />}
            تایید
          </button>
          <button
            onClick={handleResend}
            className="mx-auto mt-3 block text-xs font-bold text-brand-600"
          >
            ارسال دوباره کد
          </button>
          {resendMessage && (
            <p className="mt-2 text-center text-xs text-brand-600">
              {resendMessage}
            </p>
          )}
        </div>
      )}

      {step === "success" && (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          <span className="text-6xl">🎉</span>
          <h2 className="mt-4 text-2xl font-extrabold text-brand-600">
            خوش اومدی!
          </h2>
          <p className="mt-2 text-sm text-ink/50">
            بریم یادگیری رو شروع کنیم...
          </p>
        </div>
      )}
    </main>
  );
}
