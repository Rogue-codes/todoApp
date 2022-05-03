import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { filterTodo } from './redux/slice'
import TodoModal from './TodoModal'

const Header = styled.div`
    width: 100%;
    height: 15vh;
    border: 1px solid #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4%;
    select{
        width: 20%;
        height: 6vh;
        background:#333;
        border-radius: 5px;
        border: none;
        padding-left: 1%;
        color: #fff;
    }
`
const Bttn = styled.button`
    padding: 1% 4%;
    font-size: 1.2vw;
    border-radius: 5px;
    border: none;
    background: #333;
    cursor: pointer;
    color: #fff;
`
function AppHeader({td}) {
    const [openModal, setOpenModal] = useState(false)

    const dispatch = useDispatch()

    const filter = useSelector(state => state.todo.filterStatus)

    const [filterValue, setFilterValue] = useState(filter)


    const click = () => {
        setOpenModal(true);
    }

    const handleFilter = (e) => {
        setFilterValue(e.target.value)
        dispatch(filterTodo(
            e.target.value
        ))
    }

  return (
    <Header>
        <Bttn onClick={click}>Add Task</Bttn>

        <select name="" id="" value={filterValue} onChange={handleFilter}>
            <option value="all">All</option>
            <option value="Incomplete">Incomplete</option>
            <option value="complete">Complete</option>
        </select>
        <TodoModal type="Add" td={td} openModal={openModal} setOpenModal={setOpenModal}/>
    </Header>
  )
}

export default AppHeader