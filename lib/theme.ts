import type { CoverTheme } from "@/types";

/**
 * Maps a semantic theme key (what the API returns) to the actual gradient
 * classes (a UI concern). Keeping this out of the mock data keeps the data
 * shape backend-agnostic — a real API should never need to know Tailwind.
 */
export const COVER_GRADIENTS: Record<CoverTheme, string> = {
  forest: "bg-gradient-to-b from-[#EAF4E2] to-[#CFE6BE]",
  night: "bg-gradient-to-b from-[#1C2340] to-[#2E3A66]",
  wood: "bg-gradient-to-b from-[#7A4A33] to-[#4E2E1F]",
  moss: "bg-gradient-to-b from-[#8FAF8A] to-[#4C6B57]",
  sand: "bg-gradient-to-b from-[#E7C9A0] to-[#B98A55]",
  clay: "bg-gradient-to-b from-[#FBE0D6] to-[#F0AF95]",
  mist: "bg-gradient-to-b from-[#DCE9E6] to-[#AEC7C2]",
  lilac: "bg-gradient-to-b from-[#E7DFFB] to-[#C7B4F2]",
  peach: "bg-gradient-to-b from-[#FDEBD3] to-[#F6C87A]",
  sky: "bg-gradient-to-b from-[#D6E8FB] to-[#9FC4EE]",
};
