import { API_URL } from './url.js';

var signUp = document.querySelector('#signUp');
signUp.addEventListener('click', () => {
    window.location.href = `${API_URL}/sign-up`;
})
var form = document.querySelector("#signinForm");
var btn= document.querySelector("#btn");
btn.addEventListener('click',async () => {
    var formData = new FormData(form);
    var phoneNumber = parseInt(formData.get('username')) || 1;
    var username = formData.get('username');
    var email = formData.get('username');
    if (phoneNumber!=1){
        username="";
        email="";
    }
    var password = formData.get('password');
    if (formData.get("username").length <= 0) {
        return setError('Please enter your username,email or phone number');
    }
    if (password.length <= 0) {
        return setError('Please enter your password');
    }
    setError('');
    const data = {
        "username": username,
        "phoneNumber": phoneNumber,
        "email": email,
        "password": password
    }
    const url = `${API_URL}/api/user/login`; // Replace with the actual URL of your API endpoint

  await  fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            }
             else if(data.role==1) {
                localStorage.setItem('userData', JSON.stringify(data));
                localStorage.setItem('url',`${API_URL}`);
                window.location.href = `${API_URL}`;
                cleanForm();
            }else{
                setError('You is not admin');
                cleanForm();
            }

        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
})

var setError = (err) => {
    document.querySelector('#error').innerHTML = err;
}
function cleanForm() {
    form.reset();
}
