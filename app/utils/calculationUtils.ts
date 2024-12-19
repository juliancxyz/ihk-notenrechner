/**
 * Berechnungsregeln für die IHK-Abschlussprüfung Fachinformatiker
 *
 * A. Gewichtung der Prüfungsteile (Gesamt 100%)
 * ----------------------------------------
 * 1. Teil 1 (20%)
 *    - Einrichten eines IT-gestützten Arbeitsplatzes
 *
 * 2. Teil 2 (80%)
 *    2.1 Betriebliche Projektarbeit (50%)
 *        - Dokumentation (25%)
 *        - Präsentation und Fachgespräch (25%)
 *
 *    2.2 Schriftliche Prüfungen (30%)
 *        - Prozesse und Infrastruktur (20%)
 *          • Bereich 3 (10%)
 *          • Bereich 4 (10%)
 *        - Wirtschafts- und Sozialkunde (10%)
 *
 * B. Bestehensregeln
 * ----------------------------------------
 * 1. Gesamtergebnis von Teil 1 und 2 mindestens Note 4 (≥ 50 Punkte)
 * 2. Ergebnis von Teil 2 mindestens Note 4 (≥ 50 Punkte)
 * 3. Mindestens drei Prüfungsbereiche von Teil 2 mit Note 4 (≥ 50 Punkte)
 * 4. Kein Prüfungsbereich von Teil 2 mit Note 6 (< 30 Punkte)
 *
 * C. Ergänzungsprüfungen
 * ----------------------------------------
 * 1. Voraussetzungen
 *    - Note in schriftlicher Prüfung: 30-49 Punkte
 *    - Maximal eine Ergänzungsprüfung möglich
 *
 * 2. Berechnung
 *    - Durchschnitt aus schriftlicher und mündlicher Prüfung
 *    - Nur bestanden wenn Durchschnitt ≥ 50 Punkte
 *    - Bei Nichtbestehen zählt ursprüngliche Note
 *
 * D. Notenschlüssel
 * ----------------------------------------
 * - 92-100 Punkte: Note 1 (sehr gut)
 * - 81-91  Punkte: Note 2 (gut)
 * - 67-80  Punkte: Note 3 (befriedigend)
 * - 50-66  Punkte: Note 4 (ausreichend)
 * - 30-49  Punkte: Note 5 (mangelhaft)
 * - 0-29   Punkte: Note 6 (ungenügend)
 */

/**
 * Berechnet die Gesamtpunktzahl für eine Section
 * @param grades - Array der Bewertungen
 * @param section - Section mit Subsections
 * @returns Berechnete Punktzahl für die Section
 */
export const calculateSectionPoints = (
  grades: { sectionId: string; subsectionId: string; points: number }[],
  section: { id: string; subsections: { id: string; weight: number }[] }
): number => {
  let sectionPoints = 0;
  let sectionWeight = 0;

  section.subsections.forEach((subsection) => {
    const grade = grades.find(
      (g) => g.sectionId === section.id && g.subsectionId === subsection.id
    );
    if (grade) {
      sectionPoints += grade.points * (subsection.weight / 100);
      sectionWeight += subsection.weight / 100;
    }
  });

  return sectionWeight ? Math.round(sectionPoints / sectionWeight) : 0;
};

/**
 * Berechnet die Note basierend auf den Punkten
 * @param points - Erreichte Punktzahl
 * @returns Note als String
 */
export const calculateGrade = (points: number): string => {
  if (points >= 92) return "1";
  if (points >= 81) return "2";
  if (points >= 67) return "3";
  if (points >= 50) return "4";
  if (points >= 30) return "5";
  return "6";
};

/**
 * Prüft ob die Punktzahl zum Bestehen reicht
 * @param points - Erreichte Punktzahl
 * @returns true wenn bestanden
 */
export const isPassing = (points: number): boolean => {
  return points >= 50;
};

