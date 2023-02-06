import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit"

const todosSlice = createSlice({
    name: 'todoList',
    initialState: { status: "idle", todos: []},
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        toggleTodoStatus: (state, action) => {
            const currentTodo = state.filter(todo => todo.id === action.payload)
            console.log(currentTodo)
            currentTodo.completed = !currentTodo.completed
        }
    },
    extraReducers: builder => {
    builder.addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
    }).addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
    }).addCase(addNewTodo.fulfilled, (state, action) => {
        state.status ="idle";
        state.todos.push(action.payload);
    }).addCase(updateTodo.pending, (state, action) => {
        state.status ="pending";
    }).addCase(updateTodo.fulfilled, (state, action) => {
        state.status ="idle";
        let currentTodo = state.todos.find(todo => todo.id === action.payload);
        currentTodo = action.payload;

    })
    }
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async() => {
 const res = await fetch('/api/todos');
 const data = await res.json();
 return data.todos; 
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async(newTodo) => {
    const res = await fetch('/api/add-todo', {
    method: "POST",
    body: JSON.stringify(newTodo)
 })
 const data = await res.json();
 return data.todos;

})

export const updateTodo = createAsyncThunk('todos/updateTodo', async(updateTodo) => {
    const res =  await fetch('/api/updateTodo', {
        method: "POST",
        body: JSON.stringify(updateTodo)
    })
    const data = await res.json();
    console.log(data.todos)
    return data.todos;
})
export default todosSlice
