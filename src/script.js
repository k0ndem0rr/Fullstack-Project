document.getElementById('create-user-form').addEventListener('submit', function(e) {
            e.preventDefault();
            var name = document.getElementById('user-name').value;
            var email = document.getElementById('user-email').value;
            axios.post('http://localhost:3000/users', { name: name, email: email })
                .then(function(response) {
                   console.log(response.data);
                   document.getElementById('user-name').value = '';
                })
                .catch(function(error) {
                    console.error(error);
                });
        });

        document.getElementById('delete-user-form').addEventListener('submit', function(e) {
            e.preventDefault();
            var id = document.getElementById('user-id').value;
            axios.delete('http://localhost:3000/users/' + id)
                .then(function(response) {
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.error(error);
                });
        });

        document.getElementById('create-task-form').addEventListener('submit', function(e) {
            e.preventDefault();
            var description = document.getElementById('task-description').value;
            axios.post('http://localhost:3000/tasks', { description: description })
                .then(function(response) {
                    console.log(response.data);
                    document.getElementById('task-description').value = '';
                })
                .catch(function(error) {
                    console.error(error);
                });
        });

        document.getElementById('delete-task-form').addEventListener('submit', function(e) {
            e.preventDefault();
            var id = document.getElementById('task-id').value;
            axios.delete('http://localhost:3000/tasks/' + id)
                .then(function(response) {
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.error(error);
                });
        });

        document.getElementById('delete-all-tasks').addEventListener('click', function() {
            axios.delete('http://localhost:3000/tasks')
                .then(function(response) {
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.error(error);
                });
        });

        document.getElementById('get-users').addEventListener('click', function() {
            axios.get('http://localhost:3000/users')
                .then(function(response) {
                    var users = response.data;
                    var usersTable = document.getElementById('users-table');

                    // Limpia la tabla
                    usersTable.innerHTML = '<tr><th>ID</th><th>Name</th><th>Email</th></tr>';

                    // Añade una fila a la tabla por cada usuario
                    for (var i = 0; i < users.length; i++) {
                        var row = usersTable.insertRow(-1);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);

                        cell1.textContent = users[i].id;
                        cell2.textContent = users[i].name;
                        cell3.textContent = users[i].email;
                    }

                })
                .catch(function(error) {
                    console.error(error);
                });
        });

        document.getElementById('get-tasks').addEventListener('click', function() {
        axios.get('http://localhost:3000/tasks')
            .then(function(response) {
                var tasks = response.data;
                var tasksTable = document.getElementById('tasks-table');

                // Limpia la tabla
                tasksTable.innerHTML = '<tr><th>ID</th><th>Description</th></tr>';

                // Añade una fila a la tabla por cada tarea
                for (var i = 0; i < tasks.length; i++) {
                    var row = tasksTable.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);

                    cell1.textContent = tasks[i].id;
                    cell2.textContent = tasks[i].description;
                }
            })
            .catch(function(error) {
                console.error(error);
            });
    });