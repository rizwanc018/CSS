const card = document.querySelector(".card");
const container = document.querySelector(".container");

const updateCursor = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--x", x);
    card.style.setProperty("--y", y);
};

card.addEventListener("pointermove", updateCursor);
