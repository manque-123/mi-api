const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:lat/:lon", async (req, res) => {
    const { lat, lon } = req.params;

    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

        const response = await axios.get(url, {
            headers: { "User-Agent": "mi-api/1.0" },
        });

        const data = response.data;

        const comuna =
            data.address?.town ||
            data.address?.city ||
            data.address?.village ||
            data.address?.suburb ||
            "Desconocido";

        res.json({
            comuna: comuna,
            direccion: data.display_name,
        });
    } catch (error) {
        console.error("ERROR API Ubicación:", error);
        res.status(500).json({ error: "Error obteniendo ubicación" });
    }
});

module.exports = router;
