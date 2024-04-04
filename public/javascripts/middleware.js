import { API_URL } from './url.js';

const userData = JSON.parse(localStorage.getItem('userData'));
if (!userData) {
    window.location.href = `${API_URL}/sign-in`;
}