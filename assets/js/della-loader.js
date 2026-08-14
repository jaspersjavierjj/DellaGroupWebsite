/* =========================================================
   DELLA SKELETON LOADER
   VISIBLE DIAGONAL MOVING SHINE

   IMPORTANT:
   Load in <head> WITHOUT defer.
========================================================= */

(() => {
    "use strict";

    const ROOT = document.documentElement;
    const LOADER_ID = "della-loader";

    /* Loader timing */
    const MIN_VISIBLE_TIME = 650;
    const MAX_CRITICAL_WAIT = 5000;
    const EXIT_DURATION = 450;

    /*
       Shine timing

       1800 = shine crosses screen in 1.8 seconds
       350  = short pause before repeating
    */
    const SHINE_DURATION = 1800;
    const SHINE_PAUSE = 350;

    const startTime = performance.now();

    let shineFrame = null;
    let shineStartTime = null;


    /* =====================================================
       LOADING STATE
    ===================================================== */

    ROOT.classList.add("della-loading");


    /* =====================================================
       CREATE LOADER
    ===================================================== */

    function createLoader() {

        if (!document.body) {
            return null;
        }

        const existing =
            document.getElementById(LOADER_ID);

        if (existing) {
            return existing;
        }


        const loader =
            document.createElement("div");

        loader.id = LOADER_ID;
        loader.setAttribute(
            "aria-hidden",
            "true"
        );


        loader.innerHTML = `

            <div class="della-loader__shell">

                <div class="della-loader__navbar">

                    <div class="
                        della-loader__logo
                        della-skeleton-bar">
                    </div>

                    <div class="della-loader__nav-center">

                        <span class="della-skeleton-bar"></span>
                        <span class="della-skeleton-bar"></span>
                        <span class="della-skeleton-bar"></span>
                        <span class="della-skeleton-bar"></span>

                        <i></i>

                        <span class="
                            della-loader__nav-defense
                            della-skeleton-bar">
                        </span>

                    </div>

                    <div class="della-loader__nav-actions">

                        <span class="della-skeleton-bar"></span>
                        <span class="della-skeleton-bar"></span>

                    </div>

                </div>


                <div class="della-loader__hero"></div>


                <div
                    class="della-loader__moving-shine">
                </div>

            </div>

        `;


        document.body.prepend(
            loader
        );


        startShineAnimation(
            loader
        );


        return loader;
    }


    /* =====================================================
       MOUNT BEFORE PAGE PAINT
    ===================================================== */

    function mountLoader() {

        if (createLoader()) {
            return;
        }


        /*
           Script is inside <head>,
           therefore body may not exist yet.
        */

        const observer =
            new MutationObserver(() => {

                if (createLoader()) {

                    observer.disconnect();

                }

            });


        observer.observe(
            document.documentElement,
            {
                childList: true,
                subtree: true
            }
        );
    }


    mountLoader();


    /* =====================================================
       MOVING SHINE
    ===================================================== */

    function startShineAnimation(loader) {

        if (!loader) {
            return;
        }


        if (
            loader.dataset.shineRunning ===
            "true"
        ) {

            return;

        }


        loader.dataset.shineRunning =
            "true";


        const shine =
            loader.querySelector(
                ".della-loader__moving-shine"
            );


        if (!shine) {

            console.warn(
                "DELLA loader shine element not found."
            );

            return;
        }


        shineStartTime = null;


        const cycleDuration =
            SHINE_DURATION +
            SHINE_PAUSE;


        function animate(timestamp) {


            if (!shineStartTime) {

                shineStartTime =
                    timestamp;

            }


            const elapsed =

                (
                    timestamp -
                    shineStartTime
                )

                %

                cycleDuration;


            /* ================================
               PAUSE
            ================================= */

            if (
                elapsed >
                SHINE_DURATION
            ) {


                shine.style.opacity =
                    "0";


                shineFrame =
                    requestAnimationFrame(
                        animate
                    );


                return;

            }


            /* ================================
               PROGRESS 0 → 1
            ================================= */

            const progress =
                elapsed /
                SHINE_DURATION;


            /*
               Calculate using actual viewport pixels.

               This is much more reliable than
               using CSS percentage positioning.
            */

            const viewportWidth =
                window.innerWidth;


            /*
               Start well outside left.
            */

            const startX =
                -350;


            /*
               End well outside right.
            */

            const endX =
                viewportWidth +
                350;


            const x =

                startX +

                (
                    endX -
                    startX
                )

                *

                progress;


            /* ================================
               OPACITY
            ================================= */

            let opacity =
                1;


            /*
               Fade in first 8%
            */

            if (
                progress <
                0.08
            ) {

                opacity =
                    progress /
                    0.08;

            }


            /*
               Fade out last 8%
            */

            else if (
                progress >
                0.92
            ) {

                opacity =

                    (
                        1 -
                        progress
                    )

                    /

                    0.08;

            }


            opacity =
                Math.max(
                    0,
                    Math.min(
                        opacity,
                        1
                    )
                );


            /* ================================
               ACTUAL MOVEMENT
            ================================= */

            shine.style.transform =

                `translate3d(
                    ${x}px,
                    0,
                    0
                )
                rotate(20deg)`;


            shine.style.opacity =
                opacity.toString();


            shineFrame =
                requestAnimationFrame(
                    animate
                );

        }


        shineFrame =
            requestAnimationFrame(
                animate
            );

    }


    /* =====================================================
       STOP SHINE
    ===================================================== */

    function stopShineAnimation() {

        if (
            shineFrame !==
            null
        ) {

            cancelAnimationFrame(
                shineFrame
            );


            shineFrame =
                null;

        }

    }


    /* =====================================================
       WAIT FOR DOM
    ===================================================== */

    function waitForDOM() {

        return new Promise(
            (resolve) => {


                if (

                    document.readyState ===
                    "interactive"

                    ||

                    document.readyState ===
                    "complete"

                ) {

                    resolve();

                    return;

                }


                document.addEventListener(
                    "DOMContentLoaded",
                    resolve,
                    {
                        once: true
                    }
                );


            }
        );

    }


    /* =====================================================
       FIND MAIN / CRITICAL MEDIA
    ===================================================== */

    function getCriticalMedia() {


        /*
           BEST METHOD:

           <img data-della-critical>
        */

        const explicitCritical =

            document.querySelector(
                "[data-della-critical]"
            );


        if (explicitCritical) {

            return explicitCritical;

        }


        /*
           Priority image
        */

        const highPriority =

            document.querySelector(

                `
                img[fetchpriority="high"],
                video[fetchpriority="high"]
                `

            );


        if (highPriority) {

            return highPriority;

        }


        /*
           DELLA page structures
        */

        const knownMedia =

            document.querySelector(

                [

                    ".hero-placeholder__img",

                    ".hero-image",

                    ".industrial-video-image",

                    ".delivers-slider .slide.active img",

                    ".delivers-slider .slide.active video",

                    ".fortis-image__screen img",

                    ".f5-image__screen img",

                    ".f8-image__screen img",

                    ".f10-image__screen img",

                    ".f20-image__screen img",

                    ".f40-image__screen img",

                    '[class$="-image__screen"] img',

                    "main picture img",

                    "main img"

                ].join(",")

            );


        if (knownMedia) {

            return knownMedia;

        }


        /*
           Final fallback
        */

        return (

            document.querySelector(
                ".page-content picture img"
            )

            ||

            document.querySelector(
                ".page-content img"
            )

            ||

            null

        );

    }


    /* =====================================================
       WAIT FOR MEDIA
    ===================================================== */

    function waitForMedia(media) {


        if (!media) {

            return Promise.resolve();

        }


        /* ================================
           IMAGE
        ================================= */

        if (
            media.tagName ===
            "IMG"
        ) {


            /*
               Already loaded
            */

            if (

                media.complete

                &&

                media.naturalWidth >
                0

            ) {


                if (

                    typeof
                    media.decode ===
                    "function"

                ) {


                    return media
                        .decode()
                        .catch(
                            () => {}
                        );

                }


                return Promise.resolve();

            }


            /*
               Still loading
            */

            return new Promise(
                (resolve) => {


                    const finish =
                        () => {


                            cleanup();


                            if (

                                typeof
                                media.decode ===
                                "function"

                            ) {


                                media
                                    .decode()
                                    .catch(
                                        () => {}
                                    )
                                    .finally(
                                        resolve
                                    );


                            }

                            else {


                                resolve();


                            }


                        };


                    const cleanup =
                        () => {


                            media.removeEventListener(
                                "load",
                                finish
                            );


                            media.removeEventListener(
                                "error",
                                finish
                            );


                        };


                    media.addEventListener(

                        "load",

                        finish,

                        {
                            once: true
                        }

                    );


                    /*
                       Continue even if image is broken.
                    */

                    media.addEventListener(

                        "error",

                        finish,

                        {
                            once: true
                        }

                    );


                }
            );

        }


        /* ================================
           VIDEO
        ================================= */

        if (
            media.tagName ===
            "VIDEO"
        ) {


            if (
                media.readyState >=
                2
            ) {

                return Promise.resolve();

            }


            return new Promise(
                (resolve) => {


                    const finish =
                        () => {


                            cleanup();

                            resolve();


                        };


                    const cleanup =
                        () => {


                            media.removeEventListener(
                                "loadeddata",
                                finish
                            );


                            media.removeEventListener(
                                "error",
                                finish
                            );


                        };


                    media.addEventListener(

                        "loadeddata",

                        finish,

                        {
                            once: true
                        }

                    );


                    media.addEventListener(

                        "error",

                        finish,

                        {
                            once: true
                        }

                    );


                }
            );

        }


        return Promise.resolve();

    }


    /* =====================================================
       TIMEOUT
    ===================================================== */

    function withTimeout(
        promise,
        milliseconds
    ) {


        return Promise.race([


            promise,


            new Promise(
                (resolve) => {


                    setTimeout(

                        resolve,

                        milliseconds

                    );


                }
            )


        ]);

    }


    /* =====================================================
       DELAY
    ===================================================== */

    function delay(milliseconds) {


        return new Promise(
            (resolve) => {


                setTimeout(

                    resolve,

                    milliseconds

                );


            }
        );

    }


    /* =====================================================
       REMOVE LOADER
    ===================================================== */

    async function removeLoader() {


        const elapsed =

            performance.now()

            -

            startTime;


        const remainingMinimum =

            Math.max(

                0,

                MIN_VISIBLE_TIME -
                elapsed

            );


        if (
            remainingMinimum >
            0
        ) {


            await delay(
                remainingMinimum
            );


        }


        const loader =

            document.getElementById(
                LOADER_ID
            );


        /*
           Reveal actual page
        */

        ROOT.classList.remove(
            "della-loading"
        );


        if (!loader) {


            stopShineAnimation();

            return;

        }


        /*
           Fade skeleton
        */

        requestAnimationFrame(
            () => {


                loader.classList.add(
                    "is-exiting"
                );


            }
        );


        /*
           Remove skeleton
        */

        setTimeout(
            () => {


                stopShineAnimation();

                loader.remove();


            },

            EXIT_DURATION

        );

    }


    /* =====================================================
       START
    ===================================================== */

    async function startDellaLoader() {


        await waitForDOM();


        const loader =
            createLoader();


        if (

            loader

            &&

            loader.dataset.shineRunning !==
            "true"

        ) {


            startShineAnimation(
                loader
            );


        }


        const criticalMedia =
            getCriticalMedia();


        await withTimeout(

            waitForMedia(
                criticalMedia
            ),

            MAX_CRITICAL_WAIT

        );


        await removeLoader();

    }


    startDellaLoader();


    /* =====================================================
       BACK / FORWARD CACHE
    ===================================================== */

    window.addEventListener(

        "pageshow",

        (event) => {


            if (
                !event.persisted
            ) {

                return;

            }


            ROOT.classList.remove(
                "della-loading"
            );


            stopShineAnimation();


            const loader =

                document.getElementById(
                    LOADER_ID
                );


            if (loader) {

                loader.remove();

            }


        }

    );

})();