var signUp = document.querySelector('#signUp');
signUp.addEventListener('click', () => {
    window.location.href = '../html/sign-up.html';
})
var form = document.querySelector("#signinForm");
function signIn() {
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
    const url = 'http://localhost:3000/api/user/login'; // Replace with the actual URL of your API endpoint

    fetch(url, {
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
                window.location.href = '../html/index.html';
                cleanForm();
            }else{
                setError('You is not admin');
                cleanForm();
            }

        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });

}
var setError = (err) => {
    document.querySelector('#error').innerHTML = err;
}
function cleanForm() {
    form.reset();
}