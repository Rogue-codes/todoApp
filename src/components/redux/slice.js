import { createSlice } from "@reduxjs/toolkit"

const getInitialValue = () => {
    const localTodo = localStorage.getItem('todo')
    if(localTodo){
       return JSON.parse(localTodo)
    }
    localStorage.setItem('todo', JSON.stringify([]))
    return []
}

const initialValue = {
    filterStatus : 'all',
    todoList: getInitialValue(),
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState : initialValue,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload)

            const todoList = localStorage.getItem('todo')
            if(todoList) {
                const todoListArr = JSON.parse(todoList)
                todoListArr.push({
                    ...action.payload,
                })
                localStorage.setItem('todo', JSON.stringify(todoListArr))
            } else{
                localStorage.setItem('todo',
                JSON.stringify([{...action.payload}])
                )
            }
        },
        deleteTodo : (state, action) => {
            const todoList = localStorage.getItem('todo')
            if(todoList){
                const todoListArr = JSON.parse(todoList)
                todoListArr.forEach((td, index) =>{
                    if(td.id === action.payload){
                        todoListArr.splice(index, 1)
                    }
                })
                localStorage.setItem('todo',
                JSON.stringify(todoListArr)
                )
                state.todoList = todoListArr
            }
        },
        updateTodo : (state, action) => {
            const todoList = localStorage.getItem('todo')
            if(todoList) {
                const todoListArr = JSON.parse(todoList)

                todoListArr.forEach((td, index) => {
                    if(td.id === action.payload.id){
                        td.task = action.payload.task
                        td.status = action.payload.status
                    }
                })
                localStorage.setItem('todo', JSON.stringify(todoListArr))
                state.todoList = todoListArr
            }
        },
        filterTodo: (state, action) => {
            state.filterStatus = action.payload
        }
    }
})

export const {addTodo, deleteTodo, updateTodo, filterTodo} = todoSlice.actions

export default todoSlice.reducer