const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ error: "Token requerido" });
    }

    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({ error: "Formato de token inválido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "clave_secreta_test");
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};
