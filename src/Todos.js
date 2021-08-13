import React from 'react'
import Todo from './Todo'

function Todos({ todos, deleteTodo, editTodo }) {
    return (
        todos.length === 0 ? <> No Records Found..</> : 
            todos.map(todo => {
                return  <Todo key={todo.id} Singletodo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />
            })
    )
}

export default Todos
