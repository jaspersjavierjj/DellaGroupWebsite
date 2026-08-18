const VERSION = "della-v1";

const STATIC_CACHE = `della-static-${VERSION}`;
const PAGE_CACHE = `della-pages-${VERSION}`;

// Important files downloaded immediately
const CORE_FILES = [
    "/",
    "/index.html",
    "/favicon.ico"
];

// INSTALL
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => cache.addAll(CORE_FILES))
    );

    self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (
                        cacheName !== STATIC_CACHE &&
                        cacheName !== PAGE_CACHE
                    ) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {

    const request = event.request;
    const url = new URL(request.url);

    // Only GET requests
    if (request.method !== "GET") {
        return;
    }

    // Only cache your own website
    if (url.origin !== self.location.origin) {
        return;
    }

    /*
    =====================================================
    HTML PAGES
    Network first, cache as backup
    =====================================================
    */

    if (request.mode === "navigate") {

        event.respondWith(
            fetch(request)
                .then(response => {

                    const copy = response.clone();

                    caches.open(PAGE_CACHE)
                        .then(cache => {
                            cache.put(request, copy);
                        });

                    return response;

                })
                .catch(() => {

                    return caches.match(request)
                        .then(cached => {
                            return cached || caches.match("/index.html");
                        });

                })
        );

        return;
    }

    /*
    =====================================================
    STATIC FILES
    Cache first + update in background
    =====================================================
    */

    const CACHEABLE_TYPES = [
        "style",
        "script",
        "image",
        "font"
    ];

    if (CACHEABLE_TYPES.includes(request.destination)) {

        event.respondWith(

            caches.match(request)
                .then(cachedResponse => {

                    const networkRequest = fetch(request)
                        .then(networkResponse => {

                            if (
                                networkResponse &&
                                networkResponse.status === 200
                            ) {

                                const copy = networkResponse.clone();

                                caches.open(STATIC_CACHE)
                                    .then(cache => {
                                        cache.put(request, copy);
                                    });

                            }

                            return networkResponse;
                        })
                        .catch(() => cachedResponse);

                    // If cached, return immediately.
                    // Network updates it in background.
                    return cachedResponse || networkRequest;

                })

        );

    }

});