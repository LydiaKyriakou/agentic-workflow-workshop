import { SpeakerList } from "@/app/[locale]/speakers/_components/speaker-list";
import { PageHeading } from "@/components/atoms/page-heading";
import type { Speaker } from "@/types/speaker";
import { Flex } from "@chakra-ui/react";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // The locale layout has already rejected unknown locales.
  setRequestLocale(locale as Locale);

  const t = await getTranslations("Speakers");
  // Placeholder until the data is wired in.
  const speakers: Speaker[] = [];

  return (
    <Flex direction="column" gap="8" flex="1" width="full" minWidth="0">
      <PageHeading title={t("title")}>{t("description")}</PageHeading>

      <SpeakerList speakers={speakers} />
    </Flex>
  );
}
