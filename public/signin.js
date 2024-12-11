document.addEventListener('DOMContentLoaded', function () {
    const signin = document.getElementById('signinForm');
    
    signin.addEventListener('submit', async function (event) {  // Async here is correct
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const userData = { email, password };
  
      try {
        const response = await fetch('http://127.0.0.1:9600/admin/login-user', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          const data = await response.json();
          alert("User not found");
          location.reload();
          return;
        }
        const data = await response.json();
        alert("User signed in successfully!");
        window.location.href = "/";
  
      } catch (error) {
        alert("Login failed");
      }
    });
  });
  