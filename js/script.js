/* =========================================================
   RASMALI BIRTHDAY WEBSITE
   Main JavaScript
   ========================================================= */


/* =========================================================
   01 — DOM ELEMENTS
   ========================================================= */

const openSurpriseButton =
    document.getElementById("open-surprise");

const musicToggleButton =
    document.getElementById("music-toggle");

const birthdayMusic =
    document.getElementById("birthday-music");

const musicButtonText =
    document.querySelector(".music-button-text");

const birthdayPage =
    document.getElementById("birthday-page");


/* =========================================================
   02 — OPEN BIRTHDAY SURPRISE
   ========================================================= */

if (openSurpriseButton) {

    openSurpriseButton.addEventListener("click", () => {

        const birthdayHero =
            document.getElementById("birthday-hero");

        if (birthdayHero) {

            birthdayHero.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        /*
         * Try to start the music after the user's
         * direct interaction.
         *
         * Mobile browsers generally allow media
         * playback after a user gesture.
         */

        playBirthdayMusic();

        /*
         * Add a small burst of hearts.
         */

        createHeartBurst();

    });

}


/* =========================================================
   03 — MUSIC CONTROL
   ========================================================= */

function playBirthdayMusic() {

    if (!birthdayMusic) {
        return;
    }

    const playPromise =
        birthdayMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                updateMusicButton(true);

            })
            .catch(() => {

                /*
                 * Some mobile browsers may still prevent
                 * playback. The user can then use the
                 * music button manually.
                 */

                updateMusicButton(false);

            });

    }

}


function pauseBirthdayMusic() {

    if (!birthdayMusic) {
        return;
    }

    birthdayMusic.pause();

    updateMusicButton(false);

}


function updateMusicButton(isPlaying) {

    if (!musicToggleButton) {
        return;
    }

    if (isPlaying) {

        musicToggleButton.setAttribute(
            "aria-pressed",
            "true"
        );

        musicToggleButton.setAttribute(
            "aria-label",
            "Pause birthday music"
        );

        if (musicButtonText) {

            musicButtonText.textContent =
                "Pause Voice Note";

        }

        const icon =
            musicToggleButton.querySelector(
                "[aria-hidden='true']"
            );

        if (icon) {

            icon.textContent = "Ⅱ";

        }

    } else {

        musicToggleButton.setAttribute(
            "aria-pressed",
            "false"
        );

        musicToggleButton.setAttribute(
            "aria-label",
            "Play birthday music"
        );

        if (musicButtonText) {

            musicButtonText.textContent =
                "Play Voice Note";

        }

        const icon =
            musicToggleButton.querySelector(
                "[aria-hidden='true']"
            );

        if (icon) {

            icon.textContent = "♫";

        }

    }

}


/* =========================================================
   04 — MUSIC BUTTON CLICK
   ========================================================= */

if (musicToggleButton) {

    musicToggleButton.addEventListener(
        "click",
        () => {

            if (!birthdayMusic) {
                return;
            }

            if (birthdayMusic.paused) {

                playBirthdayMusic();

            } else {

                pauseBirthdayMusic();

            }

        }
    );

}


/* =========================================================
   05 — KEEP BUTTON STATE IN SYNC
   ========================================================= */

if (birthdayMusic) {

    birthdayMusic.addEventListener(
        "play",
        () => {

            updateMusicButton(true);

        }
    );

    birthdayMusic.addEventListener(
        "pause",
        () => {

            updateMusicButton(false);

        }
    );

    /*
     * When the voice note finishes naturally,
     * reset it to the beginning and return the
     * button to the "Play Voice Note" state.
     */

    birthdayMusic.addEventListener(
        "ended",
        () => {

            birthdayMusic.currentTime = 0;

            updateMusicButton(false);

        }
    );

}


/* =========================================================
   06 — SUBTLE HEART BURST
   ========================================================= */

function createHeartBurst() {

    /*
     * Respect users who prefer reduced motion.
     */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {
        return;
    }

    /*
     * Make sure the page wrapper exists.
     */

    if (!birthdayPage) {
        return;
    }

    const hearts = [
        "❤️",
        "♡",
        "💗",
        "♥"
    ];

    const numberOfHearts = 10;

    for (
        let index = 0;
        index < numberOfHearts;
        index++
    ) {

        const heart =
            document.createElement("span");

        heart.className =
            "floating-heart";

        heart.textContent =
            hearts[
            Math.floor(
                Math.random() * hearts.length
            )
            ];

        heart.setAttribute(
            "aria-hidden",
            "true"
        );

        heart.style.left =
            `${20 + Math.random() * 60}%`;

        heart.style.animationDelay =
            `${Math.random() * 0.4}s`;

        heart.style.fontSize =
            `${12 + Math.random() * 10}px`;

        birthdayPage.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 3000);

    }

}


