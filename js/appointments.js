document.addEventListener('DOMContentLoaded', () => {
    // Toggle Navbar Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Appointment Form Submission
    const appointmentForm = document.getElementById('appointmentForm');

    appointmentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Gather form data
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const date = document.getElementById('appointmentDate').value.trim();
        const service = document.getElementById('serviceType').value;
        const message = document.getElementById('userMessage').value.trim();

        // Basic validation
        if (!name || !email || !date || !service) {
            alert('Please fill in all the required fields.');
            return;
        }

        // Create appointment object
        const appointment = { name, email, date, service, message };

        // Store in Local Storage
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        // Display alert confirmation message
        alert(`Thank you, ${name}. Your appointment for ${service} is booked on ${date}.`);

        // Clear form
        appointmentForm.reset();
    });
});
