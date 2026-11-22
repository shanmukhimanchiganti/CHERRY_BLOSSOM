
document.addEventListener("DOMContentLoaded", function () {

    // HERO SLIDESHOW IMAGES
    const heroImages = [
        "assets/images/hero/hero1.jpeg",
        "assets/images/hero/hero2.jpeg",
        "assets/images/hero/hero3.jpeg",
        "assets/images/hero/hero4.jpeg",
        "assets/images/hero/hero5.jpeg",
        "assets/images/hero/hero6.jpeg",
        "assets/images/hero/hero7.jpeg",
        "assets/images/hero/hero8.jpeg"
    ];

    const heroImage = document.getElementById("heroImage");
    const indicators = document.getElementById("heroIndicators");
    const prevButton = document.getElementById("prevSlide");
    const nextButton = document.getElementById("nextSlide");
    const counter = document.getElementById("heroCounter");

    if (!heroImage || !indicators) {
        console.error("Slideshow elements not found!");
        return;
    }

    let currentIndex = 0;
    let slideInterval;

    // PRELOAD IMAGES
    heroImages.forEach(function (src) {
        const img = new Image();
        img.src = src;
    });

    // CREATE INDICATORS
    heroImages.forEach(function (src, index) {

        const button = document.createElement("button");

        button.type = "button";
        button.setAttribute("aria-label", "Slide " + (index + 1));

        button.addEventListener("click", function () {
            showSlide(index);
            startSlideshow();
        });

        indicators.appendChild(button);
    });

    // SHOW SLIDE
    function showSlide(index) {

        currentIndex = (index + heroImages.length) % heroImages.length;

        heroImage.src = heroImages[currentIndex];

        const buttons = indicators.querySelectorAll("button");

        buttons.forEach(function (button, i) {
            button.classList.toggle("active", i === currentIndex);
        });

        if (counter) {
            counter.textContent =
                String(currentIndex + 1).padStart(2, "0") +
                " / " +
                String(heroImages.length).padStart(2, "0");
        }
    }

    // NEXT SLIDE
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // PREVIOUS SLIDE
    function previousSlide() {
        showSlide(currentIndex - 1);
    }

    // AUTOPLAY EVERY 3 SECONDS
    function startSlideshow() {

        clearInterval(slideInterval);

        slideInterval = setInterval(function () {
            nextSlide();
        }, 3000);
    }

    // ARROW EVENTS
    if (nextButton) {
        nextButton.addEventListener("click", function () {
            nextSlide();
            startSlideshow();
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            previousSlide();
            startSlideshow();
        });
    }

    // IMAGE ERROR
    heroImage.onerror = function () {
        console.error("Image not found:", heroImages[currentIndex]);
    };

    // INITIALIZE SLIDESHOW
    showSlide(0);
    startSlideshow();


    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(function (link) {

            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });

        });
    }

});
