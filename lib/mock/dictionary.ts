export interface DictionaryEntry {
  fa: string;
  transliteration: string;
  emoji: string;
  exampleFa: string;
  exampleEn: string;
}

/**
 * Stand-in for a real translation/lesson-content service. Keyed by lowercase
 * English word. Unknown words fall back to a generic entry (see
 * lib/api/discover.ts) so the flow never breaks — a real backend would
 * generate this instead of looking it up in a fixed table.
 */
export const ENGLISH_TO_PERSIAN: Record<string, DictionaryEntry> = {
  tree: {
    fa: "درخت",
    transliteration: "derakht",
    emoji: "🌳",
    exampleFa: "این درخت خیلی بلند است.",
    exampleEn: "This tree is very tall.",
  },
  water: {
    fa: "آب",
    transliteration: "âb",
    emoji: "💧",
    exampleFa: "من آب می‌نوشم.",
    exampleEn: "I drink water.",
  },
  book: {
    fa: "کتاب",
    transliteration: "ketâb",
    emoji: "📚",
    exampleFa: "این کتاب جالب است.",
    exampleEn: "This book is interesting.",
  },
  mother: {
    fa: "مادر",
    transliteration: "mâdar",
    emoji: "👩",
    exampleFa: "مادر من مهربان است.",
    exampleEn: "My mother is kind.",
  },
  house: {
    fa: "خانه",
    transliteration: "khâne",
    emoji: "🏠",
    exampleFa: "خانه ما بزرگ است.",
    exampleEn: "Our house is big.",
  },
  sun: {
    fa: "خورشید",
    transliteration: "khorshid",
    emoji: "☀️",
    exampleFa: "خورشید امروز درخشان است.",
    exampleEn: "The sun is bright today.",
  },
  cat: {
    fa: "گربه",
    transliteration: "gorbe",
    emoji: "🐱",
    exampleFa: "گربه روی مبل خوابیده است.",
    exampleEn: "The cat is sleeping on the couch.",
  },
  friend: {
    fa: "دوست",
    transliteration: "doost",
    emoji: "🤝",
    exampleFa: "او بهترین دوست من است.",
    exampleEn: "He is my best friend.",
  },
  bread: {
    fa: "نان",
    transliteration: "nân",
    emoji: "🍞",
    exampleFa: "نان تازه خوشمزه است.",
    exampleEn: "Fresh bread is delicious.",
  },
  star: {
    fa: "ستاره",
    transliteration: "setâre",
    emoji: "⭐",
    exampleFa: "امشب آسمان پر از ستاره است.",
    exampleEn: "The sky is full of stars tonight.",
  },
};

export function lookupWord(word: string): DictionaryEntry {
  const key = word.trim().toLowerCase();
  return (
    ENGLISH_TO_PERSIAN[key] ?? {
      fa: "کلمه‌ی جدید",
      transliteration: "?",
      emoji: "✨",
      exampleFa: `به‌زودی یاد می‌گیری «${word}» چطور به فارسی گفته می‌شود.`,
      exampleEn: `You'll soon learn how to say "${word}" in Persian.`,
    }
  );
}
