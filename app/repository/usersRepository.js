import connection from "../database/db.js"


export async function getUserData(id) {
    return connection.query(`
    SELECT u.id as "userId", u.name, s.id, s."shortUrl", s.url, s.views as "visitCount"
    FROM users u
    JOIN shortedUrls s ON u.id = s."userId"
    WHERE u.id = $1
    `, [id])
}


export async function getUserRanking() {
    return connection.query(`
    SELECT u.id as id, u.name,COUNT(s.url) as "linksCounts", COALESCE(SUM(s.views),0) as "visitCount"
    FROM shortedUrls s
    RIGHT JOIN users U ON s."userId" = u.id
    GROUP BY u.id, u.name
    ORDER BY "visitCount" DESC, "linksCounts" DESC
    LIMIT 10
    `)
}

export async function getUser(id) {
    return connection.query(`
        SELECT id FROM users
        WHERE id = $1
        `, [id])
}