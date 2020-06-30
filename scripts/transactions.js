const baseUrl = 'https://projectcodegenerationbankapp.herokuapp.com/api';
//const baseUrl='http://localhost:8090/api';

$(document).ready(() => {
    let searchParams = new URLSearchParams(window.location.search);
    if(!searchParams.has('iban'))
    {
        alert(`select a bank acount 1st`);
        window.location.replace('transactionDashboard.html');
    }
    // Fetch Transactions
    $.ajax({
        url: baseUrl + '/transactions' + '?iban=' + searchParams.get('iban'),
        type: 'GET',
        headers: { "Authorization": sessionStorage.getItem('token') },
        success: transactions => {
            $('#transactions').html('');
            transactions.forEach(transaction => {
                $('#transactions').append(`Sender: ${transaction.sender.iban}: Current balance: ${transaction.sender.balance}<br> Amount: €${transaction.amount} </br> 
                Recipient: ${transaction.recipient.iban} </br> </br>`);
                //SHOW THE PASSED BANK ACCOUNT
                //console.log(sessionStorage.getItem('token'));
            });
        },
        error: xhr => {
            $('#transactions').html(`Something went wrong, please try again ${xhr.responseText})`);
        }
    });


    // Create transaction
    $('#transaction-form').submit(e => {
        e.preventDefault();
        $.ajax({
            //to fetch the account of the sender
            url: baseUrl + '/accounts/' + searchParams.get('iban'),
            //url: baseUrl + '/accounts/NL01INHO0000000001',
            type: 'GET',
            headers: {"Authorization": sessionStorage.getItem('token')},
            success: sender => {
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
                                        sender: sender,
                                        recipient: recipient,
                                        amount: $('#transaction-amount').val(),
                                        transactionType: 'transfer',
                                        userPerforming: user
                                    }),
                                    success: () => {
                                        $('#status').html(`€${$('#transaction-amount').val()} was successfully tranfered to ${$('#transaction-recipient').val()}`);
                                    },
                                    error: xhr => {
                                        $('#status').html(`Something went wrong, please try again - ${xhr.responseText})`);
                                    }
                                });
                            },
                            error: xhr => {
                                $('#status').html(`Something went wrong, please try again - ${xhr.responseText})`);
                            }
                        });
                    },
                    error: xhr => {
                        $('#status').html(`Something went wrong, please try again - ${xhr.responseText})`);
                    }
                });
            }
        });
        
    });
});