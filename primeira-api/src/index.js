const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const projects = [];

// exemplo de Middleware 1
function logRoutes1(request, response, next) {
    const { method, url } = request;
    const route = `Middleware 1 - [${method.toUpperCase()}] ${url}`;

    console.log(route);
    return next();
}

// exemplo de Middleware 2
function logRoutes2(_, _, next) {
    const text = `Middleware 2 - logRoutes2`;

    console.log(text);
    return next();
}

// Ativa o Middleware para ser utilizado em todas as rotas da api
app.use(logRoutes1);

app.get('/projects', (request, response) => {
    const { title } = request.query;

    const results = title 
        ? projects.filter(proj => proj.title.includes(title))
        : projects;

    return response.json(results);
});

app.post('/projects', logRoutes2, (request, response) => {
    const { title, owner } = request.body;
    const id = uuidv4();
    const project = {
        id,
        owner,
        title 
    };

    projects.push(project);
    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;
    const projectIndex = projects.findIndex(proj => proj.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.'});
    }

    const project = {
        id,
        owner,
        title 
    };

    projects[projectIndex] = project;
    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(proj => proj.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.'});
    }

    projects.splice(projectIndex, 1);
    return response.status(204).json([]);
});

app.listen(3333, () => {
    console.log('Backend started! 🔥');
});