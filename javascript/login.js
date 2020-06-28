const baseUrl = 'https://projectcodegenerationbankapp.herokuapp.com/api';

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
                if (login.token) {
                    sessionStorage.setItem("token", login.token);
                    $('#status').html('Successfully logged in');
                    window.location.replace('dashboard.html');
                } else {
                    $('#status').html('Unknown credentials, please try again');
                }
            },
            error: error => {
                $('#status').html(`Something went wrong, please try again (${error.toString()})`);
            }
        });
    });
});