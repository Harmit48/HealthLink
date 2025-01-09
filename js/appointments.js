document.addEventListener('DOMContentLoaded', () => {
    // Toggle Navbar Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Appointment Form Elements
    const appointmentForm = document.getElementById('appointmentForm');
    const serviceType = document.getElementById('serviceType');
    const doctorSelection = document.getElementById('doctorSelection');
    const doctorOptions = document.getElementById('doctorOptions');
    const searchForm = document.getElementById('searchForm');
    const appointmentIDInput = document.getElementById('appointmentID');

    // Doctor Data
    const doctors = {
        Consultation: [
            { name: "Dr. Smith", photo: "../images/dr_smith.jpg" },
            { name: "Dr. Brown", photo: "../images/dr_brown.jpg" }
        ],
        "Health Monitoring": [
            { name: "Dr. Wilson", photo: "../images/dr_wilson.jpg" },
            { name: "Dr. Garcia", photo: "../images/dr_garcia.jpg" }
        ],
        "General Checkup": [
            { name: "Dr. Johnson", photo: "../images/dr_johnson.jpg" },
            { name: "Dr. Martinez", photo: "../images/dr_martinez.jpg" }
        ],
        "Specialist Appointment": [
            { name: "Dr. Lee", photo: "../images/dr_lee.jpg" },
            { name: "Dr. Patel", photo: "../images/dr_patel.jpg" }
        ],
        Diagnostics: [
            { name: "Dr. Taylor", photo: "../images/dr_taylor.jpg" },
            { name: "Dr. Adams", photo: "../images/dr_adams.jpg" }
        ]
    };

    // Temporary storage for appointment data
    let appointments = JSON.parse(localStorage.getItem('appointments')) || {};

    // Update Doctor Options Based on Service Type
    serviceType.addEventListener('change', () => {
        const selectedService = serviceType.value;

        if (selectedService && doctors[selectedService]) {
            doctorSelection.style.display = 'block';
            doctorOptions.innerHTML = ''; // Clear existing options

            // Create doctor options dynamically
            doctors[selectedService].forEach((doctor) => {
                const doctorOption = document.createElement('div');
                doctorOption.classList.add('doctor-option');
                doctorOption.innerHTML = `
                    <img src="${doctor.photo}" alt="${doctor.name}" class="doctor-photo">
                    <span class="doctor-name">${doctor.name}</span>
                    <input type="radio" name="doctor" value="${doctor.name}" class="doctor-select" required>
                `;
                doctorOptions.appendChild(doctorOption);
            });
        } else {
            doctorSelection.style.display = 'none';
            doctorOptions.innerHTML = ''; // Clear options if no service selected
        }
    });

    // Form Submission
    appointmentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Gather form data
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const date = document.getElementById('appointmentDate').value.trim();
        const service = serviceType.value;
        const doctor = document.querySelector('input[name="doctor"]:checked')?.value;

        if (!name || !email || !date || !service || !doctor) {
            alert('Please fill in all the required fields and select a doctor.');
            return;
        }

        // Generate a 6-digit Appointment ID
        const appointmentID = Math.floor(100000 + Math.random() * 900000);

        // Store appointment data
        appointments[appointmentID] = {
            name,
            email,
            date: new Date(date).toLocaleDateString('en-GB'),
            service,
            doctor
        };

        // Store appointments in localStorage
        localStorage.setItem('appointments', JSON.stringify(appointments));

        // Display appointment details in alert
        alert(
            `Appointment Details:\n` +
            `1. Appointment-ID: ${appointmentID}\n` +
            `2. Name: ${name}\n` +
            `3. Email-ID: ${email}\n` +
            `4. Type of Service: ${service}\n` +
            `5. Doctor Name: ${doctor}\n` +
            `6. Date of Appointment: ${appointments[appointmentID].date}`
        );

        // Clear form
        appointmentForm.reset();
        doctorSelection.style.display = 'none';
    });

    // Search Appointment
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const appointmentID = appointmentIDInput.value.trim();
        if (!appointments[appointmentID]) {
            alert('Appointment ID not found. Please check and try again.');
            return;
        }

        // Fetch appointment details
        const { name, email, service, doctor, date } = appointments[appointmentID];

        // Create popup
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <div class="popup-content">
                <h3>Appointment Details</h3>
                <p><strong>Appointment ID:</strong> ${appointmentID}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Type of Service:</strong> ${service}</p>
                <p><strong>Doctor Name:</strong> ${doctor}</p>
                <p><strong>Date of Appointment:</strong> ${date}</p>
                <button class="close-popup">Close</button>
            </div>
        `;

        document.body.appendChild(popup);

        // Close popup
        popup.querySelector('.close-popup').addEventListener('click', () => {
            popup.remove();
        });
    });
});
