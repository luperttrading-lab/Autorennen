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

Gas ist immer an (`keys.up: true`). Lenken: Finger irgendwo aufsetzen und seitlich schieben (analog, Volleinschlag bei
22 % Bildschirmbreite). Am PC Pfeiltasten.
