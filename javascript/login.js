//const baseUrl = 'https://projectcodegenerationbankapp.herokuapp.com/api';
const baseUrl = 'http://localhost:8090/api';
$(document).ready(() => {
    $('#login-form').submit(e => {
        e.preventDefault();
        $.ajax({
            url: baseUrl + '/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: $('#email-textbox').val(),
                password: $('#password-textbox').val()
            }),
            success: login => {
                sessionStorage.setItem("token", login.token);
                $('#token').html('Successfully logged in');
                window.location.replace('dashboard.html');
            }
        });
    });
});