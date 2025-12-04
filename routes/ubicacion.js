const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:lat/:lon', async (req, res) => {
  const { lat, lon } = req.params;

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: { format: "json", lat, lon },
        headers: {
          "User-Agent": "ReclamosAPI-V3/1.0 (manque.123@gmail.com)"  
        }
      }
    );

    res.json(response.data);
  } catch (e) {
    console.error("Nominatim error:", e.response?.status, e.response?.data);
    res.status(500).json({ error: "Error obteniendo dirección" });
  }
});

module.exports = router;

