import React from 'react'

function AddTodo({ Add, newText, handleAdd }) {
    return (
        <div>
            <form onSubmit={(e) => Add(e)} className='add-form'>
                <h1>Add Todo</h1>
                <textarea 
                    className="editTodoInput" 
                    value={newText} 
                    type="text"
                    onChange={(e) => handleAdd(e)}
                    id="text"
                    required
                />
                <br />
                <button className="btn">Add</button>
            </form>
            
        </div>
    )
}

export default AddTodo
