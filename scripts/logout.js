$(document).ready(() => {
    sessionStorage.removeItem('token');
    setTimeout(() => {
        window.location.replace('login.html');
    }, 1000);
});