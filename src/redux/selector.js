export const todoListSelector = (state) => {
    const searchText = searchTextSelector(state)
    const priority = prioritySelector(state)
    const status = statusSelector(state)
    let completed
    if(status === 'Completed'){
        completed = true
    } else if(status === 'Todo'){
        completed = false
    }
    const todoRemaining = state.todoList.todos.filter((todo) => {
        if(priority.length === 0){
            if(status === 'All'){
                return todo.name.includes(searchText) 
            } else {
                return todo.name.includes(searchText) && (todo.completed === completed)
            }
        } else {
            if(status === 'All'){
                return todo.name.includes(searchText) && 
                (todo.priority === priority.find(priority => priority === todo.priority))
            } else {
                return todo.name.includes(searchText) && 
                (todo.priority === priority.find(priority => priority === todo.priority)) &&
                (todo.completed === completed)
            }
        }
    })
    return todoRemaining
}

export const searchTextSelector = (state) => state.filters.search

export const prioritySelector = (state) => state.filters.priority

export const statusSelector = (state) => state.filters.status