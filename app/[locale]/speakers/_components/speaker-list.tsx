import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import type { Speaker } from "@/types/speaker";
import { Grid, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export function SpeakerList({ speakers }: { speakers: Speaker[] }) {
  const t = useTranslations("Speakers");

  if (speakers.length === 0) {
    return <Text color="var(--text-secondary)">{t("empty")}</Text>;
  }

  return (
    <Grid
      as="ul"
      role="list"
      gap="4"
      templateColumns={{
        base: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      listStyleType="none"
    >
      {speakers.map((speaker) => (
        <li key={speaker.name}>
          <SpeakerCard speaker={speaker} />
        </li>
      ))}
    </Grid>
  );
}
