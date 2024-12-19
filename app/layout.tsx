import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, ColorSchemeScript, Stack } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "../theme";
import { Survey } from "./components/Survey";
import { Footer } from "./components/Footer";
import Script from "next/script";

export const metadata = {
  title: "IHK-Notenrechner",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <Script
          defer
          src={process.env.ANALYTICS_SRC}
          data-website-id={process.env.ANALYTICS_WEBSITE_ID}
        />
      </head>
      <body style={{ backgroundColor: "var(--mantine-color-primary-9)" }}>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
          <Stack justify="space-between" h="100vh">
            <Stack>{children}</Stack>
            <Footer />
          </Stack>
          <Notifications />
          <Survey />
        </MantineProvider>
      </body>
    </html>
  );
}
