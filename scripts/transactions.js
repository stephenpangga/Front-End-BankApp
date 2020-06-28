const baseUrl = 'https://projectcodegenerationbankapp.herokuapp.com/api';

$(document).ready(() => {
    $.ajax({
        url: baseUrl + '/transactions',
        type: 'GET',
        headers: { "Authorization": sessionStorage.getItem('token') },
        success: transactions => {
            transactions.forEach(transaction => {
                $('#transactions').append(`Sender: ${transaction.sender.iban}: ${transaction.sender.balance}<br> Amount:${transaction.amount} </br> 
                Recipient: ${transaction.recipient.iban} </br> </br>`);
            });
        },
        error: xhr => {
            $('#transactions').html(`Something went wrong, please try again (HTTP Status Code ${xhr.status})`);
        }
    });
});