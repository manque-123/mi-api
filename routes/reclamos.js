const express = require('express');
const router = express.Router();
const db = require('../db');
const query = require('../models/Reclamo');

// reinicia el ID automáticamente si la tabla está vacía
// 🔥 Función automática que detecta la secuencia y reinicia el ID
async function resetIdIfEmpty() {
    const count = await db.query("SELECT COUNT(*) FROM reclamos");
    if (count.rows[0].count !== "0") return;

    const seqQuery = await db.query(`
        SELECT pg_get_serial_sequence('reclamos', 'id') AS seq;
    `);

    const sequenceName = seqQuery.rows[0].seq;

    if (sequenceName) {
        await db.query(`ALTER SEQUENCE ${sequenceName} RESTART WITH 1`);
    }
}



// Obtener todos los reclamos
router.get('/', async (req, res) => {
    try {
        await resetIdIfEmpty(); // ← reinicia ID si la tabla está vacía
        const result = await db.query(query.getReclamos);
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al obtener reclamos" });
    }
});

// Obtener un reclamo por ID
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query(query.getReclamoById, [req.params.id]);
        res.json(result.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al obtener reclamo" });
    }
});

// Crear
router.post('/', async (req, res) => {
    const { nombre, descripcion, categoria, email, telefono, nrocompra, sucursal, fotouri, latitud, longitud } = req.body;

    try {
        await resetIdIfEmpty(); 
        const result = await db.query(
            query.createReclamo,
            [nombre, descripcion, categoria, email, telefono, nrocompra, sucursal, fotouri, latitud, longitud]
        );

        res.status(201).json({ id: result.rows[0].id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al crear reclamo" });
    }
});

// Actualizar 
router.put('/:id', async (req, res) => {
    const { nombre, descripcion, categoria, email, telefono, nrocompra, sucursal, fotouri, latitud, longitud } = req.body;

    try {
        await db.query(
            query.updateReclamo,
            [nombre, descripcion, categoria, email, telefono, nrocompra, sucursal, fotouri, latitud, longitud, req.params.id]
        );

        res.json({ mensaje: "Reclamo actualizado" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al actualizar reclamo" });
    }
});

// Eliminar 
router.delete('/:id', async (req, res) => {
    try {
        await db.query(query.deleteReclamo, [req.params.id]);
        res.json({ mensaje: "Reclamo eliminado" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al eliminar reclamo" });
    }
});

module.exports = router;
