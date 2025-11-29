const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', (req, res) => {
    const { usuario, password } = req.body;

    if (usuario !== "admin" || password !== "1234") {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
        { user: usuario },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.json({ token });
});

module.exports = router;
