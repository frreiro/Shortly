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
        res.sendStatus(500)

    }
}

export async function getUrl(req, res) {
    const { id } = req.params;

    try {
        const shortedUrl = (await connection.query(`
        SELECT id,"shortUrl", url 
        FROM shortedUrls
        WHERE id = $1
        `, [id])).rows[0]

        if (!shortedUrl) return res.sendStatus(404);
        else res.status(200).send(shortedUrl)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)

    }
}