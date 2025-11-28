const express = require('express');
const cors = require('cors');
require('dotenv').config();

const reclamosRoutes = require('./routes/reclamos'); 

const app = express();

app.use(cors());
app.use(express.json());


app.use('/reclamos', reclamosRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
