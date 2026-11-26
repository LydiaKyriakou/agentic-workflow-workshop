import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./speakers";

function session(id: string, speaker: string, startTime: string): Session {
  return {
    id,
    title: `Title of ${id}`,
    speaker,
    startTime,
    track: "React",
    room: "Main Hall",
    durationMinutes: 45,
    description: "",
  };
}

describe("groupSessionsBySpeaker", () => {
  it("sorts speakers by name", () => {
    const speakers = groupSessionsBySpeaker([
      session("a", "Zoe", "09:00"),
      session("b", "Ana", "10:00"),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual(["Ana", "Zoe"]);
  });

  it("collects a speaker's sessions into one entry, by start time", () => {
    const speakers = groupSessionsBySpeaker([
      session("later", "Ana", "11:00"),
      session("earlier", "Ana", "09:00"),
    ]);

    expect(speakers).toEqual([
      {
        name: "Ana",
        sessions: [
          { id: "earlier", title: "Title of earlier", startTime: "09:00" },
          { id: "later", title: "Title of later", startTime: "11:00" },
        ],
      },
    ]);
  });

  it("leaves out the closing panel's full speaker lineup", () => {
    const speakers = groupSessionsBySpeaker([
      session("closing-panel", "Full speaker lineup", "16:30"),
      session("talk", "Ana", "09:00"),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual(["Ana"]);
  });

  it("returns no speakers when there are no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
