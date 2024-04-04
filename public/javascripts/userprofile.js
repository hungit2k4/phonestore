import { API_URL } from './url.js';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneNumberRegex = /((09|03|07|08|05)+([0-9]{8}))/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%^&*])(?=.{8,})/;
const nameRegex = /^[a-zA-ZÀ-Ỹà-ỹ\s']+$/;
const usernameRegex = /^[a-zA-Z0-9]+$/;

const user = JSON.parse(localStorage.getItem('userData'));
var name = document.querySelector('input[name="name"]');
var phoneNumber = document.querySelector('input[name="phoneNumber"]');
var email = document.querySelector('input[name="email"]');
var address = document.querySelector('input[name="address"]');
var username = document.querySelector('input[name="username"]');
name.value = user.name || "";
phoneNumber.value = user.phoneNumber || "";
email.value = user.email || "";
address.value = user.address || "";
username.value = user.username || "";
document.querySelector('#img').src = `${API_URL}/api/uploaduser/${user._id}`;
const btn = document.querySelector('#btn');
btn.addEventListener('click', async () => {
  name = name.value;
  phoneNumber = phoneNumber.value;
  email = email.value;
  address = address.value;
  username = username.value;
  var password = document.querySelector('input[name="password"]').value;
  if (name && !nameRegex.test(name)) {
    return setError(`Invalid name`);
  } else if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
    return setError(`Invalid phone number`);
  } else if (email && !emailRegex.test(email)) {
    return setError(`Invalid email`);
  } else if (username && !usernameRegex.test(username)) {
    return setError(`Invalid username`);
  } else if (password && !passwordRegex.test(password)) {
    return setError(`Invalid password`);
  } else {
    setError('');
  }

  const data = {
    id: user._id,
    username: !username ? user.username : username,
    password: !password ? user.password : password,
    name: !name ? user.name : name,
    phoneNumber: !phoneNumber ? user.phoneNumber : parseInt(phoneNumber),
    email: !email ? user.email : email,
    address: !address ? user.address : address
  };
  fetch(`${API_URL}/api/user`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)

  })
    .then(response => response.json())
    .then(data => {
      localStorage.removeItem('userData');
      if (data.data.user)
        localStorage.setItem('userData', JSON.stringify(data.data.user));

      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error); // Handle errors
    });
});
const setError = (err) => {
  document.getElementById('error').innerHTML = err;
}