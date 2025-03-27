import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Backend funcionando');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});