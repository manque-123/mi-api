const express = require('express');
const router = express.Router();
const db = require('../db');
const query = require('../models/Reclamo');

//  GET todos los reclamos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute(query.getReclamos);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al listar reclamos" });
    }
});

//  GET reclamo por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute(query.getReclamoById, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Reclamo no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener reclamo" });
    }
});

//  POST crear reclamo
router.post('/', async (req, res) => {
    const { nombre, descripcion, categoria, email, telefono, nroCompra, sucursal, fotoUri, latitud, longitud } = req.body;

    try {
        const [result] = await db.execute(query.createReclamo, [
            nombre, descripcion, categoria, email, telefono,
            nroCompra, sucursal, fotoUri, latitud, longitud
        ]);
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear reclamo" });
    }
});

//  PUT actualizar reclamo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoria, email, telefono, nroCompra, sucursal, fotoUri, latitud, longitud } = req.body;

    try {
        await db.execute(query.updateReclamo, [
            nombre, descripcion, categoria, email, telefono,
            nroCompra, sucursal, fotoUri, latitud, longitud, id
        ]);
        res.json({ message: "Reclamo actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar reclamo" });
    }
});

// ➤ DELETE reclamo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.execute(query.deleteReclamo, [id]);
        res.json({ message: "Reclamo eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar reclamo" });
    }
});

module.exports = router;
