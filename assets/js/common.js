document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SCRAMBLE TEXT EFFECT
       Desktop: hover
       Mobile: reveal when visible on screen
    ========================= */

    const scrambleTargets =
        document.querySelectorAll(".unit-card, .sector");

    function scrambleText(paragraph) {
        if (!paragraph) return;

        const originalText =
            paragraph.dataset.text ||
            paragraph.innerText.trim();

        paragraph.dataset.text = originalText;

        clearInterval(paragraph.scrambleInterval);

        const chars =
            "abcdefghijklmnopqrstuvwxyz     ";

        const duration = 1500;
        const speed = 24;
        const startTime = Date.now();

        paragraph.scrambleInterval = setInterval(() => {

            const elapsed = Date.now() - startTime;
            const progress =
                Math.min(elapsed / duration, 1);

            paragraph.innerText = originalText
                .split("")
                .map((char, index) => {

                    if (char === " ") {
                        return " ";
                    }

                    const revealPoint =
                        index / originalText.length;

                    if (progress > revealPoint) {
                        return originalText[index];
                    }

                    return chars[
                        Math.floor(
                            Math.random() * chars.length
                        )
                    ];
                })
                .join("");

            if (progress >= 1) {
                clearInterval(
                    paragraph.scrambleInterval
                );

                paragraph.innerText = originalText;
            }
        }, speed);
    }

    scrambleTargets.forEach(item => {

        const paragraph = item.querySelector("p");

        if (!paragraph) return;

        const originalText =
            paragraph.dataset.text ||
            paragraph.innerText.trim();

        paragraph.dataset.text = originalText;

        item.addEventListener("mouseenter", () => {

            if (window.innerWidth > 768) {
                item.classList.add("is-visible");
                scrambleText(paragraph);
            }
        });

        item.addEventListener("mouseleave", () => {

            if (window.innerWidth > 768) {
                clearInterval(
                    paragraph.scrambleInterval
                );

                paragraph.innerText = originalText;
                item.classList.remove("is-visible");
            }
        });
    });

    /* =========================
       MOBILE SCROLL REVEAL
    ========================= */

    if (
        "IntersectionObserver" in window &&
        scrambleTargets.length > 0
    ) {
        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const item = entry.target;
                        const paragraph =
                            item.querySelector("p");

                        item.classList.add("is-visible");

                        if (
                            paragraph &&
                            !item.dataset.scrambledOnce
                        ) {
                            scrambleText(paragraph);

                            item.dataset.scrambledOnce =
                                "true";
                        }
                    });
                },
                {
                    threshold: 0.35
                }
            );

        scrambleTargets.forEach(item => {
            revealObserver.observe(item);
        });
    }

    /* =========================
       DELLA DELIVERS SLIDER
    ========================= */

    const slides =
        document.querySelectorAll(
            ".delivers-slider .slide"
        );

    const indicators =
        document.querySelectorAll(
            ".delivers-slider .indicator"
        );

    const progressBar =
        document.querySelector(
            ".slide-progress-bar"
        );

    const prevBtn =
        document.querySelector(
            ".slider-arrow.prev"
        );

    const nextBtn =
        document.querySelector(
            ".slider-arrow.next"
        );

    let currentSlide = 0;
    let slideInterval = null;

    function resetProgress() {
        if (!progressBar) return;

        progressBar.style.animation = "none";

        void progressBar.offsetWidth;

        progressBar.style.animation =
            "progressLoad 5s linear forwards";
    }

    function showSlide(index) {
        if (!slides.length) return;

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        indicators.forEach(indicator => {
            indicator.classList.remove("active");
        });

        const targetSlide = slides[index];

        if (!targetSlide) return;

        targetSlide.classList.add("active");

        if (indicators[index]) {
            indicators[index].classList.add("active");
        }

        resetProgress();
    }

    function nextSlide() {
        if (!slides.length) return;

        currentSlide =
            (currentSlide + 1) % slides.length;

        showSlide(currentSlide);
    }

    function prevSlide() {
        if (!slides.length) return;

        currentSlide =
            (currentSlide - 1 + slides.length) %
            slides.length;

        showSlide(currentSlide);
    }

    function startSlider() {
        if (!slides.length) return;

        clearInterval(slideInterval);

        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }

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

    if (slides.length > 0) {
        showSlide(currentSlide);
        startSlider();
    }

});


/* =========================
   SCROLL TO TOP BUTTON
========================= */

const scrollToTopButton =
    document.querySelector(".scroll-to-top");

if (scrollToTopButton) {

    let scrollAnimationId = null;

    const updateScrollToTopButton = () => {
        const shouldShow = window.scrollY > 500;

        scrollToTopButton.classList.toggle(
            "is-visible",
            shouldShow
        );
    };

    function smoothScrollToTop(duration = 1600) {

        /*
            Stop a previous scroll animation if the
            button is clicked again.
        */
        if (scrollAnimationId) {
            cancelAnimationFrame(scrollAnimationId);
        }

        const startPosition =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        /*
            Do nothing when already at the top.
        */
        if (startPosition <= 0) {
            return;
        }

        let startTime = null;

        function easeInOutCubic(progress) {
            return progress < 0.5
                ? 4 * progress * progress * progress
                : 1 -
                    Math.pow(
                        -2 * progress + 2,
                        3
                    ) / 2;
        }

        function animateScroll(currentTime) {

            if (startTime === null) {
                startTime = currentTime;
            }

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const easedProgress =
                easeInOutCubic(progress);

            const newPosition =
                startPosition *
                (1 - easedProgress);

            window.scrollTo(0, newPosition);

            if (progress < 1) {
                scrollAnimationId =
                    requestAnimationFrame(
                        animateScroll
                    );
            } else {
                window.scrollTo(0, 0);
                scrollAnimationId = null;
            }
        }

        scrollAnimationId =
            requestAnimationFrame(
                animateScroll
            );
    }

    scrollToTopButton.addEventListener(
        "click",
        () => {
            smoothScrollToTop(1000);
        }
    );

    window.addEventListener(
        "scroll",
        updateScrollToTopButton,
        { passive: true }
    );

    updateScrollToTopButton();
}