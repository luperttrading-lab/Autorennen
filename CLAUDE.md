# Autorennen

Pseudo-3D-Rennspiel als einzelne Seite (`index.html`, dazu `sw.js`, `manifest.webmanifest`, App-Symbole `apple-touch-icon.png` 180 px und `icon-192/512.png`), ausgeliefert über GitHub Pages aus `main`:
[luperttrading-lab.github.io/Autorennen](https://luperttrading-lab.github.io/Autorennen/) (Groß-/Kleinschreibung im Pfad zählt).

## Ausliefern

- Direkt auf `main` pushen ist erlaubt (Nutzer, 19.11.2026: „du sollst sie selbst hochladen“). Kein Pull Request,
  kein Warten auf einen Merge. Erst im Headless-Browser testen, dann pushen.
- Bei JEDER Änderung an `index.html` die Versionsnummer `APP_VERSION` hochzählen (nur hoch, nie zurück). Die App prüft
  beim Öffnen, beim Zurückholen aus dem Hintergrund und beim Tipp auf die Nummer oben rechts, ob eine neuere Fassung
  online ist. Ohne neue Nummer erkennt sie das Update nicht.
- Pages braucht nach dem Push 1–2 Minuten. Vorher zeigt die App noch die alte Version an; das ist kein Fehler.

## Steuerung

Das Rennen beginnt erst mit dem START-Knopf (gibt zugleich den Ton frei), nach Ablauf der Zeit NOCHMAL-Knopf. Knüppel nach vorn = Gas, zurück = Bremse (analog), ohne Gas rollt das Auto aus; seitlich lenken. Hochformat: Spielbild oben, dunkles Bedienfeld unten (wie bei Passfahrt in
`fragen-allgemein/spiele/passfahrt`). Bedienfeld nur 20 % der Höhe (120–170 px, Nutzer: vorher zu groß). Darin ein runder Knüppel, der dorthin rückt, wo der Daumen aufsetzt, und nur
seitlich lenkt (analog, Volleinschlag nach 22 % Bildschirmbreite Fingerweg), rechts daneben der Turbo-Knopf.
Querformat: Bedienfeld durchsichtig über dem unteren Bildrand, Knüppel links unten. Am PC Pfeiltasten (hoch Gas, runter Bremse), Turbo Shift/Leertaste. Reifenquietschen bei schneller Kurvenfahrt und Vollbremsung.

## Spielablauf

Strecke: Wiese, Wald, Berge (Auffahrt in Kehren, Passhöhe im Schnee mit Schneefall, Abfahrt), Wüste, Nacht; 1250 Segmente. Bergauf weniger Höchsttempo (Steigung 0,15 → 76 %), bergab etwas mehr. Ferne Berge wachsen beim Heranfahren.
Jede Runde ist eine Etappe mit Zieltor (Schachbrett auf Segment 0/1). Grundzeit `STAGE_BASE` 32 s, je Etappe 1 s weniger (min. `STAGE_MIN` 23 s).
Durchs Ziel vor Ablauf: 50 % der Restzeit werden gutgeschrieben (`BONUS_SHARE`), neue Deko, gerade Etappen gespiegelt,
Gegner je Etappe 3 Prozentpunkte schneller. Rekord (geschaffte Etappen) im localStorage. Messung 19.11. (v2.5): fehlerfreie
Runde ≈ 21 s, erste Etappe ≈ 23,5 s (Anfahren).

## Eingefügter HTML-Code aus anderen Chats

Schickt der Nutzer eine komplette HTML-Fassung des Spiels (z. B. aus einem anderen Chat), nicht übernehmen, sondern
mit dem Stand hier vergleichen und **nur das Neue** einbauen (Nutzer, 19.11.2026). Unsere Lenkung bleibt (der Nutzer
findet sie besser), ebenso Tempo in Einheiten pro Sekunde, das mittig stehende Auto, die Gegner-Projektion mit Kurven
und Kuppen und die Update-Prüfung. Danach in der Antwort auflisten: was übernommen, was bewusst nicht und warum.

## Entwürfe

`autos.html`: Vorschauseite mit vier Entwürfen fürs eigene Auto (rotes Cabrio von hinten, A–D). Gewählt: B (ab v2.1 im Spiel). Gleiche Schnittstelle
wie `drawPlayerCar(x, y, w, …)` im Spiel. Nach der Wahl des Nutzers die Funktion ins Spiel übernehmen.

## Konzept (Entwurf, noch nicht umgesetzt)

`konzept.html` (19.11.2026): Tagesreise über eine feste Karte 3 Spalten (Küste leicht, Land mittel, Gebirge schwer)
× 4 Reihen (Morgen bis Nacht), Gabelung per Lenken, 10 Etappen, 17 Routen, 3 Ziele, alles deterministisch,
Checkpoints, Baukasten der Streckenelemente, Umsetzung in 5 Schritten. Offene Entscheidungen des Nutzers stehen in
Abschnitt 10. Abschnitt 3a (Nutzer: Landschaften wechseln zu schnell, Übergänge unsinnig): eine Landschaft je
Etappe, Tageszeit über die ganze Tour, 17 Verbindungsstücke, Klima-Regel. Erst nach seiner Freigabe programmieren,
je Schritt eine frische Sitzung. `toene.html`: Hörproben fürs Reifenquietschen. Nutzer (19.11.): A, B, C alle gut, je nach Untergrund einsetzen; seit v2.7
im Spiel: B Wiese/Wald, C Wüste/Berge, A Nacht; Schotterweg im Wald (knirscht), 6 feste Ölflecken (eigener Rutsch-Klang).
