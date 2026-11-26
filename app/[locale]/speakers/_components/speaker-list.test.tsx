import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";

import { SpeakerList } from "./speaker-list";

describe("SpeakerList", () => {
  it("renders one card per speaker, in the order given", () => {
    render(
      <SpeakerList
        speakers={[
          { name: "Ana", sessions: [] },
          { name: "Zoe", sessions: [] },
        ]}
      />,
    );

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["Ana", "Zoe"]);
    expect(
      screen.queryByText("No speakers announced yet."),
    ).not.toBeInTheDocument();
  });

  it("says so when there are no speakers", () => {
    render(<SpeakerList speakers={[]} />);

    expect(screen.getByText("No speakers announced yet.")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
