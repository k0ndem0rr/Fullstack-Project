# Task Manager API

This is a simple API for managing tasks. It is built using TypeScript and Node.js.

## Installation

1. Clone the repository: `git clone https://github.com/k0ndem0rr/task-manager.git`
2. Install dependencies: `npm install`

## Usage

1. Change [key](src/key)
2. Start the server: `npm start`
3. Access the API at `http://localhost:3000`

## API Endpoints

- `GET /tasks`: Get all tasks
- `GET /tasks/:id`: Get a specific task by ID
- `POST /tasks`: Create a new task
- `PUT /tasks/:id`: Update a task by ID
- `DELETE /tasks/:id`: Delete a task by ID
- `DELETE /tasks`: Delete all tasks

## Technologies Used

- TypeScript
- Node.js
- Express.js
- SQLite
- JSON Web Token

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