/**
 * Berechnet die Gesamtpunktzahl für alle Sections
 * @param grades - Array der Bewertungen
 * @param sections - Array der Sections
 * @returns Gesamtpunktzahl oder null wenn nicht alle Felder ausgefüllt
 */
export const calculateTotalPoints = (
  grades: { sectionId: string; subsectionId: string; points: number }[],
  sections: {
    id: string;
    weight: number;
    subsections: { id: string; weight: number }[];
  }[]
): number | null => {
  let allFieldsFilled = true;
  let totalPoints = 0;
  let totalWeight = 0;

  sections.forEach((section) => {
    let sectionPoints = 0;
    let sectionWeight = 0;

    section.subsections.forEach((subsection) => {
      const grade = grades.find(
        (g) => g.sectionId === section.id && g.subsectionId === subsection.id
      );
      if (!grade) {
        allFieldsFilled = false;
      } else {
        const subsectionPoints = Math.round(
          grade.points * (subsection.weight / 100)
        );
        sectionPoints += subsectionPoints;
        sectionWeight += subsection.weight / 100;
      }
    });

    if (sectionWeight > 0) {
      const sectionAverage = Math.round(sectionPoints / sectionWeight);
      const weightedSectionPoints = Math.round(
        sectionAverage * (section.weight / 100)
      );
      totalPoints += weightedSectionPoints;
      totalWeight += section.weight / 100;
    }
  });

  return allFieldsFilled && totalWeight > 0 ? Math.round(totalPoints) : null;
};

/**
 * Type für die Prüfungsergebnisse
 * Erlaubt sowohl Strings (für Input-Felder) als auch Numbers
 */
export type ExamScores = {
  teil1: string;
  bereich3: string;
  bereich3_ergaenzung: string;
  bereich4: string;
  bereich4_ergaenzung: string;
  wirtschaft: string;
  wirtschaft_ergaenzung: string;
  dokumentation: string;
  praesentation: string;
};

/**
 * Berechnet die gewichtete Gesamtpunktzahl aller Prüfungsbereiche
 * @param scores - Punktzahlen der einzelnen Bereiche
 * @returns Gerundete Gesamtpunktzahl
 */
export const calculateFinalExamScore = (scores: ExamScores): number | null => {
  const {
    teil1,
    bereich3,
    bereich3_ergaenzung,
    bereich4,
    bereich4_ergaenzung,
    wirtschaft,
    wirtschaft_ergaenzung,
    dokumentation,
    praesentation,
  } = scores;

  // Konvertiere Strings zu Zahlen, leere Strings werden zu 0
  const t1 = Number(teil1) || 0;
  const b3 = Number(bereich3) || 0;
  const b3e = Number(bereich3_ergaenzung) || 0;
  const b4 = Number(bereich4) || 0;
  const b4e = Number(bereich4_ergaenzung) || 0;
  const wsk = Number(wirtschaft) || 0;
  const wske = Number(wirtschaft_ergaenzung) || 0;
  const dok = Number(dokumentation) || 0;
  const pres = Number(praesentation) || 0;

  // Berechne die finalen Noten mit Ergänzungsprüfungen
  const finalB3 = b3e ? ((b3 + b3e) / 2 >= 50 ? (b3 + b3e) / 2 : b3) : b3;
  const finalB4 = b4e ? ((b4 + b4e) / 2 >= 50 ? (b4 + b4e) / 2 : b4) : b4;
  const finalWsk = wske
    ? (wsk + wske) / 2 >= 50
      ? (wsk + wske) / 2
      : wsk
    : wsk;

  // Korrigierte Gewichtungen nach IHK-Regeln
  const gewichtung = {
    teil1: 0.2, // 20%
    bereich3: 0.1, // Teil von P&I (20% gesamt)
    bereich4: 0.1, // Teil von P&I (20% gesamt)
    wirtschaft: 0.1, // 10%
    dokumentation: 0.25, // Teil von Projektarbeit (50% gesamt)
    praesentation: 0.25, // Teil von Projektarbeit (50% gesamt)
  };

  const total =
    t1 * gewichtung.teil1 +
    finalB3 * gewichtung.bereich3 +
    finalB4 * gewichtung.bereich4 +
    finalWsk * gewichtung.wirtschaft +
    dok * gewichtung.dokumentation +
    pres * gewichtung.praesentation;

  return Math.round(total);
};

