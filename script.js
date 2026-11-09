
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "بستن منو" : "باز کردن منو"
    );
});

const navLinks = navMenu.querySelectorAll("a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "باز کردن منو");
    });
});

document.addEventListener("click", (event) => {
    if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "باز کردن منو");
    }
});


/* =========================================
   MOODPICTURE - CINEMATIC LENS ENGINE
========================================= */

const lensSection = document.getElementById("lensExperience");
const cameraLens = document.getElementById("cameraLens");

const lensPhoto = document.getElementById("lensPhoto");
const lensIris = document.querySelector(".lens-iris");
const lensOuterRing = document.querySelector(".lens-outer-ring");
const lensLightBeam = document.querySelector(".lens-light-beam");

let lensFrame = null;

function updateCinematicLens() {

    if (!lensSection || !cameraLens) return;

    const rect = lensSection.getBoundingClientRect();
    const viewport = window.innerHeight;

    // میزان پیشرفت اسکرول در سکشن
    let progress = (
        viewport * 0.9 - rect.top
    ) / (
        viewport + rect.height * 0.65
    );

    progress = Math.max(0, Math.min(1, progress));

    // منحنی نرم حرکت
    const smooth = progress * progress * (3 - 2 * progress);

    // حرکت سه بعدی بدنه
    const rotateX = 18 - smooth * 36;
    const rotateY = -28 + smooth * 56;
    const rotateZ = -12 + smooth * 24;

    // حرکت عمودی
    const moveY = Math.sin(progress * Math.PI) * -55;

    // بزرگ شدن لنز در مرکز سکشن
    const scale = 0.76 + Math.sin(progress * Math.PI) * 0.32;

    cameraLens.style.transform = `
        translate3d(0, ${moveY}px, 0)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        scale(${scale})
    `;

    // چرخش حلقه فلزی
    if (lensOuterRing) {
        lensOuterRing.style.transform =
            `rotate(${smooth * 160}deg)`;
    }

    // چرخش معکوس دیافراگم
    if (lensIris) {
        lensIris.style.transform =
            `rotate(${-smooth * 220}deg)`;
    }

    // زوم تصویر داخل لنز
    if (lensPhoto) {
        const zoom = 1.15 + smooth * 0.5;

        lensPhoto.style.transform =
            `scale(${zoom}) translateY(${-smooth * 8}%)`;
    }

    // تغییر شدت نور
    if (lensLightBeam) {
        lensLightBeam.style.opacity =
            0.4 + Math.sin(progress * Math.PI) * 0.6;
    }

    lensFrame = null;
}

function requestLensFrame() {

    if (lensFrame !== null) return;

    lensFrame = requestAnimationFrame(updateCinematicLens);
}

window.addEventListener(
    "scroll",
    requestLensFrame,
    { passive: true }
);

window.addEventListener(
    "resize",
    requestLensFrame
);

updateCinematicLens();
