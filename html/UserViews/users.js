"use strict";
//@ts-check

var userTable;
/**
 * HTML button to add a user
 * @type { HTMLButtonElement }
 */

var btnAddUser;
/**
 * Describes the application mode and can be either: "allUsers" or "specificUser"
 * @type { "allUsers" | "specificUser" }
 */
var mode = "allUsers";

$(document).ready(function () {
    userTable = document.getElementById("user");
    btnAddUser = document.getElementById("btnAddUser");
    loadUsers();

    btnAddUser.onclick = () => {
        const user = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            accessLevel: ""
        }

        const htmlElements = addTableRow(user);
        for (let key in htmlElements) {
            const v = htmlElements[key];
            v.contentEditable = true;
            v.style.border = "1px solid black";
        }
        // for (let e of [htmlElements.divEmail, htmlElements.divPassword, htmlElements.divFirstName, htmlElements.divLastName, htmlElements.divAccessLevel]){
        //     e.contentEditable = true;
        //     e.style.border = "1px solid black";
        // }
        //Make add button
        const addButton = document.createElement("button");
        addButton.innerHTML = "Add";
        userTable.appendChild(addButton);
        addButton.onclick = () => {
            // Collect fields and make user object
            const newUser = {
                email: htmlElements.divEmail.innerText,
                password: htmlElements.divPassword.innerText,
                firstName: htmlElements.divFirstName.innerText,
                lastName: htmlElements.divLastName.innerText,
                accessLevel: htmlElements.divAccessLevel.innerText
            }
            // Post to server
            addNewUser(newUser).then(
                response => {
                    console.log(`Response from server: ${response.status}`);
                    loadUsers();
                }
            );
        }


        const cancelButton = document.createElement("button");
        cancelButton.innerHTML = "Cancel";
        userTable.appendChild(cancelButton);
        cancelButton.onclick = () => {
            loadUsers();
        }
    }
});

/**
 * Sends request to the server to get a list of all users.
 * It then clears the table and fills it with rows
 * representing the result to the user table.
 */
async function loadUsers() {
    // Clean the list
    userTable.innerHTML = "";
    const url = "http://localhost:8090/api/users";
    const res = await fetch(url);
    const data = await res.json();
    data.forEach(user => {
        // console.log(user);
        // Make e-mail div (within row)
        const { divEmail, divPassword, divFirstName, divLastName, divAccessLevel } = addTableRow(user);
        // Make editButton 
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        userTable.appendChild(editButton);
        editButton.onclick = () => {
            for (let e of [divEmail, divPassword, divFirstName, divLastName, divAccessLevel]) {
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
            for (let e of [divEmail, divPassword, divFirstName, divLastName, divAccessLevel]) {
                e.contentEditable = false;
                e.style.border = null;
            }
            //Hide edit button, show save button
            editButton.style.display = null;
            saveButton.style.display = "none";
            //Send PUT request to server
            putUserData(
                {
                    id: user.id,
                    email: divEmail.innerText,
                    password: divPassword.innerText,
                    firstName: divFirstName.innerText,
                    lastName: divLastName.innerText,
                    accessLevel: divAccessLevel.innerText
                }

            ).then(response => {
                console.log(`Response from server: ${response.status}`);
                loadUsers();
            });
        }
        // Make deleteButton 
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        userTable.appendChild(deleteButton);
        deleteButton.onclick = () => {
            deleteUserData(user.id).then(response => {
                console.log(`Response from server: ${response.status}`);
                loadUsers();
            });
        }

    });
}

function addTableRow(user) {
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
    return { divEmail, divPassword, divFirstName, divLastName, divAccessLevel };
}

function putUserData(userData) {
    const url = `http://localhost:8090/api/users/${userData.id}`;
    console.log(url);
    console.log(userData);
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
}

function deleteUserData(id) {
    const url = `http://localhost:8090/api/users/${id}`;
    console.log(url);
    console.log(id);
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

function addNewUser(user) {
    return fetch('http://localhost:8090/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

// function addNewUser(user) {
//     $.ajax({
//         type: 'POST',
//         url: 'http://localhost:8090/api/users',
//         contentType: 'application/json',
//         data: JSON.stringify(user)
//     })
// }


