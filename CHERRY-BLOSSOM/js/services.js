
/* ==========================================
   CHERRY BLOSSOM - SERVICES JAVASCRIPT
========================================== */


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuToggle.textContent =
            navLinks.classList.contains("active") ? "✕" : "☰";

    });

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuToggle.textContent = "☰";

        });

    });

}


/* SERVICE DETAILS */

const serviceDetails = {

    wedding: {
        eyebrow: "WHERE LOVE FINDS ITS CELEBRATION",
        title: "Wedding Celebrations",
        description:
            "Every wedding is the beginning of a beautiful story. From graceful décor and enchanting settings to carefully planned arrangements, we bring your vision to life. We create celebrations where love takes centre stage and every detail becomes a memory to cherish forever."
    },

    corporate: {
        eyebrow: "WHERE VISION MEETS EXPERIENCE",
        title: "Corporate Events",
        description:
            "Every gathering is an opportunity to inspire, connect and celebrate achievement. From corporate meetings and conferences to award ceremonies, launches and grand celebrations, we craft organised, elegant and memorable experiences that reflect your vision."
    },

    dj: {
        eyebrow: "LET THE MUSIC SPEAK",
        title: "DJ & Music",
        description:
            "A celebration has its own rhythm, and we bring it to life. With vibrant DJ setups, immersive sound, dynamic lighting and music that brings people together, we create an atmosphere where every beat becomes part of the celebration."
    },

    photography: {
        eyebrow: "A MOMENT. A MEMORY. FOREVER.",
        title: "Photography & Videography",
        description:
            "The most beautiful moments are often the ones that pass in a heartbeat. We capture the smiles, emotions, laughter, details and stories behind every celebration through photography and videography, preserving them to be relived for years to come."
    },

    catering: {
        eyebrow: "FLAVOURS THAT BRING PEOPLE TOGETHER",
        title: "Catering",
        description:
            "Good food makes every gathering warmer. From thoughtfully prepared menus to beautiful presentation and attentive service, we bring flavour, freshness and hospitality to your table, making every meal part of the celebration."
    },

    other: {
        eyebrow: "EVERY MILESTONE DESERVES A MOMENT",
        title: "Other Celebrations",
        description:
            "Life blooms through countless little milestones. Birthdays, baby showers, graduation ceremonies, family gatherings, half saree ceremonies, anniversaries and more — we turn life's meaningful moments into beautiful celebrations filled with warmth, laughter and love."
    }

};


/* MODAL */

const serviceModal = document.getElementById("serviceModal");
const modalClose = document.getElementById("modalClose");

const modalEyebrow = document.getElementById("modalEyebrow");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");


function openService(serviceName) {

    const service = serviceDetails[serviceName];

    if (!service || !serviceModal) return;

    modalEyebrow.textContent = service.eyebrow;
    modalTitle.textContent = service.title;
    modalDescription.textContent = service.description;

    serviceModal.classList.add("open");
    serviceModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    if (modalClose) {
        modalClose.focus();
    }

}


function closeService() {

    if (!serviceModal) return;

    serviceModal.classList.remove("open");
    serviceModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


/* DISCOVER MORE BUTTONS */

document.querySelectorAll("[data-open-service]").forEach(button => {

    button.addEventListener("click", () => {

        const serviceName = button.dataset.openService;

        openService(serviceName);

    });

});


/* CLOSE BUTTON */

if (modalClose) {

    modalClose.addEventListener("click", closeService);

}


/* CLICK OUTSIDE */

if (serviceModal) {

    serviceModal.addEventListener("click", event => {

        if (event.target === serviceModal) {
            closeService();
        }

    });

}


/* ESCAPE KEY */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeService();
    }

});


/* CARD REVEAL */

const serviceCards = document.querySelectorAll(".service-card");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    serviceCards.forEach(card => {

        observer.observe(card);

    });

} else {

    serviceCards.forEach(card => {

        card.classList.add("visible");

    });

}


/* SMOOTH DISCOVER BUTTON */

document.querySelectorAll(".discover-button").forEach(button => {

    button.addEventListener("click", event => {

        const target = document.querySelector("#signature-services");

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});
