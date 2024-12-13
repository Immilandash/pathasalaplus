// Fetch setup data from the API
async function fetchSetupData() {
    try {
        const response = await fetch('http://localhost:5000/api/setup'); // Adjust the URL if needed
        if (!response.ok) {
            throw new Error('Failed to fetch setup data');
        }
        const data = await response.json();
        renderDashboard(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Render the setup data on the dashboard
function renderDashboard(data) {
    
    const dashboardItems = document.querySelector('.dashboard-items');
    dashboardItems.innerHTML = `
        <div class="content">
            <h2>Annual Targets</h2>
            <p><strong>Target Students:</strong> ${data.annualTargetStudents}</p>
            <p><strong>Target Income:</strong> ${data.annualTargetIncome}</p>
        </div>
        <div class="content">
            <h2>Social Media</h2>
            <p><a href="${data.socialMediaLinks.twitter}" target="_blank">Twitter</a></p>
            <p><a href="${data.socialMediaLinks.instagram}" target="_blank">Instagram</a></p>
            <p><a href="${data.socialMediaLinks.youtube}" target="_blank">YouTube</a></p>
        </div>
        <div class="content">
            <h2>Contact Information</h2>
            <p><strong>WhatsApp:</strong> ${data.contactInfo.whatsappNumber}</p>
            <p><strong>Landline:</strong> ${data.contactInfo.landline}</p>
            <p><strong>Email:</strong> ${data.contactInfo.email}</p>
        </div>
        <div class="content">
            <h2>About Us</h2>
            <p>${data.aboutUs}</p>
        </div>
        <div class="content slider">
            <h2>Sliders</h2>
            ${data.sliders.map(img => `<img src="http://localhost:5000/uploads/${img}" style="width: 100%; margin-bottom: 10px;" alt="Slider Image">`).join('')}
        </div>
    `;
}

// Run the fetch function when the page loads
document.addEventListener('DOMContentLoaded', fetchSetupData);
