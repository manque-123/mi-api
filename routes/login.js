const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/', (req, res) => {
    console.log("BODY RECIBIDO =>", req.body);

    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    if (usuario !== "admin" || password !== "1234") {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
        { user: usuario },
        process.env.JWT_SECRET || "clave_secreta_test",
        { expiresIn: "2h" }
    );

    return res.json({ token });
});

module.exports = router;
