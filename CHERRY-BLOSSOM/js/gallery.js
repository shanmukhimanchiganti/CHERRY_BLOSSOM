/* ==========================================
   CHERRY BLOSSOM - CINEMATIC GALLERY
   20 IMAGES - ONE CONTINUOUS GALLERY
========================================== */

const galleryImages = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;

    return {
        src: `../assets/images/gallery/image${number}.jpeg`,
        title: `Beautiful Memory ${String(number).padStart(2, "0")}`,
        category: "CHERRY BLOSSOM COLLECTION",
        description: "Every beautiful moment deserves to be remembered."
    };
});

let currentIndex = 0;

const featuredImage = document.getElementById("featuredImage");
const featuredFrame = document.getElementById("featuredFrame");
const featuredTitle = document.getElementById("featuredTitle");
const featuredCategory = document.getElementById("featuredCategory");
const featuredDescription = document.getElementById("featuredDescription");

const currentCount = document.getElementById("currentCount");
const totalCount = document.getElementById("totalCount");

const thumbnailTrack = document.getElementById("thumbnailTrack");

const lightbox = document.getElementById("cinematicLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDescription = document.getElementById("lightboxDescription");


/* ==========================================
   CREATE 20 THUMBNAILS
========================================== */

function createThumbnails() {
    thumbnailTrack.innerHTML = "";

    galleryImages.forEach((image, index) => {
        const thumbnail = document.createElement("button");

        thumbnail.className = "thumbnail";
        thumbnail.setAttribute("aria-label", `View image ${index + 1}`);

        const thumbnailImage = document.createElement("img");

        thumbnailImage.src = image.src;
        thumbnailImage.alt = image.title;

        thumbnail.appendChild(thumbnailImage);

        thumbnail.addEventListener("click", () => {
            showImage(index);
        });

        thumbnailTrack.appendChild(thumbnail);
    });

    totalCount.textContent = String(galleryImages.length).padStart(2, "0");
}


/* ==========================================
   DISPLAY FEATURED IMAGE
========================================== */

function showImage(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;

    const image = galleryImages[currentIndex];

    featuredFrame.classList.add("changing");

    const newImage = new Image();

    newImage.onload = function () {
        featuredImage.src = image.src;

        featuredTitle.textContent = image.title;
        featuredCategory.textContent = image.category;
        featuredDescription.textContent = image.description;

        currentCount.textContent =
            String(currentIndex + 1).padStart(2, "0");

        featuredFrame.classList.remove("changing");

        updateThumbnails();

        if (lightbox.classList.contains("open")) {
            updateLightbox();
        }
    };

    newImage.onerror = function () {
        featuredFrame.classList.remove("changing");
        console.error("Image could not be loaded:", image.src);
    };

    newImage.src = image.src;
}


/* ==========================================
   ACTIVE THUMBNAIL
========================================== */

function updateThumbnails() {
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle("active", index === currentIndex);
    });

    const activeThumbnail = thumbnails[currentIndex];

    if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });
    }
}


/* ==========================================
   PREVIOUS / NEXT
========================================== */

function nextImage() {
    showImage(currentIndex + 1);
}

function previousImage() {
    showImage(currentIndex - 1);
}

document.getElementById("nextImage")
    .addEventListener("click", nextImage);

document.getElementById("previousImage")
    .addEventListener("click", previousImage);


/* ==========================================
   FULLSCREEN LIGHTBOX
========================================== */

function updateLightbox() {
    const image = galleryImages[currentIndex];

    lightboxImage.src = image.src;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
}

function openLightbox() {
    updateLightbox();

    lightbox.classList.add("open");
    document.body.classList.add("lightbox-open");
}

function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
}

document.getElementById("expandImage")
    .addEventListener("click", openLightbox);

featuredImage.addEventListener("click", openLightbox);

document.getElementById("closeLightbox")
    .addEventListener("click", closeLightbox);

document.getElementById("lightboxNext")
    .addEventListener("click", nextImage);

document.getElementById("lightboxPrevious")
    .addEventListener("click", previousImage);


/* ==========================================
   KEYBOARD CONTROLS
========================================== */

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }
});


/* ==========================================
   MOBILE NAVIGATION
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");

        menuToggle.setAttribute(
            "aria-expanded",
            navLinks.classList.contains("show")
        );
    });
}


/* ==========================================
   INITIALIZE GALLERY
========================================== */

createThumbnails();
showImage(0);