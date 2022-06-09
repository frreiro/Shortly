import connection from "../database/db.js"
import { customAlphabet } from "nanoid"


export async function shortUrl(req, res) {
    const { url } = req.body
    const { userId } = res.locals

    const nanoid = customAlphabet('1234567890abcdef', 10);

    try {
        await connection.query(`
        INSERT INTO shortedUrls (url,"shortUrl","userId")
        VALUES ($1,$2,$3)
        `, [url, nanoid(), userId])
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
        res.sendStatus(500)

    }
}

export async function redirectUrl(req, res) {
    const { shortUrl } = req.params

    try {
        const url = (await connection.query(`
        UPDATE shortedUrls 
        SET views = views + 1
        WHERE "shortUrl" = $1
        RETURNING url
        `, [shortUrl])).rows[0]

        if (!url.url) return res.sendStatus(404);
        else res.status(200).redirect(url.url);
    } catch (e) {
        res.sendStatus(500)

    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    try {
        await connection.query(`
        DELETE FROM shortedUrls 
        WHERE id = $1 `, [id])
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(500);
    }
}