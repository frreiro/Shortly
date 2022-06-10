import jwt from "jsonwebtoken"


import connection from "../database/db.js";




export async function tokenValidate(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);

    let userId = null;
    try {
        const key = process.env.JWT_KEY;
        userId = jwt.verify(token, key).userId

    } catch (e) {
        res.sendStatus(401);
    }

    try {
        const id = (await connection.query(`
        SELECT id FROM users
        WHERE id = $1
        `, [userId])).rows[0]

        if (!id) return res.sendStatus(401);
        res.locals.userId = userId;
        next()

    } catch (e) {
        res.sendStatus(500)

    }
}