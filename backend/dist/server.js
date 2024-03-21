"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Para poder parsear JSON en el cuerpo de las peticiones
app.use(express_1.default.static('dist')); // Para servir los ficheros estáticos de la carpeta public
app.use((0, cors_1.default)()); // Para permitir peticiones desde cualquier origen
const port = 3000;
// Ruta de bienvenida
app.get('/', (_, res) => {
    res.sendFile('./../../frontend/index.html', { root: __dirname });
});
// Ruta para obtener todos los usuarios
app.get('/users', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.default)();
    const users = yield db.all('SELECT * FROM Users');
    res.send(users);
}));
// Ruta para añadir un nuevo usuario
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.default)();
    try {
        const result = yield db.run('INSERT INTO Users (email, name) VALUES (?, ?)', req.body.email, req.body.name);
        res.send({ email: req.body.email });
    }
    catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            res.status(error.status).send({ error: 'El usuario ya existe' });
        }
        else {
            res.status(500).send({ error: 'Error del servidor' });
        }
    }
}));
//Ruta para borrar un usuario
app.delete('/users/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.default)();
    yield db.run('DELETE FROM Users WHERE email = ?', req.params.email);
    res.send({ email: req.params.email });
}));
// Ruta para obtener todas las tareas
app.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.default)();
    const tasks = yield db.all('SELECT * FROM Tasks');
    res.send(tasks);
}));
// Ruta para añadir una nueva tarea
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.default)();
    const result = yield db.run('INSERT INTO Tasks (description) VALUES (?)', req.body.description);
    res.send({ id: result.lastID });
}));
// Ruta para borrar una tarea
app.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.default)();
    yield db.run('DELETE FROM Tasks WHERE id = ?', req.params.id);
    res.send({ id: req.params.id });
}));
// Ruta para borra todas las tareas
app.delete('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.default)();
    yield db.run('DELETE FROM Tasks');
    res.send('All tasks deleted');
}));
//Ruta para el script de la página
app.get('/script.js', (_, res) => {
    res.sendFile('./script.js', { root: __dirname });
});
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.default)();
    const user = yield db.get('SELECT * FROM Users WHERE email = ?', req.body.email);
    if (user && user.name === req.body.name) {
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET);
        console.log(token);
        res.send({ token });
    }
    else {
        res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//Funciones de debbuging que luego borraré
//Ruta para obtener el secreto
app.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(process.env.JWT_SECRET);
}));
