async function GetAccounts() {
    const URL = "https://localhost:8090/api/accounts"
    let fetchResult =  await fetch(URL)
    if (fetchResult.ok) {
        let results = await fetchResult.json();
        tableFromJson(results)
        console.log(results)
    } else {
        alert("HTTP-Error: " + fetchResult.status);
    }
}


async function GetAccountByIBAN() {
    const URL = "https://localhost:8090/api/accounts/NL02INHO0000000002";
    let fetchResult =  await fetch(URL)
    if (fetchResult.ok) {
        let result = await fetchResult.json();
        var table = initialiseAccountTable(result);
        PrintJsonObject(result,table);
        console.log(result);
    } else {
        alert("HTTP-Error: " + fetchResult.status);
    }
}

 // Extract value from table header.
function tableFromJson(jsonArray){

        var table = initialiseAccountTable(jsonArray[0]);
        // add json data to the table as rows.
        for (var i = 0; i <jsonArray.length; i++) {
                PrintJsonObject(jsonArray[i],table);

        }

        // Now, add the newly created table with json data, to a container.
        var divShowData = document.getElementById('showData');
        divShowData.innerHTML = "";
        divShowData.appendChild(table);
    }

    function PrintJsonObject(element,table){

            var tr = table.insertRow(-1);                   // table row.

            for (x in element) {
                var tabCell = tr.insertCell(-1);
                if(!Array.isArray(element) && !(typeof(element[x]) === "object")){
                    tabCell.innerHTML = element[x] ;
                }
                else{
                    tabCell.innerHTML = element[x]["id"];
                }
            }
            var tabCell = tr.insertCell(-1);
            var button = document.createElement("button");
            button.innerHTML = "delete";

            tabCell.appendChild(button);
            button.setAttribute("name",element["iban"])
            button.addEventListener("click",function() { DeleteAccount(this.name);});

            var tabCell = tr.insertCell(-1);
                        var button = document.createElement("button");
                        button.innerHTML = "Edit";

                        tabCell.appendChild(button);
                        button.setAttribute("name",element["iban"])
                        button.addEventListener("click",function() {
                                                                    var form = document.getElementById("updateAccount");
                                                                     form.style.display = "block";
                                                                     document.getElementById("ibanEditLabel").innerHTML = this.name;
                                                                     })



    }





function initialiseAccountTable(element)
{

        // Create a table.
        var table = document.createElement("table");

        // Create table header row using the extracted headers above.
        var tr = table.insertRow(-1);

        for (var key in element) {
            var th = document.createElement("th");      // table header.
            th.innerHTML = key;
            tr.appendChild(th);
        }

        return table;
}

function CreateAccount(){

    const account = {
        accountType: 'savings'
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(account),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch('HTTPS://localhost:8090/api/accounts', options)
        .then(res => res.json())
        .then(res => console.log(res));

}

function UpdateAccount()
{
     accType = validateAccountType();
   var iban = document.getElementById("ibanEditLabel").textContent;
    console.log(iban + accType)
    var formData = new FormData();
    value = formData.set("accountType", accType)
    fetch('HTTPS://localhost:8090/api/accounts/'+iban,
    {
    method:"PUT",
    headers: {
          'Content-Type': 'application/json'
        },
    body: JSON.stringify(value)


    })
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
        })
        .catch(error => {
          console.error('Error:', error);
        });

}

 function validateAccountType() {
    var  accType;
    if (document.getElementById('savings').checked) {
        accType = "savings"
    }
    else if (document.getElementById('current').checked) {
        accType = "current"
    }
    else {
        alert("Select account type");
    }
     return accType
    }


function DeleteAccount(iban)
{

    fetch('HTTPS://localhost:8090/api/accounts/'+iban, {method:"DELETE"})
        .then(res => res.json())
        .then(res => console.log(res));
}
