/*
=========================================================
 TRUSTED BY PAGE
 - Global map interaction
 - Strong smooth scroll reveal
=========================================================
*/

(function () {

    function initTrustedPage() {

        console.log("TrustedBy JS loaded successfully");


        /* =====================================================
           MAP INTERACTION
        ====================================================== */

        const pins = document.querySelectorAll(".map-pin");

        pins.forEach((pin) => {

            pin.addEventListener("click", (event) => {

                event.stopPropagation();

                pins.forEach((item) => {

                    if (item !== pin) {
                        item.classList.remove("active");
                    }

                });

                pin.classList.toggle("active");

            });

        });


        document.addEventListener("click", () => {

            pins.forEach((pin) => {
                pin.classList.remove("active");
            });

        });


        /* =====================================================
           TRUSTED BY REVEAL SYSTEM
        ====================================================== */

        const html = document.documentElement;

        html.classList.add("tb-reveal-enabled");


        const heroTargets = [
            document.querySelector(".trustedby-intro__eyebrow"),
            document.querySelector(".trustedby-intro h1")
        ].filter(Boolean);


        const scrollTargets = [];


        /* =====================================================
           PREPARE ELEMENT
        ====================================================== */

        function addReveal(element, delay = 0, type = "up") {

            if (!element) return;

            element.classList.add("tb-reveal");

            if (type === "hero") {
                element.classList.add("tb-reveal-hero");
            }

            if (type === "scale") {
                element.classList.add("tb-reveal-scale");
            }

            element.style.setProperty(
                "--tb-reveal-delay",
                `${delay}ms`
            );

            return element;
        }


        /* =====================================================
           HERO
        ====================================================== */

        addReveal(
            document.querySelector(".trustedby-intro__eyebrow"),
            100,
            "hero"
        );

        addReveal(
            document.querySelector(".trustedby-intro h1"),
            230,
            "hero"
        );


        /* =====================================================
           CLIENT SECTOR HEADING
        ====================================================== */

        scrollTargets.push(

            addReveal(
                document.querySelector(
                    ".trustedby-sectors__heading > p"
                ),
                0
            ),

            addReveal(
                document.querySelector(
                    ".trustedby-sectors__heading > div"
                ),
                120
            )

        );


        /* =====================================================
           CLIENT GROUPS
        ====================================================== */

        document
            .querySelectorAll(".trustedby-group")
            .forEach((group) => {

                scrollTargets.push(

                    addReveal(
                        group.querySelector(
                            ".trustedby-group__title"
                        ),
                        0
                    )

                );


                scrollTargets.push(

                    addReveal(
                        group.querySelector(
                            ".trustedby-logo-grid"
                        ),
                        120,
                        "scale"
                    )

                );

            });


        /* =====================================================
           GLOBAL REACH
        ====================================================== */

        scrollTargets.push(

            addReveal(
                document.querySelector(
                    ".trustedby-reach__heading > p"
                ),
                0
            ),

            addReveal(
                document.querySelector(
                    ".trustedby-reach__heading > div"
                ),
                120
            ),

            addReveal(
                document.querySelector(
                    ".trustedby-reach__map"
                ),
                150,
                "scale"
            )

        );


        /* =====================================================
           FOOTER
        ====================================================== */

        scrollTargets.push(

            addReveal(
                document.querySelector(".footer-left"),
                0
            ),

            addReveal(
                document.querySelector(".footer-columns"),
                120
            )

        );


        /* Remove null elements */

        const validScrollTargets =
            scrollTargets.filter(Boolean);


        /* =====================================================
           FORCE INITIAL HIDDEN STATE TO RENDER

           This is important.

           It forces Chrome to paint opacity:0 / translate state
           BEFORE we add the visible class.
        ====================================================== */

        void document.body.offsetHeight;


        /* =====================================================
           HERO REVEAL
        ====================================================== */

        window.setTimeout(() => {

            heroTargets.forEach((element) => {

                element.classList.add(
                    "tb-reveal-visible"
                );

            });

        }, 120);


        /* =====================================================
           SCROLL OBSERVER
        ====================================================== */

        if (!("IntersectionObserver" in window)) {

            validScrollTargets.forEach((element) => {

                element.classList.add(
                    "tb-reveal-visible"
                );

            });

            return;
        }


        const observer =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "tb-reveal-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -70px 0px"
                }

            );


        validScrollTargets.forEach((element) => {

            observer.observe(element);

        });


        console.log(
            "TrustedBy reveal targets:",
            validScrollTargets.length
        );

    }


    /* =====================================================
       SAFE INITIALIZATION

       Works whether trusted.js is loaded before or after
       DOMContentLoaded.
    ====================================================== */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initTrustedPage,
            { once: true }
        );

    } else {

        initTrustedPage();

    }

})();