import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, ColorSchemeScript, Stack } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "../theme";
import { Survey } from "./components/Survey";
import { Footer } from "./components/Footer";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fachinformatiker-Prüfungsrechner | IHK-Abschlussprüfung",
  description:
    "Kostenloser Fachinformatiker-Prüfungsrechner für die IHK-Abschlussprüfung. Berechne deine Note mit Ergänzungsprüfungen nach aktuellen IHK-Richtlinien.",
  keywords: [
    "IHK Notenrechner",
    "Fachinformatiker",
    "Abschlussprüfung",
    "IHK Prüfung",
    "Fachinformatiker Note",
    "IHK Ergänzungsprüfung",
    "Prüfungsvorbereitung IT",
    "Ausbildung IT",
    "Prüfungsrechner",
    "IT-Abschlussprüfung",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://rechner.julianc.xyz",
    title: "Fachinformatiker-Prüfungsrechner | IHK-Abschlussprüfung",
    description:
      "Berechne deine Abschlussnote für die Fachinformatiker-Prüfung",
    siteName: "Fachinformatiker-Prüfungsrechner",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fachinformatiker-Prüfungsrechner | IHK-Abschlussprüfung",
    description:
      "Berechne deine Abschlussnote für die Fachinformatiker-Prüfung",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        {process.env.NODE_ENV === "production" && (
          <Script
            defer
            src={process.env.ANALYTICS_SRC}
            data-website-id={process.env.ANALYTICS_WEBSITE_ID}
          />
        )}
      </head>
      <body style={{ backgroundColor: "var(--mantine-color-primary-9)" }}>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
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
