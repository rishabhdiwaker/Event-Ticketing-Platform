document.addEventListener("DOMContentLoaded", function () {
  const signup = document.getElementById("signupForm");

  signup.addEventListener("submit", function (event) {
    event.preventDefault();

    const newEmail = document.getElementById("email").value;
    const newPassword = document.getElementById("newPassword").value;

    console.log(newPassword, newEmail);

    const userData = {
      email: newEmail,
      password: newPassword,
    };

    async function registerUser() {
      try {
        const response = await fetch('http://127.0.0.1:9600/admin/reg-user',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 400 && data.message) {
            alert("User already exists");
            window.location.href ="/sign-in"
          } else {
            alert("Something went wrong");
          }
        }else{
          alert("User registered successfully!");
          window.location.href = "/sign-in";
        }
      } catch (error) {
        console.log(error);
      }
    }
    registerUser();
  });
});