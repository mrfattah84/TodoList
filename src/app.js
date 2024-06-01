
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
        addTodo(id, toDo){
            this.toDo[id] = toDo;
        }
    }
}