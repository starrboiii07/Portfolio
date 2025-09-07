if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('load', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);
});

document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles-container');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        particlesContainer.appendChild(particle);
    }

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('bg-star');
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = Math.random() * 3 + 3 + 's';
        document.body.appendChild(star);
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const rotation = scrollY / (documentHeight - windowHeight) * 360;
        document.querySelectorAll('.celestial-body').forEach(body => {
            if (body.id !== 'home-moon') {
                body.style.transform = `rotate(${rotation}deg)`;
            }
        });
    }
    window.addEventListener('scroll', handleScroll);

    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        startHomeObserver();
    }, 3000);

    AOS.init({
        duration: 1000,
        once: false,
        easing: 'ease-in-out'
    });

    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.remove('section-animate');
            if (entry.target.id === 'skills') {
                entry.target.querySelectorAll('.skill-bubble').forEach(bubble => {
                    bubble.classList.remove('bubble-animate');
                });
            }
            void entry.target.offsetWidth;
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('section-animate');
                    if (entry.target.id === 'skills') {
                        entry.target.querySelectorAll('.skill-bubble').forEach((bubble, i) => {
                            setTimeout(() => {
                                bubble.classList.add('bubble-animate');
                            }, i * 100);
                        });
                    }
                }, 50);
            }
        });
    }, {
        threshold: 0.5
    });
    sections.forEach(section => observer.observe(section));

    const asteroidField = document.querySelector('.asteroid-field');
    function createAsteroid() {
        const asteroid = document.createElement('div');
        asteroid.classList.add('asteroid');
        asteroid.style.left = Math.random() * 100 + '%';
        const size = 30 + Math.random() * 60;
        asteroid.style.width = `${size}px`;
        asteroid.style.height = `${size}px`;
        asteroid.style.animationDuration = (10 + Math.random() * 8) + 's';
        asteroid.style.animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse';
        asteroidField.appendChild(asteroid);
        setTimeout(() => {
            asteroid.remove();
        }, 20000);
    }
    setInterval(createAsteroid, 2000);

    const homeSection = document.getElementById('home');
    const homeText = homeSection.querySelector('.container');
    function startHomeObserver() {
        const homeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                homeText.classList.remove('home-animate');
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        homeText.classList.add('home-animate');
                    }, 50);
                }
            });
        }, { threshold: 0.5 });
        homeObserver.observe(homeSection);
    }
});