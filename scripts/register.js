const baseUrl = 'https://projectcodegenerationbankapp.herokuapp.com/api';

$(document).ready(() => {
    $('#register-form').submit(e => {
        e.preventDefault();
        $.ajax({
            url: baseUrl + '/users',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: $('#email-textbox').val(),
                password: $('#password-textbox').val(),
                firstName: $('#firstname-textbox').val(),
                lastName: $('#lastname-textbox').val()
            }),
            success: user => {
                $('#status').html(`Successfully registered ${user.firstName} ${user.lastName}. You can now login using ${user.email} and your chosen password.`);
            },
            error: xhr => {
                $('#transactions').html(`Something went wrong, please try again (HTTP Status Code ${xhr.status})`);
            }
        });
    });
});