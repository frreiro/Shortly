import Joi from "joi";


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

