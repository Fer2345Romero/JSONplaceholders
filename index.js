const express = require('express');
const axios = require('axios');

const app = express();
const PUERTO = 3000;

app.use(express.json());

app.get('/usuarios', async (req, res) => {
  try {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.json(respuesta.data);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.post('/usuarios', async (req, res) => {
  try {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/users', req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error('Error al crear el usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, req.body);
    res.json(data);
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    res.sendStatus(204);
  } catch (error) {
    console.error(`Error al borrar el usuario con ID ${id}:`, error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(PUERTO, () => {
  console.log(`Servidor API en ejecución en http://localhost:${PUERTO}`);
});
