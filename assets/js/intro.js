/*
=========================================================
DELLAGROUP HOMEPAGE INTRO
=========================================================

TIMING:

0s - 3s
Black screen with DELLA logo.

3s - 5s
Circular black screen shrinks toward center.

Corners disappear first.
Center disappears last.

At 5s:
Homepage fully visible.
=========================================================
*/

(() => {

    "use strict";


    /* =====================================================
       SETTINGS
    ===================================================== */

    /*
       How long the black screen remains
       completely visible before transition.
    */
    const HOLD_DURATION = 3000;


    /*
       Circular fade duration.

       2000 milliseconds = 2 seconds.
    */
    const REVEAL_DURATION = 2000;


    /*
       Width of the soft fade around
       the circular edge.

       Larger = softer fade.
       Smaller = sharper circle.
    */
    const FEATHER_SIZE = 140;



    /* =====================================================
       GET BODY
    ===================================================== */

    const body = document.body;


    if (!body) {

        return;

    }


    /*
       Make sure intro is active.

       Your HTML should also contain:

       <body class="intro-active">
    */

    body.classList.add(
        "intro-active"
    );



    /* =====================================================
       VARIABLES
    ===================================================== */

    let revealStarted = false;

    let animationFrameId = null;

    let startingRadius = 0;



    /* =====================================================
       CALCULATE MAXIMUM CIRCLE SIZE
    ===================================================== */

    function getMaximumRadius() {


        const halfWidth =
            window.innerWidth / 2;


        const halfHeight =
            window.innerHeight / 2;


        /*
           Calculate distance from center
           to farthest screen corner.

           Extra size is added so that
           the feathered edge begins
           completely outside the viewport.
        */

        return Math.hypot(

            halfWidth,
            halfHeight

        ) +

        FEATHER_SIZE +

        30;

    }



    /* =====================================================
       SET CIRCLE SIZE
    ===================================================== */

    function setMaskRadius(radius) {


        /*
           Prevent negative values.
        */

        const safeRadius =
            Math.max(
                0,
                radius
            );


        /*
           This creates the soft area
           around the circle.

           Example:

           solidRadius = 500px
           radius      = 640px

           0px → 500px = solid black

           500px → 640px =
           gradually transparent
        */

        const solidRadius =
            Math.max(

                0,

                safeRadius -
                FEATHER_SIZE

            );


        /*
           IMPORTANT:

           These are applied to BODY.

           ::before inherits these variables.
        */

        body.style.setProperty(

            "--intro-radius",

            `${safeRadius}px`

        );


        body.style.setProperty(

            "--intro-solid-radius",

            `${solidRadius}px`

        );

    }



    /* =====================================================
       ANIMATION EASING
    ===================================================== */

    function easeInOutCubic(progress) {


        if (progress < 0.5) {


            return (

                4 *

                progress *

                progress *

                progress

            );

        }


        return (

            1 -

            Math.pow(

                -2 * progress + 2,

                3

            ) / 2

        );

    }



    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    function handleResize() {


        /*
           While still waiting during
           the 3-second intro, ensure
           black circle still covers
           entire viewport.
        */

        if (!revealStarted) {


            startingRadius =
                getMaximumRadius();


            setMaskRadius(
                startingRadius
            );

        }

    }



    /* =====================================================
       FINISH INTRO
    ===================================================== */

    function finishIntro() {


        /*
           Stop animation frame.
        */

        if (
            animationFrameId !== null
        ) {


            cancelAnimationFrame(
                animationFrameId
            );

        }


        /*
           Remove resize listener.
        */

        window.removeEventListener(

            "resize",

            handleResize

        );


        /*
           Remove black intro screen.
        */

        body.classList.remove(
            "intro-active"
        );


        /*
           Clean CSS variables.
        */

        body.style.removeProperty(
            "--intro-radius"
        );


        body.style.removeProperty(
            "--intro-solid-radius"
        );

    }



    /* =====================================================
       START CIRCULAR FADE
    ===================================================== */

    function startCircularReveal() {


        revealStarted = true;


        /*
           Start with circle covering
           entire viewport.
        */

        startingRadius =
            getMaximumRadius();


        setMaskRadius(
            startingRadius
        );


        /*
           Animation starting time.
        */

        const animationStart =
            performance.now();



        /* =================================================
           ANIMATION FRAME
        ================================================= */

        function animate(now) {


            /*
               How many milliseconds have passed.
            */

            const elapsed =
                now -
                animationStart;



            /*
               Convert elapsed time into:

               0 → beginning

               1 → completed
            */

            const progress =
                Math.min(

                    elapsed /
                    REVEAL_DURATION,

                    1

                );



            /*
               Smooth movement.
            */

            const easedProgress =
                easeInOutCubic(
                    progress
                );



            /*
               =================================================
               SHRINK CIRCLE
               =================================================

               Starting:

               radius = full viewport

               █████████████████████
               █████████████████████
               █████████ D █████████
               █████████████████████
               █████████████████████


               Middle:

                      █████████
                    █████████████
                   █████ D █████
                    █████████████
                      █████████


               Ending:

                         █
                         D
                         █


               Then disappears completely.

               This makes:

               CORNERS disappear first
               CENTER disappear last.
            */


            const currentRadius =

                startingRadius *

                (
                    1 -
                    easedProgress
                );



            /*
               Send radius to CSS.
            */

            setMaskRadius(
                currentRadius
            );



            /*
               Continue until 2 seconds
               have completed.
            */

            if (
                progress < 1
            ) {


                animationFrameId =

                    requestAnimationFrame(
                        animate
                    );


                return;

            }



            /*
               Animation completed.
            */

            finishIntro();

        }



        /*
           Start animation.
        */

        animationFrameId =

            requestAnimationFrame(
                animate
            );

    }



    /* =====================================================
       INITIAL BLACK SCREEN
    ===================================================== */

    startingRadius =
        getMaximumRadius();


    setMaskRadius(
        startingRadius
    );



    /* =====================================================
       WATCH WINDOW SIZE
    ===================================================== */

    window.addEventListener(

        "resize",

        handleResize,

        {
            passive: true
        }

    );



    /* =====================================================
       BEGIN 3 SECOND TIMER
    ===================================================== */

    /*
       Start counting as soon as this
       JavaScript executes.

       This means:

       0s - 3s:
       Black + logo

       3s - 5s:
       Circular fade
    */

    window.setTimeout(

        startCircularReveal,

        HOLD_DURATION

    );


})();