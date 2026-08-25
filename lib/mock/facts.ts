import type { Fact, FactCategory } from "@/types";

export const mockFactCategories: FactCategory[] = [
  { id: "cat_culture", slug: "culture", label: "فرهنگ", icon: "🏺" },
  { id: "cat_history", slug: "history", label: "تاریخ", icon: "🏛️" },
  { id: "cat_nature", slug: "nature", label: "طبیعت", icon: "🌿" },
  { id: "cat_food", slug: "food", label: "غذا", icon: "🍲" },
  { id: "cat_art", slug: "art", label: "هنر", icon: "🎨" },
];

export const mockFacts: Fact[] = [
  {
    id: "fact_pomegranate",
    categoryId: "cat_culture",
    title: "انار نماد زندگی و برکت",
    descriptionFa:
      "در فرهنگ ایرانی، انار نماد زندگی، عشق و برکت است. نقش انار را می‌توان در بسیاری از نقاشی‌ها، کاشی‌کاری‌ها و شعرهای قدیمی دید.",
    descriptionEn:
      "In Persian culture, pomegranate is a symbol of life, love and abundance. You can see pomegranate patterns in many paintings, tiles and poems.",
    emoji: "🍎",
    coverTheme: "clay",
    featured: true,
    photoIndex: 1,
    photoTotal: 6,
  },
  {
    id: "fact_nowruz",
    categoryId: "cat_culture",
    title: "نوروز، جشن بهاری",
    descriptionFa:
      "نوروز آغاز سال نو ایرانی و جشن رسیدن بهار است که با سفره هفت‌سین جشن گرفته می‌شود.",
    descriptionEn:
      "Nowruz marks the Persian new year and the arrival of spring, celebrated with the Haft-Seen table.",
    emoji: "🌱",
    coverTheme: "peach",
  },
  {
    id: "fact_persian_tea",
    categoryId: "cat_culture",
    title: "چای ایرانی",
    descriptionFa:
      "نوشیدن چای بخشی مهم از فرهنگ روزمره ایرانی‌ها و نماد مهمان‌نوازی است.",
    descriptionEn:
      "Drinking tea is a central part of everyday Persian culture and a symbol of hospitality.",
    emoji: "🍵",
    coverTheme: "sand",
  },
  {
    id: "fact_si_o_se_pol",
    categoryId: "cat_history",
    title: "سی و سه پل اصفهان",
    descriptionFa:
      "یکی از زیباترین پل‌های ایران مربوط به دوره صفوی است.",
    descriptionEn:
      "Si-o-se Pol is one of the most beautiful bridges in Iran, built during the Safavid era.",
    emoji: "🌉",
    coverTheme: "sand",
  },
  {
    id: "fact_persepolis",
    categoryId: "cat_history",
    title: "تخت جمشید",
    descriptionFa:
      "تخت جمشید پایتخت باستانی هخامنشیان و یکی از میراث‌های جهانی یونسکو است.",
    descriptionEn:
      "Persepolis was the ancient capital of the Achaemenid Empire and is a UNESCO World Heritage site.",
    emoji: "🏛️",
    coverTheme: "sand",
  },
  {
    id: "fact_caravanserai",
    categoryId: "cat_history",
    title: "کاروانسراهای ایرانی",
    descriptionFa:
      "کاروانسراها محل استراحت بازرگانان در طول جاده ابریشم بودند.",
    descriptionEn:
      "Caravanserais were roadside inns for merchants traveling along the Silk Road.",
    emoji: "🐫",
    coverTheme: "wood",
  },
  {
    id: "fact_snow_leopard",
    categoryId: "cat_nature",
    title: "پلنگ برفی",
    descriptionFa:
      "پلنگ برفی در کوه‌های زاگرس زندگی می‌کند و در خطر انقراض است.",
    descriptionEn:
      "The snow leopard lives in the Zagros mountains and is endangered.",
    emoji: "🐆",
    coverTheme: "mist",
  },
  {
    id: "fact_lake_urmia",
    categoryId: "cat_nature",
    title: "دریاچه ارومیه",
    descriptionFa:
      "دریاچه ارومیه یکی از بزرگترین دریاچه‌های آب شور جهان است.",
    descriptionEn:
      "Lake Urmia is one of the largest saltwater lakes in the world.",
    emoji: "🦩",
    coverTheme: "sky",
  },
  {
    id: "fact_hyrcanian_forest",
    categoryId: "cat_nature",
    title: "جنگل‌های هیرکانی",
    descriptionFa:
      "جنگل‌های هیرکانی قدمتی بیش از ۲۵ میلیون سال دارند.",
    descriptionEn:
      "The Hyrcanian forests are more than 25 million years old.",
    emoji: "🌲",
    coverTheme: "forest",
  },
  {
    id: "fact_fesenjan",
    categoryId: "cat_food",
    title: "خورشت فسنجان",
    descriptionFa:
      "فسنجان یکی از غذاهای سنتی و محبوب ایرانی با طعم خاص است.",
    descriptionEn:
      "Fesenjan is a traditional and popular Persian dish with a unique taste.",
    emoji: "🍲",
    coverTheme: "clay",
  },
  {
    id: "fact_saffron",
    categoryId: "cat_food",
    title: "زعفران",
    descriptionFa: "ایران بزرگترین تولیدکننده زعفران در جهان است.",
    descriptionEn: "Iran is the world's largest producer of saffron.",
    emoji: "🌼",
    coverTheme: "peach",
  },
  {
    id: "fact_ash_reshteh",
    categoryId: "cat_food",
    title: "آش رشته",
    descriptionFa:
      "آش رشته یک غذای سنتی ایرانی است که در مناسبت‌های خاص پخته می‌شود.",
    descriptionEn:
      "Ash Reshteh is a traditional Persian noodle soup made for special occasions.",
    emoji: "🍜",
    coverTheme: "sand",
  },
  {
    id: "fact_persian_calligraphy",
    categoryId: "cat_art",
    title: "خط فارسی",
    descriptionFa: "خط فارسی یکی از زیباترین خط‌های جهان است.",
    descriptionEn:
      "Persian calligraphy is one of the most beautiful scripts in the world.",
    emoji: "✒️",
    coverTheme: "lilac",
  },
  {
    id: "fact_tilework",
    categoryId: "cat_art",
    title: "کاشی‌کاری ایرانی",
    descriptionFa: "کاشی‌کاری یکی از هنرهای زیبای معماری ایرانی است.",
    descriptionEn:
      "Tilework is one of the beautiful arts of Persian architecture.",
    emoji: "🔷",
    coverTheme: "sky",
  },
  {
    id: "fact_persian_rug",
    categoryId: "cat_art",
    title: "قالی ایرانی",
    descriptionFa:
      "قالی‌بافی ایرانی هنری چند هزار ساله و یکی از نمادهای فرهنگی ایران است.",
    descriptionEn:
      "Persian rug weaving is a millennia-old art and a cultural symbol of Iran.",
    emoji: "🧵",
    coverTheme: "wood",
  },
];
