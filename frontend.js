// frontend.js

// Function to fetch all users and display them on the page
async function displayUsers() {
    try {
      const response = await fetch('/users');
      const data = await response.json();
  
      const usersList = document.getElementById('users-list');
      usersList.innerHTML = '';
  
      data.users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `<p>Username: ${user.username}</p>
                            <p>First Name: ${user.first_name}</p>
                            <p>Last Name: ${user.last_name}</p>
                            <p>Phone: ${user.phone}</p>
                            <hr>`;
        usersList.appendChild(userDiv);
      });
    } catch (error) {
      console.error('Error fetching and displaying users:', error);
    }
  }
  
  // Function to handle user login
  async function loginUser() {
    try {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
  
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
      console.log('Logged in successfully:', data);
  

    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  
  window.onload = displayUsers;
  