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
  title: "IHK-Notenrechner | Fachinformatiker Abschlussprüfung",
  description:
    "Kostenloser IHK-Notenrechner für die Fachinformatiker Abschlussprüfung. Berechne deine Note mit Ergänzungsprüfungen nach aktuellen IHK-Richtlinien.",
  keywords: [
    "IHK Notenrechner",
    "Fachinformatiker",
    "Abschlussprüfung",
    "IHK Prüfung",
    "Fachinformatiker Note",
    "IHK Ergänzungsprüfung",
    "Prüfungsvorbereitung IT",
    "Ausbildung IT",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://rechner.julianc.xyz",
    title: "IHK-Notenrechner für Fachinformatiker",
    description:
      "Berechne deine Abschlussnote für die Fachinformatiker-Prüfung",
    siteName: "IHK-Notenrechner",
  },
  twitter: {
    card: "summary_large_image",
    title: "IHK-Notenrechner für Fachinformatiker",
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
        <ColorSchemeScript defaultColorScheme="auto" />
        {process.env.NODE_ENV === "production" && (
          <Script
            defer
            src={process.env.ANALYTICS_SRC}
            data-website-id={process.env.ANALYTICS_WEBSITE_ID}
          />
        )}
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
