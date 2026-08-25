"use client";

/**
 * ---------------------------------------------------------------------------
 * This is the "closes the loop" piece from the Yadegaar gap analysis: it's a
 * client-side stand-in for a backend session. Every screen that needs LIVE
 * progress (Home, Stories, Profile, Discover) reads from here instead of a
 * static fetch, and Discover's mutations (learning a word) update it.
 *
 * The actual progress math lives in lib/store/progress.ts (pure, no React) —
 * this file is just wiring: React state + localStorage persistence + calling
 * the mock API endpoints in lib/api/discover.ts. When a real backend exists,
 * `learnForeignWord`/`learnPersianWord` below should call it directly and
 * use its response instead of running `applyWordLearned` locally — the rest
 * of the app doesn't need to change, since it only depends on this context's
 * shape (types/index.ts), not on how it's filled.
 * ---------------------------------------------------------------------------
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ProgressUpdate, WordSubmissionResult } from "@/types";
import { mockUser } from "@/lib/mock/user";
import { mockStories } from "@/lib/mock/stories";
import { submitForeignWord, submitPersianWord } from "@/lib/api/discover";
import { applyWordLearned, type AppSnapshot } from "@/lib/store/progress";

const STORAGE_KEY = "yadegaar_state_v1";

interface AppStateValue extends AppSnapshot {
  hydrated: boolean;
  learnForeignWord: (
    word: string
  ) => Promise<{ result: WordSubmissionResult; progress: ProgressUpdate | null }>;
  learnPersianWord: (
    word: string
  ) => Promise<{ result: WordSubmissionResult; progress: ProgressUpdate | null }>;
  resetProgress: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

function seedState(): AppSnapshot {
  return { user: mockUser, stories: mockStories };
}

function loadPersisted(): AppSnapshot {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppSnapshot;
  } catch {
    // corrupted/unavailable storage — fall back to the seed
  }
  return seedState();
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppSnapshot>(seedState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadPersisted());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  async function learnForeignWord(word: string) {
    const result = await submitForeignWord(word, "en");
    if (!result.success) return { result, progress: null };
    const { next, update } = applyWordLearned(state, result.xpEarned);
    setState(next);
    return { result, progress: update };
  }

  async function learnPersianWord(word: string) {
    const result = await submitPersianWord(word);
    if (!result.success) return { result, progress: null };
    const { next, update } = applyWordLearned(state, result.xpEarned);
    setState(next);
    return { result, progress: update };
  }

  function resetProgress() {
    setState(seedState());
  }

  return (
    <AppStateContext.Provider
      value={{
        ...state,
        hydrated,
        learnForeignWord,
        learnPersianWord,
        resetProgress,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return ctx;
}
