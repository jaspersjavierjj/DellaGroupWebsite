/* =========================================================
   ALWAYS START PAGE AT TOP
   - Disable browser scroll restoration
   - Refresh/reload always starts at top
   - Back/forward cache also returns to top
========================================================= */

/* =========================================================
   NAVBAR DROPDOWN PAGE BLUR
========================================================= */

const navItems = document.querySelectorAll(".nav-item");
const pageContent = document.querySelector(".page-content");

navItems.forEach((item) => {

    const dropdown = item.querySelector(".nav-dropdown");

    if (!dropdown || !pageContent) return;

    item.addEventListener("mouseenter", () => {
        pageContent.classList.add("blur");
    });

    item.addEventListener("mouseleave", () => {
        pageContent.classList.remove("blur");
    });
});


/* =========================================================
   NAVBAR SCROLL HIDE / SHOW
========================================================= */

const navbar = document.querySelector(".navbar");

let lastScrollTop = 0;

function handleNavbarScroll() {

    if (!navbar) return;

    const currentScroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;

    if (
        currentScroll > lastScrollTop &&
        currentScroll > 100
    ) {
        navbar.classList.add("nav-hidden");
    } else {
        navbar.classList.remove("nav-hidden");
    }

    lastScrollTop =
        currentScroll <= 0
            ? 0
            : currentScroll;
}

window.addEventListener(
    "scroll",
    handleNavbarScroll,
    { passive: true }
);


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuBtn =
    document.querySelector(".mobile-menu-btn");

const mobileMenuPanel =
    document.querySelector(".mobile-menu-panel");

let savedScrollPosition = 0;

function lockPageScroll() {

    savedScrollPosition = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top =
        `-${savedScrollPosition}px`;

    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
}

function unlockPageScroll() {

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    /*
       Restore the position from before the
       mobile menu was opened.
    */
    window.scrollTo({
        top: savedScrollPosition,
        left: 0,
        behavior: "instant"
    });
}

if (mobileMenuBtn && mobileMenuPanel) {

    mobileMenuBtn.addEventListener(
        "click",
        () => {

            const icon =
                mobileMenuBtn.querySelector(
                    ".material-icons"
                );

            const isOpening =
                !mobileMenuPanel.classList.contains(
                    "active"
                );

            mobileMenuPanel.classList.toggle(
                "active"
            );

            if (isOpening) {

                if (icon) {
                    icon.textContent = "close";
                }

                lockPageScroll();

            } else {

                if (icon) {
                    icon.textContent = "menu";
                }

                unlockPageScroll();
            }
        }
    );


    mobileMenuPanel
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenuPanel.classList.remove(
                        "active"
                    );

                    const icon =
                        mobileMenuBtn.querySelector(
                            ".material-icons"
                        );

                    if (icon) {
                        icon.textContent = "menu";
                    }

                    unlockPageScroll();
                }
            );
        });
}


/* =========================================================
   MOBILE FOOTER ACCORDION
========================================================= */

const footerToggles =
    document.querySelectorAll(".footer-toggle");

footerToggles.forEach((toggle) => {

    toggle.addEventListener(
        "click",
        () => {

            const footerCol =
                toggle.closest(".footer-col");

            const footerIcon =
                toggle.querySelector(
                    ".footer-icon"
                );

            if (!footerCol) return;

            footerCol.classList.toggle(
                "active"
            );

            if (!footerIcon) return;

            footerIcon.textContent =
                footerCol.classList.contains(
                    "active"
                )
                    ? "−"
                    : "+";
        }
    );
});


/* =========================================================
   HOMEPAGE SCROLL REVEAL — FIXED
   - Strong visible entrance animation
   - Separate from common.js .is-visible
   - Two animation frames are used so the browser paints
     the hidden state BEFORE reveal-active is applied
   - Reveal happens only once
========================================================= */

function initializeHomepageReveal() {

    const revealItems =
        document.querySelectorAll(".scroll-reveal");

    if (!revealItems.length) return;

    /*
       Establish the hidden CSS state.

       Your CSS uses:
       html.reveal-ready .scroll-reveal
    */
    document.documentElement.classList.add(
        "reveal-ready"
    );

    /*
       Make sure every reveal element starts
       without the visible class.
    */
    revealItems.forEach((item) => {
        item.classList.remove("reveal-active");
    });

    /*
       Wait two animation frames.

       This gives the browser enough time to render
       the hidden position first.

       Without this, items already close to the viewport
       can instantly become visible without showing
       the actual entrance animation.
    */
    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            /*
               Fallback for older browsers that do not
               support IntersectionObserver.
            */
            if (!("IntersectionObserver" in window)) {

                revealItems.forEach((item) => {
                    item.classList.add(
                        "reveal-active"
                    );
                });

                return;
            }


            const revealObserver =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach((entry) => {

                            /*
                               Do nothing until the element
                               enters the visible viewport.
                            */
                            if (!entry.isIntersecting) {
                                return;
                            }


                            /*
                               Start reveal animation.
                            */
                            entry.target.classList.add(
                                "reveal-active"
                            );


                            /*
                               IMPORTANT:

                               Stop observing after the
                               animation happens once.

                               This means:
                               - scroll down = reveal
                               - scroll back up = remains visible
                               - scroll down again = does NOT replay
                            */
                            observer.unobserve(
                                entry.target
                            );
                        });
                    },

                    {
                        /*
                           The animation starts when roughly
                           12% of the element enters the viewport.
                        */
                        threshold: 0.12,

                        /*
                           Prevent the animation from triggering
                           too early near the bottom of the screen.
                        */
                        rootMargin:
                            "0px 0px -10% 0px"
                    }
                );


            /*
               Observe every element containing
               the .scroll-reveal class.
            */
            revealItems.forEach((item) => {

                revealObserver.observe(
                    item
                );

            });

        });

    });

}


/* =========================================================
   INITIALIZE SCROLL REVEAL
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeHomepageReveal,
        {
            once: true
        }
    );

} else {

    initializeHomepageReveal();

}