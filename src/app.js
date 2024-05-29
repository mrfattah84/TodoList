import { v4 as uuidv4 } from 'uuid';

export function createToDo(title,note,due,status,priority) {
    return {
        title,
        note,
        due,
        status,
        priority
    }
}

export function createProject(title,discription) {
    return{
        title,
        discription,
        toDo : {},
        addTodo(toDo){
            this.toDo[uuidv4()] = toDo;
        }
    }
}