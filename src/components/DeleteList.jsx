import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/TodoList.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteList({ deleteConfirmationId, confirmDeleteList, setDeleteConfirmationId }) {
    return (
        <>
            <Modal show={deleteConfirmationId !== null} onHide={() => setDeleteConfirmationId(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this list?
                </Modal.Body>
                <Modal.Footer>
                    <Button className='cancel' onClick={() => setDeleteConfirmationId(null)}>
                        Cancel
                    </Button>
                    <Button className='dlt' onClick={confirmDeleteList}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}