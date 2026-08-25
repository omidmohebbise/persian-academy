import type { Badge, User } from "@/types";
import { mockBadges, mockUser } from "@/lib/mock/user";
import { mockResponse } from "@/lib/api/config";

/**
 * Backend contract: GET /api/v1/me
 * Returns the signed-in learner's profile, XP, streak, goal progress and
 * weekly activity calendar. Used by the home header, the profile page, and
 * anywhere the app needs "the current user".
 */
export async function getCurrentUser(): Promise<User> {
  return mockResponse(mockUser);
}

/**
 * Backend contract: GET /api/v1/me/badges
 * Returns the achievement badges for the current user, achieved and locked.
 */
export async function getUserBadges(): Promise<Badge[]> {
  return mockResponse(mockBadges);
}
