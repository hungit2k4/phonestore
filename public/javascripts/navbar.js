import { API_URL } from './url.js';
var select = localStorage.getItem('navBar');
var a = document.querySelectorAll('a');

a.forEach((item, index) => {
    if (select&&select==index){
        item.classList.add('active');
    }
    item.addEventListener('click', (ev) => {
        switch (index) {
            case 0:
                parent.location.href = `${API_URL}`;
                break;
            case 1:
                parent.location.href = `${API_URL}/userprofile`;
                break;
            case 2:
                parent.location.href = `${API_URL}/usermanager`;
                break;
            case 3:              
                parent.location.href = `${API_URL}/categorymanager`;
                break;
            case 4:               
                parent.location.href = `${API_URL}/productmanager`;
                break;
            case 5:
                parent.location.href = `${API_URL}/odermanager`;
                break;
            case 6:
                parent.location.href = `${API_URL}/sign-in`;
                localStorage.removeItem('userData');
                break;
        }

    });
})

var remove = (index) => {
    a.forEach((i) => {
        i.classList.remove('active');
    });
    a[index].classList.add("active");
}