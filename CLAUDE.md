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
  Himmelsfarbe (folgt dem Tageslauf, `setEdgeColor`), unten Farbe des Bedienfelds. Bekannter iOS-26-Fehler (Home-Bildschirm-App mit viewport-fit=cover + black-translucent: Höhe um die Statusleiste zu kurz). Seit v3.10 macht `fitScreen()` das DOKUMENT höher (html + body in Pixeln), ein nur fest positioniertes Element (v3.8/3.9) half auf dem Gerät nicht. Seit v3.11 KEINE automatische Erkennung mehr (griff auf dem Gerät des Nutzers nicht): Knöpfe ▼/▲ rechts oben auf Start-/Endbildschirm verschieben das untere Ende in 10-px-Schritten (`autorennen.tiefpx`, 0–160, Standard 0; seit v3.13 im Einstellmodus der Knöpfe). Veraltet: Seit v3.8 `fitScreen()`: in der
  Home-Bildschirm-App endet das Layout ≈ 60 pt über dem unteren Rand; body wird um (screen.height − innerHeight)/2 nach
  unten verlängert, Knopf ▲/▼ im Bedienfeld schaltet das ab (`autorennen.tief`). Kleine Diagnosezeile auf dem Startbildschirm.
- v3.14 (wirkt, Nutzer bestätigt): viewport-fit=cover und status-bar-style black-translucent entfernt (→ "black"), weil genau diese
  Kombination den iOS-26-Fehler auslöst (Screenshot: oben ≈ 60 pt Statusleiste, unten ≈ 62 pt gesperrt, Seite nur 752 pt
  von 874 pt). Home-Bildschirm-Symbol muss danach evtl. neu angelegt werden. Knöpfe lassen sich nicht in den abgeschnittenen Bereich ziehen.
- Pages braucht nach dem Push 1–2 Minuten. Vorher zeigt die App noch die alte Version an; das ist kein Fehler.

## Kostenzeile

`tools/kosten.py` liegt im Repo (Skill „kostenzeile“): am Ende jeder Antwort ausführen und die Ausgabe wörtlich als letzte Zeile setzen.

## Steuerung

Das Rennen beginnt erst mit dem START-Knopf (gibt zugleich den Ton frei), danach Countdown 3–2–1–LOS mit Piepton (seit v3.2), nach Ablauf der Zeit NOCHMAL-Knopf. Knüppel nach vorn = Gas, zurück = Bremse (analog), ohne Gas rollt das Auto aus; seitlich lenken. Hochformat: Spielbild oben, dunkles Bedienfeld unten (wie bei Passfahrt in
`fragen-allgemein/spiele/passfahrt`). Bedienfeld flach (108 px + Safe-Area). Seit v3.24 sind Knüppel und Turbo eckig (abgerundet), der gelbe Knopf erreicht die Ecken (Vollgas + Volleinschlag). Seit v3.13 sind Knüppel (100 px, Fangbereich 220 px) und Turbo FREI
platzierbar (Nutzer 19.11.: feste Lagen trafen auf dem iPhone nie): Zahnrad ⚙ EINSTELLUNGEN unten zwischen Knüppel und Turbo (nur Start-/Endbildschirm, ab v3.15) → mit dem Finger
ziehen → FERTIG; gespeichert je Hoch-/Querformat in `autorennen.knoepfe` (Bildschirmkoordinaten der Mitten), STANDARD
setzt zurück, dort auch ▼/▲ für das untere Ende der Seite. Steuerung: Fingerlage relativ zur Knüppelmitte zählt,
links/rechts lenkt (Volleinschlag nach 50 px), oberhalb Gas, unterhalb Bremse (voll nach 30 px).
Querformat: Bedienfeld durchsichtig über dem unteren Bildrand, Knüppel links unten. Am PC Pfeiltasten (hoch Gas, runter Bremse), Turbo Shift/Leertaste. Reifenquietschen nur bei krassem Lenken (Knüppel > 60 %) und hohem Tempo (> 80 %) sowie bei Vollbremsung (Nutzer 19.11., v3.2).

