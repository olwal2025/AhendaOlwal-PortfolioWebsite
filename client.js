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
