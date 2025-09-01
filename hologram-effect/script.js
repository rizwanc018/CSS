const card = document.querySelector(".card");
const container = document.querySelector(".container");

const updateCursor = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--x", x);
    card.style.setProperty("--y", y);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;
    
    container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const resetCard = () => {
    container.style.transform = `rotateX(0deg) rotateY(0deg)`;
};

container.addEventListener("pointermove", updateCursor);
container.addEventListener("mouseleave", resetCard);
