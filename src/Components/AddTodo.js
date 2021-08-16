import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function AddTodo({ showAdd, handleCloseAdd, handle, Add }) {
    return (
        <Modal show={showAdd} onHide={handleCloseAdd}>
            <Modal.Header closeButton>
            <Modal.Title>Add Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className="model_title">Add Todo Task</span>
                <input 
                    className="edit_text"
                    type="text" 
                    onChange={(e) => handle(e)} 
                    id="text"
                    required
                />
            </Modal.Body>
            <Modal.Footer>
            <Button className="btn btn-secondary wd-100" onClick={handleCloseAdd}>
                Close
            </Button>
            <Button className="btn btn-primary wd-150" onClick={Add}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddTodo
