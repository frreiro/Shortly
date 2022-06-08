



export async function tokenValidate(res, req, next) {
    const { authorization } = req.header;
    const token = authorization?.replace('Bearer ', '').trim();

    if (!token) return res.status(401);
    //TODO: pesquisar em "sessions" pra ver se o token existe, se não retornar 401;
    else next();
}