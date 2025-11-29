const express = require('express');
const router = express.Router();
const db = require('../db');
const query = require('../models/Reclamo');

router.get('/', async (req, res) => {
    try {
        const result = await db.query(query.getReclamos);
        res.json(result.rows);
    } catch (e) {
        res.status(500).json({ error: "Error al obtener reclamos" });
    }
});

//mostrar
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query(query.getReclamoById, [req.params.id]);
        res.json(result.rows[0]);
    } catch (e) {
        res.status(500).json({ error: "Error al obtener reclamo" });
    }
});

//crear
router.post('/', async (req, res) => {
    const { nombre, descripcion, categoria, email, telefono, nrocompra, sucursal, fotouri, latitud, longitud } = req.body;

    try {
        const result = await db.query(
            query.createReclamo,
            [nombre, descripcion, categoria, email, telefono, nrocompra, sucursal, fotouri, latitud, longitud]
        );

        res.status(201).json({ id: result.rows[0].id });
    } catch (e) {
        res.status(500).json({ error: "Error al crear reclamo" });
    }
});

// actualizar
router.put('/:id', async (req, res) => {
    const { nombre, descripcion, categoria, email, telefono, nrocompra, sucursal, fotouri, latitud, longitud } = req.body;

    try {
        await db.query(
            query.updateReclamo,
            [nombre, descripcion, categoria, email, telefono, nrocompra, sucursal, fotouri, latitud, longitud, req.params.id]
        );

        res.json({ mensaje: "Reclamo actualizado" });
    } catch (e) {
        res.status(500).json({ error: "Error al actualizar reclamo" });
    }
});

//eliminar 
router.delete('/:id', async (req, res) => {
    try {
        await db.query(query.deleteReclamo, [req.params.id]);
        res.json({ mensaje: "Reclamo eliminado" });
    } catch (e) {
        res.status(500).json({ error: "Error al eliminar reclamo" });
    }
});

module.exports = router;
