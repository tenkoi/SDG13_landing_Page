document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Carousel with Touch Support
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    // Touch Events for Swipe
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchend', () => {
        const deltaX = touchEndX - touchStartX;
        if (deltaX > 50) {
            showSlide(currentIndex - 1); // Swipe right
        } else if (deltaX < -50) {
            showSlide(currentIndex + 1); // Swipe left
        }
    });

    // Auto-slide every 6 seconds
    let autoSlide = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 6000);

    // Pause auto-slide on hover
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 6000);
    });

    // Initial slide
    showSlide(currentIndex);

    // Dynamic Content for Initiatives
    const dynamicContent = document.querySelector('.dynamic-content');
    const initiatives = [
        { title: 'Solar Energy', desc: 'Promoting solar panels in rural areas.', img: 'https://picsum.photos/seed/solar/250/200' },
        { title: 'Wind Farms', desc: 'Expanding wind energy infrastructure.', img: 'https://picsum.photos/seed/wind/250/200' },
        { title: 'Climate Policy', desc: 'Advocating for stronger climate regulations.', img: 'https://picsum.photos/seed/policy/250/200' }
    ];

    initiatives.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item', 'glass');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        `;
        dynamicContent.appendChild(div);
    });
});