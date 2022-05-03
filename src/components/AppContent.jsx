import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import TodoList from './TodoList'

const Content = styled.div`
    width: 70%;
    margin: auto;
    height: auto;
`
function AppContent() {
    const todoList = useSelector((state)=>state.todo.todoList)
    const filterTodo = useSelector((state)=>state.todo.filterStatus)

    const sortedTodoList = [...todoList]

    sortedTodoList.sort((a,b)=> new Date(b.time) - new Date(a.time))

    const filterTodoList = sortedTodoList.filter((item)=>{
      if(filterTodo === 'all'){
        return true
      }
      return item.status === filterTodo
    } )

    
    console.log(todoList)
  return (
    <Content>
        {
            filterTodoList && filterTodoList.length > 0 ?
            filterTodoList.map((td) =>  <TodoList key={td.id} td={td} task={td.task} status={td.status} id={td.id} time={td.time} />)
             : ('no todo found')
        }
    </Content>
  )
}

export default AppContent