/*
=========================================================
DELLA GROUP
BASIC FRONT-END DETERRENCE

IMPORTANT:
This does NOT provide real website security.
It only discourages casual inspection/copying.
=========================================================
*/

(() => {
    "use strict";

    /* ================================================
       DISABLE RIGHT CLICK
    ================================================ */

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });


    /* ================================================
       BLOCK COMMON DEVTOOLS / SOURCE SHORTCUTS
    ================================================ */

    document.addEventListener("keydown", (event) => {

        const key = event.key.toLowerCase();

        /* F12 */
        if (event.key === "F12") {
            event.preventDefault();
            return;
        }


        /* CTRL + SHIFT + I */
        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "i"
        ) {
            event.preventDefault();
            return;
        }


        /* CTRL + SHIFT + J */
        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "j"
        ) {
            event.preventDefault();
            return;
        }


        /* CTRL + SHIFT + C */
        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "c"
        ) {
            event.preventDefault();
            return;
        }


        /* CTRL + U - VIEW SOURCE */
        if (
            event.ctrlKey &&
            key === "u"
        ) {
            event.preventDefault();
            return;
        }


        /* MAC: CMD + OPTION + I */
        if (
            event.metaKey &&
            event.altKey &&
            key === "i"
        ) {
            event.preventDefault();
            return;
        }


        /* MAC: CMD + OPTION + J */
        if (
            event.metaKey &&
            event.altKey &&
            key === "j"
        ) {
            event.preventDefault();
            return;
        }


        /* MAC: CMD + OPTION + C */
        if (
            event.metaKey &&
            event.altKey &&
            key === "c"
        ) {
            event.preventDefault();
        }

    });


    /* ================================================
       OPTIONAL:
       PREVENT IMAGE DRAGGING
    ================================================ */

    document.addEventListener("dragstart", (event) => {

        if (
            event.target.tagName === "IMG"
        ) {

            event.preventDefault();

        }

    });

})();