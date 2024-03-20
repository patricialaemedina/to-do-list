import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/TodoList.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function AddList({ setNewListName, handleAddList, error, showModal, handleCloseModal, newListName, newListDescription, setNewListDescription }) {
    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="newListName">
                            <Form.Label>List Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter list name"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="newListDescription">
                            <Form.Label>List Description</Form.Label>
                            <Form.Control
                                required
                                as="textarea"
                                rows={3}
                                placeholder="Enter list description"
                                value={newListDescription}
                                onChange={(e) => setNewListDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    {error && <div className="text-danger">{error}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='cancel' onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button className='dlt' onClick={handleAddList}>
                        Add List
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}