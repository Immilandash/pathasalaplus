document.getElementById('addStudentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('whatsappNumber', document.getElementById('whatsappNumber').value);
  formData.append('address', document.getElementById('address').value);
  formData.append('aadharNumber', document.getElementById('aadharNumber').value);
  formData.append('campusNumber', document.getElementById('campusNumber').value);
  formData.append('seatNumber', document.getElementById('seatNumber').value);
  formData.append('profilePic', document.getElementById('profilePic').files[0]);

  try {
    const response = await fetch('http://localhost:5000/api/students/add', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (response.ok) {
      alert('Student added successfully');
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
