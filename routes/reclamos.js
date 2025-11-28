const express = require('express');
const router = express.Router();
const db = require('../db');
const query = require('../models/Reclamo');

// GET todos los reclamos
router.get('/', async (req, res) => {
    try {
        const result = await db.query(query.getReclamos);
        res.json(result.rows);
    } catch (error) {
        console.error('ERROR GET /reclamos:', error);
        res.status(500).json({ error: "Error al listar reclamos" });
    }
});

// GET reclamo por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(query.getReclamoById, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Reclamo no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('ERROR GET /reclamos/:id:', error);
        res.status(500).json({ error: "Error al obtener reclamo" });
    }
});

// POST crear reclamo
router.post('/', async (req, res) => {
    const { nombre, descripcion, categoria, email, telefono, nroCompra, sucursal, fotoUri, latitud, longitud } = req.body;

    try {
        const result = await db.query(query.createReclamo, [
            nombre, descripcion, categoria, email, telefono,
            nroCompra, sucursal, fotoUri, latitud, longitud
        ]);

        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error('ERROR POST /reclamos:', error);
        res.status(500).json({ error: "Error al crear reclamo" });
    }
});

// PUT actualizar reclamo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoria, email, telefono, nrocompra, sucursal, fotouri, latitud, longitud } = req.body;

    try {
        const result = await db.query(query.updateReclamo, [
            nombre, descripcion, categoria, email, telefono,
            nrocompra, sucursal, fotouri, latitud, longitud, id
        ]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Reclamo no encontrado" });
        }

        res.json({ message: "Reclamo actualizado" });
    } catch (error) {
        console.error('ERROR PUT /reclamos/:id:', error);
        res.status(500).json({ error: "Error al actualizar reclamo" });
    }
});

// DELETE eliminar reclamo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(query.deleteReclamo, [id]);
        res.json({ message: "Reclamo eliminado" });
    } catch (error) {
        console.error('ERROR DELETE /reclamos/:id:', error);
        res.status(500).json({ error: "Error al eliminar reclamo" });
    }
});

module.exports = router;
