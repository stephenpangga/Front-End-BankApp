const baseUrl = 'https://projectcodegenerationbankapp.herokuapp.com/api';

$(document).ready(() => {
    // Fetch Transactions
    $.ajax({
        url: baseUrl + '/transactions',
        type: 'GET',
        headers: { "Authorization": sessionStorage.getItem('token') },
        success: transactions => {
            $('#transactions').html('');
            transactions.forEach(transaction => {
                $('#transactions').append(`Sender: ${transaction.sender.iban}: ${transaction.sender.balance}<br> Amount: €${transaction.amount} </br> 
                Recipient: ${transaction.recipient.iban} </br> </br>`);
            });
        },
        error: xhr => {
            $('#transactions').html(`Something went wrong, please try again (HTTP Status Code ${xhr.status})`);
        }
    });

    // Create transaction
    $('#transaction-form').submit(e => {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: baseUrl + '/accounts/' + $('#transaction-recipient').val(),
            headers: { "Authorization": sessionStorage.getItem('token') },
            success: recipient => {
                $.ajax({
                    url: baseUrl + '/login/' + sessionStorage.getItem('token'),
                    type: 'GET',
                    headers: { "Authorization": sessionStorage.getItem('token') },
                    success: user => {
                        $.ajax({
                            type: 'POST',
                            url: baseUrl + '/transactions',
                            headers: { "Authorization": sessionStorage.getItem('token') },
                            contentType: 'application/json',
                            data: JSON.stringify({
                                sender: {
                                    balance: 100.0,
                                    currency: "Euro",
                                    cumulativeTransaction: 5,
                                    transactionAmoutLimit: 10000.0,
                                    absoluteLimit: 10.0,
                                    iban: "NL01INHO0000000001",
                                    owner: {
                                        id: 1,
                                        email: "inholland@gmail.com",
                                        password: "inhollandbank",
                                        firstName: "Bank",
                                        lastName: "bank",
                                        accessLevel: "employee"
                                    },
                                    accountType: "current"
                                },
                                recipient: recipient,
                                amount: $('#transaction-amount').val(),
                                transactionType: 'transfer',
                                userPerforming: user
                            }),
                            success: () => {
                                $('#status').html(`€${$('#transaction-amount').val()} was successfully tranfered to ${$('#transaction-recipient').val()}`);
                            },
                            error: xhr => {
                                $('#status').html(`Something went wrong, please try again (HTTP Status Code ${xhr.status})`);
                            }
                        });
                    },
                    error: xhr => {
                        $('#status').html(`Something went wrong, please try again (HTTP Status Code ${xhr.status})`);
                    }
                });
            },
            error: xhr => {
                $('#status').html(`Something went wrong, please try again (HTTP Status Code ${xhr.status})`);
            }
        });
    });
});