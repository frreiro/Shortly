import { getUserData, getUserRanking } from "../repository/usersRepository.js";

export async function sendUserData(req, res) {
    const { id } = req.params;

    try {
        const userInfo = (await getUserData(id)).rows

        if (!userInfo.length > 0) return res.sendStatus(404)
        else res.status(200).send(_mapUserInfoArrayToObject(userInfo))

    } catch (e) {
        res.sendStatus(500)
    }
}


export async function usersRanking(req, res) {
    try {
        const ranking = (await getUserRanking()).rows

        res.status(200).send(ranking);
    } catch (e) {
        res.sendStatus(500);
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