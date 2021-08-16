import React, { useContext } from 'react'
import plus from '../images/plus.png'
import Todos from './Todos'
import { DashboardContext } from './App'
import AddTodo from './AddTodo'

function DashboardScreen() {

    const {
        showAdd,
        handleCloseAdd,
        handleShowAdd,
        logout,
        todos,
        Add,
        setnewText
    } = useContext(DashboardContext)

    function handle(e) { 
        setnewText(e.target.value)
    }
    
    return (
        
        <div className="todosList">
            <h1 className="Dashboard_title">Todo Tasks </h1>
            <div className="addTodoContainer" >
                <div className="add" onClick={handleShowAdd}>
                    <img src={plus} className="addTodo" />
                    <label> Add Todo </label>
                </div>
                <label className="logout" onClick={logout}> Logout </label>
            </div>

            <Todos className="todoContainer" todos={todos}/>

            <AddTodo 
                showAdd={showAdd}
                handleCloseAdd={handleCloseAdd}
                handle={handle}
                Add={Add}
            />
        </div>
    )
}

export default DashboardScreen