/**
 * Prüft die IHK-Bestehensregeln
 * @param scores - Punktzahlen der einzelnen Bereiche
 * @returns Ergebnis der Prüfung mit Details
 */
export const checkExamPassing = (scores: ExamScores) => {
  const {
    teil1,
    bereich3,
    bereich3_ergaenzung,
    bereich4,
    bereich4_ergaenzung,
    wirtschaft,
    wirtschaft_ergaenzung,
    dokumentation,
    praesentation,
  } = scores;

  // Konvertiere zu Zahlen
  const t1 = Number(teil1) || 0;
  const b3 = Number(bereich3) || 0;
  const b3e = Number(bereich3_ergaenzung) || 0;
  const b4 = Number(bereich4) || 0;
  const b4e = Number(bereich4_ergaenzung) || 0;
  const wsk = Number(wirtschaft) || 0;
  const wske = Number(wirtschaft_ergaenzung) || 0;
  const dok = Number(dokumentation) || 0;
  const pres = Number(praesentation) || 0;

  // Berechne finale Noten mit Ergänzungsprüfungen
  const finalB3 = b3e ? ((b3 + b3e) / 2 >= 50 ? (b3 + b3e) / 2 : b3) : b3;
  const finalB4 = b4e ? ((b4 + b4e) / 2 >= 50 ? (b4 + b4e) / 2 : b4) : b4;
  const finalWsk = wske
    ? (wsk + wske) / 2 >= 50
      ? (wsk + wske) / 2
      : wsk
    : wsk;

  // Gesamtpunktzahl berechnen
  const gesamtpunkte = calculateFinalExamScore(scores) || 0;

  // Teil 2 Punktzahl berechnen (80% der Gesamtprüfung)
  const teil2Punkte =
    finalB3 * 0.1 + // 10% der Gesamtprüfung
    finalB4 * 0.1 + // 10% der Gesamtprüfung
    finalWsk * 0.1 + // 10% der Gesamtprüfung
    dok * 0.25 + // 25% der Gesamtprüfung
    pres * 0.25; // 25% der Gesamtprüfung

  // Prüfe die neuen Bestehensregeln
  const bestanden =
    // 1. Gesamtergebnis mindestens Note 4 (≥ 50 Punkte)
    gesamtpunkte >= 50 &&
    // 2. Teil 2 mindestens Note 4 (≥ 50 Punkte)
    teil2Punkte >= 50 &&
    // 3. Mindestens drei Prüfungsbereiche von Teil 2 mit Note 4 oder besser
    [finalB3, finalB4, finalWsk, dok, pres].filter((note) => note >= 50)
      .length >= 3 &&
    // 4. Kein Prüfungsbereich von Teil 2 mit Note 6 (< 30 Punkte)
    ![finalB3, finalB4, finalWsk, dok, pres].some((note) => note < 30);

  return {
    bestanden,
    gesamtpunkte,
  };
};

/**
 * Ermittelt Note und Bewertung anhand der Punktzahl
 * @param points - Erreichte Punktzahl
 * @returns Note und Bewertungstext
 */
export const getGradeWithRating = (points: number | null) => {
  if (!points) return { grade: "-", rating: "-" };
  if (points >= 92) return { grade: "1", rating: "sehr gut" };
  if (points >= 81) return { grade: "2", rating: "gut" };
  if (points >= 67) return { grade: "3", rating: "befriedigend" };
  if (points >= 50) return { grade: "4", rating: "ausreichend" };
  if (points >= 30) return { grade: "5", rating: "mangelhaft" };
  return { grade: "6", rating: "ungenügend" };
};
