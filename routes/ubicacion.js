const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:lat/:lon', async (req, res) => {
    const { lat, lon } = req.params;

    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );

        res.json(response.data);
    } catch (e) {
        res.status(500).json({ error: "Error obteniendo dirección" });
    }
});

module.exports = router;
