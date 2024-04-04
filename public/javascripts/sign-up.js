
import { API_URL } from './url.js';
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneNumberRegex = /((09|03|07|08|05)+([0-9]{8}))/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%^&*])(?=.{8,})/;
const nameRegex = /^[a-zA-ZÀ-Ỹà-ỹ\s']+$/;
const usernameRegex = /^[a-zA-Z0-9]+$/;

var signIn = document.querySelector("#signIn");
signIn.addEventListener("click", () => {
  window.location.href = `${API_URL}/sign-in`;
});
var btn = document.querySelector("#btn");
var form = document.querySelector("#signupForm");
btn.addEventListener("click", () => {
  var formData = new FormData(form);
  const username = formData.get('username');
  const password = formData.get('password');
  const email = formData.get('email');
  const name = formData.get('name');
  const phoneNumber = formData.get('phoneNumber');
  if (!nameRegex.test(name)) {
    return setError("invalid name");
  } else if (!emailRegex.test(email)) {
    return setError("invalid email address");
  }
  else if (!phoneNumberRegex.test(phoneNumber)) {
    return setError("invalid phone number");
  } else if (!usernameRegex.test(username)) {
    return setError("invalid username");
  } else if (!passwordRegex.test(password)) {
    return setError("invalid password");
  } else {
    setError("");
  }
  const data = {
    username: username,
    password: password,
    name: name,
    phoneNumber: phoneNumber,
    email: email,
  };

  const url = `${API_URL}/api/user`; // Replace with the actual URL of your API endpoint

  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)

  })
    .then(response => response.json())
    .then(data => {
      if (data.status == 400)
        return alert(data.message);
      alert("Create account succsetfully");
      src.sendMail();
      cleanForm();
    })
    .catch(error => {
      console.error('Error:', error); // Handle errors
    });

});

const setError = (err) => {
  document.getElementById('error').innerHTML = err;
}
function cleanForm() {
  form.reset();
}




