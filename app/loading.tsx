import { Container, Skeleton, Stack } from "@mantine/core";

export default function Loading() {
  return (
    <Container size="xl" py="xl">
      {/* Header Skeleton */}
      <Stack gap="xl" align="center" mb="xl">
        <Skeleton height={40} width={300} radius="md" />
        <Skeleton height={20} width={400} radius="md" />
      </Stack>

      {/* Main Card Skeleton */}
      <Skeleton height={600} radius="md" animate w={1200} miw={800} mx="auto">
        <Stack p="xl" gap="lg">
          {/* Top Controls */}
          <Stack gap="md">
            <Skeleton height={36} width={250} radius="sm" />
            <Skeleton height={24} width="100%" radius="sm" />
          </Stack>

          {/* Content Sections */}
          <Stack gap="md">
            {[...Array(3)].map((_, i) => (
              <Stack key={i} gap="sm">
                <Skeleton height={50} radius="sm" />
                <Stack gap="xs" pl="md">
                  {[...Array(2)].map((_, j) => (
                    <Skeleton
                      key={j}
                      height={40}
                      width="95%"
                      radius="sm"
                      ml="auto"
                    />
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>

          {/* Bottom Stats */}
          <Stack gap="md" mt="xl">
            <Skeleton height={60} radius="sm" />
            <Skeleton height={40} width="60%" radius="sm" mx="auto" />
          </Stack>
        </Stack>
      </Skeleton>
    </Container>
  );
}
