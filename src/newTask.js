import { v4 as uuidv4 } from 'uuid';
import * as app from './app.js'
import * as dom from './dom.js'
import projects from './index'


export function loadModal() {
    const dialog = document.querySelector('.toDoAdd');
    const form = document.querySelector(".toDoAdd form");
    const projs = form.querySelector('#project');
    projs.innerHTML = '<option value="0" selected>Main</option>'
    for (let i = 1; i < projects.length; i++) {
        const p = projects[i];
        projs.innerHTML += `
        <option value="${i}">${p.title}</option>`;
    }
    dialog.showModal();
};

export function addNewTask(e){
    const form = document.querySelector(".toDoAdd form");
    const title = e.target.elements[0].value;
    const discription = e.target.elements[1].value;
    const due = e.target.elements[2].value;
    const priority = e.target.elements[3].value;
    const project = e.target.elements[4].value;
    form.reset();
    if (dom.id == 0) {
        const task = app.createToDo(title,discription,new Date(due),0,priority)
        projects[project].addTodo(uuidv4(), task);
    } else {
        const task = app.createToDo(title,discription,new Date(due),0,priority)
        projects[project].addTodo(dom.id, task);
    }
    dom.loadProjects()
    dom.loadProject(project)
    dom.idReset();
}