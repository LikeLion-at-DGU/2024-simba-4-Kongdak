document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const inputs = document.querySelectorAll(".input-view input");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const username = document.querySelector("#username").value;
      const password = document.querySelector("#password").value;

      if (username.trim() !== "" && password.trim() !== "") {
        loginButton.disabled = false;
        loginButton.style.backgroundColor = "black";
        loginButton.style.color = "white";
      } else {
        loginButton.disabled = true;
      }
    });
  });

  const loginForm = document.querySelector("#login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
    let usernameBorder = document.getElementById("username");
    let passwordBorder = document.getElementById("password");
    let errorElement = document.getElementById("error");

    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": csrfToken,
      },
      body: `username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          window.location.href = redirectUrl;
        }
      })
      .catch((error) => {
        usernameBorder.style.borderBottom = "2px dotted red";
        passwordBorder.style.borderBottom = "2px dotted red";
        errorElement.style.visibility = "visible";
      });
  });
});
