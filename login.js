// url = "http://127.0.0.1:8000/login/";

// async function submit() {
//   mail = document.getElementById("email");
//   console.log("Email Recived", mail);
//   email = document.getElementById("email");
// }

// document.getElementById("myForm").addEventListener("submit", function (event) {
//   event.preventDefault();
//   submit();
// });

// async function submit() {
//   let email = document.getElementById("email").value;
//   let password = document.getElementById("password").value;
//   console.log("Email Received:", email);
//   console.log("Password Received:", password);
//   const response = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => localStorage.setItem("token", json.token));
//   var data = localStorage.getItem("token");
//   document.cookie = "token=" + data;
// }

const url = "http://127.0.0.1:8000/login/";

async function submit() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log("Email Received:", email);
  console.log("Password Received:", password);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Validation errors:", errorData);
      return;
    }

    const json = await response.json();
    localStorage.setItem("refresh_token", json.refresh);
    localStorage.setItem("access_token", json.access);
    localStorage.setItem("user", JSON.stringify(json.user));

    document.cookie = `refresh_token=${json.refresh}; path=/`;
    document.cookie = `access_token=${json.access}; path=/`;
    document.cookie = `user=${JSON.stringify(json.user)}; path=/`;

    // Redirect to success.html after successful login
    window.location.href = "success.html";
  } catch (error) {
    console.error("Error during the fetch operation:", error);
  }
}

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  submit();
});
