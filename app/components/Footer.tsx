"use client";

import { Group, Text, ActionIcon, Stack, Anchor } from "@mantine/core";
import { IconHeart, IconBrandGithub, IconBug } from "@tabler/icons-react";

export function Footer() {
  return (
    <Stack justify="center" align="center" py="md" mt="xl">
      <Group gap="xs" justify="center" wrap="nowrap">
        <Text size="sm" c="dimmed">
          made with
        </Text>
        <IconHeart
          size={16}
          style={{ color: "var(--mantine-color-red-6)" }}
          fill="currentColor"
        />
        <Text size="sm" c="dimmed">
          by julian
        </Text>
      </Group>
    </Stack>
  );
}
