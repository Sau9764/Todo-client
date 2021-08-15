import React from 'react'

function Edit({ editText, change, handleEdit }) {
    return (
        <div>
            <form onSubmit={(e) => change(e)} className='edit-form'>
                <h1>Edit Todo</h1>
                <textarea 
                    className="editTodoInput" 
                    value={editText.text} 
                    type="text"
                    onChange={(e) => handleEdit(e)}
                    id="text"
                    required
                />
                <br />
                <button className="btn">Change</button>
            </form>
            
        </div>
    )
}

export default Edit
