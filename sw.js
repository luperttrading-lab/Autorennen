// Service Worker für Autorennen: eigene Dateien "Netz zuerst", Cache nur für offline.
const CACHE = 'autorennen';
const ASSETS = ['./', './index.html'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
    self.skipWaiting();   // sonst wartet der neue Worker, bis alle Fenster zu sind (passiert auf dem iPhone nie)
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
    self.clients.claim(); // sonst bedient der alte Worker die offene Seite weiter
});

self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;
    if (new URL(req.url).origin !== self.location.origin) return; // Fremdes unberührt durchlassen
    e.respondWith(
        fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(res => {
            if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
            return res;
        }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
});
