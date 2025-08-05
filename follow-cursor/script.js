const card = document.querySelector(".card");
const boxes = document.querySelectorAll(".box");
const glow = document.querySelector(".glow");

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

const handleMouseMove = throttle((e) => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = mouseX - cardCenterX;
    const deltaY = mouseY - cardCenterY;

    const rotateX = Math.max(-25, Math.min(25, (deltaY / rect.height) * -30));
    const rotateY = Math.max(-25, Math.min(25, (deltaX / rect.width) * 30));

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
    const intensity = Math.min(distance / maxDistance, 1);

    boxes.forEach((box, i) => {
        const baseZ = (i + 1) * 20;
        const dynamicZ = baseZ + (intensity * 80 * (i + 1)) / 4;
        const scale = 1 + intensity * 0.05 * (i + 1);

        box.style.transform = `translateZ(${dynamicZ}px) scale(${scale})`;
    });

    const glowX = (deltaX / rect.width) * 100;
    const glowY = (deltaY / rect.height) * 100;
    glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
}, 16);

function resetCard() {
    card.style.transform = "perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(0px)";

    boxes.forEach((box, i) => {
        const baseZ = (i + 1) * 20;
        box.style.transform = `translateZ(${baseZ}px) scale(1)`;
    });

    glow.style.transform = "translate(0px, 0px)";
}

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseleave", resetCard);

resetCard();

// const card = document.querySelector(".card");
// const boxes = document.querySelectorAll(".box");

// document.body.addEventListener("mousemove", (e) => {
//     const x = e.clientX;
//     const y = e.clientY;

//     const middleX = window.innerWidth / 2;
//     const middleY = window.innerHeight / 2;

//     const offsetX = x - middleX;
//     const offsetY = y - middleY;

//     const rotateX = (offsetX / middleX) * 40;
//     const rotateY = (offsetY / middleY) * 40 * -1;

//     // card.style.transform = `rotateY(${rotateX}deg) rotateX(${rotateY}deg)`;
//     card.style.transform = `perspective(1000px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) translateZ(20px)`;

//     const maxZ = 100;
//     const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);
//     const normalized = Math.min(distance / middleX, 1);

//     boxes.forEach((box, i) => {
//         const baseZ = (i + 1) * 20;
//         const dynamicZ = baseZ + normalized * maxZ * (i + 1);
//         box.style.transform = `translateZ(${dynamicZ}px)`;
//     });
// });

// document.body.addEventListener("mouseleave", () => {
//     card.style.transform = "rotateY(20deg) rotateX(20deg)";
//     boxes.forEach((box, i) => {
//         const baseZ = (i + 1) * 20;
//         box.style.transform = `translateZ(${baseZ}px)`;
//     });
// });
