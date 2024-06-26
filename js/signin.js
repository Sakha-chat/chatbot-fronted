const signInBtn = document.querySelector("#sign-in-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

signUpBtn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const loginForm = document.querySelector(".sign-in-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://ai.sakha.chat/sakha/v2/user/signin?");
  xhr.setRequestHeader("Content-Type", "application/json");

  const data = {
    email: document.querySelector(".sign-in-form input[type='text']").value,
    password: document.querySelector(".sign-in-form input[type='password']").value
  };

  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        loginForm.reset();
        const jsonResponse = JSON.parse(xhr.responseText);
        document.cookie = "authToken=" + jsonResponse.authToken;
        document.cookie = "userId=" + jsonResponse.userId;
        window.location = "/dashboard.html";
      } else {
        // Handle wrong credentials
        alert("Wrong credentials. Please try again.");
      }
    }
  };
});

const signupForm = document.querySelector(".sign-up-form");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://ai.sakha.chat/sakha/v2/user/signup");
  xhr.setRequestHeader("Content-Type", "application/json");

  const data = {
    username: document.querySelector(".sign-up-form input[type='text']").value,
    password: document.querySelector(".sign-up-form input[type='password']").value,
    email: document.querySelector(".sign-up-form input[type='email']").value,
    phoneNumber: document.querySelector(".sign-up-form input[type='phonenumber']").value
  };
  console.log(data);
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        alert("User Id Created, Please Sign in to Access");
      } else if (xhr.status === 409) {
        // Handle email already in use
        alert("Email already in use. Please use a different email.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };
});
