const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';


app.get('/todos', async (req, res) => {
  try {
    const response = await axios.get(TODOS_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching todos');
  }
});


app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${TODOS_URL}/${id}`);
    res.json({ title: response.data.title });
  } catch (error) {
    res.status(500).send('Error fetching todo by ID');
  }
});


app.get('/todos/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const response = await axios.get(TODOS_URL);
    const filteredTodos = response.data.filter(todo => todo.title.includes(title));
    res.json(filteredTodos);
  } catch (error) {
    res.status(500).send('Error fetching todos by title');
  }
});

app.get('/todos/limit/5', async (req, res) => {
  try {
    const response = await axios.get(TODOS_URL);
    res.json(response.data.slice(0, 5));
  } catch (error) {
    res.status(500).send('Error fetching limited todos');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
