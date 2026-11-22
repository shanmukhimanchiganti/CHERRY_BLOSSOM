const cultureCards = document.querySelectorAll(".culture-card");
const cultureContainer = document.querySelector(".culture-cards-container");

cultureCards.forEach(card => {
    card.addEventListener("click", () => {

        const isAlreadyActive = card.classList.contains("active");

        cultureCards.forEach(c => c.classList.remove("active"));

        cultureContainer.classList.remove("has-active");

        if (!isAlreadyActive) {
            card.classList.add("active");
            cultureContainer.classList.add("has-active");
        }
    });
});