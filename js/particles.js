/* =====================================================
   PARTICLES BACKGROUND
   Portfolio Website
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof particlesJS === "undefined") {

        console.warn("particles.js library not found.");

        return;

    }

    particlesJS("particles-js", {

        particles: {

            number: {

                value: 70,

                density: {

                    enable: true,

                    value_area: 900

                }

            },

            color: {

                value: [
                    "#7C3AED",
                    "#14B8A6",
                    "#FF6B6B"
                ]

            },

            shape: {

                type: "circle"

            },

            opacity: {

                value: 0.45,

                random: true,

                anim: {

                    enable: true,

                    speed: 0.8,

                    opacity_min: 0.1,

                    sync: false

                }

            },

            size: {

                value: 3,

                random: true,

                anim: {

                    enable: true,

                    speed: 2,

                    size_min: 0.5,

                    sync: false

                }

            },

            line_linked: {

                enable: true,

                distance: 140,

                color: "#7C3AED",

                opacity: 0.22,

                width: 1

            },

            move: {

                enable: true,

                speed: 1.6,

                direction: "none",

                random: false,

                straight: false,

                out_mode: "out",

                bounce: false,

                attract: {

                    enable: false

                }

            }

        },

        interactivity: {

            detect_on: "canvas",

            events: {

                onhover: {

                    enable: true,

                    mode: "grab"

                },

                onclick: {

                    enable: true,

                    mode: "push"

                },

                resize: true

            },

            modes: {

                grab: {

                    distance: 170,

                    line_linked: {

                        opacity: 0.45

                    }

                },

                bubble: {

                    distance: 220,

                    size: 6,

                    duration: 2,

                    opacity: 0.6,

                    speed: 3

                },

                repulse: {

                    distance: 120,

                    duration: 0.4

                },

                push: {

                    particles_nb: 4

                },

                remove: {

                    particles_nb: 2

                }

            }

        },

        retina_detect: true

    });

});

/* =====================================================
   OPTIONAL PARALLAX EFFECT
===================================================== */

(function () {

    const canvas = document.getElementById("particles-js");

    if (!canvas) return;

    document.addEventListener("mousemove", (event) => {

        const x = (event.clientX / window.innerWidth - 0.5) * 20;

        const y = (event.clientY / window.innerHeight - 0.5) * 20;

        canvas.style.transform =
            `translate(${x}px, ${y}px)`;

    });

})();

/* =====================================================
   REDUCE MOTION SUPPORT
===================================================== */

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    const particles = document.getElementById("particles-js");

    if (particles) {

        particles.style.display = "none";

    }

}
