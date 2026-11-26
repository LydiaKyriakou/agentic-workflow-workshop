import { SpeakerList } from "@/app/[locale]/speakers/_components/speaker-list";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/speakers";
import { Flex } from "@chakra-ui/react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "Speakers" });
  const nav = await getTranslations({ locale, namespace: "Nav" });

  return {
    title: `${t("title")} | ${nav("home")}`,
    description: t("description"),
  };
}

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // The locale layout has already rejected unknown locales.
  setRequestLocale(locale as Locale);

  const t = await getTranslations("Speakers");
  const speakers = groupSessionsBySpeaker(await fetchSessions());

  return (
    <Flex direction="column" gap="8" flex="1" width="full" minWidth="0">
      <PageHeading title={t("title")}>{t("description")}</PageHeading>

      <SpeakerList speakers={speakers} />
    </Flex>
  );
}
