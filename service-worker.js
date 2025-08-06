const CACHE_NAME = 'conjugator-cache-v2';
const URLS_TO_CACHE = [
  'index.html',
  'style.css',
  'script.js',
  'verbos.json',
  'fonts/Schwarzenegger.woff2',
  'fonts/PixelSerif_16px_v02.woff2',
  'images/conjucityhk.webp',
  'images/conjuchuache.webp',
  'images/heart.webp',
  'images/iconquestion.webp',
  'images/pixel_bubble.webp',
  'images/musicon.webp',
  'images/musicoff.webp',
  'sounds/click.mp3',
  'sounds/correct.mp3',
  'sounds/wrong.mp3',
  'sounds/wongstudy.mp3',
  'sounds/gameover.mp3',
  'sounds/musicmenu.mp3',
  'sounds/musicgame.mp3',
  'sounds/start-verb.mp3',
  'sounds/skip.mp3',
  'sounds/soundbubblepop.mp3',
  'sounds/soundLifeGained.mp3',
  'sounds/electricshock.mp3',
  'sounds/ticking.mp3',
  'sounds/levelup.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .catch(err => console.error('Service worker cache failed:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Respond to recorder state requests so callers don't hang waiting for a reply
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'request-get-recorder-state') {
    const port = event.ports && event.ports[0];
    if (port) {
      port.postMessage({ supported: false });
    }
  }
});
