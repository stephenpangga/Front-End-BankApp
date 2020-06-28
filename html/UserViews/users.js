"use strict";
//@ts-check

// const apiURL = `http://localhost:8090/api/users`;
const apiURL = `https://projectcodegenerationbankapp.herokuapp.com/api/users`;

var userTable;
/**
 * HTML button to add a user
 * @type { HTMLButtonElement }
 */

var btnAddUser;
var btnFindUser;
var btnShowUsers;
var tUser;
/**
 * Describes the application mode and can be either: "allUsers" or "specificUser"
 * @type { "allUsers" | "specificUser" }
 */
var mode = "allUsers";


$(document).ready(function () {
    userTable = document.getElementById("user");
    btnAddUser = document.getElementById("btnAddUser");
    btnFindUser = document.getElementById("btnFindUser");
    btnShowUsers = document.getElementById("btnShowUsers");
    tUser = document.getElementById("tUser");
    loadUsers();

    btnFindUser.onclick = () => {
        // 1. Get the user IDfrom the text field and use it for the request
        // 2. Send the request with that user ID
        // 3. Fill the fields
        const id = tUser.value;
        loadUser(id);
        // Show the "show all users" button
        btnShowUsers.style.display = null;
        // Hide the "new user" button
        btnAddUser.style.display = "none";
    }

    btnShowUsers.onclick = () => {
        loadUsers();
    }

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
    const url = apiURL;
    const res = await fetch(url);
    const data = await res.json();
    data.forEach(addUserRowAndButtons);
    btnAddUser.style.display = null;
    btnShowUsers.style.display = "none";
    tUser.value = "";
}

/**
 * Adds a row and buttons to the table, filled with the user (object) data.
 * 
 * @param {any} user 
 */
function addUserRowAndButtons(user) {
    // Get user data and add row: edit fields + buttons
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
}

/**
 * Adds a row (text fieds only) to the table that contains the values from the user data passed.
 * 
 * @param {any} user 
 */
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
    const url = `${apiURL}/${userData.id}`;
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
    const url = `${apiURL}/${id}`;
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
    return fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

/**
 * Show the data of specific user in the list
 * Make a request to the server
 * Server returns information of specific user
 * The result is an object 
 * Use this object to fill the list with one row
 */
async function loadUser(id){
    // Clean the list
    userTable.innerHTML = "";
    const url = `${apiURL}/${id}`;
    const res = await fetch(url);
    // Get user data in JSON format
    const user = await res.json();
    addUserRowAndButtons(user);
}

// function addNewUser(user) {
//     $.ajax({
//         type: 'POST',
//         url: apiURL,
//         contentType: 'application/json',
//         data: JSON.stringify(user)
//     })
// }


