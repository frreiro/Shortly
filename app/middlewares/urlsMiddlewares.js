import Joi from "joi";
import { getUserId } from "../repository/authRepository.js";


export async function urlValidate(req, res, next) {
    const body = req.body;

    const urlSchema = Joi.object({
        url: Joi.string().uri().required()
    })

    const { error } = urlSchema.validate(body);
    if (error) return res.status(422).send(error.details.map(d => d.message));
    else next();
}



export async function idParamValidate(req, res, next) {
    const { id } = req.params;

    const idSchema = Joi.number().integer().required();

    const { error } = idSchema.validate(id);
    if (error) return res.status(422).send(error.details.map(d => d.message));
    else next();
}

export async function belongUser(req, res, next) {
    const { id } = req.params;
    const { userId } = res.locals;

    try {
        const idUser = (await getUserId(id)).rows[0]

        if (!idUser) return res.sendStatus(404);
        else if (userId !== idUser.userId) return res.sendStatus(401);
        else next();
    } catch (e) {
        res.sendStatus(500);
    }
}
