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
// Mobile navigation menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        navLinks.classList.toggle("open");
    });
}
// =========================================================
// BOOKING FORM - SUPABASE
// =========================================================

const bookingForm = document.getElementById("bookingForm");
const bookingSuccess = document.getElementById("booking-success");

if (bookingForm) {
    bookingForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(bookingForm);

        const reservation = {
            booking_date: formData.get("date"),
            booking_time: formData.get("time"),
            guests: Number(formData.get("guests")),
            first_name: formData.get("firstName"),
            last_name: formData.get("lastName"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            special_request: formData.get("specialRequest") || null
        };

        const { error } = await supabaseClient
            .from("reservations")
            .insert([reservation]);

        if (error) {
            console.error("Booking error:", error);
            alert("Sorry, we couldn't submit your reservation. Please try again.");
            return;
        }

        bookingForm.reset();
        bookingSuccess.style.display = "block";
    });
}