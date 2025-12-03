const express = require('express');
const cors = require('cors');
require('dotenv').config();

const auth = require('./middleware/auth');
const loginRoutes = require('./routes/login');
const reclamosRoutes = require('./routes/reclamos');
const ubicacionRoutes = require('./routes/ubicacion');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/reclamos', auth, reclamosRoutes);
app.use('/ubicacion', ubicacionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
