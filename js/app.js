/* =====================================================
   PORTFOLIO APP
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initNavbar();

    initMobileMenu();

    initSmoothScroll();

    initScrollProgress();

    initScrollTop();

    initRevealAnimations();

    initTyping();

    initThemeToggle();

    initAOS();

    loadGithubProjects();

});

/* =====================================================
   LOADER
===================================================== */

function initLoader() {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        loader.classList.add("hide");

        setTimeout(() => {

            loader.remove();

        }, 700);

    });

}

/* =====================================================
   STICKY NAVBAR
===================================================== */

function initNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.classList.add("sticky");

        } else {

            navbar.classList.remove("sticky");

        }

        highlightActiveSection();

    });

}

/* =====================================================
   MOBILE MENU
===================================================== */

function initMobileMenu() {

    const menuBtn = document.querySelector(".menu-btn");

    const nav = document.querySelector(".nav-links");

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        menuBtn.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuBtn.classList.remove("active");

        });

    });

}

/* =====================================================
   SMOOTH SCROLL
===================================================== */

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", e => {

            e.preventDefault();

            const target = document.querySelector(anchor.getAttribute("href"));

            if (!target) return;

            window.scrollTo({

                top: target.offsetTop - 70,

                behavior: "smooth"

            });

        });

    });

}

/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

function highlightActiveSection() {

    const sections = document.querySelectorAll("section[id]");

    const links = document.querySelectorAll(".nav-links a");

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;

        if (window.scrollY >= top) {

            current = section.id;

        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

}

/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */

function initScrollProgress() {

    const progress = document.getElementById("progressBar");

    if (!progress) return;

    window.addEventListener("scroll", () => {

        const height =

            document.documentElement.scrollHeight -

            document.documentElement.clientHeight;

        const value =

            (window.scrollY / height) * 100;

        progress.style.width = value + "%";

    });

}

/* =====================================================
   SCROLL TO TOP
===================================================== */

function initScrollTop() {

    const button = document.getElementById("scrollTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });
  /* =====================================================
   REVEAL ANIMATIONS
===================================================== */

function initRevealAnimations() {

    const elements = document.querySelectorAll(
        ".reveal, .fade-left, .fade-right, .fade-down, .zoom-in"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(el => observer.observe(el));

}

/* =====================================================
   TYPING EFFECT
===================================================== */

function initTyping() {

    const element = document.querySelector(".typing");

    if (!element) return;

    const words = [
        "Python Developer",
        "Applied AI Engineer",
        "FastAPI Backend Developer",
        "LLM & RAG Engineer",
        "Automation Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const current = words[wordIndex];

        if (!deleting) {

            element.textContent = current.substring(0, charIndex++);

            if (charIndex > current.length) {

                deleting = true;

                setTimeout(type, 1400);

                return;

            }

        } else {

            element.textContent = current.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex = (wordIndex + 1) % words.length;

            }

        }

        setTimeout(type, deleting ? 45 : 90);

    }

    type();

}

/* =====================================================
   THEME TOGGLE
===================================================== */

function initThemeToggle() {

    const button = document.getElementById("theme-toggle");

    if (!button) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

    }

    button.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const current = document.body.classList.contains("light-theme")
            ? "light"
            : "dark";

        localStorage.setItem("theme", current);

    });

}

/* =====================================================
   CONTACT FORM
===================================================== */

(function () {

    const form = document.getElementById("contact-form");

    if (!form) return;

    form.addEventListener("submit", function () {

        const button = form.querySelector("button");

        if (button) {

            button.disabled = true;

            button.innerHTML = "Sending...";

        }

        setTimeout(() => {

            if (button) {

                button.disabled = false;

                button.innerHTML = "Send Message";

            }

        }, 2500);

    });

})();

/* =====================================================
   AOS
===================================================== */

function initAOS() {

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 900,

            easing: "ease-out-cubic",

            once: true,

            offset: 80

        });

    }

}

/* =====================================================
   CURSOR GLOW
===================================================== */

(function () {

    const cursor = document.querySelector(".cursor-glow");

    if (!cursor) return;

    document.addEventListener("mousemove", e => {

        cursor.style.left = e.clientX + "px";

        cursor.style.top = e.clientY + "px";

    });

})();

/* =====================================================
   PARALLAX HERO
===================================================== */

(function () {

    const consoleCard = document.querySelector(".hero-console");

    if (!consoleCard) return;

    window.addEventListener("mousemove", e => {

        const x = (window.innerWidth / 2 - e.clientX) / 45;

        const y = (window.innerHeight / 2 - e.clientY) / 45;

        consoleCard.style.transform =
            `rotate(-7deg) rotateX(${y}deg) rotateY(${-x}deg)`;

    });

})();

/* =====================================================
   YEAR
===================================================== */

(function () {

    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

})();

/* =====================================================
   PERFORMANCE
===================================================== */

window.addEventListener("pageshow", () => {

    document.body.classList.remove("loading");

});

/* =====================================================
   GITHUB
===================================================== */

if (typeof loadGithubProjects === "function") {

    loadGithubProjects();

}
