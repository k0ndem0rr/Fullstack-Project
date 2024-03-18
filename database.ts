import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    await db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT UNIQUE
        )
    `);

    return db;
}

export default openDb;