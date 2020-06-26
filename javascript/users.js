"use strict";

$(document).ready(function () {
    var url = "https://banking-appv3.herokuapp.com/api/users";
    const userTable = document.getElementById("user");

    $.ajax({
        type: 'GET',
        url: url,
        success: data => {
            data.forEach(user => {
                // console.log(user);
                // Make e-mail div (within row)
                const divEmail = document.createElement("div");
                divEmail.innerHTML = user.email;
                userTable.appendChild(divEmail);
                // Make password div (within row)
                const divPassword = document.createElement("div");
                divPassword.innerHTML = user.password;
                userTable.appendChild(divPassword);
                // Make firstName div (within row)
                const divFirstName = document.createElement("div");
                divFirstName.innerHTML = user.firstName;
                userTable.appendChild(divFirstName);
                // Make lastName div (within row)
                const divLastName = document.createElement("div");
                divLastName.innerHTML = user.lastName;
                userTable.appendChild(divLastName);
                // Make accesLevel div (within row)
                const divAccessLevel = document.createElement("div");
                divAccessLevel.innerHTML = user.accessLevel;
                userTable.appendChild(divAccessLevel);
                // Make editButton 
                const editButton = document.createElement("button");
                editButton.innerHTML = "Edit";
                userTable.appendChild(editButton);
                editButton.onclick = () => {
                    for (let e of [divEmail, divPassword, divFirstName, divLastName,divAccessLevel]) {
                        e.contentEditable = true;
                        e.style.border = "1px solid black";
                    }
                    //Hide edit button, show save button
                    editButton.style.display = "none";
                    saveButton.style.display = null;

                }
                // Make saveButton 
                const saveButton = document.createElement("button");
                saveButton.innerHTML = "Save";
                userTable.appendChild(saveButton);
                saveButton.style.display = "none";
                saveButton.onclick = () => {
                    for (let e of [divEmail, divPassword, divFirstName, divLastName,divAccessLevel]) {
                        e.contentEditable = false;
                        e.style.border = null;
                    }
                    //Hide edit button, show save button
                    editButton.style.display = null;
                    saveButton.style.display = "none";
                    //Send PUT request to server
                    putUserData(
                        {
                            id : user.id,
                            email : divEmail.innerText,
                            password : divPassword.innerText,
                            firstName : divFirstName.innerText,
                            lastName : divLastName.innerText,
                            accessLevel : divAccessLevel.innerText
                        }
                    )


                }
                // Make deleteButton 
                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                userTable.appendChild(deleteButton);

            });
        }
    })


    // $.ajax({
    //     type: 'POST',
    //     url: 'https://banking-appv3.herokuapp.com/api/users',
    //     contentType: 'application/json',
    //     data: JSON.stringify({
    //         "email": "test@gmail.com",
    //         "password" : "test123",
    //         "firstName" : "test",
    //         "lastName" : "123",
    //         "accessLevel" : "employee"
    //     })
    // })
});

function putUserData(userData) {
    const url = `https://banking-appv3.herokuapp.com/api/users/${userData.id}`;
    console.log(url);
    console.log(userData);
    fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      }).then(response => console.log(`Response from server: ${response.status}`));
}