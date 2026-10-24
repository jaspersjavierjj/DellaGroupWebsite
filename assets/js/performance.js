/* assets/js/performance.js — version 2 */
(() => {
    "use strict";

    if (window.dellaPerformanceV2Loaded) return;
    window.dellaPerformanceV2Loaded = true;

    function initialize() {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        /*
         * LIGHTER REVEAL EFFECTS
         * Keep movement and fading without animated blur.
         */
        const style = document.createElement("style");

        style.textContent = `
            html.reveal-ready .scroll-reveal {
                filter: none !important;
                will-change: auto !important;

                transition:
                    opacity 450ms ease var(--reveal-delay, 0ms),
                    transform 450ms ease var(--reveal-delay, 0ms)
                    !important;
            }

            html.reveal-ready .scroll-reveal.reveal-active {
                opacity: 1 !important;
                filter: none !important;
                transform: none !important;
            }

            /* Avoid blurring the entire long page. */
            .page-content.blur {
                filter: none !important;
                transition: none !important;
            }

            @media (prefers-reduced-motion: reduce) {
                html {
                    scroll-behavior: auto !important;
                }

                html.reveal-ready .scroll-reveal {
                    opacity: 1 !important;
                    transform: none !important;
                    filter: none !important;
                    transition: none !important;
                }

                .slide-progress-bar {
                    animation: none !important;
                }
            }
        `;

        document.head.appendChild(style);

        /*
         * IMAGE LOADING
         *
         * Promote nearby images from lazy to eager.
         * Do not remove or rewrite image URLs.
         */
        function loadImage(image) {
            image.loading = "eager";

            // Undo low priority set by the previous script.
            if (image.getAttribute("fetchpriority") === "low") {
                image.setAttribute("fetchpriority", "auto");
            }
        }

        const imageObserver =
            "IntersectionObserver" in window
                ? new IntersectionObserver(
                    entries => {
                        for (const entry of entries) {
                            if (!entry.isIntersecting) continue;

                            loadImage(entry.target);
                            imageObserver.unobserve(entry.target);
                        }
                    },
                    {
                        rootMargin: "1200px 0px",
                        threshold: 0
                    }
                )
                : null;

        for (const image of document.images) {
            if (!image.hasAttribute("decoding")) {
                image.decoding = "async";
            }

            const important = image.matches(`
                .nav-logo img,
                .hero-center-logo,
                .hero-image,
                [data-eager],
                [data-no-lazy],
                [fetchpriority="high"]
            `);

            if (
                important ||
                image.getAttribute("loading") === "eager" ||
                !imageObserver
            ) {
                loadImage(image);
                continue;
            }

            if (image.complete && image.naturalWidth > 0) {
                continue;
            }

            image.loading = "lazy";
            imageObserver.observe(image);
        }

        /*
         * REVEAL SAFEGUARD
         *
         * Reveal sections independently of image downloads.
         * Does not change inactive slideshow slides.
         */
        const revealElements = document.querySelectorAll(
            ".scroll-reveal"
        );

        const revealObserver =
            "IntersectionObserver" in window
                ? new IntersectionObserver(
                    entries => {
                        for (const entry of entries) {
                            if (!entry.isIntersecting) continue;

                            entry.target.classList.add(
                                "reveal-active"
                            );

                            revealObserver.unobserve(entry.target);
                        }
                    },
                    {
                        rootMargin: "100px 0px",
                        threshold: 0
                    }
                )
                : null;

        for (const element of revealElements) {
            if (reducedMotion.matches || !revealObserver) {
                element.classList.add("reveal-active");
            } else {
                revealObserver.observe(element);
            }
        }

        /*
         * BACKGROUND VIDEO
         *
         * Pause offscreen/background videos.
         * Leave videos with controls untouched.
         */
        const videos = Array.from(
            document.querySelectorAll(
                "video[autoplay][muted]:not([controls])"
            )
        );

        const visibleVideos = new Set();

        function updateVideo(video) {
            const shouldPlay =
                !document.hidden &&
                !reducedMotion.matches &&
                visibleVideos.has(video);

            if (!shouldPlay) {
                video.pause();
                return;
            }

            if (video.paused) {
                const request = video.play();

                request?.catch(() => {
                    // Autoplay may be restricted by the browser.
                });
            }
        }

        function updateVideos() {
            videos.forEach(updateVideo);
        }

        if ("IntersectionObserver" in window) {
            const videoObserver = new IntersectionObserver(
                entries => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) {
                            visibleVideos.add(entry.target);
                        } else {
                            visibleVideos.delete(entry.target);
                        }

                        updateVideo(entry.target);
                    }
                },
                { threshold: 0 }
            );

            for (const video of videos) {
                videoObserver.observe(video);
            }
        } else {
            videos.forEach(video => visibleVideos.add(video));
        }

        document.addEventListener(
            "visibilitychange",
            updateVideos
        );

        reducedMotion.addEventListener?.(
            "change",
            updateVideos
        );

        updateVideos();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );
    } else {
        initialize();
    }
})();