import Joi from "joi";
import bcrypt from "bcrypt";
import connection from "../database/db.js";

export async function signupValidate(req, res, next) {
    const body = req.body

    const signupSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })

    const { error } = signupSchema.validate(body, { abortEarly: false });
    if (error) return res.status(422).send(error.details.map(d => d.message))
    else next()

}

export async function signinValidate(req, res, next) {
    const body = req.body
    const signupSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    })

    const { error } = signupSchema.validate(body, { abortEarly: false });
    if (error) return res.status(422).send(error.details.map(d => d.message))
    else next()

}
export async function userValidate(req, res, next) {
    const { email, password } = req.body;
    try {
        const user = (await connection.query(`
        SELECT id, password 
        FROM users 
        WHERE email = $1
        `, [email])).rows[0]

        if (user && bcrypt.compareSync(password, user.password)) {
            res.locals.userId = user.id
            next()
        } else return res.sendStatus(401);

    } catch (e) {
        res.sendStatus(500);
    }
}

export async function encryptPassword(req, res, next) {
    const { password } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);
    res.locals.encryptPassword = passwordHash
    next()
}