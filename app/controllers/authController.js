import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken"

import connection from "../database/db.js";
import { setUser } from "../repository/authRepository.js";


export async function signup(req, res) {
    const { name, email } = req.body;
    const { encryptPassword } = res.locals

    try {
        await setUser(name, email, encryptPassword);
        res.sendStatus(201)
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function signin(req, res) {
    const { userId } = res.locals;

    const dados = { userId }
    const key = process.env.JWT_KEY
    const token = jwt.sign(dados, key);
    res.status(200).send({ token })

}