Seit v3.16: Pause-Knopf ❚❚ rechts unter dem Lautsprecher (auch automatisch, wenn die App in den Hintergrund geht) →
WEITER / EINSTELLUNGEN / AUFGEBEN. Einstellungen (⚙ auf dem Startbildschirm oder aus der Pause): Knöpfe ziehen,
Lenken KNÜPPEL oder HANDY NEIGEN (`autorennen.lenken`; Schwerkraft aus devicemotion in die Bildschirmebene gedreht,
wie ein Lenkrad, voll bei 25°, Handy gerade = geradeaus (seit v3.18 ohne Eichung); iPhone-Freigabe per requestPermission beim
Tipp). Seit v3.17 optional Gas/Bremse durch Kippen (`autorennen.kippen`): oben vom Körper weg = Gas, zu sich her = Bremse,
voll nach 20° (seit v3.20 per −/+ in 2°-Schritten 8–40°, `autorennen.kippgrad`; Lenken 8–45°, `autorennen.lenkgrad`; Eichhaltung VOLLGAS (Standard: Fahrhaltung = Vollgas, einen Kippweg zurück = Leerlauf, weiter = Bremse) oder NEUTRAL, `autorennen.kippmodus`), 4° tote Zone. Seit v3.18 Nullstellung Kippen in den Einstellungen „JETZT SETZEN“ (`autorennen.kippnull`, Live-Anzeige), Lenken ohne Eichung (Handy gerade = geradeaus); der Knüppel zeigt beim Fahren die Sensor-Eingabe an. Knopf-Positionen als Anteile von Breite/Höhe, nie in die oberen 70 px
(oben rechts öffnet iOS das Kontrollzentrum); alte Pixelwerte werden beim Laden verworfen.

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
Meer, Vulkan- und Stadtelemente folgen ab Schritt 2. Seit v3.21: Kurvenwarntafeln (seit v3.27 Wahl K des Nutzers: weiß, roter Rand, 2 dicke rote Pfeile, ≈ 57 % Rot, SPR_H 0.32, nur ab Kurvenstärke 4,5, am Kurveneingang max. 4 Stück im Abstand 12; Nutzer: vorher zu unruhig, zu viel Weiß) außen in
Kurven, Heu-Rundballen/Strohballen/Kühe; seit v3.22 nur in Abschnitten (`STAGES[id].zones`, je Drittel der Etappe eigene Randobjekte): Morgenland 2. Drittel Allee (1. Drittel Felder: Ausbau in Schritt 2); Voralpen 1. Drittel Alm mit Kühen UND Heu-/Strohballen (Nutzer 19.11.: gehören zusammen, nicht ins Morgenland). Weitere Abschnitte je Etappe in Schritt 5, lange Auf- und Abfahrten
(`addLongRamp`: Küste 1 sanfte, Land/Gebirge 2 je Etappe, 260–400 Segmente mit Kurven).

## Stand und offene Punkte (Übergabe 19.11.)

