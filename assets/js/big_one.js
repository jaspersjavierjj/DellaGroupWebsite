/*
=========================================================
 DELLA GROUP
 STRATEGIC ENGAGEMENT ARTICLE SYSTEM

 FEATURES
 - One reusable article HTML template
 - One shared article database
 - Dynamic title / date / description / caption
 - Unlimited article gallery images
 - 1 main image + 3 preview images
 - Previous / next navigation
 - Click thumbnail to make it the main image
 - Smooth fade-out / fade-in image transition
 - Robust image-path fallback
 - Smooth one-time scroll reveal
=========================================================
*/

(function () {

    async function initEngagementArticle() {

        console.log("Engagement Article System loaded");


        /* =====================================================
           ENABLE ARTICLE REVEAL
        ====================================================== */

        const html = document.documentElement;

        html.classList.add(
            "eng-article-reveal-enabled"
        );


        /* =====================================================
           IMAGE PATH GENERATOR

           The system can automatically try different:
           - folder names
           - extensions

           This is useful while working locally and when
           filenames/extensions may differ slightly.
        ====================================================== */

        function createImageCandidates(
            folders,
            filename,
            extensions,
            fallback = null
        ) {

            const candidates = [];


            folders.forEach((folder) => {

                extensions.forEach((extension) => {

                    candidates.push(
                        `/assets/images/img/engagement/${folder}/${filename}.${extension}`
                    );

                });

            });


            if (fallback) {

                candidates.push(
                    fallback
                );

            }


            return candidates;

        }


        /* =====================================================
           BIG ONE IMAGE FOLDER OPTIONS
        ====================================================== */

        const bigOneFolders = [

            "BigOne",

            "Big_One",

            "bigone",

            "big_one"

        ];


        /* =====================================================
           EXTENSION OPTIONS
        ====================================================== */

        const jpegFirst = [

            "jpeg",

            "jpg",

            "JPEG",

            "JPG",

            "png",

            "PNG",

            "webp",

            "WEBP"

        ];


        const pngFirst = [

            "png",

            "PNG",

            "jpeg",

            "jpg",

            "JPEG",

            "JPG",

            "webp",

            "WEBP"

        ];


        /* =====================================================
           ARTICLE DATABASE

           ADD YOUR ARTICLES HERE.

           gallery can contain:

           1 photo
           4 photos
           6 photos
           10 photos
           etc.

           There is no fixed limit.
        ====================================================== */

        const articleDatabase = {


            /* =================================================
               ARTICLE 01
               PREPARING FOR THE BIG ONE
            ================================================= */

            "big-one": {

                title:
                    "Preparing for the Big One",


                date:
                    "04/30/2026",


                /* =============================================
                   GALLERY

                   Photo 1 = initial main image

                   Photos 2-4 =
                   initial three small previews

                   Photos 5-6 =
                   accessible through arrows
                ============================================= */

                gallery: [


                    /* PHOTO 01 */

                    createImageCandidates(

                        bigOneFolders,

                        "DELLAGROUP_Military_Briefing_Meeting",

                        jpegFirst,

                        "/assets/images/img/engagement/Big_One.webp"

                    ),


                    /* PHOTO 02 */

                    createImageCandidates(

                        bigOneFolders,

                        "DELLAGROUP_Operational_Capabilities_Briefing",

                        jpegFirst,

                        "/assets/images/img/engagement/Big_One.webp"

                    ),


                    /* PHOTO 03 */

                    createImageCandidates(

                        bigOneFolders,

                        "DELLAGROUP_Operational_Capabilities_Presentation",

                        jpegFirst,

                        "/assets/images/img/engagement/Big_One.webp"

                    ),


                    /* PHOTO 04 */

                    createImageCandidates(

                        bigOneFolders,

                        "DELLAGROUP_Outdoor_Equipment_Demonstration",

                        jpegFirst,

                        "/assets/images/img/engagement/Big_One.webp"

                    ),


                    /* PHOTO 05 */

                    createImageCandidates(

                        bigOneFolders,

                        "DELLAGROUP_Outdoor_Operational_Demonstration",

                        pngFirst,

                        "/assets/images/img/engagement/Big_One.webp"

                    ),


                    /* PHOTO 06 */

                    createImageCandidates(

                        bigOneFolders,

                        "DELLAGROUP_Field_Equipment_Inspection",

                        pngFirst,

                        "/assets/images/img/engagement/Big_One.webp"

                    )

                ],


                /* =============================================
                   ARTICLE DESCRIPTION
                ============================================= */

                paragraphs: [

                    `
                    DELLA Defense presented its Modular Disaster
                    Sustainment System (MDSS) to the National
                    Capital Region Command (NCRCOM), bringing
                    together representatives from the military,
                    civil defense, disaster-response, and
                    operational sectors to discuss preparedness
                    for a potential 7.2-magnitude earthquake
                    scenario.
                    `,

                    `
                    The engagement focused on a critical question:
                    How do we sustain affected communities and
                    responders when critical infrastructure is
                    disrupted?
                    `,

                    `
                    MDSS addresses this challenge through an
                    integrated, scalable system combining shelter,
                    food, water, sanitation, medical support,
                    power, command, logistics, and autonomous
                    capabilities.
                    `

                ],


                /* =============================================
                   ARTICLE CAPTION
                ============================================= */

                caption:
                    `
                    DELLA Defense’s engagement with NCRCOM focused
                    on the Modular Disaster Sustainment System
                    (MDSS) as an integrated and scalable approach
                    to sustaining affected communities and
                    responders during a major disaster scenario,
                    bringing together shelter, food, water,
                    sanitation, medical support, power, command,
                    logistics, and autonomous capabilities.
                    `

            },



            /* =================================================
               ARTICLE 02
               OFFICE OF THE ARMY QUARTERMASTER
            ================================================= */

            "army-quartermaster": {

            title:
                "Office of the Army Quartermaster",


            date:
                "06/03/2026",


            gallery: [

                [
                    "/assets/images/img/engagement/Office-of-the-Army/Army_Quartermaster.jpg"
                ],


                [
                    "/assets/images/img/engagement/Office-of-the-Army/DELLAGROUP_Portable_AC_Generator_Equipment_Demonstration_HD.webp"
                ],


                [
                    "/assets/images/img/engagement/Office-of-the-Army/DELLAGROUP_Defense_Capability_Showcase_Event_HD.webp"
                ],


                [
                    "/assets/images/img/engagement/Office-of-the-Army/DELLAGROUP_Field_Capability_Briefing_HD.webp"
                ],


                [
                    "/assets/images/img/engagement/Office-of-the-Army/DELLAGROUP_Rapid_Deployment_Shelter_Inspection_HD.webp"
                ],


                [
                    "/assets/images/img/engagement/Office-of-the-Army/DELLAGROUP_Industrial_System_Demonstration_HD.webp"
                ],


                [
                    "/assets/images/img/engagement/Office-of-the-Army/DELLAGROUP_Hydraulic_Rescue_Tool_Demonstration_HD.webp"
                ],


                [
                    "/assets/images/img/engagement/Office-of-the-Army/DELLAGROUP_Field_Shower_System_Demonstration_HD.webp"
                ],


                [
                    "/assets/images/img/engagement/Office-of-the-Army/DELLAGROUP_Field_Shelter_System_Demonstration_HD.webp"
                ],


                [
                    "/assets/images/img/engagement/Office-of-the-Army/DELLAGROUP_Field_Gear_Inspection_and_Evaluation_HD.webp"
                ]

            ],


            paragraphs: [

                `
                DELLA Defense presented its Survivable Sustainment
                Systems Architecture to the Office of the Army
                Quartermaster, Headquarters Philippine Army, at Fort
                Andres Bonifacio, Metro Manila.
                `,


                `
                The presentation highlighted DELLA Defense’s
                three-tier architecture:
                `,


                `
                TIER 1 — Human Survivability Systems.
                Protect and sustain the individual warfighter.
                `,


                `
                TIER 2 — Mobile Sustainment Infrastructure.
                Provide distributed, deployable, and relocatable
                sustainment capabilities.
                `,


                `
                TIER 3 — Autonomous Sustainment Systems.
                Integrate ISR, reconnaissance, autonomous logistics,
                and unmanned systems to extend sustainment across
                the operational environment.
                `,


                `
                Together, the architecture provides a layered
                sustainment ecosystem—from the individual
                warfighter, to mobile field infrastructure,
                to autonomous systems—designed to maintain
                operational continuity in demanding environments.
                `

            ],


            caption:
                `
                DELLA Defense presented its Survivable Sustainment
                Systems Architecture to the Office of the Army
                Quartermaster, connecting human survivability,
                deployable mobile infrastructure, and autonomous
                sustainment capabilities into a layered operational
                support ecosystem.
                `

        },



            /* =================================================
               ARTICLE 03
               PHILIPPINE ARMY ARTILLERY REGIMENT
            ================================================= */

            "army-artillery": {

                title:
                    "Philippine Army Artillery Regiment",


                date:
                    "09/13/2026",


                gallery: [

                    [
                        "/assets/images/img/engagement/Philippine_Army_Artillery.jpg"
                    ]

                ],


                paragraphs: [

                    `
                    DELLA DEFENSE conducted a live field
                    demonstration of its proposed Artillery
                    Secure Communications System for the
                    Philippine Army Artillery Regiment in
                    Nueva Ecija.
                    `,

                    `
                    The activity featured Sarkar Tactical’s
                    Warcom5 Tactical Headset, providing active
                    digital hearing protection, approximately
                    30 dB active noise reduction, and
                    situational awareness for artillery
                    operators.
                    `,

                    `
                    The headset was integrated with the Tait
                    TP9355 DMR Radio System, providing AES-256
                    encrypted digital radio communications
                    through a unified operator platform.
                    `,

                    `
                    The demonstration highlighted DELLA
                    DEFENSE’s role in connecting international
                    defense technology with Philippine Army
                    requirements, supporting enhanced operator
                    protection, secure communications, and
                    operational readiness.
                    `

                ],


                caption:
                    `
                    DELLA DEFENSE demonstrated an integrated
                    artillery communications setup combining
                    tactical hearing protection, situational
                    awareness, and AES-256 encrypted digital
                    radio communications to support operator
                    protection and operational readiness.
                    `

            }

        };


        /* =====================================================
           GET ARTICLE FROM URL

           Examples:

           Big_One.html?article=big-one

           Big_One.html?article=army-quartermaster

           Big_One.html?article=army-artillery
        ====================================================== */

        const urlParameters =
            new URLSearchParams(
                window.location.search
            );


        const requestedArticle =
            urlParameters.get(
                "article"
            );


        const defaultArticle =
            "big-one";


        const articleKey =

            requestedArticle &&
            articleDatabase[
                requestedArticle
            ]

                ? requestedArticle

                : defaultArticle;


        const article =
            articleDatabase[
                articleKey
            ];


        console.log(
            "Loaded article:",
            articleKey
        );


        /* =====================================================
           GET HTML ELEMENTS
        ====================================================== */

        const articleTitle =
            document.getElementById(
                "articleTitle"
            );


        const articleDate =
            document.getElementById(
                "articleDate"
            );


        const articleBody =
            document.getElementById(
                "articleBody"
            );


        const articleCaption =
            document.getElementById(
                "articleCaption"
            );


        /* GALLERY */

        const gallery =
            document.getElementById(
                "articleGallery"
            );


        const articleImageMain =
            document.getElementById(
                "articleImageMain"
            );


        const articleImageSmall1 =
            document.getElementById(
                "articleImageSmall1"
            );


        const articleImageSmall2 =
            document.getElementById(
                "articleImageSmall2"
            );


        const articleImageSmall3 =
            document.getElementById(
                "articleImageSmall3"
            );


        const previousButton =
            document.getElementById(
                "articleGalleryPrev"
            );


        const nextButton =
            document.getElementById(
                "articleGalleryNext"
            );


        const thumbnailButtons =
            Array.from(

                document.querySelectorAll(
                    ".engagement-gallery-thumb"
                )

            );


        const smallFrames =
            Array.from(

                document.querySelectorAll(
                    ".engagement-article-gallery__small"
                )

            );


        /* =====================================================
           INSERT ARTICLE TITLE
        ====================================================== */

        if (articleTitle) {

            articleTitle.textContent =
                article.title;

        }


        /* =====================================================
           INSERT ARTICLE DATE
        ====================================================== */

        if (articleDate) {

            articleDate.textContent =
                article.date;

        }


        /* =====================================================
           BROWSER TAB TITLE
        ====================================================== */

        document.title =
            `${article.title} - Della Group`;


        /* =====================================================
           BUILD ARTICLE DESCRIPTION
        ====================================================== */

        if (articleBody) {

            articleBody.innerHTML =
                "";


            article.paragraphs.forEach(
                (paragraphText) => {

                    const paragraph =
                        document.createElement(
                            "p"
                        );


                    paragraph.textContent =

                        paragraphText

                            .replace(
                                /\s+/g,
                                " "
                            )

                            .trim();


                    articleBody.appendChild(
                        paragraph
                    );

                }
            );

        }


        /* =====================================================
           INSERT ARTICLE CAPTION
        ====================================================== */

        if (articleCaption) {

            articleCaption.textContent =

                article.caption

                    .replace(
                        /\s+/g,
                        " "
                    )

                    .trim();

        }


        /* =====================================================
           IMAGE RESOLVER

           Tries every possible image path until one works.
        ====================================================== */

        function resolveImageSource(
            sources
        ) {

            const sourceList =

                Array.isArray(
                    sources
                )

                    ? sources.filter(
                        Boolean
                    )

                    : [
                        sources
                    ].filter(
                        Boolean
                    );


            return new Promise(
                (resolve) => {


                    let index =
                        0;


                    function tryNext() {


                        /* =====================================
                           NO MORE PATHS
                        ===================================== */

                        if (
                            index >=
                            sourceList.length
                        ) {

                            console.error(
                                "No valid image found:",
                                sourceList
                            );


                            resolve(
                                "/assets/images/img/engagement/Big_One.webp"
                            );


                            return;

                        }


                        const source =
                            sourceList[
                                index
                            ];


                        index++;


                        const tester =
                            new Image();


                        tester.onload =
                            function () {


                                console.log(
                                    "✓ Gallery image loaded:",
                                    source
                                );


                                resolve(
                                    source
                                );

                            };


                        tester.onerror =
                            function () {


                                console.warn(
                                    "✗ Gallery image not found:",
                                    source
                                );


                                tryNext();

                            };


                        tester.src =
                            source;

                    }


                    tryNext();

                }
            );

        }


        /* =====================================================
           RESOLVE ALL ARTICLE GALLERY IMAGES

           Images are checked/preloaded before the gallery
           starts operating.
        ====================================================== */

        const resolvedGallery =

            await Promise.all(

                article.gallery.map(
                    (imageCandidates) =>

                        resolveImageSource(
                            imageCandidates
                        )

                )

            );


        /* =====================================================
           ENSURE AT LEAST ONE IMAGE EXISTS
        ====================================================== */

        if (
            resolvedGallery.length === 0
        ) {

            resolvedGallery.push(

                "/assets/images/img/engagement/Big_One.webp"

            );

        }


        console.log(
            "Article gallery photos:",
            resolvedGallery.length
        );


        /* =====================================================
           GALLERY STATE
        ====================================================== */

        let currentImageIndex =
            0;


        let visibleThumbnailIndices =
            [];


        let galleryAnimating =
            false;


        /*
        Fade timings.

        You can increase these if you want
        a slower transition.
        */

        const fadeOutDuration =
            260;


        const fadeInDuration =
            380;


        /* =====================================================
           NORMALIZE INDEX

           Makes the gallery loop forever.

           Example:

           Last photo → Next → Photo 1

           Photo 1 → Previous → Last photo
        ====================================================== */

        function normalizeIndex(
            index
        ) {

            const total =
                resolvedGallery.length;


            return (

                (
                    index %
                    total
                )

                +

                total

            ) % total;

        }


        /* =====================================================
           GET THREE THUMBNAILS AFTER MAIN IMAGE

           6 PHOTO EXAMPLE

           Main 1
           → small 2, 3, 4

           Main 2
           → small 3, 4, 5

           Main 3
           → small 4, 5, 6

           Main 4
           → small 5, 6, 1
        ====================================================== */

        function getThumbnailIndices() {

            const indices =
                [];


            const total =
                resolvedGallery.length;


            if (
                total <= 1
            ) {

                return indices;

            }


            const numberToShow =

                Math.min(

                    3,

                    total - 1

                );


            for (

                let offset = 1;

                offset <=
                numberToShow;

                offset++

            ) {

                indices.push(

                    normalizeIndex(

                        currentImageIndex +
                        offset

                    )

                );

            }


            return indices;

        }


        /* =====================================================
           APPLY CURRENT GALLERY STATE TO HTML
        ====================================================== */

        function applyGalleryImages() {


            /* =============================================
               MAIN IMAGE
            ============================================= */

            if (
                articleImageMain
            ) {

                articleImageMain.src =

                    resolvedGallery[
                        currentImageIndex
                    ];


                articleImageMain.alt =

                    `${article.title} - Photo ${currentImageIndex + 1}`;

            }


            /* =============================================
               DETERMINE SMALL IMAGE INDICES
            ============================================= */

            visibleThumbnailIndices =
                getThumbnailIndices();


            const thumbnailImages = [

                articleImageSmall1,

                articleImageSmall2,

                articleImageSmall3

            ];


            /* =============================================
               UPDATE SMALL IMAGES
            ============================================= */

            thumbnailImages.forEach(
                (
                    imageElement,
                    slot
                ) => {


                    const frame =
                        smallFrames[
                            slot
                        ];


                    const button =
                        thumbnailButtons[
                            slot
                        ];


                    const targetIndex =

                        visibleThumbnailIndices[
                            slot
                        ];


                    /* =====================================
                       NO IMAGE FOR THIS SLOT
                    ===================================== */

                    if (
                        targetIndex ===
                        undefined
                    ) {

                        if (frame) {

                            frame.hidden =
                                true;

                        }


                        return;

                    }


                    /* =====================================
                       SHOW FRAME
                    ===================================== */

                    if (frame) {

                        frame.hidden =
                            false;

                    }


                    /* =====================================
                       SET THUMBNAIL IMAGE
                    ===================================== */

                    if (imageElement) {

                        imageElement.src =

                            resolvedGallery[
                                targetIndex
                            ];


                        imageElement.alt =

                            `${article.title} - Photo ${targetIndex + 1}`;

                    }


                    /* =====================================
                       ACCESSIBILITY LABEL
                    ===================================== */

                    if (button) {

                        button.setAttribute(

                            "aria-label",

                            `View ${article.title} photo ${targetIndex + 1}`

                        );

                    }

                }
            );


            /* =============================================
               LEFT / RIGHT ARROWS

               Arrows appear whenever article has
               MORE THAN ONE image.

               2 photos → arrows
               4 photos → arrows
               6 photos → arrows
               10 photos → arrows
            ============================================= */

            const hasMultiplePhotos =

                resolvedGallery.length >
                1;


            if (previousButton) {

                previousButton.hidden =
                    !hasMultiplePhotos;

            }


            if (nextButton) {

                nextButton.hidden =
                    !hasMultiplePhotos;

            }

        }


        /* =====================================================
           WAIT HELPER
        ====================================================== */

        function wait(
            duration
        ) {

            return new Promise(

                (resolve) =>

                    window.setTimeout(

                        resolve,

                        duration

                    )

            );

        }


        /* =====================================================
           CHANGE ACTIVE IMAGE WITH FADE TRANSITION
        ====================================================== */

        async function showImage(
            targetIndex,
            animate = true
        ) {


            /*
            Do not allow another click while
            one transition is running.
            */

            if (
                galleryAnimating
            ) {

                return;

            }


            const normalizedTarget =

                normalizeIndex(
                    targetIndex
                );


            /*
            Do nothing when clicking current image.
            */

            if (

                normalizedTarget ===
                currentImageIndex

                &&

                animate

            ) {

                return;

            }


            galleryAnimating =
                true;


            /* =============================================
               FADE OUT
            ============================================= */

            if (
                animate &&
                gallery
            ) {

                gallery.classList.add(
                    "is-switching"
                );


                await wait(
                    fadeOutDuration
                );

            }


            /* =============================================
               CHANGE ACTIVE INDEX
            ============================================= */

            currentImageIndex =
                normalizedTarget;


            /* =============================================
               CHANGE IMAGE SOURCES
            ============================================= */

            applyGalleryImages();


            /* =============================================
               WAIT TWO FRAMES

               This ensures the browser registers the
               newly changed image sources before the
               fade-in begins.
            ============================================= */

            await new Promise(
                (resolve) => {

                    requestAnimationFrame(
                        () => {

                            requestAnimationFrame(
                                resolve
                            );

                        }
                    );

                }
            );


            /* =============================================
               FADE IN
            ============================================= */

            if (gallery) {

                gallery.classList.remove(
                    "is-switching"
                );

            }


            await wait(

                animate

                    ? fadeInDuration

                    : 0

            );


            galleryAnimating =
                false;

        }


        /* =====================================================
           PREVIOUS BUTTON
        ====================================================== */

        if (previousButton) {

            previousButton.addEventListener(

                "click",

                () => {

                    showImage(

                        currentImageIndex -
                        1

                    );

                }

            );

        }


        /* =====================================================
           NEXT BUTTON
        ====================================================== */

        if (nextButton) {

            nextButton.addEventListener(

                "click",

                () => {

                    showImage(

                        currentImageIndex +
                        1

                    );

                }

            );

        }


        /* =====================================================
           CLICK SMALL IMAGE

           Clicking any thumbnail promotes that
           image into the large main-image position.
        ====================================================== */

        thumbnailButtons.forEach(
            (
                button,
                slot
            ) => {

                button.addEventListener(

                    "click",

                    () => {


                        const targetIndex =

                            visibleThumbnailIndices[
                                slot
                            ];


                        if (
                            targetIndex ===
                            undefined
                        ) {

                            return;

                        }


                        showImage(
                            targetIndex
                        );

                    }

                );

            }
        );


        /* =====================================================
           KEYBOARD CONTROLS

           LEFT ARROW
           → previous image

           RIGHT ARROW
           → next image
        ====================================================== */

        document.addEventListener(

            "keydown",

            (event) => {


                const activeTag =

                    document
                        .activeElement
                        ?.tagName
                        ?.toLowerCase();


                /*
                Do not interfere with form fields.
                */

                if (

                    activeTag ===
                    "input"

                    ||

                    activeTag ===
                    "textarea"

                ) {

                    return;

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    showImage(

                        currentImageIndex -
                        1

                    );

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    showImage(

                        currentImageIndex +
                        1

                    );

                }

            }

        );


        /* =====================================================
           INITIAL GALLERY RENDER
        ====================================================== */

        applyGalleryImages();


        /* =====================================================
           SCROLL REVEAL SYSTEM
        ====================================================== */

        const heroTargets =
            [];


        const scrollTargets =
            [];


        /* =====================================================
           PREPARE REVEAL
        ====================================================== */

        function prepareReveal(
            element,
            options = {}
        ) {

            if (!element) {

                return null;

            }


            const {

                delay = 0,

                type = "up",

                hero = false

            } = options;


            element.classList.add(
                "eng-article-reveal"
            );


            /* =============================================
               LEFT REVEAL
            ============================================= */

            if (
                type === "left"
            ) {

                element.classList.add(
                    "eng-article-reveal-left"
                );

            }


            /* =============================================
               SCALE REVEAL
            ============================================= */

            if (
                type === "scale"
            ) {

                element.classList.add(
                    "eng-article-reveal-scale"
                );

            }


            /* =============================================
               DELAY
            ============================================= */

            element.style.setProperty(

                "--eng-article-delay",

                `${delay}ms`

            );


            /* =============================================
               ADD TO CORRECT ARRAY
            ============================================= */

            if (hero) {

                heroTargets.push(
                    element
                );

            } else {

                scrollTargets.push(
                    element
                );

            }


            return element;

        }


        /* =====================================================
           ARTICLE HEADER REVEAL
        ====================================================== */

        prepareReveal(

            document.querySelector(
                ".engagement-article-eyebrow"
            ),

            {
                delay: 60,
                hero: true
            }

        );


        prepareReveal(

            articleTitle,

            {
                delay: 160,
                hero: true
            }

        );


        prepareReveal(

            articleDate,

            {
                delay: 260,
                hero: true
            }

        );


        /* =====================================================
           LARGE IMAGE REVEAL
        ====================================================== */

        prepareReveal(

            document.querySelector(
                ".engagement-article-gallery__large"
            ),

            {
                type: "scale"
            }

        );


        /* =====================================================
           SMALL PHOTO REVEALS
        ====================================================== */

        document

            .querySelectorAll(
                ".engagement-article-gallery__small"
            )

            .forEach(
                (
                    image,
                    index
                ) => {


                    prepareReveal(

                        image,

                        {

                            delay:
                                100 +
                                index * 90,

                            type:
                                "left"

                        }

                    );

                }
            );


        /* =====================================================
           SEPARATOR REVEAL
        ====================================================== */

        prepareReveal(

            document.querySelector(
                ".engagement-article-separator__line"
            )

        );


        /* =====================================================
           ARTICLE DESCRIPTION REVEAL
        ====================================================== */

        prepareReveal(

            articleBody,

            {
                delay: 70
            }

        );


        /* =====================================================
           CAPTION REVEAL
        ====================================================== */

        prepareReveal(

            articleCaption,

            {
                delay: 120
            }

        );


        /* =====================================================
           FOOTER REVEAL
        ====================================================== */

        prepareReveal(

            document.querySelector(
                ".footer-left"
            )

        );


        prepareReveal(

            document.querySelector(
                ".footer-columns"
            ),

            {
                delay: 120
            }

        );


        /* =====================================================
           FORCE INITIAL HIDDEN STATE
        ====================================================== */

        void document.body.offsetHeight;


        /* =====================================================
           HEADER / HERO LOAD REVEAL
        ====================================================== */

        window.setTimeout(

            () => {


                heroTargets.forEach(
                    (element) => {


                        element.classList.add(
                            "eng-article-reveal-visible"
                        );


                    }
                );


            },

            120

        );


        /* =====================================================
           FALLBACK FOR OLD BROWSERS
        ====================================================== */

        if (
            !(
                "IntersectionObserver"
                in window
            )
        ) {

            scrollTargets.forEach(
                (element) => {


                    element.classList.add(
                        "eng-article-reveal-visible"
                    );


                }
            );


            return;

        }


        /* =====================================================
           INTERSECTION OBSERVER
        ====================================================== */

        const observer =

            new IntersectionObserver(

                (
                    entries,
                    revealObserver
                ) => {


                    entries.forEach(
                        (entry) => {


                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "eng-article-reveal-visible"
                            );


                            /*
                            Reveal once only.
                            */

                            revealObserver.unobserve(
                                entry.target
                            );


                        }
                    );


                },

                {

                    threshold:
                        0.12,

                    rootMargin:
                        "0px 0px -70px 0px"

                }

            );


        /* =====================================================
           OBSERVE REVEAL ELEMENTS
        ====================================================== */

        scrollTargets.forEach(
            (element) => {


                observer.observe(
                    element
                );


            }
        );


        console.log(

            "Article reveal targets:",

            scrollTargets.length

        );

    }


    /* =====================================================
       SAFE INITIALIZATION
    ====================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(

            "DOMContentLoaded",

            () => {

                initEngagementArticle();

            },

            {
                once: true
            }

        );

    } else {

        initEngagementArticle();

    }

})();