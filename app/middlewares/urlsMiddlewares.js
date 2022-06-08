import Joi from "joi";


export async function urlValidate(req, res, next) {
    const body = req.body;

    const urlSchema = Joi.object({
        url: Joi.string().url().required()
    })

    const { error } = urlSchema.validate(body);
    if (error) return res.status(422).send(error.details.message);
    else next();
}
