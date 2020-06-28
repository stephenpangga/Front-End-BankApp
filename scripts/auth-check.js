$(document).ready(() => {
    if (!sessionStorage.getItem('token')) {
        alert('You need to log in first!');
        window.location.replace('login.html');
    }
});