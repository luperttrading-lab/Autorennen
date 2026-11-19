# Autorennen

Pseudo-3D-Rennspiel als einzelne Seite (`index.html`, dazu `sw.js`), ausgeliefert über GitHub Pages aus `main`:
[luperttrading-lab.github.io/Autorennen](https://luperttrading-lab.github.io/Autorennen/) (Groß-/Kleinschreibung im Pfad zählt).

## Ausliefern

- Direkt auf `main` pushen ist erlaubt (Nutzer, 19.11.2026: „du sollst sie selbst hochladen“). Kein Pull Request,
  kein Warten auf einen Merge. Erst im Headless-Browser testen, dann pushen.
- Bei JEDER Änderung an `index.html` die Versionsnummer `APP_VERSION` hochzählen (nur hoch, nie zurück). Die App prüft
  beim Öffnen, beim Zurückholen aus dem Hintergrund und beim Tipp auf die Nummer oben rechts, ob eine neuere Fassung
  online ist. Ohne neue Nummer erkennt sie das Update nicht.
- Pages braucht nach dem Push 1–2 Minuten. Vorher zeigt die App noch die alte Version an; das ist kein Fehler.

## Steuerung

Das Rennen beginnt erst mit dem START-Knopf (gibt zugleich den Ton frei), nach Ablauf der Zeit NOCHMAL-Knopf. Danach ist Gas immer an (`keys.up: true`). Hochformat: Spielbild oben, dunkles Bedienfeld unten (wie bei Passfahrt in
`fragen-allgemein/spiele/passfahrt`). Bedienfeld nur 20 % der Höhe (120–170 px, Nutzer: vorher zu groß). Darin ein runder Knüppel, der dorthin rückt, wo der Daumen aufsetzt, und nur
seitlich lenkt (analog, Volleinschlag nach 22 % Bildschirmbreite Fingerweg), rechts daneben der Turbo-Knopf.
Querformat: Bedienfeld durchsichtig über dem unteren Bildrand, Knüppel links unten. Am PC Pfeiltasten, Turbo Shift/Leertaste.

## Eingefügter HTML-Code aus anderen Chats

Schickt der Nutzer eine komplette HTML-Fassung des Spiels (z. B. aus einem anderen Chat), nicht übernehmen, sondern
mit dem Stand hier vergleichen und **nur das Neue** einbauen (Nutzer, 19.11.2026). Unsere Lenkung bleibt (der Nutzer
findet sie besser), ebenso Tempo in Einheiten pro Sekunde, das mittig stehende Auto, die Gegner-Projektion mit Kurven
und Kuppen und die Update-Prüfung. Danach in der Antwort auflisten: was übernommen, was bewusst nicht und warum.

## Entwürfe

`autos.html`: Vorschauseite mit vier Entwürfen fürs eigene Auto (rotes Cabrio von hinten, A–D). Gewählt: B (ab v2.1 im Spiel). Gleiche Schnittstelle
wie `drawPlayerCar(x, y, w, …)` im Spiel. Nach der Wahl des Nutzers die Funktion ins Spiel übernehmen.
