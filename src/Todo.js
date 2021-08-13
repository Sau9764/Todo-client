import React from 'react'
import bin from './bin.png'
import edit from './edit.png'

function Todo({ todo }) {
    return (
        <div className="todo">
            {todo.text}
            <img className="bin" src={bin} />
            <img className="edit" src={edit} />
        </div>
    )
}

export default Todo
