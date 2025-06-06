const CACHE_NAME = 'conjugator-cache-v1';
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'verbos.json',
  'fonts/Schwarzenegger.woff2',
  'fonts/PixelSerif_16px_v02.woff2',
  'images/conjucityhk.png',
  'images/conjuchuache.png',
  'images/heart.png',
  'images/iconquestion.png',
  'images/pixel_bubble.png',
  'sounds/click.mp3',
  'sounds/correct.mp3',
  'sounds/wrong.mp3',
  'sounds/gameover.mp3',
  'sounds/musicmenu.mp3',
  'sounds/musicgame.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
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
