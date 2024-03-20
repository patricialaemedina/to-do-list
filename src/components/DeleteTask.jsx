import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/TodoList.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteTask({ deleteConfirmationTaskId, confirmDeleteTodo, setDeleteConfirmationTaskId }) {
    return (
        <>
            <Modal show={deleteConfirmationTaskId !== null} onHide={() => setDeleteConfirmationTaskId(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this task?
                </Modal.Body>
                <Modal.Footer>
                    <Button className='cancel' onClick={() => setDeleteConfirmationTaskId(null)}>
                        Cancel
                    </Button>
                    <Button className='dlt' onClick={confirmDeleteTodo}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}