import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'  
import styled from 'styled-components'
import Check from './Check'
import { deleteTodo, updateTodo } from './redux/slice'
import TodoModal from './TodoModal'
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'

const List = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2%;
    border: 1px solid lightgrey;
    background: lightgrey;
    margin-top: 2%;
    transition: all .5s linear;
    .underline{
      text-decoration: line-through;
    }
    .ops{
      display: flex;
      justify-content: space-between;
      width: 10%;
    }
`
function TodoList({td}) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [check, setCheck] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(td.status === 'complete'){
      setCheck(true)
    }else{ setCheck(false) }
  },[td.status])

  const handleDelete = () => {
    console.log('deleting')
    dispatch(deleteTodo(
      td.id
    ))
  }
  const handleEdit = () => {
    setEditModalOpen(true)
    console.log('editing')
  }

  const handleCheck = () => {
    setCheck(!check)
    dispatch(updateTodo({
      ...td, 
      status: check ? 'Incomplete' : 'complete' 
    }))
  }
  return (
    <>
      <List>
        <Check check={check} handleCheck={handleCheck} />
          <p className={td.status === 'complete' ? 'underline' : null}>{td.task}</p>
          <p>{td.status}</p>
          <p>{td.time}</p>
          <div className="ops">
            <button onClick={handleDelete}><AiFillDelete size='1.2rem'/></button>
            <button onClick={handleEdit}><AiFillEdit size='1.2rem'/></button>
          </div>
      </List>
      <TodoModal type = 'update' td={td}  openModal={editModalOpen} setOpenModal={setEditModalOpen}/>
    </>
  )
}

export default TodoList