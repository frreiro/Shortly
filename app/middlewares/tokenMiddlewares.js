import connection from "../database/db.js";




export async function tokenValidate(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);
    try {
        const userId = (await connection.query(`
        SELECT "userId" FROM sessions
        WHERE token = $1
        `, [token])).rows[0]

        if (!userId) return res.sendStatus(401);
        else {
            res.locals.userId = userId.userId;
            next()
        }
    } catch (e) {
        res.sendStatus(500)
    }
}