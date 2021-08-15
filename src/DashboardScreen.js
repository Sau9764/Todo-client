import React from 'react'
import plus from './images/plus.png'
import Edit from './Components/Edit'
import AddTodo from './Components/AddTodo'
import Todos from './Components/Todos'

function DashboardScreen({isEditTodo, editText, change, handleEdit, addTodo, Add, newText, handleAdd, addToggle, logout, todos, deleteTodo, editTodo}) {
    return (
        <div className="todosList">
            {
            isEditTodo ? 
                <Edit editText={editText} change={change} handleEdit={handleEdit} /> 
            : 
                addTodo ? <AddTodo Add={Add} newText={newText} handleAdd={handleAdd} />
                :
                <div>
                    <div>
                        <h1>Todo Tasks </h1>
                    </div>
                    <div className="addTodoContainer" onClick={addToggle}>
                        <div className="add">
                        <img src={plus} className="addTodo" />
                        <label> Add Todo </label>
                        </div>
                        <label className="logout" onClick={logout}> Logout </label>
                    </div>
                    <hr />
                    <Todos className="todoContainer" todos={todos} deleteTodo={deleteTodo} editTodo={editTodo}/>
                </div>
            }
        </div>
    )
}

export default DashboardScreen
