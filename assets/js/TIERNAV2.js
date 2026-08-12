document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".hero-options button");
    const sections = document.querySelectorAll(".construction-top");
    const navbar = document.querySelector(".navbar");

    // Normalize text for matching
    function normalize(text) {
        return text
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();
    }

    // Custom smooth scrolling animation
    function smoothScrollTo(targetY, duration = 1500) {

        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;

        function easeInOutCubic(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animation(currentTime) {

            if (!startTime) startTime = currentTime;

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            window.scrollTo(
                0,
                startY + distance * easeInOutCubic(progress)
            );

            if (progress < 1) {
                requestAnimationFrame(animation);
            }

        }

        requestAnimationFrame(animation);
    }

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const buttonText = normalize(this.textContent);

            let targetSection = null;

            sections.forEach(section => {

                const label = section.querySelector(".construction-label");

                if (!label) return;

                const labelText = normalize(label.textContent);

                if (buttonText === labelText) {
                    targetSection = section;
                }

            });

            if (!targetSection) {
                console.warn("No matching Tier 2 section found:", buttonText);
                return;
            }

            const navHeight = navbar ? navbar.offsetHeight : 0;

            const targetY =
                targetSection.getBoundingClientRect().top +
                window.pageYOffset -
                navHeight;

            // Scroll Speed
            // 1000 = Fast
            // 1500 = Recommended
            // 2000 = Slow
            smoothScrollTo(targetY, 1500);

        });

    });

});