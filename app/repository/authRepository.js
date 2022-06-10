import connection from "../database/db.js";


export async function setUser(name, email, password) {
    return connection.query(` INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)`, [name, email, password]);
}

export async function getUserId(email) {
    return connection.query(` SELECT id, password FROM users WHERE email = $1
        `, [email])
}