# Yadegaar — Current App vs. Project Description: Gap Analysis

*Compares the implementation in this repo against `Yadegaar_Project_Description_EN.md`.*

> **Update:** Phase 1 of the phasing plan below ("close the loop for one path first") is now implemented — see the ✅ notes inline. The learning engine described in the doc is real for the "Teach Me" and "Explore" paths specifically: completing a lesson or submitting a known word now awards XP, computes levels from word count, and actually unlocks the next locked story, and that state is shared live across Home/Stories/Profile/Discover (see `lib/store/`). Kids/Teens tracks, richer Facts categories, audio, and literature content are still open — see the table.

## Short answer

**Visually and structurally, yes — the app is a good start on Yadegaar.** The screen set (Home, ➕ Teach Me, 🌎 Facts & Culture, 🚹 Me), the "locked story" concept, the bilingual facts, and the profile's personal-statement stats all match the description closely.

**Functionally, no — not yet.** What exists today is a UI shell over static mock data. The parts of the description that make Yadegaar *Yadegaar* rather than a generic vocabulary app — the two Discover & Explore paths actually generating a lesson, learning progress unlocking content, XP flowing from every learning activity, level-ups every 100 words, and separate Kids/Teens tracks — are either simulated with a canned message or missing entirely.

In short: **the skeleton is right, the learning engine isn't built yet.**

---

## Section-by-section comparison

### 1. Age Groups (Kids 3–10 / Teens 11–18)

**Not implemented.** There is a single, undifferentiated experience. No age selection, no profile field for age/track, no content variant (short simple stories vs. longer literature/poetry), no UI-complexity differences.

### 2. Discover & Explore (the two learning paths)

**UI exists, learning logic doesn't.**

