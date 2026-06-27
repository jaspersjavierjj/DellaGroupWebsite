/* =========================
   NAVBAR DROPDOWN PAGE BLUR
========================= */

// Select all nav items with dropdowns
const navItems = document.querySelectorAll('.nav-item');

// Select the page content wrapper
const pageContent = document.querySelector('.page-content'); // make sure your page content has this class

navItems.forEach(item => {
    const dropdown = item.querySelector('.nav-dropdown');
    if (dropdown) {
        // Add blur when mouse enters the nav item
        item.addEventListener('mouseenter', () => {
            pageContent.classList.add('blur');
        });

        // Remove blur when mouse leaves
        item.addEventListener('mouseleave', () => {
            pageContent.classList.remove('blur');
        });
    }
});

/* =========================
   NAVBAR SCROLL HIDE/SHOW
========================= */


const navbar = document.querySelector(".navbar");

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
        navbar.classList.add("nav-hidden");
    } else {
        navbar.classList.remove("nav-hidden");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


/* =========================
   SCRAMBLE TEXT EFFECT
   Desktop: hover
   Mobile: reveal when visible on screen
========================= */

const scrambleTargets = document.querySelectorAll(".unit-card, .sector");

function scrambleText(paragraph) {
    if (!paragraph) return;

    const originalText = paragraph.dataset.text || paragraph.innerText.trim();
    paragraph.dataset.text = originalText;

    clearInterval(paragraph.scrambleInterval);

    const chars = "abcdefghijklmnopqrstuvwxyz     ";
    const duration = 1500;
    const speed = 24;
    const startTime = Date.now();

    paragraph.scrambleInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        paragraph.innerText = originalText
            .split("")
            .map((char, index) => {
                if (char === " ") return " ";

                const revealPoint = index / originalText.length;

                if (progress > revealPoint) {
                    return originalText[index];
                }

                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (progress >= 1) {
            clearInterval(paragraph.scrambleInterval);
            paragraph.innerText = originalText;
        }
    }, speed);
}

scrambleTargets.forEach((item) => {
    const paragraph = item.querySelector("p");

    if (!paragraph) return;

    const originalText = paragraph.dataset.text || paragraph.innerText.trim();
    paragraph.dataset.text = originalText;

    item.addEventListener("mouseenter", () => {
        if (window.innerWidth > 768) {
            item.classList.add("is-visible");
            scrambleText(paragraph);
        }
    });

    item.addEventListener("mouseleave", () => {
        if (window.innerWidth > 768) {
            clearInterval(paragraph.scrambleInterval);
            paragraph.innerText = originalText;
            item.classList.remove("is-visible");
        }
    });
});

/* Mobile reveal when section appears on screen */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const paragraph = item.querySelector("p");

                item.classList.add("is-visible");

                if (!item.dataset.scrambledOnce) {
                    scrambleText(paragraph);
                    item.dataset.scrambledOnce = "true";
                }
            }
        });
    },
    {
        threshold: 0.35
    }
);

scrambleTargets.forEach((item) => {
    revealObserver.observe(item);
});

/* =========================
   DELLA DELIVERS SLIDER
========================= */

const slides = document.querySelectorAll(".delivers-slider .slide");
const indicators = document.querySelectorAll(".delivers-slider .indicator");
const progressBar = document.querySelector(".slide-progress-bar");

let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    indicators.forEach((indicator) => {
        indicator.classList.remove("active");
    });

    slides[index].classList.add("active");
    indicators[index].classList.add("active");

    progressBar.style.animation = "none";
    progressBar.offsetHeight;
    progressBar.style.animation = "progressLoad 5s linear infinite";
}

setInterval(() => {
    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}, 5000);



/* =========================
   PAGE LOADER
========================= */

const pageLoader = document.getElementById("page-loader");

// All internal links
document.querySelectorAll("a[href]").forEach(link => {

    link.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        // Ignore anchors, external links, downloads
        if (
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            this.target === "_blank"
        ) {
            return;
        }

        pageLoader.style.width = "0%";

        let progress = 0;

        const loading = setInterval(() => {

            if (progress < 85) {
                progress += Math.random() * 15;
                pageLoader.style.width = progress + "%";
            }

        }, 80);

        // Cleanup before page leaves
        window.addEventListener("beforeunload", () => {
            clearInterval(loading);
            pageLoader.style.width = "90%";
        });
    });

});

// When page fully loads
window.addEventListener("load", () => {

    pageLoader.style.width = "100%";

setTimeout(() => {
    pageLoader.style.opacity = "0";
}, 150);

    setTimeout(() => {
        pageLoader.style.transition = "none";
        pageLoader.style.width = "0%";

        requestAnimationFrame(() => {
            pageLoader.style.transition =
                "width 0.25s ease, opacity 0.3s ease";
            pageLoader.style.opacity = "1";
        });
    }, 450);

});


/* =========================
   MOBILE MENU
========================= */

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenuPanel = document.querySelector(".mobile-menu-panel");

if (mobileMenuBtn && mobileMenuPanel) {
    mobileMenuBtn.addEventListener("click", () => {
        mobileMenuPanel.classList.toggle("active");

        const icon = mobileMenuBtn.querySelector(".material-icons");

        if (mobileMenuPanel.classList.contains("active")) {
            icon.textContent = "close";
            document.body.style.overflow = "hidden";
        } else {
            icon.textContent = "menu";
            document.body.style.overflow = "";
        }
    });

    mobileMenuPanel.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuPanel.classList.remove("active");
            mobileMenuBtn.querySelector(".material-icons").textContent = "menu";
            document.body.style.overflow = "";
        });
    });
}

/* =========================
   MOBILE FOOTER ACCORDION
========================= */

const footerToggles = document.querySelectorAll(".footer-toggle");

footerToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const footerCol = toggle.closest(".footer-col");
        const footerIcon = toggle.querySelector(".footer-icon");

        footerCol.classList.toggle("active");

        if (footerCol.classList.contains("active")) {
            footerIcon.textContent = "−";
        } else {
            footerIcon.textContent = "+";
        }
    });
});

/* =========================
   ALWAYS START AT TOP
========================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

window.onload = function () {
    window.scrollTo(0, 0);
};