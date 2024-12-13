document.getElementById('request-permission').addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:5000/api/setup/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId: 'ADMIN_ID' }), // Replace with actual admin ID
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Permission request sent successfully.');
      } else {
        alert(data.message || 'Failed to request permission.');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  });
  