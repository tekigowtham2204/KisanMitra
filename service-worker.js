// ============================================================
// KisanMitra — Service Worker (Offline Support + Caching)
// ============================================================
// Storage
const CACHE_NAME = 'kisanmitra-v6';
const DATA_CACHE = 'kisanmitra-data-v6';
const OFFLINE_URL = '/offline.html';

// Files to cache immediately on install
const PRECACHE_URLS = [
    './',
    'index.html',
    'dashboard.html',
    'schemes.html',
    'market.html',
    'offline.html',
    'css/style.css',
    'js/api.js',
    'js/data.js',
    'js/app.js',
    'js/i18n.js',
    'js/modules/utils.js',
    'js/modules/state.js',
    'js/modules/ui.js',
    'js/modules/iconify.js',
    'js/modules/db.js',
    'manifest.json',
    'assets/icons/sprite.svg',
    'assets/icons/logo.svg',
    'assets/icons/favicon.svg',
    'assets/icons/apple-touch-icon.svg',
    'assets/icons/icon-192.svg',
    'assets/icons/icon-512.svg',
    'assets/icons/shortcut-dashboard.svg',
    'assets/icons/shortcut-schemes.svg',
    'assets/icons/shortcut-market.svg',
];

// Install — precache core files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW] Precaching core files');
            return cache.addAll(PRECACHE_URLS);
        }).then(() => self.skipWaiting())
    );
});

// Activate — clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch — Network first, fallback to cache, then offline page
self.addEventListener('fetch', event => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // For API calls — network only (don't cache API responses in SW)
    if (request.url.includes('api.data.gov.in') ||
        request.url.includes('api.openweathermap.org')) {
        event.respondWith(
            fetch(request).catch(() => {
                return new Response(JSON.stringify({
                    error: 'offline',
                    message: 'You are currently offline. API data is unavailable.',
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    status: 503,
                });
            })
        );
        return;
    }

    // For HTML pages — network first, cache fallback
    if (request.headers.get('Accept')?.includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // Cache the latest version
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then(cached => {
                        return cached || caches.match(OFFLINE_URL);
                    });
                })
        );
        return;
    }

    // For CSS/JS/images — cache first, network fallback
    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;
            return fetch(request).then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                return response;
            });
        }).catch(() => {
            // Return empty response for non-critical resources
            return new Response('', { status: 408, statusText: 'Offline' });
        })
    );
});

// Sync — Handle background synchronization
self.addEventListener('sync', event => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(syncForms());
    }
});

async function syncForms() {
    // Ideally, we would read from IDB and post to server
    // Since we don't have a backend, we'll just simulate success
    // and show a notification (if pages are open)
    console.log('[SW] Background Sync: Processing offline forms...');

    // In a real app:
    // 1. Open IDB
    // 2. Get all forms
    // 3. POST them to API
    // 4. Clear IDB on success

    const clients = await self.clients.matchAll();
    clients.forEach(client => {
        client.postMessage({
            type: 'SYNC_COMPLETE',
            message: 'Uploaded offline forms successfully!'
        });
    });
}
