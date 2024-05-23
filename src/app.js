import { v4 as uuidv4 } from 'uuid';

function createToDo(title,note,due,status,checkList,Priority) {
    return {
        title,
        note,
        due,
        status,
        checkList,
        Priority
    }
}

function createProject(title,discription,due) {
    return{
        title,
        discription,
        due,
        toDo : {},
        addTodo(toDo){
            this.toDo[uuidv4()] = toDo;
        }
    }
}

let projects = [];

projects[0] = createProject('her', 'it would be legen-dery',new Date());
const do1 = createToDo('Date', 'somewhere nice', new Date(), 0, {}, 0);

projects[0].addTodo(do1);
console.log(projects);