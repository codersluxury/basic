const menuButton = document.querySelector('.hamburger');
const menu = document.querySelector('#site-menu');

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('hidden', isOpen);
});

document.querySelectorAll('.menu-swiper').forEach((slider) => {
    let isVisible = false;
    let isInteracting = false;
    let inactivityTimer;
    const swiper = new Swiper(slider, {
        autoplay: false,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 12,
            stretch: 0,
            depth: 90,
            modifier: 1,
            slideShadows: false
        },
        grabCursor: true,
        loop: true,
        slidesPerView: 1,
        speed: 900
    });

    const stopAutoplay = () => {
        swiper.autoplay.stop();
    };

    const resumeAutoplay = () => {
        if (isVisible && !isInteracting) {
            swiper.autoplay.start();
        }
    };

    const startInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            isInteracting = false;
            resumeAutoplay();
        }, 11000);
    };

    const handleInteraction = () => {
        isInteracting = true;
        stopAutoplay();
        startInactivityTimer();
    };

    slider.addEventListener('pointerdown', handleInteraction);
    slider.addEventListener('focusin', handleInteraction);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;

        if (!isVisible) {
            stopAutoplay();
            return;
        }

        resumeAutoplay();
    }, { threshold: 0.5 });

    visibilityObserver.observe(slider);
});