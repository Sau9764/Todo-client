import React, { useContext } from 'react'
import bin from '../images/bin.png'
import edit from '../images/edit.png'
import { DashboardContext } from './App'
import Edit from './Edit'


function Todo({ Singletodo }) {

    const { 
        deleteTodo,  
        editText, 
        setEditText, 
        change,
        showEdit, 
        handleShowEdit,
        handleCloseEdit
    } = useContext(DashboardContext)
    
    function handle(e) { 
        const newData = {...editText}
        newData[e.target.id] = e.target.value
        setEditText(newData)
    }
    
    return (
        <div className="todo">
            <div className="todoText">{Singletodo.todo}</div>
            <div className="createdAtText">{Singletodo.completed}</div>
            <img className="bin" alt="bin logo" src={bin} del-key={Singletodo.id} onClick={deleteTodo} />
            <img className="edit" alt="edit logo" src={edit} edit-key={Singletodo.id} edit-text={Singletodo.todo} onClick={handleShowEdit}/>

            <Edit 
                showEdit={showEdit}
                handleCloseEdit={handleCloseEdit}
                handle={handle}
                editText={editText}
                change={change}
            />

        </div>
    )
}

export default Todo