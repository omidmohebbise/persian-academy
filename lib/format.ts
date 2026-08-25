const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Converts an integer's Western digits to Persian (Eastern Arabic-Indic) digits. */
export function toPersianDigits(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}
