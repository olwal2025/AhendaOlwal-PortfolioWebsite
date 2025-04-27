document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic client-side validation feedback
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formResponse = document.getElementById('form-response');

    if (!name || !email || !message) {
        formResponse.textContent = 'Please fill in all fields.';
        formResponse.style.color = 'red';
        return;
    }

    // Simple email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formResponse.textContent = 'Please enter a valid email address.';
        formResponse.style.color = 'red';
        return;
    }

    try {
        const formData = { name, email, message };

        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.text();
        formResponse.textContent = data;
        formResponse.style.color = 'green';
        document.getElementById('contact-form').reset();
    } catch (error) {
        formResponse.textContent = 'Error sending message. Please try again.';
        formResponse.style.color = 'red';
        console.error('Error:', error);
    }
});

// Hamburger menu toggle script
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function () {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('#nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Close menu on mobile after click
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            }
        });
    });

    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY || document.documentElement.scrollTop;
        sections.forEach(section => {
            const top = section.offsetTop - 80;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`#nav-menu a[href="#${id}"]`);
            if (scrollPos >= top && scrollPos < bottom) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    });

    // Back to Top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
