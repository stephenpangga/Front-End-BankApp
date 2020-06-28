const baseUrl = 'https://projectcodegenerationbankapp.herokuapp.com/api';

$(document).ready(() => {
    // Fetch Transactions
    $.ajax({
        url: baseUrl + '/transactions',
        type: 'GET',
        headers: { "Authorization": sessionStorage.getItem('token') },
        success: transactions => {
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
            url: baseUrl + '/accounts' + $('#transaction-recipient'),
            success: recipient => {
                $.ajax({
                    url: baseUrl + '/transactions/' + sessionStorage.getItem('token'),
                    type: 'GET',
                    headers: { "Authorization": sessionStorage.getItem('token') },
                    success: user => {
                        $.ajax({
                            type: 'POST',
                            url: baseUrl + '/transactions',
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
                                amount: $('#transaction-amount'),
                                transactionType: 'transfer',
                                userPerforming: user
                            }),
                            success: () => {
                                $('#status').html(`€${$('#transaction-amount')} was successfully tranfered to ${$('#transaction-recipient')}`);
                            },
                            error: xhr => {
                                $('#transactions').html(`Something went wrong, please try again (HTTP Status Code ${xhr.status})`);
                            }
                        });
                    },
                    error: xhr => {
                        $('#transactions').html(`Something went wrong, please try again (HTTP Status Code ${xhr.status})`);
                    }
                });
            },
            error: xhr => {
                $('#transactions').html(`Something went wrong, please try again (HTTP Status Code ${xhr.status})`);
            }
        });
    });
});