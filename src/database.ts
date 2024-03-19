import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    await db.run(`
        CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY,
            name TEXT
        )
    `);

    await db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY,
            description TEXT
        )
    `);

    return db;
}

export default openDb;