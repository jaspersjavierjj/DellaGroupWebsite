const VERSION = "della-v2";

const STATIC_CACHE = `della-static-${VERSION}`;
const PAGE_CACHE = `della-pages-${VERSION}`;

/*
=====================================================
CORE FILES
Downloaded when the service worker installs
=====================================================
*/

const CORE_FILES = [
    "/",
    "/index.html",
    "/favicon.ico"
];


/*
=====================================================
INSTALL
=====================================================

Download fresh copies of the core files.

cache: "reload"
= bypass normal browser HTTP cache during installation.
*/

self.addEventListener("install", event => {

    event.waitUntil(
        (async () => {

            const cache = await caches.open(STATIC_CACHE);

            for (const url of CORE_FILES) {

                try {

                    const response = await fetch(url, {
                        cache: "reload"
                    });

                    if (response && response.ok) {
                        await cache.put(
                            url,
                            response.clone()
                        );
                    }

                } catch (error) {

                    console.warn(
                        "Core file could not be cached:",
                        url
                    );

                }

            }

        })()
    );

    // Activate the new worker immediately
    self.skipWaiting();
});


/*
=====================================================
ACTIVATE
=====================================================

Delete old Della caches automatically.
=====================================================
*/

self.addEventListener("activate", event => {

    event.waitUntil(
        (async () => {

            const cacheNames = await caches.keys();

            await Promise.all(

                cacheNames.map(cacheName => {

                    const isDellaCache =
                        cacheName.startsWith("della-");

                    const isCurrentCache =
                        cacheName === STATIC_CACHE ||
                        cacheName === PAGE_CACHE;

                    if (
                        isDellaCache &&
                        !isCurrentCache
                    ) {
                        return caches.delete(cacheName);
                    }

                })

            );

            await self.clients.claim();

        })()
    );

});


/*
=====================================================
FETCH
=====================================================
*/

self.addEventListener("fetch", event => {

    const request = event.request;
    const url = new URL(request.url);


    /*
    -------------------------------------------------
    ONLY GET REQUESTS
    -------------------------------------------------
    */

    if (request.method !== "GET") {
        return;
    }


    /*
    -------------------------------------------------
    ONLY DELLA WEBSITE FILES
    -------------------------------------------------
    */

    if (url.origin !== self.location.origin) {
        return;
    }


    /*
    =================================================
    HTML PAGES
    NETWORK FIRST
    =================================================

    Always check Bluehost first.

    If internet/server is unavailable,
    use cached page.
    =================================================
    */

    if (request.mode === "navigate") {

        event.respondWith(

            (async () => {

                try {

                    /*
                    Force browser to revalidate the page
                    with the server.
                    */

                    const networkResponse =
                        await fetch(request, {
                            cache: "no-cache"
                        });


                    if (
                        networkResponse &&
                        networkResponse.ok
                    ) {

                        const cache =
                            await caches.open(PAGE_CACHE);

                        await cache.put(
                            request,
                            networkResponse.clone()
                        );

                    }


                    return networkResponse;


                } catch (error) {

                    /*
                    Offline/server failure:
                    use cached page.
                    */

                    const cachedPage =
                        await caches.match(request);

                    if (cachedPage) {
                        return cachedPage;
                    }


                    /*
                    Final offline fallback
                    */

                    const homePage =
                        await caches.match("/index.html");

                    if (homePage) {
                        return homePage;
                    }


                    return Response.error();

                }

            })()

        );

        return;
    }


    /*
    =================================================
    STATIC FILES
    STALE-WHILE-REVALIDATE
    =================================================

    Applies to:

    CSS
    JavaScript
    Images
    Fonts

    1. Give cached file immediately.
    2. Check Bluehost in background.
    3. Replace cache with server version.
    4. Next request gets newest version.
    =================================================
    */

    const CACHEABLE_TYPES = [
        "style",
        "script",
        "image",
        "font"
    ];


    if (
        CACHEABLE_TYPES.includes(
            request.destination
        )
    ) {

        /*
        -------------------------------------------------
        START SERVER CHECK IMMEDIATELY
        -------------------------------------------------
        */

        const refreshPromise =

            fetch(request, {
                cache: "no-cache"
            })

            .then(async networkResponse => {

                /*
                Only cache successful responses.
                */

                if (
                    networkResponse &&
                    networkResponse.ok
                ) {

                    const cache =
                        await caches.open(STATIC_CACHE);

                    await cache.put(
                        request,
                        networkResponse.clone()
                    );

                }


                return networkResponse;

            })

            .catch(error => {

                /*
                Network failure is okay because
                cached copy may still exist.
                */

                return null;

            });


        /*
        -------------------------------------------------
        IMPORTANT
        -------------------------------------------------

        Keep the Service Worker alive until
        the background cache update finishes.
        */

        event.waitUntil(
            refreshPromise.then(() => undefined)
        );


        /*
        -------------------------------------------------
        RESPONSE
        -------------------------------------------------
        */

        event.respondWith(

            caches.match(request)

                .then(cachedResponse => {

                    /*
                    Cached version exists:
                    show it immediately.

                    Background request above is already
                    checking for a new version.
                    */

                    if (cachedResponse) {
                        return cachedResponse;
                    }


                    /*
                    Nothing cached:
                    wait for network.
                    */

                    return refreshPromise.then(
                        networkResponse => {

                            if (networkResponse) {
                                return networkResponse;
                            }

                            return Response.error();

                        }
                    );

                })

        );

    }

});