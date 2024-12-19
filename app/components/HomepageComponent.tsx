"use client";

import {
  Card,
  TextInput,
  Stack,
  Title,
  Divider,
  Group,
  Text,
  Container,
  Button,
  Switch,
  Popover,
  ActionIcon,
  List,
} from "@mantine/core";
import { useState } from "react";
import {
  calculateFinalExamScore,
  checkExamPassing,
  getGradeWithRating,
  type ExamScores,
} from "../utils/calculationUtils";
import { IconInfoCircle } from "@tabler/icons-react";

export default function HomePageComponent() {
  const [scores, setScores] = useState<ExamScores>({
    teil1: "",
    bereich3: "",
    bereich3_ergaenzung: "",
    bereich4: "",
    bereich4_ergaenzung: "",
    wirtschaft: "",
    wirtschaft_ergaenzung: "",
    dokumentation: "",
    praesentation: "",
  });

  const [showErgaenzung, setShowErgaenzung] = useState({
    bereich3: false,
    bereich4: false,
    wirtschaft: false,
  });

  const result = getGradeWithRating(calculateFinalExamScore(scores));
  const passingResult = checkExamPassing(scores);

  const handleInputChange = (field: keyof ExamScores) => (value: string) => {
    setScores((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const canTakeErgaenzung = (field: keyof typeof showErgaenzung) => {
    const score = Number(scores[field]);
    if (score >= 50 || score === 0) return false;

    const otherErgaenzungen = Object.entries(showErgaenzung).filter(
      ([key]) => key !== field
    );
    if (otherErgaenzungen.some(([_, value]) => value)) return false;

    return true;
  };

  const toggleErgaenzung = (field: keyof typeof showErgaenzung) => {
    setShowErgaenzung((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

    if (showErgaenzung[field]) {
      setScores((prev) => ({
        ...prev,
        [`${field}_ergaenzung`]: "",
      }));
    }
  };

  const berechnungsregeln = (
    <Stack gap="xs">
      <Text fw={700} size="sm">
        Gewichtung der Prüfungsteile
      </Text>
      <List size="xs" spacing="xs">
        <List.Item>Teil 1: 20%</List.Item>
        <List.Item>
          Teil 2 - Schriftlich: 30%
          <List withPadding size="xs" spacing={4}>
            <List.Item>Prüfungsbereich 3: 10%</List.Item>
            <List.Item>Prüfungsbereich 4: 10%</List.Item>
            <List.Item>Wirtschafts- & Sozialkunde: 10%</List.Item>
          </List>
        </List.Item>
        <List.Item>
          Teil 2 - Projektarbeit: 50%
          <List withPadding size="xs" spacing={4}>
            <List.Item>Dokumentation: 25%</List.Item>
            <List.Item>Präsentation/Fachgespräch: 25%</List.Item>
          </List>
        </List.Item>
      </List>

      <Text fw={700} size="sm" mt="xs">
        Bestehensregeln
      </Text>
      <List size="xs" spacing="xs">
        <List.Item>Gesamtergebnis mindestens Note 4 (≥ 50 Punkte)</List.Item>
        <List.Item>Teil 2 mindestens Note 4 (≥ 50 Punkte)</List.Item>
        <List.Item>
          Mindestens drei Prüfungsbereiche von Teil 2 mit Note 4 (≥ 50 Punkte)
        </List.Item>
        <List.Item>
          Kein Prüfungsbereich von Teil 2 mit Note 6 (≤ 30 Punkte)
        </List.Item>
      </List>

      <Text fw={700} size="sm" mt="xs">
        Ergänzungsprüfung
      </Text>
      <List size="xs" spacing="xs">
        <List.Item>Möglich bei 30-49 Punkten</List.Item>
        <List.Item>Max. eine Ergänzungsprüfung</List.Item>
        <List.Item>Durchschnitt muss mind. 50 Punkte ergeben</List.Item>
      </List>
    </Stack>
  );

  return (
    <Stack gap={0}>
      <Container size="lg">
        <Stack gap="xl" py="xl">
          <Group align="center" w="100%" justify="center">
            <Stack gap={4} ta="center">
              <Group justify="center" gap={8}>
                <Title c="white">Notenrechner</Title>
                <Popover width={350} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <ActionIcon
                      variant="subtle"
                      size="sm"
                      aria-label="Berechnungsregeln anzeigen"
                    >
                      <IconInfoCircle />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown bg="dark.7">
                    {berechnungsregeln}
                  </Popover.Dropdown>
                </Popover>
              </Group>
              <Text c="blue.4">
                Ermittle das Ergebnis Deiner Abschlussprüfung.
              </Text>
            </Stack>
          </Group>

          <Card shadow="sm" p="xl" radius="md" bg="dark.8" withBorder>
            <Stack gap="xl">
              <Group justify="space-between" align="flex-start">
                {/* TEIL 1 bleibt unverändert */}
                <Stack w={250}>
                  <Divider
                    label={<Text c="blue.4">TEIL 1</Text>}
                    labelPosition="center"
                    size="sm"
                  />
                  <Stack gap="lg">
                    <Group align="center" wrap="nowrap">
                      <Text size="sm" c="white" style={{ flex: 1 }}>
                        Einrichten eines IT-gestützten Arbeitsplatzes
                      </Text>
                      <Group gap={4}>
                        <TextInput
                          w={70}
                          size="sm"
                          placeholder="50"
                          type="number"
                          value={scores.teil1}
                          onChange={(e) =>
                            handleInputChange("teil1")(e.target.value)
                          }
                        />
                        <Text c="dimmed">%</Text>
                      </Group>
                    </Group>
                  </Stack>
                </Stack>

                {/* TEIL 2 - mit Ergänzungsprüfungen */}
                <Stack w={300}>
                  <Divider
                    label={<Text c="blue.4">TEIL 2 - SCHRIFTLICH</Text>}
                    labelPosition="center"
                    size="sm"
                  />
                  <Stack gap="lg">
                    <Stack gap="xs">
                      <Group align="center" wrap="nowrap">
                        <Text size="sm" c="white" style={{ flex: 1 }}>
                          Prüfungsbereich 3
                        </Text>
                        <Group gap={4}>
                          <TextInput
                            w={70}
                            size="sm"
                            placeholder="50"
                            type="number"
                            value={scores.bereich3}
                            onChange={(e) =>
                              handleInputChange("bereich3")(e.target.value)
                            }
                            max={100}
                          />
                          <Text c="dimmed">%</Text>
                        </Group>
                      </Group>
                      <Group justify="space-between">
                        <Switch
                          label="Ergänzungsprüfung"
                          size="xs"
                          checked={showErgaenzung.bereich3}
                          onChange={() => toggleErgaenzung("bereich3")}
                          disabled={
                            !canTakeErgaenzung("bereich3") &&
                            !showErgaenzung.bereich3
                          }
                        />
                        {showErgaenzung.bereich3 && (
                          <Group gap={4}>
                            <TextInput
                              w={70}
                              size="sm"
                              placeholder="50"
                              type="number"
                              value={scores.bereich3_ergaenzung}
                              onChange={(e) =>
                                handleInputChange("bereich3_ergaenzung")(
                                  e.target.value
                                )
                              }
                              max={100}
                            />
                            <Text c="dimmed">%</Text>
                          </Group>
                        )}
                      </Group>
                    </Stack>

                    <Stack gap="xs">
                      <Group align="center" wrap="nowrap">
                        <Text size="sm" c="white" style={{ flex: 1 }}>
                          Prüfungsbereich 4
                        </Text>
                        <Group gap={4}>
                          <TextInput
                            w={70}
                            size="sm"
                            placeholder="50"
                            type="number"
                            value={scores.bereich4}
                            onChange={(e) =>
                              handleInputChange("bereich4")(e.target.value)
                            }
                            max={100}
                          />
                          <Text c="dimmed">%</Text>
                        </Group>
                      </Group>
                      <Group justify="space-between">
                        <Switch
                          label="Ergänzungsprüfung"
                          size="xs"
                          checked={showErgaenzung.bereich4}
                          onChange={() => toggleErgaenzung("bereich4")}
                          disabled={
                            !canTakeErgaenzung("bereich4") &&
                            !showErgaenzung.bereich4
                          }
                        />
                        {showErgaenzung.bereich4 && (
                          <Group gap={4}>
                            <TextInput
                              w={70}
                              size="sm"
                              placeholder="50"
                              type="number"
                              value={scores.bereich4_ergaenzung}
                              onChange={(e) =>
                                handleInputChange("bereich4_ergaenzung")(
                                  e.target.value
                                )
                              }
                              max={100}
                            />
                            <Text c="dimmed">%</Text>
                          </Group>
                        )}
                      </Group>
                    </Stack>

                    <Stack gap="xs">
                      <Group align="center" wrap="nowrap">
                        <Text size="sm" c="white" style={{ flex: 1 }}>
                          Wirtschafts- und Sozialkunde
                        </Text>
                        <Group gap={4}>
                          <TextInput
                            w={70}
                            size="sm"
                            placeholder="50"
                            type="number"
                            value={scores.wirtschaft}
                            onChange={(e) =>
                              handleInputChange("wirtschaft")(e.target.value)
                            }
                            max={100}
                          />
                          <Text c="dimmed">%</Text>
                        </Group>
                      </Group>
                      <Group justify="space-between">
                        <Switch
                          label="Ergänzungsprüfung"
                          size="xs"
                          checked={showErgaenzung.wirtschaft}
                          onChange={() => toggleErgaenzung("wirtschaft")}
                          disabled={
                            !canTakeErgaenzung("wirtschaft") &&
                            !showErgaenzung.wirtschaft
                          }
                        />
                        {showErgaenzung.wirtschaft && (
                          <Group gap={4}>
                            <TextInput
                              w={70}
                              size="sm"
                              placeholder="50"
                              type="number"
                              value={scores.wirtschaft_ergaenzung}
                              onChange={(e) =>
                                handleInputChange("wirtschaft_ergaenzung")(
                                  e.target.value
                                )
                              }
                              max={100}
                            />
                            <Text c="dimmed">%</Text>
                          </Group>
                        )}
                      </Group>
                    </Stack>
                  </Stack>
                </Stack>

                {/* TEIL 2 - PROJEKT bleibt unverändert */}
                <Stack w={250}>
                  <Divider
                    label={<Text c="blue.4">TEIL 2 - PROJEKT</Text>}
                    labelPosition="center"
                    size="sm"
                  />
                  <Stack gap="lg">
                    <Group align="center" wrap="nowrap">
                      <Text size="sm" c="white" style={{ flex: 1 }}>
                        Dokumentation
                      </Text>
                      <Group gap={4}>
                        <TextInput
                          w={70}
                          size="sm"
                          placeholder="50"
                          type="number"
                          value={scores.dokumentation}
                          onChange={(e) =>
                            handleInputChange("dokumentation")(e.target.value)
                          }
                          max={100}
                        />
                        <Text c="dimmed">%</Text>
                      </Group>
                    </Group>

                    <Group align="center" wrap="nowrap">
                      <Text size="sm" c="white" style={{ flex: 1 }}>
                        Präsentation und Fachgespräch
                      </Text>
                      <Group gap={4}>
                        <TextInput
                          w={70}
                          size="sm"
                          placeholder="50"
                          type="number"
                          value={scores.praesentation}
                          onChange={(e) =>
                            handleInputChange("praesentation")(e.target.value)
                          }
                          max={100}
                        />
                        <Text c="dimmed">%</Text>
                      </Group>
                    </Group>
                  </Stack>
                </Stack>
              </Group>

              <Divider
                label={<Text c="blue.4">ERGEBNIS</Text>}
                labelPosition="center"
                size="sm"
              />

              <Button
                variant={passingResult.bestanden ? "gradient" : "filled"}
                gradient={{ from: "teal", to: "lime", deg: 90 }}
                color={passingResult.bestanden ? undefined : "red"}
                size="lg"
                fw={500}
              >
                {passingResult.bestanden
                  ? `Bestanden mit ${Math.round(
                      passingResult.gesamtpunkte
                    )} Punkten (Note ${result.grade}) 🎉`
                  : "Nicht bestanden 😔"}
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Stack>
  );
}
