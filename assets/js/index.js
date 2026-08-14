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