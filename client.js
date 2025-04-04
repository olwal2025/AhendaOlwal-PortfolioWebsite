document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.text();
        document.getElementById('form-response').textContent = data;
        document.getElementById('contact-form').reset();
    } catch (error) {
        document.getElementById('form-response').textContent = 
            'Error sending message. Please try again.';
        console.error('Error:', error);
    }
});