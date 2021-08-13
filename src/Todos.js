import React, { useLayoutEffect } from 'react'
import Todo from './Todo'

function Todos({ todos }) {
    return (
       todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} />
       })
    )
}

export default Todos
