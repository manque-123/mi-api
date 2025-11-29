module.exports = {
    createReclamo: `
        INSERT INTO reclamos
        (nombre, descripcion, categoria, email, telefono, nrocompra, sucursal, fotouri, latitud, longitud)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING id
    `,

    getReclamos: `SELECT * FROM reclamos`,
    getReclamoById: `SELECT * FROM reclamos WHERE id=$1`,

    updateReclamo: `
        UPDATE reclamos SET
        nombre=$1, descripcion=$2, categoria=$3, email=$4, telefono=$5,
        nrocompra=$6, sucursal=$7, fotouri=$8, latitud=$9, longitud=$10
        WHERE id=$11
    `,

    deleteReclamo: `DELETE FROM reclamos WHERE id=$1`
};
