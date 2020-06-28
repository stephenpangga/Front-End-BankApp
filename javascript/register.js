const baseUrl = 'https://projectcodegenerationbankapp.herokuapp.com/api';

$(document).ready(() => {
    $('#register-form').submit(e => {
        e.preventDefault();
        $.ajax({
            url: baseUrl + '/users',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                firstName: $('#firstname-textbox').val(),
                lastName: $('#lastname-textbox').val(),
                email: $('#email-textbox').val(),
                password: $('#password-textbox').val()
            }),
            success: user => {
                $('#status').html(`Successfully registered ${user.firstName} ${user.lastName}. You can <a href="login.html">login here<a> using ${user.email} and your specified password.`);
            },
            error: error => {
                $('#status').html(`Something went wrong, please try again (${error.toString()})`)
            }
        });
    });
});