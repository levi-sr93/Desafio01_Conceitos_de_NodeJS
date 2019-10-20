const express = require('express');

const server = express();

server.use(express.json());

let numberOfRequests = 0;
const projects = [];


function checkProjectExists ( req, res, next){
    const {id} = req.params;
    const project = projects.find(p => p.id == id);
    
    if(!project){
        return res.status(400).json({error: "The project with" + 
            "this ID does not exists"});
    }

    return next();
}

server.use((req, res, next)=> {
    numberOfRequests++;
    console.log(`Number of requests: ${numberOfRequests}`);
    next();
})


server.post('/projects', (req, res) => {
    const { id } = req.body;
    const { title } = req.body;

    project = {
        id,
        title,
        tasks: []
    }

    projects.push(project);

    return res.json(project);
})

server.get('/projects', (req, res) => {
    return res.json(projects);
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);
        
    project.title = title;
    return res.json(project);
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const projectId = projects.findIndex(p => p.id == id);

    projects.splice(projectId, 1);
    return res.send();
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find( p => p.id == id);

    project.tasks.push(title);

    return res.send();
})

server.listen(3333);