import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { addTodo, updateTodo } from './redux/slice'
import {v4 as uuid} from 'uuid'
import {useDispatch} from 'react-redux'
import toast from 'react-hot-toast'
import {ImCancelCircle} from 'react-icons/im'

const Pop = styled.form`
    width: 30%;
    position: relative;
    height: 40vh;
    background-color: #070606;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 30;
    gap: 10%;
    input{
        width: 80%;
        height: 6vh;
        padding-left: 2%;
        border-radius: 5px;
        border: none;
        &:focus{
            outline: none;
        }
    }
    .sel{
        width: 80%;
        height: 6vh;
        background: white;
        color: black;
    }
    .close{
        position: absolute;
        top: -12%;
        left: 95%;
        cursor: pointer;
    }
`
const Bts = styled.div`
    width: 80%;
    height: auto;
    display: flex;
    gap: 15%;
    button {
        padding: 2% 5%;
        font-size: 1.2vw;
        border: none;
        border-radius: 5px;
    }
`
function TodoModal({ type, openModal, setOpenModal, td}) {
    const [task,setTask] = useState('')
    const [status,setStatus] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (type === 'update' && td) {
          setTask(td.task);
          setStatus(td.status);
        } else {
          setTask('');
          setStatus('');
        }
    }, [type, td, openModal]);


    const closeModal = (e) => {
        e.preventDefault();
        setOpenModal(false);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(task,status)
        if(type === 'Add'){
            if(task !== '' || status !== ''){
                dispatch(addTodo({
                    id: uuid(),
                    task,
                    status,
                    time :  new Date().toLocaleString()
                }))
                toast.success('Task has been added')
            }else{
                toast.error('Task and status are not specified')
                return
            }
            // setTask('')
            // setStatus('')
            setOpenModal(false)
        }


        if(type==='update'){
            if(td.task !== task   || td.status !== status  )
            dispatch(updateTodo({
                ...td, task, status             
            }))
            toast.success('task updated')
        }

        setOpenModal(false);
    }
  return (
    <div className={openModal ? "shadow" : 'shadow none'}>

        <Pop onSubmit={handleFormSubmit}>
            <ImCancelCircle className='close' onClick={closeModal} size="1.5rem" color="white" />
            <input type="text" value={task} onChange={(e)=>setTask(e.target.value)} name="" id="" placeholder="enter task" />

            <select className='sel'  value={status} onChange={(e)=>setStatus(e.target.value)} name="" id="">
                <option value="">--select status--</option>
                <option value="Incomplete">Incomplete</option>
                <option value="complete">Complete</option>
            </select>

            <Bts>
                <button type="submit">
                    {type === 'update' ? 'update' : 'Add '}Task
                </button>

                <button onClick={closeModal}>
                    Cancel
                </button>
            </Bts>
        </Pop>
        
    </div>
  )
}

export default TodoModal