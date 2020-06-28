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
        PrintJsonObject(result,document.createElement("table"))
        console.log(results)
    } else {
        alert("HTTP-Error: " + fetchResult.status);
    }
}

 // Extract value from table header.
function tableFromJson(jsonArray){
        var col = [];
        for (var i = 0; i < jsonArray.length; i++) {
            for (var key in jsonArray[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // Create a table.
        var table = document.createElement("table");

        // Create table header row using the extracted headers above.
        var tr = table.insertRow(-1);                   // table row.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // table header.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

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
                    tabCell.innerHTML = element[x];
                }
                else{
                    tabCell.innerHTML = element[x]["id"];
                }
            }
    }



