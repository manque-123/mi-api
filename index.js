const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Log para debug
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} BODY =>`, req.body);
    next();
});

// Rutas y auth
const auth = require("./middleware/auth");
const loginRoutes = require("./routes/login");
const reclamosRoutes = require("./routes/reclamos");
const ubicacionRoutes = require("./routes/ubicacion");

// Registrar rutas
app.use("/login", loginRoutes);
app.use("/reclamos", auth, reclamosRoutes);
app.use("/ubicacion", ubicacionRoutes);

// Ruta base
app.get("/", (req, res) => {
    res.send("API de Reclamos funcionando correctamente.");
});



const port = process.env.PORT && process.env.PORT !== "8080"
    ? process.env.PORT
    : 3000; 

app.listen(port, () => {
    console.log(`🔥 Servidor corriendo en puerto real: ${port}`);
});
