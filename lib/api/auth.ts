import type { OtpRequestResult, OtpVerifyResult } from "@/types";
import { mockResponse } from "@/lib/api/config";

/** Iranian mobile format: 09xxxxxxxxx (11 digits). */
const PHONE_RE = /^09\d{9}$/;

/**
 * Backend contract: POST /api/v1/auth/otp/request
 * Body: { phone: string }
 * Sends a one-time verification code to the given phone number. Mocked for
 * now — no real SMS is sent — but validates the phone format so the UI's
 * error states are exercised the same way they will be against a real
 * backend.
 */
export async function requestOtp(phone: string): Promise<OtpRequestResult> {
  if (!PHONE_RE.test(phone)) {
    return mockResponse(
      { success: false, message: "شماره موبایل معتبر نیست." },
      200
    );
  }
  return mockResponse(
    { success: true, message: "کد تایید ارسال شد." },
    500
  );
}

/**
 * Backend contract: POST /api/v1/auth/otp/verify
 * Body: { phone: string, code: string }
 * Verifies the code sent to the phone number and starts a session. Mocked
 * for now: any 4-digit code succeeds, since there's no real SMS provider
 * behind requestOtp yet to check against.
 */
export async function verifyOtp(
  phone: string,
  code: string
): Promise<OtpVerifyResult> {
  if (!PHONE_RE.test(phone)) {
    return mockResponse(
      { success: false, message: "شماره موبایل معتبر نیست." },
      200
    );
  }
  if (!/^\d{4}$/.test(code)) {
    return mockResponse(
      { success: false, message: "کد باید ۴ رقم باشد." },
      200
    );
  }
  return mockResponse({ success: true, message: "خوش اومدی!" }, 400);
}
