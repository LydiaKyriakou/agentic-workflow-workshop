import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/types/speaker";
import { Link as ChakraLink, Flex, Text } from "@chakra-ui/react";

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle as="h2" fontSize="md">
          {speaker.name}
        </CardTitle>
      </CardHeader>
      <CardContent paddingTop="2">
        {/* Safari drops list semantics under list-style: none. */}
        <Flex
          as="ul"
          role="list"
          direction="column"
          gap="3"
          listStyleType="none"
        >
          {speaker.sessions.map((session) => (
            <li key={session.id}>
              <ChakraLink
                asChild
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap="0.5"
                color="var(--text-primary)"
                textDecoration="none"
                // Underline, not an accent colour: that fails contrast in dark.
                css={{
                  "&:hover [data-title]": { textDecoration: "underline" },
                }}
              >
                <Link href={`/sessions/${session.id}`}>
                  <Text as="span" fontSize="xs" color="var(--text-secondary)">
                    {session.startTime}
                  </Text>
                  {/* Session data is written in English in every locale. */}
                  <Text as="span" fontSize="sm" lang="en" data-title>
                    {session.title}
                  </Text>
                </Link>
              </ChakraLink>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
