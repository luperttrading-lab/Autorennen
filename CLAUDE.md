# Autorennen

Pseudo-3D-Rennspiel als einzelne Seite (`index.html`, dazu `sw.js`, `manifest.webmanifest`, App-Symbole `apple-touch-icon.png` 180 px und `icon-192/512.png`), ausgeliefert über GitHub Pages aus `main`:
[luperttrading-lab.github.io/Autorennen](https://luperttrading-lab.github.io/Autorennen/) (Groß-/Kleinschreibung im Pfad zählt).

## Ausliefern

- Direkt auf `main` pushen ist erlaubt (Nutzer, 19.11.2026: „du sollst sie selbst hochladen“). Kein Pull Request,
  kein Warten auf einen Merge. Erst im Headless-Browser testen, dann pushen.
- Bei JEDER Änderung an `index.html` die Versionsnummer `APP_VERSION` hochzählen (nur hoch, nie zurück). Die App prüft
  beim Öffnen, beim Zurückholen aus dem Hintergrund und beim Tipp auf die Nummer oben rechts, ob eine neuere Fassung
  online ist. Ohne neue Nummer erkennt sie das Update nicht.
- Seite füllt den Bildschirm über `body { position: fixed; top/left/right/bottom: 0 }`, NICHT über 100vh/100dvh: in der
  iPhone-Home-Bildschirm-App blieb damit unten ein Streifen frei (Nutzer 19.11., v3.7). Ränder außerhalb des Spiels: oben
  Himmelsfarbe (folgt dem Tageslauf, `setEdgeColor`), unten Farbe des Bedienfelds. Bekannter iOS-26-Fehler (Home-Bildschirm-App mit viewport-fit=cover + black-translucent: Höhe um die Statusleiste zu kurz). Seit v3.10 macht `fitScreen()` das DOKUMENT höher (html + body in Pixeln), ein nur fest positioniertes Element (v3.8/3.9) half auf dem Gerät nicht. Seit v3.11 KEINE automatische Erkennung mehr (griff auf dem Gerät des Nutzers nicht): Knöpfe ▼/▲ rechts oben auf Start-/Endbildschirm verschieben das untere Ende in 10-px-Schritten (`autorennen.tiefpx`, 0–160). Veraltet: Seit v3.8 `fitScreen()`: in der
  Home-Bildschirm-App endet das Layout ≈ 60 pt über dem unteren Rand; body wird um (screen.height − innerHeight)/2 nach
  unten verlängert, Knopf ▲/▼ im Bedienfeld schaltet das ab (`autorennen.tief`). Kleine Diagnosezeile auf dem Startbildschirm.
- Pages braucht nach dem Push 1–2 Minuten. Vorher zeigt die App noch die alte Version an; das ist kein Fehler.

## Kostenzeile

`tools/kosten.py` liegt im Repo (Skill „kostenzeile“): am Ende jeder Antwort ausführen und die Ausgabe wörtlich als letzte Zeile setzen.

## Steuerung

Das Rennen beginnt erst mit dem START-Knopf (gibt zugleich den Ton frei), danach Countdown 3–2–1–LOS mit Piepton (seit v3.2), nach Ablauf der Zeit NOCHMAL-Knopf. Knüppel nach vorn = Gas, zurück = Bremse (analog), ohne Gas rollt das Auto aus; seitlich lenken. Hochformat: Spielbild oben, dunkles Bedienfeld unten (wie bei Passfahrt in
`fragen-allgemein/spiele/passfahrt`). Bedienfeld seit v3.6 flach (108 px + Safe-Area, „Variante A“, Nutzer 19.11.). Darin ein runder Knüppel (100 px), der FEST am linken Rand ganz unten steht:
Fingerlage relativ zur Knüppelmitte zählt, links/rechts lenkt (analog, Volleinschlag nach 50 px), oberhalb Gas, unterhalb Bremse (voll nach 30 px);
Knopf ⇄ unten in der Mitte tauscht Knüppel und Turbo (`autorennen.tausch`); rechts daneben der Turbo-Knopf.
Querformat: Bedienfeld durchsichtig über dem unteren Bildrand, Knüppel links unten. Am PC Pfeiltasten (hoch Gas, runter Bremse), Turbo Shift/Leertaste. Reifenquietschen nur bei krassem Lenken (Knüppel > 60 %) und hohem Tempo (> 80 %) sowie bei Vollbremsung (Nutzer 19.11., v3.2).

## Spielablauf (seit v3.0: Konzept Schritt 1)

Fahrt über eine feste Karte 3 Spalten (Küste leicht, Land mittel, Gebirge schwer) × 5 Reihen (Morgen bis Nacht):
13 Etappen (`STAGES`), 41 Routen, 3 Ziele (Hafenstadt, Oase, Sternwarte). Jede Etappe: 4 000 Segmente (`STAGE_SEGS`),
fehlerfrei ≈ 66–69 s (Bot), Fahrt ≈ 5,6 min, 27,8 km. Strecke je Etappe fest aus Zufallskeim des Namens (`genBody`).
Aufbau einer Etappe: Astende der vorigen Gabel (160) → Verbindungsstück (900, Landschaften per Klima-Regel `CLIMATE`
segmentweise gemischt) → Hauptteil → Schilderbrücken (300) → Gabel (120) → Gabeltor je Ast. Die Strecke ist ein Array,
das am Gabeltor vorn abgeschnitten wird (`commitFork`, `rebase`); die gewählte Fahrbahn wird zur Mitte.
Zeit: 2 Checkpoints (1/3, 2/3) + Tor; jedes Tor schreibt die Zeit fürs nächste Drittel gut = Bot-Zeit × 1,30/1,20/1,12
(Küste/Land/Gebirge, `calibrate`, läuft beim Laden der Etappe), von der Restzeit geht nur die Hälfte mit (`BONUS_SHARE`).
Game Over = von vorn. Karte (`mapSVG`, `MAP_POS`) als Landkarte in Fahrtrichtung: Start unten, Ziele oben, Meer links, Gebirge rechts; kleine Namensschilder, Schwierigkeit nur je Spalte am unteren Rand (v3.4). Tageslauf über die ganze Fahrt (`TOD`): Lichtfarbe per `source-atop`, Himmel per `destination-over`.
Sammlung im localStorage `autorennen.sammlung` (Routen mit Bestzeit, Ziele). Versteckter Trainingsmodus: Versionsnummer
auf dem Startbildschirm 2 s halten → RENNEN/TRAINING (`autorennen.modus`); Training: Etappe auf der Karte antippen,
kein Game Over, keine Rekorde, Tipp auf die Leiste oben = zurück zur Karte. Landschaften (`LANDS`) bisher nur aus den
alten Bausteinen gefärbt (Wiese, Wald, Schnee, Wüste, Stadt-Laternen, Schotter in Voralpen, Öl); Brücken, Tunnel,
Meer, Vulkan- und Stadtelemente folgen ab Schritt 2.

## Eingefügter HTML-Code aus anderen Chats

Schickt der Nutzer eine komplette HTML-Fassung des Spiels (z. B. aus einem anderen Chat), nicht übernehmen, sondern
mit dem Stand hier vergleichen und **nur das Neue** einbauen (Nutzer, 19.11.2026). Unsere Lenkung bleibt (der Nutzer
findet sie besser), ebenso Tempo in Einheiten pro Sekunde, das mittig stehende Auto, die Gegner-Projektion mit Kurven
und Kuppen und die Update-Prüfung. Danach in der Antwort auflisten: was übernommen, was bewusst nicht und warum.

## Entwürfe

`autos.html`: Vorschauseite mit vier Entwürfen fürs eigene Auto (rotes Cabrio von hinten, A–D). Gewählt: B (ab v2.1 im Spiel). Gleiche Schnittstelle
wie `drawPlayerCar(x, y, w, …)` im Spiel. Nach der Wahl des Nutzers die Funktion ins Spiel übernehmen.

## Konzept (Schritt 1 umgesetzt in v3.0, Schritte 2–5 offen)

`konzept.html` (19.11.2026): Tagesreise über eine feste Karte 3 Spalten (Küste leicht, Land mittel, Gebirge schwer)
× 4 Reihen (Morgen bis Nacht), Gabelung per Lenken, 10 Etappen, 17 Routen, 3 Ziele, alles deterministisch,
Checkpoints, Baukasten der Streckenelemente, Umsetzung in 5 Schritten. Entscheidungen des Nutzers (19.11.) in Abschnitt 0: Gabelung per Lenken mit großen
Schildern, an jedem Tor nur halbe Restzeit, Game Over = von vorn, versteckter Trainingsmodus (Versionsnummer auf dem
Startbildschirm 2 s halten → RENNEN/TRAINING, Etappe frei wählbar, kein Game Over, keine Rekorde), Tageslauf ja,
maximale Abwechslung inkl. Vulkan und Stadt. Gewählt: 5 Etappen pro Fahrt (Abschnitt 2a: 13 Etappen, 41 Routen). Abschnitt 3a (Nutzer: Landschaften wechseln zu schnell, Übergänge unsinnig): eine Landschaft je
Etappe, Tageszeit über die ganze Tour, 17 Verbindungsstücke, Klima-Regel. Erst nach seiner Freigabe programmieren,
je Schritt eine frische Sitzung. `toene.html`: Hörproben fürs Reifenquietschen. Nutzer (19.11.): A, B, C alle gut, je nach Untergrund einsetzen; seit v2.7
im Spiel: B Wiese/Wald, C Wüste/Berge, A Nacht; Schotterweg im Wald (knirscht), 6 feste Ölflecken (eigener Rutsch-Klang).
Seit v3.9 ist Klang B im Spiel ein tonaler Quietschton (zwei Sägezähne um 950 Hz, Tonhöhe steigt mit dem Rutschen); das Rubbeln aus der Hörprobe B klang im Spiel wie Scheppern (Nutzer 19.11.).
