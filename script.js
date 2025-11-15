/*
 * AETHERTECH - FUTURISTIC COMPANY PROFILE
 * SCRIPT.JS
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 500,
        once: true,
        offset: 50,
    });

    // 2. Inisialisasi Vanta.js (Hanya di Homepage)
    const heroSection = document.getElementById('hero-background');
    if (heroSection && typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#hero-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00c2ff, // --color-accent-neon
            backgroundColor: 0xa0f1f, // --color-dark-primary
            points: 10.00,
            maxDistance: 20.00,
            spacing: 15.00
        });
    }

    // 3. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Untuk animasi hamburger jika ada
        });
    }

    // 4. Active Navigation Link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinksList = document.querySelectorAll('.nav-links .nav-link');

    navLinksList.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href').split("/").pop();
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });

    // 5. Testimonial Slider
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.slider-btn.prev');
        const nextBtn = document.querySelector('.slider-btn.next');
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 5000); // Ganti slide setiap 5 detik
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider(); // Restart interval
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider(); // Restart interval
        });

        sliderWrapper.addEventListener('mouseenter', stopSlider);
        sliderWrapper.addEventListener('mouseleave', startSlider);

        showSlide(currentSlide);
        startSlider();
    }

    // 6. Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;
            
            // Reset status
            formStatus.textContent = '';
            formStatus.className = '';

            if (name === '' || email === '' || message === '') {
                isValid = false;
                formStatus.textContent = 'Harap isi semua bidang yang wajib diisi.';
                formStatus.classList.add('error');
            }
            
            // Validasi email sederhana
            if (isValid && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                isValid = false;
                formStatus.textContent = 'Harap masukkan alamat email yang valid.';
                formStatus.classList.add('error');
            }

            if (isValid) {
                // Simulasi pengiriman form
                console.log('Form submitted:', { name, email, message });
                formStatus.textContent = 'Pesan Anda telah terkirim. Terima kasih!';
                formStatus.classList.add('success');
                contactForm.reset();
                
                // Hapus pesan sukses setelah 3 detik
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = '';
                }, 3000);
            }
        });
    }

});