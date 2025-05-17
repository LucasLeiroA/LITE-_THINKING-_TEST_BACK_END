const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const productRoutes = require('./routes/productRoutes');
const emailRoutes = require('./routes/emailRoutes');
const aiRoutes = require('./routes/aiRoutes');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', companyRoutes);
app.use('/api', productRoutes);
app.use('/api', emailRoutes);
app.use('/api', aiRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
