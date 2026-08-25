/**
 * ---------------------------------------------------------------------------
 * BACKEND INTEGRATION SEAM
 * ---------------------------------------------------------------------------
 * Every function in lib/api/* currently returns fixture data from lib/mock/*
 * instead of calling a real backend. Each function's JSDoc states the REST
 * endpoint it stands in for (method + path), so wiring up a real backend
 * later is a matter of replacing the function body with a `request()` call —
 * the function signatures and return types (see types/index.ts) are the
 * contract and shouldn't need to change.
 *
 * To integrate:
 *   1. Set NEXT_PUBLIC_API_BASE_URL (e.g. in .env.local).
 *   2. In each lib/api/*.ts function, swap the `mockResponse(...)` call for
 *      `request(...)`, e.g.:
 *
 *        export async function getStories(): Promise<Story[]> {
 *          return request<Story[]>("/stories");
 *        }
 * ---------------------------------------------------------------------------
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/** Thin fetch wrapper, ready to use once API_BASE_URL is set. Unused by the mocks today. */
export async function request<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res.json();
}

/** Simulates network latency so loading states are visible/testable during mock development. */
export function mockResponse<T>(data: T, delayMs = 250): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });
}
