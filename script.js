// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");


menuBtn.addEventListener("click", function () {

    mobileMenu.classList.toggle("hidden");

    const icon = menuBtn.querySelector("i");

    if (mobileMenu.classList.contains("hidden")) {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    } else {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    }

});


// CLOSE MOBILE MENU AFTER CLICKING A LINK

const mobileLinks = mobileMenu.querySelectorAll("a");


mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mobileMenu.classList.add("hidden");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent = new Date().getFullYear();


//hidden videos
const viewMoreBtn = document.getElementById("viewMoreBtn");
const moreVideos = document.getElementById("moreVideos");

viewMoreBtn.addEventListener("click", function () {

    moreVideos.classList.toggle("hidden");

    viewMoreBtn.textContent =
        moreVideos.classList.contains("hidden")
        ? "View More Videos"
        : "View Less";

});

//hidden pictures
const viewMorePicturesBtn = document.getElementById("viewMorePicturesBtn");
const morePictures = document.getElementById("morePictures");

viewMorePicturesBtn.addEventListener("click", function () {

    morePictures.classList.toggle("hidden");

    viewMorePicturesBtn.textContent =
        morePictures.classList.contains("hidden")
        ? "View More Photos"
        : "View Less";

});


// TESTIMONIALS CAROUSEL

const testimonialTrack = document.getElementById("testimonial-track");

const testimonialSlides = document.querySelectorAll(".testimonial-slide");

const prevButton = document.getElementById("testimonial-prev");

const nextButton = document.getElementById("testimonial-next");

const dotsContainer = document.getElementById("testimonial-dots");

let currentTestimonial = 0;

let testimonialInterval;

// Determine visible cards based on screen size

function getVisibleTestimonials() {

if (window.innerWidth >= 1024) {
    return 3;
}

if (window.innerWidth >= 768) {
    return 2;
}

return 1;

}

// Calculate maximum slide position

function getMaxTestimonialIndex() {

return Math.max(
    0,
    testimonialSlides.length - getVisibleTestimonials()
);

}

// Create navigation dots

function createTestimonialDots() {

dotsContainer.innerHTML = "";

const totalDots = getMaxTestimonialIndex() + 1;

for (let i = 0; i < totalDots; i++) {

    const dot = document.createElement("button");

    dot.className = "w-2.5 h-2.5 rounded-full transition-all duration-300";

    dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);

    dot.addEventListener("click", () => {

        currentTestimonial = i;

        updateTestimonials();

        restartTestimonialTimer();

    });

    dotsContainer.appendChild(dot);

}

}

// Update slider position

function updateTestimonials() {

const visibleCards = getVisibleTestimonials();

const slideWidth = 100 / visibleCards;

currentTestimonial = Math.min(
    currentTestimonial,
    getMaxTestimonialIndex()
);

testimonialTrack.style.transform =
    `translateX(-${currentTestimonial * slideWidth}%)`;


// Update dots

const dots = dotsContainer.querySelectorAll("button");

dots.forEach((dot, index) => {

    dot.classList.toggle(
        "bg-rust",
        index === currentTestimonial
    );

    dot.classList.toggle(
        "bg-[#d6c5b5",
        index !== currentTestimonial
    );

});

}

// Next testimonial

function nextTestimonial() {

if (currentTestimonial >= getMaxTestimonialIndex()) {

    currentTestimonial = 0;

} else {

    currentTestimonial++;

}

updateTestimonials();

}

// Previous testimonial

function prevTestimonial() {

if (currentTestimonial <= 0) {

    currentTestimonial = getMaxTestimonialIndex();

} else {

    currentTestimonial--;

}

updateTestimonials();

}

// Automatic sliding

function startTestimonialTimer() {

testimonialInterval = setInterval(() => {

    nextTestimonial();

}, 5000);

}

// Restart timer after manual navigation

function restartTestimonialTimer() {

clearInterval(testimonialInterval);

startTestimonialTimer();

}

// Button events

nextButton.addEventListener("click", () => {

nextTestimonial();

restartTestimonialTimer();

});

prevButton.addEventListener("click", () => {

prevTestimonial();

restartTestimonialTimer();

});

// Responsive adjustments

window.addEventListener("resize", () => {

currentTestimonial = Math.min(
    currentTestimonial,
    getMaxTestimonialIndex()
);

createTestimonialDots();

updateTestimonials();

});

// Initialize

createTestimonialDots();

updateTestimonials();

startTestimonialTimer();