import './styles/reset.css'
import './styles/style.css'
import * as app from './app.js'
import * as dom from './dom.js'
import * as newTask from './newTask.js'
import * as newProject from './newProject.js'

let projects = [];
export default projects;
projects[0] = app.createProject('Main', 'Your Main Project');

dom.loadProjects();
dom.loadProject(0);
document.querySelector('.newTask').addEventListener('click', newTask.loadModal)
document.querySelector(".toDoAdd form").addEventListener("submit", newTask.addNewTask)
document.querySelector('.newProject').addEventListener('click', newProject.loadModal)
document.querySelector('.taskAdd form').addEventListener('submit', newProject.addNewProject)
document.querySelector('.today').addEventListener('click', dom.loadToday)
