import express from 'express';
import openDb from './database';

const app = express();
app.use(express.json()); // Para poder parsear JSON en el cuerpo de las peticiones
const port = 3000;

// Ruta de bienvenida
app.get('/', (_, res) => {
    res.sendFile('./index.html', {root: __dirname});}); 

// Ruta para obtener todos los usuarios
app.get('/users', async (_, res) => {
    const db = await openDb();
    const users = await db.all('SELECT * FROM Users');
    res.send(users);
});

// Ruta para añadir un nuevo usuario
app.post('/users', async (req, res) => {
    const db = await openDb();
    const result = await db.run('INSERT INTO Users (email, name) VALUES (?, ?)', req.body.email, req.body.name);
});

//Ruta para borrar un usuario
app.delete('/users/:email', async (req, res) => {
    const db = await openDb();
    await db.run('DELETE FROM Users WHERE email = ?', req.params.email);
    res.send({ email: req.params.email });
});

// Ruta para obtener todas las tareas
app.get('/tasks', async (req, res) => {
  const db = await openDb();
  const tasks = await db.all('SELECT * FROM Tasks');
  res.send(tasks);
});

// Ruta para añadir una nueva tarea
app.post('/tasks', async (req, res) => {
  const db = await openDb();
  const result = await db.run('INSERT INTO Tasks (description) VALUES (?)', req.body.description);
  res.send({ id: result.lastID });
});

// Ruta para borrar una tarea
app.delete('/tasks/:id', async (req, res) => {
  const db = await openDb();
  await db.run('DELETE FROM Tasks WHERE id = ?', req.params.id);
  res.send({ id: req.params.id });
});

// Ruta para borra todas las tareas
app.delete('/tasks', async (req, res) => {
  const db = await openDb();
  await db.run('DELETE FROM Tasks');
  res.send('All tasks deleted');
});

//Ruta para el script de la página
app.get('/script.js', (_, res) => {
  res.sendFile('./script.js', {root: __dirname});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});