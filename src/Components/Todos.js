import React from 'react'
import Todo from './Todo'

function Todos({ todos }) {
    return (
        <div className="todoContainer">
            { console.log(todos) }
            {todos.length === 0 ? <> No Records Found..</> : 
                todos.map(todo => {
                    return  <Todo key={todo.id} Singletodo={todo} />
                })}
        </div>
    )
}

export default Todos
