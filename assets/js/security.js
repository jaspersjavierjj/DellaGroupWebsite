/*
==========================================================================

                         DELLA GROUP CORPORATION

                        WEBSITE SECURITY NOTICE

This JavaScript file provides browser-side security hardening and
informational security notices for the DELLA Group Corporation website.

IMPORTANT:

Browser Developer Tools / Inspect Element remain ENABLED.

Any modification performed through:

- Inspect Element
- Browser Developer Tools
- Console
- Local DOM editing
- Local CSS editing
- Local JavaScript execution

only changes the copy of the website currently displayed inside the
visitor's browser session.

Such changes DO NOT modify:

- Official DELLA Group website files
- Production server files
- Databases
- Backend systems
- Administrative systems
- Official company records
- Source repositories
- Deployment environments

Any locally altered content must not be considered official content
published by DELLA Group Corporation.

Official website content is determined exclusively by DELLA Group
Corporation's authorized production systems and deployments.

© DELLA Group Corporation. All Rights Reserved.

==========================================================================
*/


(() => {

    "use strict";


    /* =========================================================
       CONFIGURATION
    ========================================================= */

    const SECURITY_CONFIG = {

        companyName:
            "DELLA GROUP CORPORATION",

        websiteNotice:
            "Official website content is determined only by DELLA Group Corporation's authorized production systems.",

        enableConsoleNotice:
            true,

        enableExternalLinkProtection:
            true,

        enableUnsafeProtocolProtection:
            true,

        enableIframeWarning:
            true,

        enableMixedContentWarning:
            true,

        enableErrorMonitoring:
            true

    };



    /* =========================================================
       SECURITY STATE
    ========================================================= */

    const securityState = {

        initialized: false,

        consoleNoticeShown: false,

        warnings: new Set()

    };



    /* =========================================================
       NORMALIZE STRING
    ========================================================= */

    function normalize(value = "") {

        return String(value)
            .trim()
            .toLowerCase();

    }



    /* =========================================================
       SECURITY LOGGER
    ========================================================= */

    function securityLog(
        type,
        message,
        details = null
    ) {

        const prefix =
            "[DELLA SECURITY]";


        if (type === "warning") {

            console.warn(
                `${prefix} ${message}`,
                details || ""
            );

            return;

        }


        if (type === "error") {

            console.error(
                `${prefix} ${message}`,
                details || ""
            );

            return;

        }


        console.info(
            `${prefix} ${message}`,
            details || ""
        );

    }



    /* =========================================================
       SECURITY CONSOLE NOTICE

       This is intentionally visible when somebody opens:
       Inspect → Console

       Developer Tools are NOT blocked.
    ========================================================= */

    function showConsoleSecurityNotice() {


        if (
            !SECURITY_CONFIG.enableConsoleNotice ||
            securityState.consoleNoticeShown
        ) {

            return;

        }



        securityState.consoleNoticeShown =
            true;



        console.log(
            "%cDELLA GROUP CORPORATION",
            `
                font-family: Arial, sans-serif;
                font-size: 24px;
                font-weight: 700;
                color: #ffffff;
                background: #000000;
                padding: 12px 18px;
                border-radius: 4px;
            `
        );



        console.log(
            "%cWEBSITE SECURITY NOTICE",
            `
                font-family: Arial, sans-serif;
                font-size: 17px;
                font-weight: 700;
                color: #4B5320;
                padding-top: 8px;
            `
        );



        console.log(
            "%cDeveloper Tools and Inspect Element are enabled.",
            `
                font-family: Arial, sans-serif;
                font-size: 13px;
                font-weight: 700;
                color: #ffffff;
                background: #333333;
                padding: 6px 10px;
            `
        );



        console.log(
            `%c
Changes made through browser Developer Tools, Inspect Element, the Console,
or local DOM/CSS/JavaScript editing affect only the visitor's current
browser session.

These changes DO NOT modify DELLA Group Corporation's official:

• Website files
• Production server
• Databases
• Backend systems
• Administrative systems
• Company records
• Source repositories
• Deployment environment

Any altered content displayed after local browser modification should
not be considered official DELLA Group Corporation content.
            `,
            `
                font-family: Arial, sans-serif;
                font-size: 13px;
                line-height: 1.6;
                color: #d6d6d6;
            `
        );



        console.log(
            "%cUnauthorized access to protected systems, credentials, databases, administrative interfaces, or restricted services is prohibited.",
            `
                font-family: Arial, sans-serif;
                font-size: 13px;
                font-weight: 700;
                line-height: 1.6;
                color: #ffcc66;
            `
        );



        console.log(
            `%c${SECURITY_CONFIG.websiteNotice}`,
            `
                font-family: Arial, sans-serif;
                font-size: 12px;
                font-style: italic;
                color: #aaaaaa;
            `
        );



        console.log(
            "%c© DELLA Group Corporation. All Rights Reserved.",
            `
                font-family: Arial, sans-serif;
                font-size: 11px;
                color: #777777;
            `
        );

    }



    /* =========================================================
       PROTECT TARGET="_blank" LINKS

       Prevents a newly opened external page from obtaining
       direct control over the original browser tab through
       window.opener.

       Adds:
       rel="noopener noreferrer"
    ========================================================= */

    function protectExternalLinks() {


        if (
            !SECURITY_CONFIG.enableExternalLinkProtection
        ) {

            return;

        }



        const links =
            document.querySelectorAll(
                'a[target="_blank"]'
            );



        links.forEach(link => {


            const existingRel =
                link
                    .getAttribute("rel")
                    ?.split(/\s+/)
                    .filter(Boolean)
                    || [];



            const relValues =
                new Set(existingRel);



            relValues.add(
                "noopener"
            );


            relValues.add(
                "noreferrer"
            );



            link.setAttribute(
                "rel",
                Array
                    .from(relValues)
                    .join(" ")
            );

        });

    }



    /* =========================================================
       UNSAFE LINK PROTOCOL PROTECTION

       Prevent links such as:

       javascript:...
       data:text/html...

       from being accidentally used in website anchors.

       Normal:
       https:
       http:
       mailto:
       tel:
       relative links
       hash links

       continue working.
    ========================================================= */

    function protectUnsafeLinks() {


        if (
            !SECURITY_CONFIG.enableUnsafeProtocolProtection
        ) {

            return;

        }



        document.addEventListener(
            "click",
            event => {


                const link =
                    event.target.closest("a");


                if (!link) {

                    return;

                }



                const rawHref =
                    link.getAttribute("href");


                if (!rawHref) {

                    return;

                }



                const href =
                    normalize(rawHref);



                const unsafeProtocols = [

                    "javascript:",

                    "vbscript:",

                    "data:text/html"

                ];



                const isUnsafe =
                    unsafeProtocols.some(
                        protocol =>
                            href.startsWith(protocol)
                    );



                if (!isUnsafe) {

                    return;

                }



                event.preventDefault();



                securityLog(
                    "warning",
                    "Blocked navigation to an unsafe link protocol.",
                    rawHref
                );

            },
            true
        );

    }



    /* =========================================================
       IFRAME / EMBEDDING WARNING

       This does NOT forcibly break legitimate embeds.

       It simply reports when the website has been loaded
       inside another frame.
    ========================================================= */

    function checkIframeContext() {


        if (
            !SECURITY_CONFIG.enableIframeWarning
        ) {

            return;

        }



        try {


            if (
                window.self !==
                window.top
            ) {


                securityLog(
                    "warning",
                    "This DELLA Group page is currently running inside an iframe."
                );


            }


        }

        catch (error) {


            securityLog(
                "warning",
                "The current page appears to be embedded inside a cross-origin frame."
            );


        }

    }



    /* =========================================================
       MIXED CONTENT CHECK

       If your website is HTTPS, important assets should
       preferably also load through HTTPS.
    ========================================================= */

    function checkMixedContent() {


        if (
            !SECURITY_CONFIG.enableMixedContentWarning
        ) {

            return;

        }



        if (
            window.location.protocol !==
            "https:"
        ) {

            return;

        }



        const resources = [

            ...document.querySelectorAll(
                "img[src]"
            ),

            ...document.querySelectorAll(
                "script[src]"
            ),

            ...document.querySelectorAll(
                "link[href]"
            ),

            ...document.querySelectorAll(
                "iframe[src]"
            ),

            ...document.querySelectorAll(
                "video[src]"
            ),

            ...document.querySelectorAll(
                "audio[src]"
            )

        ];



        resources.forEach(element => {


            const resourceUrl =

                element.getAttribute("src")

                ||

                element.getAttribute("href");



            if (
                !resourceUrl
            ) {

                return;

            }



            if (
                normalize(resourceUrl)
                    .startsWith("http://")
            ) {


                const warningKey =
                    `mixed-content:${resourceUrl}`;



                if (
                    securityState.warnings.has(
                        warningKey
                    )
                ) {

                    return;

                }



                securityState.warnings.add(
                    warningKey
                );



                securityLog(
                    "warning",
                    "Potential insecure HTTP resource detected on an HTTPS page.",
                    resourceUrl
                );

            }

        });

    }



    /* =========================================================
       GLOBAL JAVASCRIPT ERROR MONITORING

       This DOES NOT send errors anywhere.

       It simply reports significant website errors in
       the local browser console for development/debugging.

       No personal information is transmitted.
    ========================================================= */

    function initializeErrorMonitoring() {


        if (
            !SECURITY_CONFIG.enableErrorMonitoring
        ) {

            return;

        }



        window.addEventListener(
            "error",
            event => {


                /*
                   Ignore normal resource errors that don't
                   expose useful JavaScript information.
                */

                if (
                    !event.message
                ) {

                    return;

                }



                securityLog(
                    "error",
                    "Website JavaScript error detected.",
                    {
                        message:
                            event.message,

                        filename:
                            event.filename,

                        line:
                            event.lineno,

                        column:
                            event.colno
                    }
                );

            }
        );



        window.addEventListener(
            "unhandledrejection",
            event => {


                securityLog(
                    "error",
                    "Unhandled Promise rejection detected.",
                    event.reason
                );

            }
        );

    }



    /* =========================================================
       DYNAMIC LINK PROTECTION

       Your website creates some content dynamically,
       including the search interface.

       Therefore target="_blank" protection is also applied
       to links added after initial page load.
    ========================================================= */

    function initializeDynamicLinkProtection() {


        if (
            !SECURITY_CONFIG.enableExternalLinkProtection
        ) {

            return;

        }



        if (
            !("MutationObserver" in window)
        ) {

            return;

        }



        const observer =
            new MutationObserver(
                mutations => {


                    let linksMayHaveChanged =
                        false;



                    for (
                        const mutation
                        of mutations
                    ) {


                        if (
                            mutation.addedNodes.length >
                            0
                        ) {


                            linksMayHaveChanged =
                                true;

                            break;


                        }

                    }



                    if (
                        linksMayHaveChanged
                    ) {


                        protectExternalLinks();


                    }

                }
            );



        observer.observe(
            document.documentElement,
            {

                childList:
                    true,

                subtree:
                    true

            }
        );

    }



    /* =========================================================
       SECURITY ATTRIBUTE

       This adds a harmless marker to the page DOM.

       Example when inspecting:

       <html data-della-security="active">

       It does NOT claim that front-end code cannot be altered.
    ========================================================= */

    function addSecurityMarker() {


        document.documentElement
            .setAttribute(
                "data-della-security",
                "active"
            );


        document.documentElement
            .setAttribute(
                "data-site-owner",
                "DELLA Group Corporation"
            );

    }



    /* =========================================================
       OPTIONAL SOURCE INFORMATION

       This creates a meta tag that can be seen in Inspect.

       It states ownership and clarification regarding
       locally altered website content.
    ========================================================= */

    function addSecurityMetaInformation() {


        if (
            document.querySelector(
                'meta[name="della-security-notice"]'
            )
        ) {

            return;

        }



        const meta =
            document.createElement(
                "meta"
            );


        meta.setAttribute(
            "name",
            "della-security-notice"
        );


        meta.setAttribute(
            "content",
            "Changes made through browser Developer Tools are local to the visitor's browser and do not modify DELLA Group Corporation's official server files, systems, databases, or records."
        );



        document.head.appendChild(
            meta
        );

    }



    /* =========================================================
       SECURITY INITIALIZATION
    ========================================================= */

    function initializeSecurity() {


        if (
            securityState.initialized
        ) {

            return;

        }



        securityState.initialized =
            true;



        /*
        ---------------------------------------------------------
        IMPORTANT:

        This security script intentionally DOES NOT:

        - Disable right-click
        - Disable F12
        - Disable Inspect Element
        - Disable Ctrl + Shift + I
        - Disable Ctrl + Shift + J
        - Disable Ctrl + Shift + C
        - Disable Ctrl + U
        - Detect DevTools
        - Redirect users for opening DevTools

        Browser Developer Tools remain available.
        ---------------------------------------------------------
        */



        showConsoleSecurityNotice();



        addSecurityMarker();



        addSecurityMetaInformation();



        protectExternalLinks();



        protectUnsafeLinks();



        checkIframeContext();



        checkMixedContent();



        initializeErrorMonitoring();



        initializeDynamicLinkProtection();



        securityLog(
            "info",
            "Browser-side security initialization complete."
        );

    }



    /* =========================================================
       START
    ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {


        document.addEventListener(
            "DOMContentLoaded",
            initializeSecurity,
            {
                once:
                    true
            }
        );


    }

    else {


        initializeSecurity();


    }



})();

/* =========================================================
   PREVENT IMAGE DRAGGING

   Does NOT disable:
   - Right click
   - Inspect Element
   - Text selection
   - Normal links

   Only prevents images from being dragged.
========================================================= */

function initializeImageDragProtection() {

    /*
       Disable native dragging on all existing images.
    */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.setAttribute(
            "draggable",
            "false"
        );

    });



    /*
       Prevent browser drag events.

       Capture mode = true so it catches the drag
       before links or other elements handle it.
    */

    document.addEventListener(
        "dragstart",
        event => {

            const target =
                event.target;


            if (
                target instanceof Element &&
                target.closest("img")
            ) {

                event.preventDefault();

            }

        },
        true
    );



    /*
       Also protect images dynamically added later.

       This is useful if search.js or another script
       inserts content after the page loads.
    */

    if (
        "MutationObserver" in window
    ) {

        const imageObserver =
            new MutationObserver(
                mutations => {

                    mutations.forEach(
                        mutation => {

                            mutation.addedNodes
                                .forEach(node => {

                                    if (
                                        !(node instanceof Element)
                                    ) {

                                        return;

                                    }


                                    /*
                                       If the added node itself is an image.
                                    */

                                    if (
                                        node.matches("img")
                                    ) {

                                        node.setAttribute(
                                            "draggable",
                                            "false"
                                        );

                                    }


                                    /*
                                       If the added node contains images.
                                    */

                                    node
                                        .querySelectorAll?.("img")
                                        .forEach(image => {

                                            image.setAttribute(
                                                "draggable",
                                                "false"
                                            );

                                        });

                                });

                        });

                }
            );


        imageObserver.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );

    }

}