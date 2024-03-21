import express from 'express';
import openDb from './database';
import jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json()); // Para poder parsear JSON en el cuerpo de las peticiones
app.use(express.static('dist')); // Para servir los ficheros estáticos de la carpeta public
app.use(cors()); // Para permitir peticiones desde cualquier origen
const port = 3000;

// Ruta de bienvenida
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
}); 

// Ruta para obtener todos los usuarios
app.get('/users', async (_, res) => {
    const db = await openDb();
    const users = await db.all('SELECT * FROM Users');
    res.send(users);
});

// Ruta para añadir un nuevo usuario
app.post('/users', async (req, res) => {
    const db = await openDb();
    try {
      const result = await db.run('INSERT INTO Users (email, name) VALUES (?, ?)', req.body.email, req.body.name);
      res.send({ email: req.body.email });
    } catch (error) {
      if ((error as any).message.includes('UNIQUE constraint failed')){
        res.status((error as any).status).send({ error: 'El usuario ya existe' });
      } else {
        res.status(500).send({ error: 'Error del servidor' });
      }
    }
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
  res.sendFile(path.join(__dirname, '../../frontend/dist/script.js'));
});

app.post('/login', async (req, res) => {
  const db = await openDb();
  const user = await db.get('SELECT * FROM Users WHERE email = ?', req.body.email);
  if (user && user.name === req.body.name) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as Secret);
    console.log(token);
    res.send({ token });
  } else {
    res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



//Funciones de debbuging que luego borraré

//Ruta para obtener el secreto
app.get('/login', async (req, res) => {
  res.send(process.env.JWT_SECRET as string);
});
