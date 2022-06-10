import connection from "../database/db.js";


export async function setShortUrl(url, shortUrl, userId) {

    return connection.query(`
    INSERT INTO shortedUrls (url,"shortUrl","userId")
    VALUES ($1,$2,$3)
    `, [url, shortUrl, userId])
}

export async function getUrl(id) {
    return connection.query(`
        SELECT id,"shortUrl", url 
        FROM shortedUrls
        WHERE id = $1
        `, [id])
}

export async function getAndUpdateUrl(url) {
    return connection.query(`
        UPDATE shortedUrls 
        SET views = views + 1
        WHERE "shortUrl" = $1
        RETURNING url
        `, [url])
}

export async function deleteShortUrl(id) {
    return connection.query(`
    DELETE FROM shortedUrls 
    WHERE id = $1 `, [id])
}

export async function getUserId(id) {
    return connection.query(`
    SELECT "userId" FROM shortedUrls WHERE id = $1
    `, [id])
}


