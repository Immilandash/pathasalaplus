  // Function to fetch student data from the backend API
  async function fetchStudents() {
    try {
      const response = await fetch('http://localhost:5000/api/students/all-students'); // Replace with your actual API endpoint
      if (!response.ok) throw new Error('Failed to fetch students');
  
      const students = await response.json();
      const studentCardsContainer = document.getElementById('student-cards');
  
      students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.innerHTML = `
        <img src="${student.profilePicture ? student.profilePicture : 'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg'}" alt="Profile Picture" class="profile-pic">
        <h3>${student.name}</h3>    
        <p>Seat Number: ${student.seatNumber}</p>
        <p>Campus Number: ${student.campusNumber}</p>
        <p>WhatsApp: ${student.whatsappNumber}</p>
      `;
        studentCardsContainer.appendChild(card);
      });
    } catch (error) {
      console.error('Error loading students:', error);
      alert('Failed to load students. Please try again later.');
    }
}
fetchStudents()
  