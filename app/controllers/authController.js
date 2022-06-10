import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken"

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
        console.log(e)
        res.sendStatus(500);
    }
}

export async function signin(req, res) {
    const { userId } = res.locals;

    const dados = { userId }
    const key = process.env.JWT_KEY
    const token = jwt.sign(dados, key);
    console.log(token)
    res.status(200).send({ token })

}