import connection from "../database/db.js"
import { nanoid } from "nanoid"


export async function shortUrl(req, res) {
    const { url } = req.body
    const { userId } = res.locals
    try {
        await connection.query(`
        INSERT INTO shortedUrls (url,"shortUrl","userId")
        VALUES ($1,$2,$3)
        `, [url, nanoid(10), userId])
        res.sendStatus(201)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)

    }
}