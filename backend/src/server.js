const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // enable CORS for all URLs
app.use(bodyParser.json()); // parse application/json

let todos = [
  { name: 'Buy apples', completed: true },
  { name: 'Buy milk', completed: false },
];

app.get('/', (req, res) => {
  res.send(todos);
});

app.put('/create', (req, res) => {
  const { name } = req.body;
  todos = [{ name, completed: false }, ...todos];
  res.send(todos);
});

app.post('/toggle', (req, res) => {
  const { index } = req.query;
  const todo = todos[index];
  if (todo === undefined) {
    res.sendStatus(400);
    res.send({ error: 'Invalid todo item index' });
    return;
  } else {
    todos[index] = { ...todo, completed: !todo.completed };
  }
  res.send(todos);
});

// TODO: @Gagan, implement these
// app.delete('/delete', (req, res) => {});
// app.post('/edit-name', (req, res) => {});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
