"use strict";
var _a, _b, _c, _d, _e, _f;
window.addEventListener('load', () => {
    printUsers();
    printTasks();
    console.log('loaded');
});
function printUsers() {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
        var usersTable = document.getElementById('users-table');
        if (usersTable)
            usersTable.innerHTML = '<tr><th>Name</th><th>Email</th></tr>';
        users.forEach((user) => {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
            if (usersTable)
                usersTable.appendChild(row);
        });
    })
        .catch(error => {
        console.log(error);
    });
}
function printTasks() {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => {
        var tasksList = document.getElementById('tasks-table');
        if (tasksList)
            tasksList.innerHTML = '<tr><th>ID</th><th>Description</th></tr>';
        for (let i = 0; i < tasks.length; i++) {
            var row = tasksList === null || tasksList === void 0 ? void 0 : tasksList.insertRow(-1);
            var cell1 = row === null || row === void 0 ? void 0 : row.insertCell(0);
            var cell2 = row === null || row === void 0 ? void 0 : row.insertCell(1);
            cell1.textContent = tasks[i].id;
            cell2.textContent = tasks[i].description;
        }
    })
        .catch(error => {
        console.log(error);
    });
}
// User forms
(_a = document.getElementById('create-user-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (event) => {
    event.preventDefault();
    var name = document.getElementById('user-name');
    var email = document.getElementById('user-email');
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name.value, email: email.value })
    })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        if (name)
            name.value = '';
        if (email)
            email.value = '';
        printUsers();
    })
        .catch(error => {
        console.log(error);
    });
});
(_b = document.getElementById('delete-user-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (event) => {
    event.preventDefault();
    var email = document.getElementById('user-email-delete');
    fetch(`http://localhost:3000/users/${email.value}`, {
        method: 'DELETE'
    })
        .then(response => {
        console.log(response);
        if (email)
            email.value = '';
        printUsers();
    })
        .catch(error => {
        console.log(error);
    });
});
(_c = document.getElementById('get-users')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (event) => {
    fetch('http://localhost:3000/users')
        .then(response => {
        printUsers();
        console.log(response);
    })
        .catch(error => {
        console.log(error);
    });
});
// Task forms
(_d = document.getElementById('create-task-form')) === null || _d === void 0 ? void 0 : _d.addEventListener('submit', (event) => {
    event.preventDefault();
    var description = document.getElementById('task-description');
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: description.value })
    })
        .then(response => {
        console.log(response);
        if (description)
            description.value = '';
        printTasks();
    })
        .catch(error => {
        console.log(error);
    });
});
(_e = document.getElementById('delete-task-form')) === null || _e === void 0 ? void 0 : _e.addEventListener('submit', (event) => {
    event.preventDefault();
    var id = document.getElementById('task-id');
    fetch('http://localhost:3000/tasks/' + id.value, {
        method: 'DELETE'
    })
        .then(response => {
        console.log(response);
        if (id)
            id.value = '';
        printTasks();
    })
        .catch(error => {
        console.log(error);
    });
});
(_f = document.getElementById('get-tasks')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', (event) => {
    fetch('http://localhost:3000/tasks')
        .then(response => {
        printTasks();
        console.log(response);
    })
        .catch(error => {
        console.log(error);
    });
});
