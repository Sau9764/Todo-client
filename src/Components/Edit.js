import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function Edit({ showEdit, handleCloseEdit, handle, editText, change }) {
    return (
        <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className="model_title">Edit Todo Task</span>
                <input 
                    className="edit_text"
                    type="text" 
                    onChange={(e) => handle(e)}
                    value={editText.todo} 
                    id="todo"
                    required
                />
            </Modal.Body>
            <Modal.Footer>
            <Button className="btn btn-secondary wd-100" onClick={handleCloseEdit}>
                Close
            </Button>
            <Button className="btn btn-primary wd-150" onClick={change}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Edit
