import type { Session } from "@/types/session";
import type { Speaker } from "@/types/speaker";

/** The closing panel's `speaker` value: a label for everyone, not a person. */
const NOT_A_SPEAKER = "Full speaker lineup";

/**
 * Groups sessions by speaker. Speakers are sorted by name, and each speaker's
 * sessions by start time.
 */
export function groupSessionsBySpeaker(sessions: Session[]): Speaker[] {
  const bySpeaker = new Map<string, Speaker["sessions"]>();

  for (const { speaker, id, title, startTime } of sessions) {
    if (speaker === NOT_A_SPEAKER) continue;

    const entry = { id, title, startTime };
    bySpeaker.set(speaker, [...(bySpeaker.get(speaker) ?? []), entry]);
  }

  return Array.from(bySpeaker, ([name, speakerSessions]) => ({
    name,
    sessions: speakerSessions.sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  })).sort((a, b) => a.name.localeCompare(b.name));
}
