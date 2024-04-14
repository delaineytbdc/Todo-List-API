const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let todos = [];

app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    todos.push(todo);
    res.status(201).send(todo);
});

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).send('Todo not found');
    }
    res.status(200).send(todo);
});

app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).send('Todo not found');
    }
    if (req.body.title) {
        todo.title = req.body.title;
    }
    if (req.body.completed !== undefined) {
        todo.completed = req.body.completed;
    }
    res.status(200).send(todo);
});

app.delete('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).send('Todo not found');
    }
    todos = todos.filter(t => t.id !== todo.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Todo List API server listening at http://localhost:${port}`);
});
