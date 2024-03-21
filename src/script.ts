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

            if (usersTable) usersTable.innerHTML = '<tr><th>Name</th><th>Email</th></tr>';
            
            users.forEach((user: any) => {
                var row = document.createElement('tr');
                row.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
                if (usersTable) usersTable.appendChild(row);
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
            var tasksList = document.getElementById('tasks-table') as HTMLTableElement;

            if (tasksList) tasksList.innerHTML = '<tr><th>ID</th><th>Description</th></tr>';
            
            for (let i = 0; i < tasks.length; i++) {
                var row = tasksList?.insertRow(-1);
                var cell1 = row?.insertCell(0);
                var cell2 = row?.insertCell(1);

                cell1.textContent = tasks[i].id;
                cell2.textContent = tasks[i].description;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// User forms

document.getElementById('create-user-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    var name = (<HTMLInputElement>document.getElementById('user-name'));
    var email = (<HTMLInputElement>document.getElementById('user-email'));
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
            if (name) name.value = '';
            if (email) email.value = '';
            printUsers();
        })
        .catch(error => {
            console.log(error);
        });
});

document.getElementById('delete-user-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    var email = (<HTMLInputElement>document.getElementById('user-email-delete'));
    fetch(`http://localhost:3000/users/${email.value}`, {
        method: 'DELETE'})
        .then(response => {
            console.log(response);
            if (email) email.value = '';
            printUsers();
        })
        .catch(error => {
            console.log(error);
        });
});

document.getElementById('get-users')?.addEventListener('click', (event) => {
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

document.getElementById('create-task-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    var description = (<HTMLInputElement>document.getElementById('task-description'));
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: description.value })
    })
        .then(response => {
            console.log(response);
            if (description) description.value = '';
            printTasks();
        })
        .catch(error => {
            console.log(error);
        });
});

document.getElementById('delete-task-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    var id = (<HTMLInputElement>document.getElementById('task-id'));
    fetch('http://localhost:3000/tasks/' + id.value, {
        method: 'DELETE'})
        .then(response => {
            console.log(response);
            if (id) id.value = '';
            printTasks();
        })
        .catch(error => {
            console.log(error);
        }
    )});

document.getElementById('get-tasks')?.addEventListener('click', (event) => {
    fetch('http://localhost:3000/tasks') 
        .then(response => {
            printTasks();
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
});