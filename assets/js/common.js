/* =========================================================
   DELLA — CROSS-PAGE SMOOTH SECTION NAVIGATION
========================================================= */

const DELLA_SECTION_KEY = "della-section-target";

/*
    Prevent browser from restoring an old scroll position
    when changing between pages.
*/
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


/* =========================================================
   CUSTOM SMOOTH SCROLL
========================================================= */

let dellaSectionAnimation = null;


function dellaNavbarOffset() {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) {
        return 20;
    }

    return (
        navbar.getBoundingClientRect().height +
        20
    );
}


function dellaEaseInOutCubic(t) {

    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}


function dellaSmoothScrollTo(
    target,
    duration = 1500
) {

    if (!target) return;


    if (dellaSectionAnimation) {

        cancelAnimationFrame(
            dellaSectionAnimation
        );

        dellaSectionAnimation = null;
    }


    const html =
        document.documentElement;


    const oldScrollBehavior =
        html.style.scrollBehavior;


    /*
        IMPORTANT:
        Disable CSS smooth scroll temporarily.

        This prevents:
        html {
            scroll-behavior: smooth;
        }

        from interfering with our custom animation.
    */
    html.style.scrollBehavior = "auto";


    const startPosition =
        window.scrollY ||
        window.pageYOffset ||
        0;


    const targetPosition =
        Math.max(
            0,

            target
                .getBoundingClientRect()
                .top +

            startPosition -

            dellaNavbarOffset()
        );


    const distance =
        targetPosition -
        startPosition;


    const startTime =
        performance.now();


    function animation(currentTime) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            dellaEaseInOutCubic(
                progress
            );


        window.scrollTo(
            0,
            startPosition +
            distance * eased
        );


        if (progress < 1) {

            dellaSectionAnimation =
                requestAnimationFrame(
                    animation
                );

        } else {

            window.scrollTo(
                0,
                targetPosition
            );


            dellaSectionAnimation =
                null;


            html.style.scrollBehavior =
                oldScrollBehavior;
        }
    }


    dellaSectionAnimation =
        requestAnimationFrame(
            animation
        );
}


/* =========================================================
   CLICK NAVBAR HASH LINK
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                "a[href]"
            );


        if (!link) return;


        /*
            Do not modify:
            CTRL + CLICK
            SHIFT + CLICK
            middle click
            target="_blank"
        */
        if (
            event.button !== 0 ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            link.target === "_blank"
        ) {

            return;
        }


        let destination;


        try {

            destination =
                new URL(
                    link.href,
                    window.location.href
                );

        } catch {

            return;
        }


        /*
            External website?
            Leave it alone.
        */
        if (
            destination.origin !==
            window.location.origin
        ) {

            return;
        }


        /*
            No #section?
            Leave normal navigation alone.
        */
        if (
            !destination.hash ||
            destination.hash === "#"
        ) {

            return;
        }


        const currentPath =
            window.location.pathname;


        const destinationPath =
            destination.pathname;


        /* =================================================
           SAME PAGE
        ================================================= */

        if (
            destinationPath ===
            currentPath
        ) {

            const sectionId =
                decodeURIComponent(
                    destination.hash.substring(1)
                );


            const section =
                document.getElementById(
                    sectionId
                );


            if (!section) return;


            event.preventDefault();


            /*
                Update URL without allowing browser
                to instantly jump.
            */
            history.pushState(
                null,
                "",
                destination.hash
            );


            dellaSmoothScrollTo(
                section,
                1500
            );


            return;
        }


        /* =================================================
           DIFFERENT PAGE

           Example:

           INDEX
             ↓
           Industrial.html#construction

           We DO NOT navigate with #construction.

           Instead:
           1. Save construction
           2. Open Industrial.html
           3. Wait until page completely loads
           4. Smooth scroll
        ================================================= */

        event.preventDefault();


        sessionStorage.setItem(
            DELLA_SECTION_KEY,
            JSON.stringify({
                path:
                    destination.pathname,

                search:
                    destination.search,

                hash:
                    destination.hash
            })
        );


        /*
            VERY IMPORTANT:

            DO NOT include destination.hash here.

            Correct:
            /pages/Industrial.html

            Wrong:
            /pages/Industrial.html#construction

            The wrong version causes the instant jump.
        */
        window.location.href =
            destination.pathname +
            destination.search;

    }
);


