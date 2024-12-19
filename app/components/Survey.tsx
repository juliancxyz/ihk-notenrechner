"use client";

import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  rem,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocalStorage } from "@mantine/hooks";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconX,
  IconUser,
  IconUsers,
  IconCheck,
  IconSchool,
  IconCertificate,
  IconQuestionMark,
} from "@tabler/icons-react";
import { useState } from "react";

export function Survey() {
  const [opened, { close }] = useDisclosure(true);
  const [hasAnswered, setHasAnswered] = useLocalStorage({
    key: "survey-answered",
    defaultValue: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  if (hasAnswered) return null;

  const handleAnswer = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setHasAnswered(true);
      close();
    }, 1500);
  };

  const surveyOptions = [
    { label: "Schüler/Azubi", icon: IconUsers, event: "survey-schueler/azubi" },
    { label: "Lehrer", icon: IconUser, event: "survey-lehrer" },
    { label: "IHK-Prüfer", icon: IconCertificate, event: "survey-ihk-pruefer" },
    { label: "Ausbilder", icon: IconSchool, event: "survey-ausbilder" },
    { label: "Sonstiges", icon: IconQuestionMark, event: "survey-sonstiges" },
  ];

  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{
            position: "fixed",
            bottom: rem(20),
            right: rem(20),
            zIndex: 1000,
          }}
        >
          <Card
            shadow="lg"
            padding="lg"
            radius="md"
            withBorder
            bg="dark.8"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            w={rem(400)}
          >
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Stack align="center" gap="md" py={rem(8)}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <IconCheck
                        size={40}
                        stroke={1.5}
                        style={{ color: "var(--mantine-color-teal-5)" }}
                      />
                    </motion.div>
                    <Text size="sm" ta="center">
                      Danke für deine Antwort!
                    </Text>
                  </Stack>
                </motion.div>
              ) : (
                <motion.div
                  key="survey"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Stack gap="md">
                    <Group justify="space-between" align="center">
                      <Text fw={600} size="sm">
                        👋 Hilf uns, die Seite zu verbessern!
                      </Text>
                      <Button
                        variant="subtle"
                        color="gray"
                        size="compact-sm"
                        onClick={close}
                        style={{ padding: rem(4) }}
                        radius="xl"
                      >
                        <IconX size={16} stroke={1.5} />
                      </Button>
                    </Group>
                    <Text size="sm" c="dimmed">
                      In welcher Rolle nutzt du die Seite?
                    </Text>
                    <SimpleGrid cols={2} spacing="xs">
                      {surveyOptions.map((option) => (
                        <Button
                          key={option.event}
                          variant="light"
                          size="sm"
                          onClick={handleAnswer}
                          leftSection={<option.icon size={16} stroke={1.5} />}
                          fullWidth
                          radius="md"
                          data-umami-event={option.event}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </SimpleGrid>
                    <Text size="xs" c="dimmed" ta="center">
                      Deine Antwort hilft uns, die Inhalte besser anzupassen.
                    </Text>
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
