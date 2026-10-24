/*
=========================================================
DELLAGROUP HOMEPAGE — FIRST LOAD ENTRANCE
=========================================================

Runs ONLY when the page loads or reloads.

Animation:
- Navbar moves slightly from left to right
- FirstPage moves slightly from left to right
- Opacity changes from 0 to 1
- Does NOT repeat when scrolling back to the top

=========================================================
*/

(() => {
    "use strict";


    /* =====================================================
       SETTINGS
    ===================================================== */

    const NAV_DURATION = 1000;
    const HERO_DURATION = 1300;

    const NAV_DELAY = 80;
    const HERO_DELAY = 160;

    // Starting position from the left
    const NAV_START_X = -18;
    const HERO_START_X = -34;

    // Smooth animation curve
    const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";


    /* =====================================================
       PREPARE PAGE BEFORE DISPLAY
    ===================================================== */

    document.documentElement.classList.add(
        "first-load-prep"
    );


    /* =====================================================
       CREATE ANIMATION CSS
    ===================================================== */

    const style = document.createElement("style");

    style.id = "della-first-load-entry-style";

    style.textContent = `

        /* ===============================================
           INITIAL STATE
        =============================================== */

        html.first-load-prep .navbar {
            opacity: 0;

            transform:
                translate3d(${NAV_START_X}px, 0, 0);
        }


        html.first-load-prep #FirstPage {
            opacity: 0;

            transform:
                translate3d(${HERO_START_X}px, 0, 0);
        }



        /* ===============================================
           NAVBAR ENTRANCE
        =============================================== */

        html.first-load-running .navbar {

            opacity: 1;

            transform:
                translate3d(0, 0, 0);

            transition:

                opacity
                ${NAV_DURATION}ms
                ${EASING}
                ${NAV_DELAY}ms,

                transform
                ${NAV_DURATION}ms
                ${EASING}
                ${NAV_DELAY}ms;
        }



        /* ===============================================
           FIRST PAGE ENTRANCE
        =============================================== */

        html.first-load-running #FirstPage {

            opacity: 1;

            transform:
                translate3d(0, 0, 0);

            transition:

                opacity
                ${HERO_DURATION}ms
                ${EASING}
                ${HERO_DELAY}ms,

                transform
                ${HERO_DURATION}ms
                ${EASING}
                ${HERO_DELAY}ms;
        }



        /* ===============================================
           FINISHED STATE
        =============================================== */

        html.first-load-finished .navbar,
        html.first-load-finished #FirstPage {

            opacity: 1;
        }



        /* ===============================================
           REDUCED MOTION ACCESSIBILITY
        =============================================== */

        @media (prefers-reduced-motion: reduce) {

            html.first-load-prep .navbar,
            html.first-load-prep #FirstPage,
            html.first-load-running .navbar,
            html.first-load-running #FirstPage {

                opacity: 1 !important;

                transform: none !important;

                transition: none !important;
            }
        }

    `;


    document.head.appendChild(style);



    /* =====================================================
       START ENTRANCE
    ===================================================== */

    function startFirstLoadEntrance() {

        const root =
            document.documentElement;

        const navbar =
            document.querySelector(".navbar");

        const firstPage =
            document.querySelector("#FirstPage");


        /* ===============================================
           SAFETY CHECK
        =============================================== */

        if (
            !navbar ||
            !firstPage
        ) {

            root.classList.remove(
                "first-load-prep"
            );

            return;
        }



        /* ===============================================
           FORCE INITIAL HIDDEN POSITION
        =============================================== */

        void navbar.offsetWidth;

        void firstPage.offsetWidth;



        /* ===============================================
           WAIT FOR BROWSER TO PAINT INITIAL STATE
        =============================================== */

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {


                /* =======================================
                   START ANIMATION
                ======================================= */

                root.classList.remove(
                    "first-load-prep"
                );

                root.classList.add(
                    "first-load-running"
                );



                /* =======================================
                   REMOVE ANIMATION STATE AFTER FINISHING
                ======================================= */

                const finishAfter =
                    Math.max(

                        NAV_DURATION +
                        NAV_DELAY,

                        HERO_DURATION +
                        HERO_DELAY

                    ) + 100;



                window.setTimeout(() => {

                    root.classList.remove(
                        "first-load-running"
                    );

                    root.classList.add(
                        "first-load-finished"
                    );

                }, finishAfter);


            });

        });

    }



    /* =====================================================
       RUN ONLY WHEN PAGE LOADS
    ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(

            "DOMContentLoaded",

            startFirstLoadEntrance,

            {
                once: true
            }

        );

    } else {

        startFirstLoadEntrance();

    }


})();