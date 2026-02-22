// ══════════════════════════════════════════════
//  AB Portfolio — Service Worker
//  Makes the app work OFFLINE and installable
//
//  HOW IT WORKS:
//  1. INSTALL  — downloads and caches all files
//  2. ACTIVATE — cleans up old cached versions
//  3. FETCH    — intercepts every network request
//               → if cached: serve from cache (FAST, offline!)
//               → if not:    fetch from network, then cache it
// ══════════════════════════════════════════════

const CACHE_NAME    = 'ab-portfolio-v1';
const DYNAMIC_CACHE = 'ab-portfolio-dynamic-v1';

// These files are cached immediately on install
// (the "app shell" — everything needed to show the UI)
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// ── 1. INSTALL: cache all static files ───────────
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching app shell');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => self.skipWaiting())
  );
});

// ── 2. ACTIVATE: delete old caches ───────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== DYNAMIC_CACHE)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── 3. FETCH: serve from cache or network ────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // API calls — always go to network (never serve stale API data)
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/ws')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Static files — cache first strategy
  // Try cache → if miss, fetch from network → cache the result
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;  // Serve from cache instantly
      }

      // Not in cache — fetch from network
      return fetch(event.request).then(response => {
        // Only cache valid responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone because response can only be consumed once
        const toCache = response.clone();
        caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(event.request, toCache);
        });

        return response;
      }).catch(() => {
        // Network failed AND not in cache
        // Show the main page as fallback (so app still "opens")
        return caches.match('/index.html');
      });
    })
  );
});

// ── 4. PUSH NOTIFICATIONS (future feature) ───────
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title || 'AB Portfolio', {
    body: data.body || 'You have a new message!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
  });
});