/* =========================================================
   DESTINATION PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    function () {

        let storedTarget;


        try {

            storedTarget =
                JSON.parse(
                    sessionStorage.getItem(
                        DELLA_SECTION_KEY
                    )
                );

        } catch {

            storedTarget = null;
        }


        if (!storedTarget) {
            return;
        }


        /*
            Make sure this is actually the page
            the user requested.
        */
        if (
            storedTarget.path !==
            window.location.pathname
        ) {

            return;
        }


        sessionStorage.removeItem(
            DELLA_SECTION_KEY
        );


        const sectionId =
            decodeURIComponent(
                storedTarget.hash.substring(1)
            );


        const targetSection =
            document.getElementById(
                sectionId
            );


        if (!targetSection) {

            console.warn(
                "Section ID not found:",
                sectionId
            );

            return;
        }


        /*
            Force destination page to begin at top.
        */
        document.documentElement.style.scrollBehavior =
            "auto";


        window.scrollTo(
            0,
            0
        );


        /*
            Update URL without triggering the
            browser's native instant hash jump.
        */
        history.replaceState(
            null,
            "",
            window.location.pathname +
            window.location.search +
            storedTarget.hash
        );


        /*
            Wait for final browser layout,
            then smoothly move down.
        */
        requestAnimationFrame(
            function () {

                requestAnimationFrame(
                    function () {

                        dellaSmoothScrollTo(
                            targetSection,
                            1500
                        );

                    }
                );

            }
        );

    }
);

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =================================================
           SCRAMBLE TEXT EFFECT
           Desktop: Hover
           Mobile: Reveal when visible
        ================================================= */

        const scrambleTargets =
            document.querySelectorAll(
                ".unit-card, .sector"
            );


        function scrambleText(paragraph) {

            if (!paragraph) return;

            const originalText =
                paragraph.dataset.text ||
                paragraph.innerText.trim();

            paragraph.dataset.text =
                originalText;

            clearInterval(
                paragraph.scrambleInterval
            );

            const chars =
                "abcdefghijklmnopqrstuvwxyz     ";

            const duration = 1500;
            const speed = 24;

            const startTime =
                performance.now();


            paragraph.scrambleInterval =
                setInterval(() => {

                    const elapsed =
                        performance.now() -
                        startTime;

                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );


                    paragraph.innerText =
                        originalText
                            .split("")
                            .map(
                                (
                                    char,
                                    index
                                ) => {

                                    if (
                                        char === " "
                                    ) {
                                        return " ";
                                    }

                                    const revealPoint =
                                        index /
                                        originalText.length;

                                    if (
                                        progress >
                                        revealPoint
                                    ) {
                                        return originalText[
                                            index
                                        ];
                                    }

                                    return chars[
                                        Math.floor(
                                            Math.random() *
                                            chars.length
                                        )
                                    ];
                                }
                            )
                            .join("");


                    if (progress >= 1) {

                        clearInterval(
                            paragraph
                                .scrambleInterval
                        );

                        paragraph.innerText =
                            originalText;
                    }

                }, speed);
        }


        scrambleTargets.forEach(
            (item) => {

                const paragraph =
                    item.querySelector("p");

                if (!paragraph) return;

                const originalText =
                    paragraph.dataset.text ||
                    paragraph.innerText.trim();

                paragraph.dataset.text =
                    originalText;


                item.addEventListener(
                    "mouseenter",
                    () => {

                        if (
                            window.innerWidth >
                            768
                        ) {

                            item.classList.add(
                                "is-visible"
                            );

                            scrambleText(
                                paragraph
                            );
                        }
                    }
                );


                item.addEventListener(
                    "mouseleave",
                    () => {

                        if (
                            window.innerWidth >
                            768
                        ) {

                            clearInterval(
                                paragraph
                                    .scrambleInterval
                            );

                            paragraph.innerText =
                                originalText;

                            item.classList.remove(
                                "is-visible"
                            );
                        }
                    }
                );
            }
        );


        /* =================================================
           MOBILE SCROLL REVEAL
        ================================================= */

        if (
            "IntersectionObserver" in window &&
            scrambleTargets.length > 0
        ) {

            const revealObserver =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }

                                const item =
                                    entry.target;

                                const paragraph =
                                    item.querySelector(
                                        "p"
                                    );

                                item.classList.add(
                                    "is-visible"
                                );


                                if (
                                    paragraph &&
                                    !item.dataset
                                        .scrambledOnce
                                ) {

                                    scrambleText(
                                        paragraph
                                    );

                                    item.dataset
                                        .scrambledOnce =
                                        "true";
                                }
                            }
                        );
                    },
                    {
                        threshold: 0.35
                    }
                );


            scrambleTargets.forEach(
                (item) => {
                    revealObserver.observe(
                        item
                    );
                }
            );
        }


        /* =================================================
           DELLA DELIVERS SLIDER
        ================================================= */

        const slides =
            document.querySelectorAll(
                ".delivers-slider .slide"
            );

        const indicators =
            document.querySelectorAll(
                ".delivers-slider .indicator"
            );

        const progressBar =
            document.querySelector(
                ".slide-progress-bar"
            );

        const prevBtn =
            document.querySelector(
                ".slider-arrow.prev"
            );

        const nextBtn =
            document.querySelector(
                ".slider-arrow.next"
            );


        let currentSlide = 0;
        let slideInterval = null;


        function resetProgress() {

            if (!progressBar) return;

            progressBar.style.animation =
                "none";

            void progressBar.offsetWidth;

            progressBar.style.animation =
                "progressLoad 5s linear forwards";
        }


        function showSlide(index) {

            if (!slides.length) return;

            slides.forEach(
                (slide) => {
                    slide.classList.remove(
                        "active"
                    );
                }
            );

            indicators.forEach(
                (indicator) => {
                    indicator.classList.remove(
                        "active"
                    );
                }
            );


            const targetSlide =
                slides[index];

            if (!targetSlide) return;


            targetSlide.classList.add(
                "active"
            );


            if (indicators[index]) {

                indicators[index]
                    .classList.add(
                        "active"
                    );
            }


            resetProgress();
        }


        function nextSlide() {

            if (!slides.length) return;

            currentSlide =
                (currentSlide + 1) %
                slides.length;

            showSlide(currentSlide);
        }


        function prevSlide() {

            if (!slides.length) return;

            currentSlide =
                (
                    currentSlide -
                    1 +
                    slides.length
                ) %
                slides.length;

            showSlide(currentSlide);
        }


        function startSlider() {

            if (!slides.length) return;

            clearInterval(
                slideInterval
            );

            slideInterval =
                setInterval(
                    nextSlide,
                    5000
                );
        }


        if (nextBtn) {

            nextBtn.addEventListener(
                "click",
                () => {

                    nextSlide();
                    startSlider();
                }
            );
        }


        if (prevBtn) {

            prevBtn.addEventListener(
                "click",
                () => {

                    prevSlide();
                    startSlider();
                }
            );
        }


        if (slides.length > 0) {

            showSlide(
                currentSlide
            );

            startSlider();
        }


        /* =================================================
           SCROLL TO TOP BUTTON

           IMPORTANT:
           - Starts moving immediately
           - No 1-second pause
           - No animation queue
           - Clicking again cancels previous animation
           - Fast smooth Ease-Out motion
        ================================================= */

        const scrollToTopButton =
            document.querySelector(
                ".scroll-to-top"
            );


        if (scrollToTopButton) {

            let scrollAnimationId =
                null;


            function updateScrollToTopButton() {

                scrollToTopButton
                    .classList.toggle(
                        "is-visible",
                        window.scrollY > 500
                    );
            }


            function stopScrollAnimation() {

                if (
                    scrollAnimationId !==
                    null
                ) {

                    cancelAnimationFrame(
                        scrollAnimationId
                    );

                    scrollAnimationId =
                        null;
                }
            }


            function scrollImmediatelySmoothToTop() {

                // Cancel any existing scroll animation
                stopScrollAnimation();

                const startPosition =
                    window.scrollY ||
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    0;

                if (startPosition <= 0) {
                    window.scrollTo(0, 0);
                    return;
                }

                // Smooth but not too fast
                const duration = 1000;

                const startTime = performance.now();

                const html = document.documentElement;
                const previousBehavior = html.style.scrollBehavior;

                // Prevent CSS smooth-scroll from interfering
                html.style.scrollBehavior = "auto";

                function easeOutQuart(t) {
                    return 1 - Math.pow(1 - t, 4);
                }

                function animateScroll(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );

                    const eased =
                        easeOutQuart(progress);

                    const position =
                        startPosition *
                        (1 - eased);

                    window.scrollTo(
                        0,
                        position
                    );

                    if (progress < 1) {

                        scrollAnimationId =
                            requestAnimationFrame(
                                animateScroll
                            );

                    } else {

                        window.scrollTo(0, 0);

                        scrollAnimationId = null;

                        html.style.scrollBehavior =
                            previousBehavior;
                    }
                }

                scrollAnimationId =
                    requestAnimationFrame(
                        animateScroll
                    );
            }


            scrollToTopButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    scrollImmediatelySmoothToTop();
                }
            );


            window.addEventListener(
                "scroll",
                updateScrollToTopButton,
                {
                    passive: true
                }
            );


            updateScrollToTopButton();
        }
    }
);