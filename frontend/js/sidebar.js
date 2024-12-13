


async function loadMyData() {
  try {
    const response = await fetch('http://localhost:5000/api/setup');
    const data = await response.json();
    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML=`
    <h2> <img class="myLogo" src="http://localhost:5000/uploads/${data.logo}" alt="Logo Image"> </h2>
        <ul>
          <li><a href="dashboard.html"> 🏠 Dashboard</a></li>
          <li><a href="students.html">👨‍🎓 Students</a></li>
          <li><a href="addstudent.html">➕Add Student</a></li>
          <li><a href="inquiry.html">🤔 Student Inquiry</a></li>
          <li><a href="setup.html"> 🕵 Setup</a></li>
          <li><a href="setup.html"> 💺 Available Seats</a></li>
        </ul>
    `
  } catch (error) {
    console.error('Error loading setup data:', error);
  }
}





loadMyData();


