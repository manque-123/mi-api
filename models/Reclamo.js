module.exports = {
    createReclamo: `
        INSERT INTO reclamos
        (nombre, descripcion, categoria, email, telefono, nroCompra, sucursal, fotoUri, latitud, longitud)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,

    getReclamos: `
        SELECT * FROM reclamos
    `,

    getReclamoById: `
        SELECT * FROM reclamos WHERE id = ?
    `,

    updateReclamo: `
        UPDATE reclamos SET
        nombre = ?, descripcion = ?, categoria = ?, email = ?, telefono = ?,
        nroCompra = ?, sucursal = ?, fotoUri = ?, latitud = ?, longitud = ?
        WHERE id = ?
    `,

    deleteReclamo: `
        DELETE FROM reclamos WHERE id = ?
    `
};
