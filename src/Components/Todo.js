import React from 'react'
import bin from '../images/bin.png'
import edit from '../images/edit.png'

function Todo({ Singletodo, deleteTodo, editTodo }) {
    return (
        <div className="todo">
            {Singletodo.text}
            <img className="bin" src={bin} del-key={Singletodo.id} onClick={deleteTodo} />
            <img className="edit" src={edit} edit-key={Singletodo.id} edit-text={Singletodo.text} onClick={editTodo}/>
        </div>
    )
}

export default Todo
