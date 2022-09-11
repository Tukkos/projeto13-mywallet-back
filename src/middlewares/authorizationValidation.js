import db from "../database/db.js"

async function authorizationValidation(req, res, next) {
    const { auth } = req.headers;
    const token = auth?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send("Token não encontrado.");
    }

    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
        return res.status(401).send("Sessão não encontrada, favor relogar.");
    };

    res.locals.session = session;
    next();
};

export default authorizationValidation;