Stand v3.34 (live). Neuer Auftrag (19.11. abends): linke Route Etappe für Etappe sorgfältig nacharbeiten (Morgenland, dann K2–K5, je Etappe eine Version). v3.34 Morgenland: Bodenbänder `seg.bands` (`CROP`, `drawBands`: Feldschläge Raps/Korn/Acker/Wiese mit Reihen und Feldwegen, Gehweg, Dorfplatz), Höfe mit Scheune, Dorf `zones.village` (Kern mit Häuserblöcken und Gartenlücken mit Zaun, `vL/vR`, Hauswand nur wo Häuser stehen, Bordstein statt Rüttelstreifen, Ortstafeln, Maibaum, Kirche am Platz), Wiese aller Feld-Landschaften weniger grell. v3.35 (Nutzer: Regen/Gewitter sehr gut): kein Öl in Wetter-Abschnitten, Rücklichter im Regen größer + Spiegelung, Lavafontänen seltener und animiert (`drawSpout`), Rauch als aufsteigende Ballen (`drawSmoke`, `zones.smokeAt`), Meeresbrücke als Hängebrücke (`seg.cable`, `seg.pylon`, Portale in `drawStruct`), Höfe selten auf Hofplatz mit Zufahrt (Bänder hof/weg). v3.36: Hängebrücke rot, ohne Laternen; Lichtspiegelungen bei Nässe nur noch am Boden (`glow.gy`; vorher schwebende Flecken in der Luft = Nutzer: „lauter Punkte“), Laternen kleiner mit hellem Kopf (`core`), Stadt-Laternen alle 14 Segmente, Hochhäuser ohne Lichtschein, Bordstein in der Stadt. v3.37 (Nutzer: Hängebrücke lag auf Meereshöhe): Meeresbrücke ist Hochbrücke (`zones.high` = 4300 Einheiten ≈ 30 m, Rampen je 200 Segmente in `applyZone`, `seg.drop`); in `render` erst Meer tief unten projiziert malen (Vorpass, Brückenschatten, Pfeilerfüße), dann nur die Fahrbahnplatte; keine Boote auf der Brücke. v3.38: roter Versteifungsträger an beiden Fahrbahnkanten, Hänger enden darauf (Nutzer: Stäbe steckten scheinbar im Meer). v3.39 (Nutzer-Wunsch): Etappe auf der Karte antippen geht auch im Rennmodus → Abschnitt wählen → Start dort (`startAt`, `trip.free`: zählt nicht für die Sammlung, NOCHMAL startet am selben Punkt über `lastStart`; START = wie bisher ab Morgenland). v3.40: Pylone/Seile der Hängebrücke schon bis 520 Segmente voraus im Vorpass (`FAR`, ungerundet projiziert, `drawPylonTop`), kein Aufploppen bei 150 mehr; Lavafontänen je eigener Takt/Höhe/Breite/Brocken, manche stoßweise (`sp.sd`). v3.41: `project` liefert zusätzlich ungerundete Werte `screen.f`; Randobjekte und `drawStruct` nutzen sie (Häuser/Pylone sprangen bis 3 px je Bild, Nutzer: wackeln mehr als Bäume); Lavafelder als breite Lavaströme (`drawLava`: dunkles Ufer, abkühlende rote Ränder, gelbe Mitte, fließende Helligkeitsbänder, treibende Krustenschollen; Nutzer: Adern sahen aus wie Reifenspuren). v3.42: Kurventafeln mit 3 Pfeilen (52 x 30), dichter: alle 5 Segmente, bis 8 Tafeln am Kurveneingang (Nutzer: standen zu weit auseinander). v3.43: Fehler behoben: Abschnitte ohne eigene `types` hatten GAR keine Randobjekte (jetzt Grundausstattung der Landschaft; betraf u. a. Kehren, Passhöhe, Gletscher, Sternwarte, Bergwald); im Schnee (schnee/eis/gipfel) Eisflecken statt Öl (`seg.oilIce`, gleiche Rutsch-Wirkung, „Zu schnell aufs Eis“); Schneestangen (`zones.poles`), Berghütten, Passschild, Eisblöcke (`serac`) in den Gebirgs-Abschnitten. v3.44 (Nutzer: letzte rechte Etappe zu schwer, mehr Zielspektakel): `TIME_FACTOR` 1,32/1,25/1,21 (vorher 1,30/1,20/1,12), letzte Reihe ×1,06, Drittel mit Wetter ×1,08; Zielflaggen am Zielstück (`drawFlag`, wehen), beim Zieleinlauf Feuerwerk (`fireworks`), Fanfare, „ZIEL!“ mit Zeit, nach 3,3 s Auswertung ohne Karte: hochzählende Zeit, Rangliste je Ziel und Startpunkt (`autorennen.rangliste`, Schlüssel Ziel|Etappe+Abschnitt, 10 beste, eigene Zeile gelb, NEUER REKORD / Platz n). v3.45: Karte auf Game-Over- und Zielbildschirm antippbar (`openSections`, im Ziel klein `.map.mini`) → Abschnitt wählen → Neustart dort; ein freier Start fährt über alle Gabeln bis ins Ziel (geprüft K4 → K5). v3.46: Pause-Knopf AUFGEBEN heißt BEENDEN; (v3.47: Zielfeuerwerk aus feuerwerk.html als Mischung aller Arten eingebaut, eigene verblassende Ebene `fwCanvas` mit „lighter“, Salve alle 3,6 s, 9 s lang, Ton Pfeifen/Knall/Knistern über `audioCtx`, `fwStop` bei Start/Menü); (v3.64: andere Autos = Entwürfe B Kombi / C Coupé / D Geländewagen aus gegner.html gemischt, flacher als das alte Trapez) (v3.63: keine iOS-Lupe mehr: user-select/touch-callout auf allen Elementen, touchstart außerhalb von Tipp-Zielen (button, .map, #bar, #ver, #update …) per preventDefault abgefangen; Pointer-Ereignisse bleiben) (v3.62: Schatten wird beim Drehen in Querlage schmaler, bis halbe Breite) (v3.61: beim Schleudern/Drehen auf Öl dreht der Schatten nicht mehr mit – render malt ihn ungedreht, `noCarShadow` unterdrückt ihn in `carB`) (v3.60: Querformat-Zahnrad oben links in der Bildschirmecke (gegenüber Versionsnummer); andere Autos Standard 140 % (neuer Schlüssel `autorennen.gegner2`); Rumpeln beim Abkommen: Randstein leicht, neben der Straße kräftig – tiefes zerhacktes Rauschen (`rumbleGain`, Takt nach Tempo), Auto wackelt, kurze Vibration) (v3.59: Einstellungen „Andere Autos“ 100–200 % in 10-%-Schritten (`OPP_SCALE`, `autorennen.gegnergroesse`), wirkt auf Bild und Zusammenstoß; Nutzer: Gegner im Verhältnis zum eigenen Auto zu klein) (v3.58: Wasser ruhig ohne Querstreifen/Wellenkämme/Glitzern) (v3.57: Feuerwerk 5,5 s) (v3.56: Oase 3. Drittel „Palmenoase“ statt Wüstenstadt mit Leuchtreklame (Nutzer-Wahl): Quellsee links mit Palmen am Ufer, Lehmhäuser `lehm`, Kamele `kamel`, Fackeln `fackel` (flackern, `zones.torches`), keine modernen Laternen (`noLamps`), Häuser vor dem Ziel, orientalisches Stadttor `stadttor` über der Ziellinie (`STAGES.L5.tor`)) (v3.55: Querformat: Zahnrad EINSTELLUNGEN links über dem Knüppel statt über START (Nutzer-Screenshot)) (v3.54: Gefahrzeichen größer (SPR_H 0,8), dicht am Rand (±1,32), 5 Paare 130/105/80/55/32 Segmente vor der Haarnadel; Querbalken `seg.bars` 115–87 vorher, Kurvenpfeil auf dem Asphalt `seg.mark` 62–41 vorher) (v3.53: Haarnadeln lang gezogen 150–180 Segmente, Geraden 45–60; Gefahrzeichen „scharfe Kurve“ (`gefahr`, Pfeil je Richtung) 70 und 38 Segmente vor jeder Haarnadel beidseits) (v3.52: Kehren neu (Nutzer: knallte ohne sichtbaren Grund an die Wand): 3 echte Haarnadeln je ≈ 84–104 Segmente mit Kurvenstärke 19–23 und steilen Geraden dazwischen, `KEHRE_K` = 1 (Physik = Bild), max. ≈ 45–50 % Tempo; zu schnell → Warnung „ZU SCHNELL! Bremsen“ beim Untersteuern, Leitplanke außen in der Kehre über 42 % → Tempo auf 28 %; Kurventafeln entlang der ganzen Haarnadel; alter „fast Stillstand“-Sprung entfernt) (v3.51: Wasser ohne zeitgesteuerte Streifen/Kämme (Nutzer: Wellen flackerten auf dem iPhone) → Streifen fest am Ort, Kämme weich pulsierend, Glitzern blendet weich; Hänge steiler mit Schichten/Schatten, Bäume im Tal und Boote im Meer als Größenvergleich; Leuchtreklamen scharf nachgezeichnet nach dem Abdunkeln (`glow.bar`) mit kleiner Spiegelung, weniger Neon in der Innenstadt) (v3.50: Tunnelportal neu, Bootsstege `seg.pier` im Inselhafen, Rebzeilen am Weinberg) (v3.48/3.49: Abgründe mit echter Tiefe für alle Seiten: `seg.dL/dR` + Art `dKL/dKR` aus `DROP` (tal 7000, krater 5000, wolken 9000, meer 3800, see 900, hafen 2200, fluss 1600), in `applyZone` gesetzt und an den Enden eingeblendet; im Vorpass erst tiefer Boden bis 520 Segmente (`drawDeep`: Meer mit Brandung am Klippenfuß, Talgrund mit Feldern und Bach, Kraterboden mit Glut, Wolkenmeer mit Gipfeln), dann Hänge von der Kante hinab (`SLOPE_C`), Hauptschleife malt Boden nur bis zur Kante + Abbruchkante; Sternwarte: Observatorium mit offener Kuppel und Laserstrahl, Radioteleskope `dish`, mehr Kuppeln) Neige-Sensor geglättet: Lenken `tiltSm` (τ ≈ 60 ms), Knüppel-Anzeige `dispX/dispY` (τ ≈ 180 ms, ganze Pixel), Zappeln der Anzeige ≈ 1/16. Vorher: Schritt 1 (v3.0), Schritt 2 (v3.28–v3.29, Feinschliff v3.32–v3.33) und Schritt 3 (v3.31) sind gebaut,
vom Nutzer aber nur die linke Route (S → K2 → K3 → K4 → K5) gefahren. Abschnitte je Etappe (`STAGES[id].zones[k].name`):
- S Morgenland: Rapsfelder mit Höfen · Allee · Dorf mit Kirchturm.
- K2 Küstenstraße: Sandstrand mit Palmen, Schirmen, Meer links · Felsküste (Felswand rechts, Leitplanke + Meer links) · Fischerdorf mit Leuchtturm, Booten.
- K3 Inseln: Insel mit Hafen (Palmen, Fischerhäuser) · Meeresbrücke mit Pylonen und Laternen · Insel mit Dünen, Meer rechts.
- K4 Vulkaninsel: schwarzer Strand · Lavafelder (glühende Adern, Fontänen, Rauchsäulen) · Kraterrand mit Leitplanke.
- K5 Hafenstadt (Nacht): Hafen mit Kränen/Containern · Stadtbrücke im Gewitter mit Lichterketten · Innenstadt mit Neon und Regen, Ziel.
- L2 Kleinstadt: Flussufer mit Weiden · Altstadt Fachwerk + Kopfsteinpflaster · Flussbrücke.
- G2 Voralpen: Alm (Kühe, Ballen) · Bergsee mit Boot, Bootshäusern · Bergwald mit Schotterweg.
- L3 Weinland: Terrassen · Talbrücke mit Seitenwind · Weindorf.
- G3 Alpenpass: Kehren (Bremszwang, „ZU SCHNELL!“) · Lawinengalerie · Passhöhe im Schnee.
- L4 Canyon: enge Schlucht (Felswände) · Dammkrone (See links, Tal rechts) · Tafelberge, Tankstelle, Sandsturm.
- G4 Gletscher: Schneeschneise · Tunnel (Portal, Lampen, Hall, Blendung) · Eisplatten.
- L5 Oase: Wüste unter Sternen · lange Gerade mit Palmen · Palmenoase mit Quellsee, Lehmhäusern, Fackeln, Stadttor als Ziel (v3.56).
- G5 Sternwarte: über den Wolken (Leitplanke) · Schlussanstieg im Nebel · Gipfel mit Kuppeln.
Dazu: Öl je nach Tempo (Dreher ab 85 %), Startpunkt-Wahl im Training (Etappe antippen → Abschnitt).

Offene Rückmeldungen des Nutzers:
- Kehren (v3.54) fahren sich gut (Nutzer 20.11.); KEIN Überschlag – in die Leitplanke + abgebremst reicht als Strafe.
- Feuerwerk gut, Töne okay, etwas kürzer (v3.57: 5,5 s); Palmenoase (v3.56) gut.
- Wellen flackerten auch nach v3.51 (Nutzer 20.11.) → v3.58: Wasser ruhig ohne Querstreifen, ohne Wellenkämme, ohne Glitzern (nur Tiefenstufen, Dunst, Brandung). Rückmeldung offen.
- Details der Umgebung: Nutzer will mehr Sorgfalt; Mitte und rechte Route hat er noch nicht gefahren.
- Schritt 3 (Wetter) und die nicht-linken Etappen von Schritt 2 noch nicht abgenommen.

Bekannte Schwächen (Stand v3.50, 20.11.):
- Behoben seit v3.48–v3.50: Abgründe mit Tiefe (alle 7 + Kehren), Sternwarte ausgebaut, Inselhafen mit Stegen, Tunnelportal mit Felsschichten/Bogen/Schild, Weinberg mit Rebzeilen (`CROP.reben`).
- Tiefe ist nur angedeutet (Pseudo-3D): Hang + tiefer Boden, keine echte Klippenwand von der Seite; nachts (Sternwarte, Hafenstadt) wirkt die Tiefe schwach.
- Kehren-Bot fährt vorsichtig (Zeitgutschrift dort großzügig).
- Getestet nur per Headless-Browser (Standbilder, Bildfolgen), kein Ton geprüft, keine Leistung auf dem iPhone gemessen (Headless ≈ 2–4 ms je Bild, Feuerwerk ≈ 11 ms).
- Mitte und rechte Route nur per Standbild geprüft; Nutzer ist sie noch nicht gefahren.

Als Nächstes: Rückmeldungen oben einarbeiten. Schritt 4 (Nutzer 20.11.: erst, wenn der Rest auf Vordermann ist) (Verkehr: Lkw, Traktor, Motorrad, Rivale; Hindernisse:
Pylonen, Steinschlag, Turbo-Kanister) erst nach Freigabe des Nutzers. Testskripte lagen nur im Scratchpad (nicht im Repo):
Bot-Fahrt über ganze Routen mit `botDrive` + Öl-Ausweichen, Kalibrierung aller Etappen per `calibrate`.

## Eingefügter HTML-Code aus anderen Chats

Schickt der Nutzer eine komplette HTML-Fassung des Spiels (z. B. aus einem anderen Chat), nicht übernehmen, sondern
mit dem Stand hier vergleichen und **nur das Neue** einbauen (Nutzer, 19.11.2026). Unsere Lenkung bleibt (der Nutzer
findet sie besser), ebenso Tempo in Einheiten pro Sekunde, das mittig stehende Auto, die Gegner-Projektion mit Kurven
und Kuppen und die Update-Prüfung. Danach in der Antwort auflisten: was übernommen, was bewusst nicht und warum.

## Entwürfe

`gegner.html` (20.11.): vier Entwürfe für die anderen Autos (A Limousine 48 %, B Kompakt-Kombi 55 %, C Sportcoupé 40 %, D Geländewagen 60 % Höhe/Breite; Nutzer: bisherige Gegner zu hoch), Nutzer wählte B, C, D gemischt → seit v3.64 im Spiel (`OPP_TYPES`, `o.type`, Rücklicht-Glows je Typ `lx/ly`); Schnittstelle oppX(x, y, w, Farbe, nachts).

`autos.html`: Vorschauseite mit vier Entwürfen fürs eigene Auto (rotes Cabrio von hinten, A–D). Gewählt: B (ab v2.1 im Spiel). Gleiche Schnittstelle
wie `drawPlayerCar(x, y, w, …)` im Spiel. Nach der Wahl des Nutzers die Funktion ins Spiel übernehmen.

## Konzept (Schritt 1 umgesetzt in v3.0, Schritte 2–5 offen)

Plan für Schritt 2: `konzept.html` Abschnitt 2b (19.11.): Tabelle mit 3 Abschnitten je Etappe und 7 Bausteinen in
Bau-Reihenfolge. Nutzer: Baustein für Baustein bauen, je Baustein eine Version pushen, er testet, dann der nächste.

Schritt 2 komplett (v3.28 Wasser, v3.29 alle übrigen Bausteine; Nutzer 19.11.: „bau alles, ich schaue später“, noch NICHT
vom Nutzer abgenommen). Alle 39 Abschnitte stehen in `STAGES[id].zones[k]` mit `name` (Konzept 2b). Datenmodell am Segment:
`water`/`water2` (`WATER`: meer, fluss, see, hafen, lava; Abgründe mit `deep`: tal, krater, wolken), `edgeL`/`edgeR`
= { k: rail | rock | canyon | snow | tunnel | house | pillar, d } (`EDGE_D`), `bridge`, `tunnel`/`portal`, `gallery`, `kehre`
(nur echte Kehren, `hair` aus `genBody`), `cobble`, `wind`, `lights`. Gesetzt von `applyZone`; Streckenform je Abschnitt über
`zoneAt` in `genBody` (kehren, flat = ohne Kuppen, straight). Gezeichnet: Boden in der Straßenschleife (`drawWater`), alles
Senkrechte von hinten nach vorn in `drawStruct` (auch Segmente vor dem Auto), Tunnel hinten dunkel (`drawTunnelCap`).
Fahren: Leitplanke/Schnee/Pfeiler weich (−0,7 maxSpeed/s), Fels/Haus hart (−1,6), Funken + Kratzen (`playScrape`);
Wasser/Lava auf 30 %; Kopfsteinpflaster 90 % + Rattern; Seitenwind auf der Talbrücke (`windAt`, fest je Ort); Kehren
Kehren seit v3.52 neu (siehe oben: echte Haarnadeln, `KEHRE_K` = 1); Tunnel dunkel, Motor hallt (`echoGain`), Blendung beim Ausfahren. Bot `botDrive` bremst vor Kehren (für
`calibrate`). Bot-Zeiten: L2 68,8 s (Pflaster), G3 72,1 s (Kehren), sonst unverändert 66–69 s. Neue Sprites: palm, house,
house2, fachwerk(2), church, fisher(2), lighthouse, boathouse, dune, smoke, mesa, gas, crane, container, tower(2), neon(2),
cube, dome, willow, boat, reed. Offen (spätere Schritte): Eisplatten/Steinschlag (4), Nebel/Sandsturm (3).
Öl (v3.30, Nutzer-Idee): Wirkung nach Tempo beim Überfahren: < 55 % kurz schlingern, 55–80 % Heck bricht aus und driftet
zur Kurvenaußenseite (≈ 2 s Verlust), > 85 % Dreher (seit v3.31, Nutzer) (ganze Umdrehung, „SCHLEUDERN!“, Gas/Lenken wirkungslos, von der Fahrbahn,
≈ 4 s Verlust). Flecken liegen bevorzugt 6–20 Segmente vor einer Kurve (manchmal schon darin), nie hinter einer Kuppe, im
Tunnel oder am Tor. Der Bot ist davon nicht betroffen (Öl nur in update()), Zeiten unverändert.
Schritt 3 Wetter (v3.31, Nutzer: „weiter mit Schritt 3“, noch nicht abgenommen): `zones[k].weather` = rain | storm | fog |
sand → Segment `wx`/`wxA` (blendet über 150 Segmente ein/aus); `zones[k].ice` → Eisplatten `seg.ice = { o, w }`.
Hafenstadt 2/3 Gewitter (Regen + Blitze + Donner `playThunder`), 3/3 Regen; Sternwarte 2/3 Nebel; Canyon 3/3 Sandsturm (+ Wind);
Gletscher 3/3 Eisplatten. Regen: nasse dunkle Straße, Lichter spiegeln sich, Gischt hinter Gegnern, Bremse 70 %, Kurve drückt
1,3-fach (Bot rechnet mit). Eis: Lenken 30 %, Kurve 1,7-fach. Nebel/Sand: Dunstverlauf zum Horizont vor dem Tageslicht-Tint.
Regen-/Sandgeräusch (`rainGain`/`sandGain`). Bot-Zeiten unverändert. Tageslauf gab es schon (Schritt 1).
v3.32 Feinschliff linke Route (Nutzer: „mehr auf Details achten“, Felswand baute sich komisch auf, Lava sah schlecht aus):
Wände wachsen über 45 Segmente aus dem Boden (`edge.r`, Nachbar `nxL/nxR`), Fels ohne Streifenmuster (Farbe je Segment), Gras
auf der Klippe, Dunst in der Ferne; Lava/Krater = dunkle Kruste mit glühenden, sich schlängelnden Adern (`drawVeins`) und
Lavafontänen (`spout`); v3.33 Meer/See mit Tiefenstufen (`depth`: türkis am Ufer → tiefblau), Wellenkämmen (`crest`) und Dunst zum Horizont; Pylone der Meeresbrücke (`pylon`), Sonnenschirme am Strand (`umbrella`), größere Dünen, Höfe im Raps.
Training: Etappe antippen → Startpunkt wählen (Anfang oder Abschnitt 2/3, `startAt`), Start kurz vor dem Checkpoint.

`konzept.html` (19.11.2026): Tagesreise über eine feste Karte 3 Spalten (Küste leicht, Land mittel, Gebirge schwer)
× 4 Reihen (Morgen bis Nacht), Gabelung per Lenken, 10 Etappen, 17 Routen, 3 Ziele, alles deterministisch,
Checkpoints, Baukasten der Streckenelemente, Umsetzung in 5 Schritten. Entscheidungen des Nutzers (19.11.) in Abschnitt 0: Gabelung per Lenken mit großen
Schildern, an jedem Tor nur halbe Restzeit, Game Over = von vorn, versteckter Trainingsmodus (Versionsnummer auf dem
Startbildschirm 2 s halten → RENNEN/TRAINING, Etappe frei wählbar, kein Game Over, keine Rekorde), Tageslauf ja,
maximale Abwechslung inkl. Vulkan und Stadt. Gewählt: 5 Etappen pro Fahrt (Abschnitt 2a: 13 Etappen, 41 Routen). Abschnitt 3a (Nutzer: Landschaften wechseln zu schnell, Übergänge unsinnig): eine Landschaft je
Etappe, Tageszeit über die ganze Tour, 17 Verbindungsstücke, Klima-Regel. Erst nach seiner Freigabe programmieren,
je Schritt eine frische Sitzung. `feuerwerk.html` (20.11., Fassung 2 nach Nutzer „richtig schlecht“): Vollbild, Bewegungsunschärfe durch teilweises Überdecken, 160–290 Sterne je Explosion als Leuchtstempel, Lichtblitz, Rauch, Ton (Pfeifen, Knall mit Bass und Nachhall, Knistern; Web Audio); Varianten A Pfingstrose, B Goldregen/Palme, C Knistern/Strobo, D Finale. Seit v3.47 als Mischung im Spiel (Nutzer zufrieden). `toene.html`: Hörproben fürs Reifenquietschen. Nutzer (19.11.): A, B, C alle gut, je nach Untergrund einsetzen; seit v2.7
im Spiel: B Wiese/Wald, C Wüste/Berge, A Nacht; Schotterweg im Wald (knirscht), 6 feste Ölflecken (eigener Rutsch-Klang).
Seit v3.9 ist Klang B im Spiel ein tonaler Quietschton (zwei Sägezähne um 950 Hz, Tonhöhe steigt mit dem Rutschen); das Rubbeln aus der Hörprobe B klang im Spiel wie Scheppern (Nutzer 19.11.).
Seit v3.15 Klang B rau/kreischend (Sägezahn + Rechteck, Tonhöhe zittert, übersteuert, rattert); v3.9 klang wie Windpfeifen.
