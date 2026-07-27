/* ==========================================================
   Dipayan Mahato Portfolio
   Main JavaScript
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initProgressBar();
    initSmoothScroll();
    initNavbar();
    initRevealAnimation();
    initTypingEffect();
    initCounters();
    initContactForm();

});

/* ==========================================================
   Loader
========================================================== */

function initLoader() {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 500);

    });

}

/* ==========================================================
   Scroll Progress Bar
========================================================== */

function initProgressBar() {

    const progress = document.getElementById("progressBar");

    if (!progress) return;

    window.addEventListener("scroll", () => {

        const scrollTop =
            document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const width = (scrollTop / height) * 100;

        progress.style.width = width + "%";

    });

}

/* ==========================================================
   Sticky Navbar
========================================================== */

function initNavbar() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });

}

/* ==========================================================
   Smooth Scroll
========================================================== */

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                e.preventDefault();

                const target = document.querySelector(
                    this.getAttribute("href")
                );

                if (!target) return;

                target.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            });

        });

}

/* ==========================================================
   Active Navigation
========================================================== */

window.addEventListener("scroll", () => {

    const sections =
        document.querySelectorAll("section");

    const links =
        document.querySelectorAll(".nav-links a");

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (window.scrollY >= top) {

            current = section.id;

        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});
/* ==========================================================
   Reveal on Scroll
========================================================== */

function initRevealAnimation() {

    const elements = document.querySelectorAll(

        ".section, .project-card, .tech-card, .timeline-item, .education-card, .cert-card, .stat-card"

    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    elements.forEach(element => {

        element.classList.add("hidden");

        observer.observe(element);

    });

}

/* ==========================================================
   Typing Effect
========================================================== */

function initTypingEffect() {

    const target = document.getElementById("typing");

    if (!target) return;

    const words = [

        "Python Developer",

        "Applied AI Engineer",

        "FastAPI Developer",

        "LLM Engineer",

        "Automation Specialist"

    ];

    let wordIndex = 0;

    let charIndex = 0;

    let deleting = false;

    function type() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            target.textContent =
                currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(type, 1200);

                return;

            }

        } else {

            target.textContent =
                currentWord.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex =

                    (wordIndex + 1) % words.length;

            }

        }

        setTimeout(type, deleting ? 50 : 90);

    }

    type();

}

/* ==========================================================
   Animated Counters
========================================================== */

function initCounters() {

    const counters =

        document.querySelectorAll("[data-count]");

    if (!counters.length) return;

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const targetValue =

                    parseInt(counter.dataset.count);

                let value = 0;

                const speed =

                    Math.max(10, targetValue / 100);

                const update = () => {

                    value += speed;

                    if (value >= targetValue) {

                        counter.textContent =

                            targetValue;

                        return;

                    }

                    counter.textContent =

                        Math.floor(value);

                    requestAnimationFrame(update);

                };

                update();

                observer.unobserve(counter);

            });

        },

        {

            threshold: 0.5

        }

    );

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

/* ==========================================================
   Mobile Navigation
========================================================== */

const menuButton = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a")

        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

            });

        });

}
