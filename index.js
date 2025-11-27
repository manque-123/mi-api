const express = require('express');
const cors = require('cors');
const reclamosRoutes = require('./routes/reclamos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/reclamos', reclamosRoutes);

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log('Servidor corriendo en puerto', process.env.PORT || 3000);
});
