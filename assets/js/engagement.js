/*
=========================================================
 STRATEGIC ENGAGEMENT PAGE

 - Smooth one-time scroll reveal
 - Engagement title search/filter
 - Month search/filter
=========================================================
*/

(function () {

    function initEngagementPage() {

        console.log("Engagement JS loaded");


        const html = document.documentElement;

        html.classList.add("eng-reveal-enabled");


        /* =====================================================
           ENGAGEMENT SEARCH
        ====================================================== */

        function initEngagementSearch() {

            const searchInput = document.querySelector(
                ".engagement-search input"
            );

            const engagementList = document.querySelector(
                ".engagement-list"
            );

            const engagementRows = Array.from(
                document.querySelectorAll(".engagement-row")
            );


            /* =================================================
               SAFETY CHECK
            ================================================= */

            if (
                !searchInput ||
                !engagementList ||
                engagementRows.length === 0
            ) {

                console.warn(
                    "Engagement search elements not found."
                );

                return;

            }


            /* =================================================
               MONTH ALIASES

               All of these will work:

               january
               jan
               jan.

               september
               sept
               sept.
               sep
               sep.

               etc.
            ================================================= */

            const monthAliases = {

                jan: 1,
                january: 1,

                feb: 2,
                february: 2,

                mar: 3,
                march: 3,

                apr: 4,
                april: 4,

                may: 5,

                jun: 6,
                june: 6,

                jul: 7,
                july: 7,

                aug: 8,
                august: 8,

                sep: 9,
                sept: 9,
                september: 9,

                oct: 10,
                october: 10,

                nov: 11,
                november: 11,

                dec: 12,
                december: 12

            };


            /* =================================================
               CREATE NO RESULTS MESSAGE
            ================================================= */

            let noResults =
                engagementList.querySelector(
                    ".engagement-no-results"
                );


            if (!noResults) {

                noResults =
                    document.createElement("div");


                noResults.className =
                    "engagement-no-results";


                noResults.setAttribute(
                    "role",
                    "status"
                );


                noResults.setAttribute(
                    "aria-live",
                    "polite"
                );


                noResults.textContent =
                    "NO ENGAGEMENTS FOUND.";


                noResults.hidden = true;


                engagementList.appendChild(
                    noResults
                );

            }


            /* =================================================
               NORMALIZE TEXT

               Examples:

               "SEPTEMBER"
               becomes
               "september"

               "Sept."
               becomes
               "sept"

               "Army   Artillery"
               becomes
               "army artillery"
            ================================================= */

            function normalizeText(text) {

                return String(text)

                    .toLowerCase()

                    .trim()

                    .replace(/[.,]/g, "")

                    .replace(/\s+/g, " ");

            }


            /* =================================================
               GET ARTICLE DATE INFORMATION

               Example:

               09 / 13 / 2026

               returns:

               {
                   month: 9,
                   day: 13,
                   year: 2026
               }
            ================================================= */

            function getDateInformation(row) {

                const dateElement =
                    row.querySelector(
                        ".engagement-date"
                    );


                if (!dateElement) {

                    return {
                        month: null,
                        day: null,
                        year: null
                    };

                }


                const dateText =
                    dateElement.textContent.trim();


                const match =
                    dateText.match(
                        /(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})/
                    );


                if (!match) {

                    return {
                        month: null,
                        day: null,
                        year: null
                    };

                }


                return {

                    month:
                        Number(match[1]),

                    day:
                        Number(match[2]),

                    year:
                        Number(match[3])

                };

            }


            /* =================================================
               FILTER ENGAGEMENTS
            ================================================= */

            function filterEngagements() {

                const query =
                    normalizeText(
                        searchInput.value
                    );


                /* =============================================
                   EMPTY SEARCH

                   Show all engagements again.
                ============================================= */

                if (query === "") {

                    engagementRows.forEach(
                        (row) => {

                            row.style.display = "";

                        }
                    );


                    noResults.hidden = true;


                    return;

                }


                /* =============================================
                   SPLIT SEARCH INTO WORDS

                   Example:

                   "september army"

                   becomes:

                   [
                       "september",
                       "army"
                   ]
                ============================================= */

                const searchTerms =
                    query
                        .split(" ")
                        .filter(Boolean);


                /* =============================================
                   FIND MONTH IN SEARCH
                ============================================= */

                let requestedMonth = null;


                searchTerms.forEach(
                    (term) => {

                        if (
                            Object.prototype.hasOwnProperty.call(
                                monthAliases,
                                term
                            )
                        ) {

                            requestedMonth =
                                monthAliases[term];

                        }

                    }
                );


                /* =============================================
                   REMOVE MONTH FROM TITLE SEARCH

                   Example:

                   "september army"

                   month:
                   9

                   title terms:
                   ["army"]
                ============================================= */

                const titleSearchTerms =
                    searchTerms.filter(
                        (term) => {

                            return !Object.prototype
                                .hasOwnProperty.call(
                                    monthAliases,
                                    term
                                );

                        }
                    );


                let visibleCount = 0;


                /* =============================================
                   CHECK EVERY ARTICLE
                ============================================= */

                engagementRows.forEach(
                    (row) => {

                        const titleElement =
                            row.querySelector(
                                ".engagement-row__content h3"
                            );


                        if (!titleElement) {

                            row.style.display =
                                "none";

                            return;

                        }


                        const title =
                            normalizeText(
                                titleElement.textContent
                            );


                        const date =
                            getDateInformation(
                                row
                            );


                        /* =====================================
                           TITLE MATCH

                           Examples:

                           army

                           army artillery

                           quartermaster
                        ===================================== */

                        const titleMatches =

                            titleSearchTerms.length === 0 ||

                            titleSearchTerms.every(
                                (term) => {

                                    return title.includes(
                                        term
                                    );

                                }
                            );


                        /* =====================================
                           MONTH MATCH
                        ===================================== */

                        const monthMatches =

                            requestedMonth === null ||

                            date.month === requestedMonth;


                        /* =====================================
                           FINAL RESULT

                           Both title AND month must match
                           when both are entered.
                        ===================================== */

                        const matches =

                            titleMatches &&
                            monthMatches;


                        if (matches) {

                            row.style.display = "";

                            visibleCount++;


                            /* =================================
                               MAKE FILTERED RESULTS VISIBLE

                               Prevent reveal animation from
                               keeping searched results hidden.
                            ================================= */

                            row
                                .querySelectorAll(
                                    ".eng-reveal"
                                )
                                .forEach(
                                    (element) => {

                                        element.classList.add(
                                            "eng-reveal-visible"
                                        );

                                    }
                                );

                        } else {

                            row.style.display =
                                "none";

                        }

                    }
                );


                /* =============================================
                   NO RESULTS
                ============================================= */

                noResults.hidden =
                    visibleCount !== 0;


                console.log(
                    `Engagement search: ${visibleCount} result(s)`
                );

            }


            /* =================================================
               LIVE SEARCH

               Filters while the user types.
            ================================================= */

            searchInput.addEventListener(
                "input",
                filterEngagements
            );


            /* =================================================
               BROWSER SEARCH INPUT CLEAR BUTTON
            ================================================= */

            searchInput.addEventListener(
                "search",
                filterEngagements
            );


            /* =================================================
               ESCAPE KEY = CLEAR SEARCH
            ================================================= */

            searchInput.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key !== "Escape"
                    ) {

                        return;

                    }


                    searchInput.value = "";


                    filterEngagements();


                    searchInput.blur();

                }
            );


            console.log(
                "Engagement search initialized:",
                engagementRows.length,
                "engagements"
            );

        }


        /* =====================================================
           SCROLL REVEAL ARRAYS
        ====================================================== */

        const heroTargets = [];

        const scrollTargets = [];


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
                "eng-reveal"
            );


            if (hero) {

                element.classList.add(
                    "eng-reveal-hero"
                );

            }


            if (type === "scale") {

                element.classList.add(
                    "eng-reveal-scale"
                );

            }


            if (type === "left") {

                element.classList.add(
                    "eng-reveal-left"
                );

            }


            if (type === "right") {

                element.classList.add(
                    "eng-reveal-right"
                );

            }


            element.style.setProperty(
                "--eng-reveal-delay",
                `${delay}ms`
            );


            return element;

        }


        /* =====================================================
           HERO
        ====================================================== */

        const heroEyebrow =
            prepareReveal(
                document.querySelector(
                    ".engagement-intro__eyebrow"
                ),
                {
                    delay: 80,
                    hero: true
                }
            );


        const heroTitle =
            prepareReveal(
                document.querySelector(
                    ".engagement-intro h1"
                ),
                {
                    delay: 200,
                    hero: true
                }
            );


        if (heroEyebrow) {

            heroTargets.push(
                heroEyebrow
            );

        }


        if (heroTitle) {

            heroTargets.push(
                heroTitle
            );

        }


        /* =====================================================
           SEARCH BAR REVEAL
        ====================================================== */

        const searchBar =
            prepareReveal(
                document.querySelector(
                    ".engagement-search"
                ),
                {
                    delay: 0
                }
            );


        if (searchBar) {

            scrollTargets.push(
                searchBar
            );

        }


        /* =====================================================
           ENGAGEMENT ROW REVEALS
        ====================================================== */

        document
            .querySelectorAll(
                ".engagement-row"
            )
            .forEach(
                (row) => {


                    /* ================================
                       NUMBER
                    ================================ */

                    const index =
                        prepareReveal(
                            row.querySelector(
                                ".engagement-row__index"
                            ),
                            {
                                delay: 0,
                                type: "left"
                            }
                        );


                    /* ================================
                       TEXT CONTENT
                    ================================ */

                    const content =
                        prepareReveal(
                            row.querySelector(
                                ".engagement-row__content"
                            ),
                            {
                                delay: 80
                            }
                        );


                    /* ================================
                       IMAGE
                    ================================ */

                    const media =
                        prepareReveal(
                            row.querySelector(
                                ".engagement-row__media"
                            ),
                            {
                                delay: 160,
                                type: "scale"
                            }
                        );


                    if (index) {

                        scrollTargets.push(
                            index
                        );

                    }


                    if (content) {

                        scrollTargets.push(
                            content
                        );

                    }


                    if (media) {

                        scrollTargets.push(
                            media
                        );

                    }

                }
            );


        /* =====================================================
           FOOTER REVEAL
        ====================================================== */

        const footerLeft =
            prepareReveal(
                document.querySelector(
                    ".footer-left"
                ),
                {
                    delay: 0
                }
            );


        const footerColumns =
            prepareReveal(
                document.querySelector(
                    ".footer-columns"
                ),
                {
                    delay: 120
                }
            );


        if (footerLeft) {

            scrollTargets.push(
                footerLeft
            );

        }


        if (footerColumns) {

            scrollTargets.push(
                footerColumns
            );

        }


        /* =====================================================
           INITIALIZE ENGAGEMENT SEARCH
        ====================================================== */

        initEngagementSearch();


        /* =====================================================
           FORCE INITIAL HIDDEN STATE
        ====================================================== */

        void document.body.offsetHeight;


        /* =====================================================
           HERO LOAD REVEAL
        ====================================================== */

        window.setTimeout(
            () => {

                heroTargets.forEach(
                    (element) => {

                        element.classList.add(
                            "eng-reveal-visible"
                        );

                    }
                );

            },
            120
        );


        /* =====================================================
           INTERSECTION OBSERVER FALLBACK
        ====================================================== */

        if (
            !("IntersectionObserver" in window)
        ) {

            scrollTargets.forEach(
                (element) => {

                    element.classList.add(
                        "eng-reveal-visible"
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

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "eng-reveal-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -70px 0px"
                }

            );


        scrollTargets.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );


        console.log(
            "Engagement reveal targets:",
            scrollTargets.length
        );

    }


    /* =====================================================
       SAFE INITIALIZATION
    ====================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initEngagementPage,
            {
                once: true
            }
        );

    } else {

        initEngagementPage();

    }

})();