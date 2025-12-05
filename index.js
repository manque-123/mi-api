const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Manejo de errores de JSON inválido
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ error: "JSON inválido" });
    }
    next();
});

// middleware de autenticación
const auth = require("./middleware/auth");

// rutas
const loginRoutes = require("./routes/login");
const reclamosRoutes = require("./routes/reclamos");
const ubicacionRoutes = require("./routes/ubicacion");

// Rutas principales
app.use("/login", loginRoutes);
app.use("/reclamos", auth, reclamosRoutes); // ← ruta protegida con token
app.use("/ubicacion", ubicacionRoutes);

// Ruta base
app.get("/", (req, res) => {
    res.send("API de Reclamos corriendo correctamente.");
});

// Railway usa process.env.PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
