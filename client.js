// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Define the form response element
    const formResponse = document.getElementById('form-response');

    try {
        // Send the form data to the server
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        const data = await response.text();
        if (formResponse) {
            formResponse.textContent = data; // Display success message
        }

        // Clear the form after submission
        document.getElementById('contact-form').reset();
    } catch (error) {
        if (formResponse) {
            formResponse.textContent = 'Error sending message. Please try again.'; // Display error message
        }
        console.error('Error:', error); // Log the error for debugging purposes
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.textContent = 'Toggle Dark Mode';
    document.body.appendChild(toggleButton);

    // Load dark mode preference from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        threshold: 0.3
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Optional: remove after animating once
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    const aboutSection = document.querySelector(".about-section");
    const aboutContent = document.querySelector(".about-section .content");
    const aboutImage = document.querySelector(".about-section .extra-image");

    if (aboutSection) observer.observe(aboutSection);
    if (aboutContent) observer.observe(aboutContent);
    if (aboutImage) observer.observe(aboutImage);
});
