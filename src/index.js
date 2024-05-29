import './styles/reset.css'
import './styles/style.css'
import * as app from './app.js'
import * as dom from './dom.js'
import * as newTask from './newTask.js'
import * as newProject from './newProject.js'
let projects = [];
export default projects;
projects[0] = app.createProject('Main', 'Your Main Project');


const do1 = app.createToDo('Date', 'somewhere nice', new Date(2025,2,11), 0, 0);
projects[0].addTodo(do1);
projects[0].addTodo(do1);
projects[0].addTodo(do1);
console.log(projects);


dom.loadProjects();
document.querySelector('.newTask').addEventListener('click', newTask.loadModal)
document.querySelector(".toDoAdd form").addEventListener("submit", newTask.addNewTask)
document.querySelector('.newProject').addEventListener('click', newProject.loadModal)
document.querySelector('.taskAdd form').addEventListener('submit', newProject.addNewProject)