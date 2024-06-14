import { format, formatDistance, formatRelative, addDays } from 'date-fns'
import projects from './index'
import * as newTask from './newTask'

export let id = 0;

export function idReset() {
    id = 0;
}

export function loadProjects(){
    const projectsContainer = document.querySelector('.projects');
    projectsContainer.innerHTML =  '';
    let i = 0;
    projects.forEach(project => {
        const title = project.title;
        const discription = project.discription;
        projectsContainer.innerHTML += `
        <div class="project" id="${i}" title="${discription}">
            <i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z" /></svg></i>
            <div class="pName">${title}</div>
            <div class="doCount">${countDos(project.toDo)}</div>
        </div>`;
        i++;
    });
    projectsContainer.querySelectorAll('.project').forEach(p => p.addEventListener('click', loadProject));
}

export function loadProject(i){
    try {
        i = i.currentTarget.id;
    } catch (error) {
        i = i;
    }

    document.querySelector('.container .pName').innerHTML = projects[i].title;

    const toDoContainer = document.querySelector('.toDoContainer');
    toDoContainer.innerHTML = '';

    const todos = Object.fromEntries(Object.entries(projects[i].toDo).sort(([,a],[,b]) => b.priority-a.priority));
    for (const key in todos) {
        if (todos.hasOwnProperty(key)) {
          const Do = todos[key];
          if (Do.status == 0 && Do.due >= new Date()) {
            toDoContainer.innerHTML += `
            <div class="toDoCard" title="${Do.note}" id="${key}">
                <input type="checkbox" name="${key}" id="${key}">
                <div class="info">
                    <div class="title">${Do.title}</div>
                    <div class="due">${formatDistance(Do.due, new Date(), { addSuffix: true })}</div>
                </div>
            </div>`;
          }
        }
    }
    toDoContainer.querySelectorAll('.info').forEach(p => p.addEventListener('click', e => {editDo(e, i)}));
    toDoContainer.querySelectorAll('.toDoCard input').forEach(p => p.addEventListener('click', e => {checkDo(i, e.target.id)}));
}

function editDo(e, i){
    id = e.currentTarget.parentElement.id;
    newTask.loadModal()
    const form = document.querySelector('.toDoAdd form');
    const formElements = form.querySelectorAll('input');
    const formselects = form.querySelectorAll('select')
    formElements[0].value = projects[i].toDo[id].title;
    formElements[1].value = projects[i].toDo[id].note;
    formElements[2].value = projects[i].toDo[id].due.toISOString().split('T')[0];
    formselects[0].value = projects[i].toDo[id].priority;
    formselects[1].value = i;
}

function checkDo(i, id) {
    projects[i].toDo[id].status = 1;
    loadProjects();
    loadProject(i);
}

function countDos(dos) {
    let i = 0;
    Object.keys(dos).forEach(key => {
        if (dos[key].status == 0 && dos[key].due >= new Date()) {
            i++;
        }
    })
    return i
}

export function loadToday() {
    document.querySelector('.container .pName').innerHTML = 'Today';
    const toDoContainer = document.querySelector('.toDoContainer');
    toDoContainer.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        const todos = Object.fromEntries(Object.entries(projects[i].toDo).sort(([,a],[,b]) => b.priority-a.priority));
        for (const key in todos) {
            if (todos.hasOwnProperty(key)) {
              const Do = todos[key];
              if (Do.status == 0 && Do.due >= new Date()) {
                if (Do.due <= addDays(new Date(), 1)) {
                    const element = document.createElement('div');
                    element.innerHTML = `
                        <input type="checkbox" name="${key}" id="${key}">
                        <div class="info">
                            <div class="title">${Do.title}</div>
                            <div class="due">${formatDistance(Do.due, new Date(), { addSuffix: true })}</div>
                        </div>`;
                    element.classList.add("toDoCard");
                    element.setAttribute('title', Do.note);
                    element.setAttribute('id', key);
                    element.querySelector('.info').addEventListener('click', e => {editDo(e, i)});
                    element.querySelector('input').addEventListener('click', e => {checkDo(i, e.target.id)});
                    toDoContainer.appendChild(element);
                }
              }
            }
        }
    }
}