- Path 1 "Teach Me" (`/discover`, card 1): user types a foreign word, clicks "یاد بده" → `submitForeignWord()` returns a canned success message and +50 XP. It does **not** generate the described learning path (letters, pronunciation, images, examples, exercises, repetition, final word). There is no lesson-content model at all beyond the single static "امروز درس" (today's lesson) card on Home.
- Path 2 "Explore" (`/discover`, card 2): user types a Persian word they know → `submitPersianWord()` returns a canned message and +50 XP. It does **not** look up or unlock a related lesson, story, or cultural topic — there's no logic connecting the word to anything.

### 3. Learning as the key to unlocking content

**Half-built.** The *display* half is done well: `Story.status: "locked"` + `wordsToUnlock` renders a lock icon, blurred-in illustration, and "N کلمه دیگر تا باز شدن" exactly as described. The *mechanic* half is missing: nothing decrements `wordsToUnlock` or flips a story to unlocked when the user learns words through Discover. It's static data, not a live progression system.

### 4. Home

**Matches well.** Daily lesson card + a stories row mixing unlocked/in-progress/locked states. This is close to a real implementation of "What should I learn today? / What can I unlock next?" — it just needs to be fed by live progress instead of a fixed mock list.

### 5. ➕ Teach Me

**Structurally present, content-thin.** The screen and the `tree → درخت` interaction pattern exist. What's missing is everything *inside* that path — the actual multi-step lesson (letters/pronunciation/images/exercises) the description calls for.

### 6. 🌎 Facts & Culture

**Mostly matches.** Bilingual (fa/en) fact cards, category filter, a featured "today's fact" — all implemented and backed by the mock API. Two gaps against the description:
- Category taxonomy is narrower than described (we have culture/history/nature/food/art; the doc also calls out festivals, cultural figures, and literature as distinct topics — festivals exist only as one fact under "culture").
- "بشنو" (listen) is a decorative button with no audio behind it — the description explicitly calls out that pre-readers should be able to rely on pronunciation/audio, not just text.

### 7. 🚹 Profile / Me

**Matches well.** "کلمه بلدم" / "داستان خوانده‌ام" / "دانستنی یاد گرفتم" are the exact three personal-statement stats the description asks for, sourced from `User.stats` in the mock API.

### 8. Progress — journey to 3,000 words

**Partially implemented, wrong milestone granularity.** There's a 97/3000 progress bar and a `level` field, but leveling is static mock data (`level: 1, levelWordsRequired: 1000`) rather than the described **every 100 words = a level-up** (Level 3 at 300 words, etc.). No level-up moment/celebration exists.

### 9. XP & Motivation

**One row of the table is wired, the rest aren't.** "Discover a word" / "Complete a new learning path" (+50 XP each) work today via the Discover forms. "Complete a lesson," "Read a story," and "Learn a fact" award **no XP** currently — reading a story or opening a fact doesn't touch `user.xp` at all.

### 10. Product philosophy (Curiosity → Learning → Reward → Curiosity loop)

**Not yet a loop.** Each piece (locked story, Discover form, XP number) exists in isolation but they don't feed each other. Learning a word via Discover doesn't move a story closer to unlocking; finishing a story doesn't surface new vocabulary; nothing closes the loop back to curiosity.

### 11. Vision

Directionally aligned (an XP/progress-driven, story-and-culture-wrapped vocabulary journey), but the "I know 3,000 words and can read Persian stories" outcome isn't measurable yet beyond a static number, because nothing in the app currently *changes* `wordsLearned`.

---

## Requirement → Implementation Activity Map

| # | Requirement (from project description) | Current State | Activity Needed | Priority |
|---|---|---|---|---|
| 1 | Kids (3–10) vs Teens (11–18) tracks | Not implemented — one undifferentiated experience | Add `ageGroup`/`track` to the `User` model; branch content selection (lesson difficulty, story length, fact depth) by track; add an age/track picker to onboarding or profile settings | High |
| 2 | Path 1 "Teach Me" generates a real learning path (letters, pronunciation, images, examples, exercises, repetition) | ✅ Done — `generateLessonPath()` + `<LessonWizard>` (`components/LessonWizard.tsx`) walk the learner through intro → pronunciation → example sentence → multiple-choice quiz → recap, using a small mock dictionary (`lib/mock/dictionary.ts`). XP is awarded on completion, not on form submit. | Content depth: only ~10 words are in the dictionary today; a real backend would generate/lookup arbitrary words | High |
| 3 | Path 2 "Explore" surfaces a related lesson/vocab/story/topic | ⚠️ Partial — `submitPersianWord()` now feeds the same progress/unlock engine as Path 1 (XP, level, next-story unlock all fire for real), but it still doesn't point at a *specific* matched lesson/story — any known-word submission just advances the same global unlock queue | Build a real word→content matcher once a backend exists | Medium (was High) |
| 4 | Learning N words unlocks a specific locked story | ✅ Done — `lib/store/progress.ts` (`applyWordLearned`, unit-tested) decrements the next locked story's `wordsToUnlock` on every successful learn from either path and flips it to unlocked at 0, live across Home/Stories/Profile via `lib/store/AppStateContext.tsx` | None for the mock; a real backend replaces the local reducer with a server call | Done |
| 5 | Home answers "what to learn today / what to unlock next" | Today's lesson + story row implemented on mock data | Swap the mock lesson/story preview for the live-progress versions once #2–#4 exist; no new UI needed | Medium (depends on #2–4) |
| 6 | Facts & Culture covers culture, history, places, food, festivals, figures, nature, literature, traditions | 5 categories implemented (culture, history, nature, food, art) | Extend `FactCategory`/`mockFacts` with festivals, cultural figures, literature, traditions as first-class categories | Medium |
| 7 | Facts section works for pre-readers (audio + images, not just text) | No audio anywhere; "بشنو" is decorative | Wire real TTS or recorded audio playback for facts, lesson words, and story text; add letter/word highlighting for partial readers | Medium |
| 8 | Profile shows "I know N words / read N stories / learned N facts" | Implemented, matches description | None — keep in sync as #2–4 make these numbers move for real | Done |
| 9 | Progress: level up every 100 words (Level 3 = 300 words) | ✅ Done — `computeLevel()` in `lib/store/progress.ts` is `floor(wordsLearned/100)+1`, unit-tested (100 words → level 2, 200 → level 3, ...); the result message on Discover shows a 🎉 level-up line the moment it fires | A dedicated celebration screen/animation beyond the inline message | Low |
| 10 | XP for: new learning path, discovering a word, completing a lesson, reading a story, learning a fact | ⚠️ Partial — "complete a learning path" and "discover a word" both award XP for real now (verified: 1,250 → 1,300 XP after one lesson). Reading a story and learning a fact still award nothing | Add XP awards on: finishing a story (needs a "mark as read" action) and opening/learning a fact | Medium |
| 11 | Curiosity → Learning → Reward → Curiosity loop end-to-end | ✅ Done for the core loop — verified end-to-end: learning words via either Discover path advances a locked story's countdown live on `/stories`, XP and level update everywhere, and the story fully unlocks (moves out of "قفل‌شده") once its threshold is reached | Extend the loop so a story's own content also surfaces new words to learn (true content-driven discovery, not just counting submissions) | Medium (was High) |
| 12 | Persian literature / poetry for Teens | Not implemented | Model a `literary` story/content type distinct from Kids' short stories; gate it behind the Teens track from #1 | Low (depends on #1) |
| 13 | High-quality translations (Teens) | Not implemented | Content/editorial task once Teens track exists, not an engineering gap per se | Low |

---

## Suggested phasing

1. ~~**Close the loop for one path first.**~~ ✅ **Done.** Both Discover paths now run through a shared `lib/store/` progress engine: XP, computed levels (#9), and story-unlock countdowns (#4) are live and verified across Home/Stories/Profile/Discover.
2. **Wire the remaining XP sources** (#10) — reading a story and learning a fact still award nothing.
3. **Extend Explore (#3)** to point at a *specific* matched story/lesson instead of just advancing the shared unlock queue — needs real content matching, which is more naturally a backend concern.
4. **Add audio (#7)** to Facts and the lesson player — improves accessibility for pre-readers, which the description calls out explicitly.
5. **Add the Kids/Teens track (#1, #12, #13)** last — it's a content/segmentation decision that's easiest to layer on once the underlying lesson/story/fact models already exist and are track-agnostic.

All of the above can continue to be built against the existing `lib/api/*` mock layer and `lib/store/` progress engine (see `lib/api/config.ts` and `lib/store/progress.ts`) — remaining work is mostly new mutation functions in the same shape as `learnForeignWord`/`learnPersianWord` (e.g. `markStoryRead()`, `learnFact()`) that call `applyWordLearned`-style logic, plus real logic behind the still-static `lib/api/*` reads once a backend exists.
