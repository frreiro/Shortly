import { v4 as uuid } from "uuid";

import connection from "../database/db.js";


export async function signup(req, res) {
    const { name, email } = req.body;
    const { encryptPassword } = res.locals

    try {
        await connection.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)
        `, [name, email, encryptPassword]);
        res.sendStatus(201)
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function signin(req, res) {
    const { userId } = res.locals;

    const token = uuid();
    try {
        await connection.query(`
        INSERT INTO sessions ("userId", token) 
        VALUES ($1,$2)
        `, [userId, token])
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(500)
    }

}