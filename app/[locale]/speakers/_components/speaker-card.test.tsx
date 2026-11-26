import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";

import { SpeakerCard } from "./speaker-card";

describe("SpeakerCard", () => {
  it("shows the speaker and links each session with its start time", () => {
    render(
      <SpeakerCard
        speaker={{
          name: "Ana",
          sessions: [
            { id: "first-talk", title: "First talk", startTime: "09:00" },
            { id: "second-talk", title: "Second talk", startTime: "11:00" },
          ],
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Ana" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /09:00\s*First talk/ }),
    ).toHaveAttribute("href", "/en/sessions/first-talk");
    expect(
      screen.getByRole("link", { name: /11:00\s*Second talk/ }),
    ).toHaveAttribute("href", "/en/sessions/second-talk");
  });
});