/* =========================================================
   07 — ADD HEART ANIMATION STYLES
   ========================================================= */

const heartStyles =
    document.createElement("style");

heartStyles.textContent = `
  .floating-heart {
    position: fixed;
    bottom: 18%;
    z-index: 9999;
    pointer-events: none;
    color: #f5a6b8;
    opacity: 0;
    animation:
      floatHeart 2.6s ease-out forwards;
  }

  @keyframes floatHeart {

    0% {
      opacity: 0;
      transform:
        translateY(0)
        scale(0.6);
    }

    15% {
      opacity: 0.9;
    }

    100% {
      opacity: 0;
      transform:
        translateY(-220px)
        translateX(
          calc((50vw - 50%) * 0.25)
        )
        scale(1.1);
    }

  }
`;

document.head.appendChild(heartStyles);


/* =========================================================
   08 — SMOOTH INTERNAL LINKS
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   09 — INITIALIZE AOS
   ========================================================= */

function initializeAOS() {

    /*
     * Make sure the AOS CDN has loaded.
     */

    if (typeof AOS === "undefined") {
        return;
    }

    /*
     * Respect the user's reduced-motion preference.
     */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    AOS.init({

        /*
         * Default animation duration.
         * Individual elements can override this
         * using data-aos-duration.
         */

        duration: 900,

        /*
         * Smooth and elegant entrance.
         */

        easing: "ease-out-cubic",

        /*
         * Animate each element only once.
         * This prevents the page from repeatedly
         * animating while scrolling up and down.
         */

        once: true,

        /*
         * Start the animation slightly before
         * the element completely enters the viewport.
         */

        offset: 80,

        /*
         * Individual HTML elements control their
         * own delay using data-aos-delay.
         */

        delay: 0,

        /*
         * Disable AOS animations when the user
         * has requested reduced motion.
         */

        disable: prefersReducedMotion

    });

}


/* =========================================================
   10 — PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * Initialize AOS animations.
         */

        initializeAOS();

        /*
         * Make sure music always starts
         * in the correct visual state.
         */

        updateMusicButton(false);

    }
);

/* =========================================================
   KRISHNA BIRTHDAY VIDEO
   CUSTOM PLAY / PAUSE CONTROL
   ========================================================= */

const krishnaVideo = document.getElementById(
    "krishna-birthday-video"
);

const krishnaVideoToggle = document.getElementById(
    "krishna-video-toggle"
);

if (krishnaVideo && krishnaVideoToggle) {

    const playIcon = krishnaVideoToggle.querySelector(
        ".krishna-play-icon"
    );

    const pauseIcon = krishnaVideoToggle.querySelector(
        ".krishna-pause-icon"
    );

    const buttonText = krishnaVideoToggle.querySelector(
        ".krishna-button-text"
    );

    const updateVideoButton = () => {

        const isPlaying =
            !krishnaVideo.paused &&
            !krishnaVideo.ended;

        krishnaVideoToggle.classList.toggle(
            "is-playing",
            isPlaying
        );

        krishnaVideoToggle.setAttribute(
            "aria-pressed",
            String(isPlaying)
        );

        krishnaVideoToggle.setAttribute(
            "aria-label",
            isPlaying
                ? "Pause Krishna birthday blessing"
                : "Play Krishna birthday blessing"
        );

        buttonText.textContent = isPlaying
            ? "Pause"
            : "Play";
    };

    krishnaVideoToggle.addEventListener(
        "click",
        () => {

            if (krishnaVideo.paused) {
                krishnaVideo.play();
            } else {
                krishnaVideo.pause();
            }

        }
    );

    krishnaVideo.addEventListener(
        "play",
        updateVideoButton
    );

    krishnaVideo.addEventListener(
        "pause",
        updateVideoButton
    );

    krishnaVideo.addEventListener(
        "ended",
        updateVideoButton
    );

    updateVideoButton();
}