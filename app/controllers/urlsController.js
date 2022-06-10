import { deleteShortUrl, getAndUpdateUrl, getUrl, setShortUrl } from "../repository/urlsRepository.js";


export async function shortUrl(req, res) {
    const { url } = req.body
    const { userId } = res.locals

    try {
        await setShortUrl(url, userId);
        res.sendStatus(201)

    } catch (e) {
        res.sendStatus(500)

    }
}

export async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        const shortedUrl = (await getUrl(id)).rows[0]

        if (!shortedUrl) return res.sendStatus(404);
        else res.status(200).send(shortedUrl)

    } catch (e) {
        res.sendStatus(500)

    }
}

export async function redirectUrl(req, res) {
    const { shortUrl } = req.params

    try {
        const url = (await getAndUpdateUrl(shortUrl)).rows[0]

        if (!url.url) return res.sendStatus(404);
        else res.status(200).redirect(url.url);
    } catch (e) {
        res.sendStatus(500)

    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    try {
        await deleteShortUrl(id);
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(500);
    }
}