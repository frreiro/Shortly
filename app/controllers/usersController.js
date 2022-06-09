import connection from "../database/db.js"

export async function getUserData(req, res) {
    const { id } = req.params;

    try {
        const userInfo = (await connection.query(`
        SELECT u.id as "userId", u.name, s.id, s."shortUrl", s.url, s.views as "visitCount"
        FROM users u
        JOIN shortedUrls s ON u.id = s."userId"
        WHERE u.id = $1
        `, [id])).rows

        if (!userInfo.length > 0) return res.sendStatus(404)
        else res.status(200).send(_mapUserInfoArrayToObject(userInfo))

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

function _mapUserInfoArrayToObject(rows) {
    const { name, userId: id } = rows[0];
    let visitCount = 0
    const result = rows.map((item) => {
        delete item.name;
        delete item.userId;
        visitCount += item.visitCount
        return item
    })

    return {
        id,
        name,
        visitCount,
        shortenedUrls: result
    }

}