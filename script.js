const contactForm = document.querySelector(".contact-form");
const successMessage = document.getElementById("success-message");

if (contactForm && successMessage) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                contactForm.reset();
                successMessage.style.display = "block";
                submitButton.textContent = "Message Sent ✓";
            } else {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
                alert("Something went wrong. Please try again.");
            }

        } catch (error) {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
            alert("Unable to send message. Please check your internet connection.");
        }
    });
}