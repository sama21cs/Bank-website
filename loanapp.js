const url = "http://127.0.0.1:8000/loan/";

document
  .getElementById("loanForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    submit();
  });

async function submit() {
  const formData = new FormData(document.getElementById("loanForm"));

  // Get the access token from local storage
  const accessToken = localStorage.getItem("access_token");

  // Make the request
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      Accept: "application/json", // Optional: specify that you expect JSON response
    },
    body: formData,
  });

  if (response.ok) {
    // Success - handle the response
    console.log("Form data successfully submitted!");
    const responseData = await response.json(); // Optional: handle JSON response
    console.log(responseData);
  } else {
    // Error - handle the validation errors
    console.error("Error submitting form data!");
    const errorData = await response.json(); // Optional: handle JSON error response
    console.error(errorData);
  }
}
