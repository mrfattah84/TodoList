import * as app from './app.js'
import * as dom from './dom.js'
import projects from './index'

export function loadModal() {
    let dialog = document.querySelector('.taskAdd');
    dialog.showModal();
}

export function addNewProject(e) {
    const form = document.querySelector(".taskAdd form");
    const title = e.target.elements[0].value;
    const discription = e.target.elements[1].value;
    form.reset();
    const project = app.createProject(title, discription);
    projects.push(project);
    dom.loadProjects();
}