import { createTranslator, type Locale } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import en from "@/messages/en.json";
import es from "@/messages/es.json";

import { generateMetadata } from "./page";

// The real one needs the server request context. The translator behind it is
// the same, fed with the real messages, so a missing key still shows up.
vi.mock("next-intl/server", () => ({
  getTranslations: async ({
    locale,
    namespace,
  }: {
    locale: Locale;
    namespace: "Speakers" | "Nav";
  }) =>
    createTranslator({
      locale,
      messages: locale === "es" ? es : en,
      namespace,
    }),
  setRequestLocale: vi.fn(),
}));

describe("Speakers page metadata", () => {
  it.each([
    ["en", "Speakers | React Alicante Companion", en.Speakers.description],
    ["es", "Ponentes | React Alicante Companion", es.Speakers.description],
  ])(
    "has a title and description in %s",
    async (locale, title, description) => {
      await expect(
        generateMetadata({ params: Promise.resolve({ locale }) }),
      ).resolves.toEqual({ title, description });
    },
  );
});
