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

const prevBtn = document.querySelector(".slider-arrow.prev");
const nextBtn = document.querySelector(".slider-arrow.next");

let currentSlide = 0;
let slideInterval;

function resetProgress() {
    if (!progressBar) return;

    progressBar.style.animation = "none";
    progressBar.offsetWidth;
    progressBar.style.animation = "progressLoad 5s linear forwards";
}

function showSlide(index) {
    if (!slides.length) return;

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    indicators.forEach(indicator => {
        indicator.classList.remove("active");
    });

    slides[index].classList.add("active");

    if (indicators[index]) {
        indicators[index].classList.add("active");
    }

    resetProgress();
}

function nextSlide() {
    if (!slides.length) return;

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

function prevSlide() {
    if (!slides.length) return;

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

function startSlider() {
    if (!slides.length) return;

    clearInterval(slideInterval);

    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

/* Only add listeners when the arrow buttons exist */
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        nextSlide();
        startSlider();
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        prevSlide();
        startSlider();
    });
}

/* Start slider only when slides exist */
if (slides.length > 0) {
    showSlide(currentSlide);
    startSlider();
}

/* =========================
   MOBILE MENU
========================= */

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenuPanel = document.querySelector(".mobile-menu-panel");

let savedScrollPosition = 0;

function lockPageScroll() {
    savedScrollPosition = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollPosition}px`;
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

    window.scrollTo(0, savedScrollPosition);
}

if (mobileMenuBtn && mobileMenuPanel) {

    mobileMenuBtn.addEventListener("click", () => {

        const icon = mobileMenuBtn.querySelector(".material-icons");

        mobileMenuPanel.classList.toggle("active");

        if (mobileMenuPanel.classList.contains("active")) {
            icon.textContent = "close";
            lockPageScroll();
        } else {
            icon.textContent = "menu";
            unlockPageScroll();
        }
    });

    mobileMenuPanel.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenuPanel.classList.remove("active");

            const icon = mobileMenuBtn.querySelector(".material-icons");

            if (icon) {
                icon.textContent = "menu";
            }

            unlockPageScroll();
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