document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            const formData = new FormData(contactForm);
            const actionURL = contactForm.action; // Get the action URL from the form

            formStatus.textContent = 'Sending...';

            fetch(actionURL, { // Use the actionURL from the form
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // FormSubmit.co also supports JSON for AJAX
                }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Thanks for your message! We will get back to you soon.';
                    contactForm.reset(); // Clear the form
                } else {
                    // Try to get more detailed error
                    response.json().then(data => {
                        if (data && data.error) {
                            formStatus.textContent = 'Error: ' + data.error;
                        } else {
                            formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again.';
                        }
                    }).catch(() => {
                         formStatus.textContent = 'Oops! There was a problem submitting your form and parsing the error. Please try again.';
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formStatus.textContent = 'Oops! There was a network error. Please try again.';
            });
        });
    }
});