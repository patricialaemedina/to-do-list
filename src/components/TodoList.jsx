import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/TodoList.css';
import TodoItem from "./TodoItem";
import DeleteList from './DeleteList';
import DeleteTask from './DeleteTask';
import AddList from './AddList';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdFiberNew } from "react-icons/md";
import { TbMoodEmpty } from "react-icons/tb";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem('todos'));
    if (!data) return [];
    return data;
}

export default function TodoList() {
    const [selectedList, setSelectedList] = useState(null);
    const [data, setData] = useState(getInitialData);
    const [showModal, setShowModal] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [newListDescription, setNewListDescription] = useState('');
    const [error, setError] = useState('');
    const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
    const [deleteConfirmationTaskId, setDeleteConfirmationTaskId] = useState(null);

    useEffect(() => {
        localStorage.setItem(
            'todos',
            JSON.stringify(data)
        )
    }, [data]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setError('');
    };

    const handleAddList = () => {
        if (!newListName.trim() || !newListDescription.trim()) {
            setError('Please fill out all fields.');
            return;
        }

        const now = new Date();
        const createdAt = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

        const newList = {
            id: uuidv4(),
            name: newListName,
            description: newListDescription,
            createdAt: createdAt,
            activities: []
        };
        const updatedData = [...data, newList];
        setData(updatedData);
        setNewListName('');
        setNewListDescription('');
        setError('');
        handleCloseModal();
    };

    const updateTodo = (todoId) => {
        const updatedData = data.map(list => ({
            ...list,
            activities: list.activities.map(todo => {
                if (todo.id === todoId) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        }));
        setData(updatedData);
    };

    const deleteTodo = (todoId) => {
        setDeleteConfirmationTaskId(todoId);
    };

    const confirmDeleteTodo = () => {
        const updatedData = data.map(list => ({
            ...list,
            activities: list.activities.filter(todo => todo.id !== deleteConfirmationTaskId)
        }));
        setData(updatedData);
        setDeleteConfirmationTaskId(null);
    };

    const addNewActivity = (text) => {
        const newActivity = {
            id: uuidv4(),
            text: text,
            completed: false,
            isEditing: false
        };
        const updatedData = data.map(list => {
            if (list.id === selectedList) {
                return { ...list, activities: [...list.activities, newActivity] };
            }
            return list;
        });
        setData(updatedData);
    };

    const editTodo = (todoId, newText) => {
        const updatedData = data.map(list => ({
            ...list,
            activities: list.activities.map(todo => {
                if (todo.id === todoId) {
                    return { ...todo, text: newText, isEditing: !todo.isEditing };
                }
                return todo;
            })
        }));
        setData(updatedData);
    };

    const deleteList = (listId) => {
        setDeleteConfirmationId(listId);
    };

    const confirmDeleteList = () => {
        const updatedData = data.filter(list => list.id !== deleteConfirmationId);
        setData(updatedData);
        setSelectedList(null);
        setDeleteConfirmationId(null);
    };

    const clearAllActivities = () => {
        const updatedData = data.map(list => ({
            ...list,
            activities: list.activities.map(todo => ({
                ...todo,
                completed: false
            }))
        }));
        setData(updatedData);
    };

    const markAllCompleted = () => {
        const updatedData = data.map(list => ({
            ...list,
            activities: list.activities.map(todo => ({
                ...todo,
                completed: true
            }))
        }));
        setData(updatedData);
    };

    return (
        <>
            <Row className="row">
                <Col sm={4} className="lists-col">
                    <div className="header-container">
                        <h1 className="h1">Lists</h1>
                        <MdFiberNew className="addNewList" onClick={handleShowModal} />
                    </div>
                    {data.length > 0 ? (
                        <ListGroup as="ol" style={{ height: '100%' }}>
                            {data.map(list => (
                                <ListGroup.Item
                                    as="li"
                                    className={`taskLists d-flex justify-content-between align-items-start ${selectedList === list.id ? 'active' : ''}`}
                                    style={{ cursor: 'pointer' }}
                                    key={list.id}
                                    onClick={() => setSelectedList(list.id)}
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{list.name}</div>
                                        {list.description}
                                        <div> Created: {list.createdAt}</div>
                                    </div>
                                    <Badge bg="primary" pill>
                                        {list.activities.filter(activity => !activity.completed).length}
                                    </Badge>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="empty">No list created.</p>
                    )}
                </Col>
                <Col className='currentList' sm={8}>
                    {selectedList ? (
                        <>
                            <TodoItem
                                list={data.find(list => list.id === selectedList)}
                                updateTodo={updateTodo}
                                deleteTodo={deleteTodo}
                                addNewActivity={addNewActivity}
                                editTodo={editTodo}
                                deleteList={deleteList}
                                clearAllActivities={clearAllActivities}
                                markAllCompleted={markAllCompleted}
                            />
                        </>
                    ) : (
                        <div className='empty-list'>
                            <TbMoodEmpty className="mood" />
                            <p>No list selected.</p>
                            <Button className='createNewList' onClick={handleShowModal}>CREATE NEW LIST</Button>
                        </div>
                    )}
                </Col>
            </Row >
            <AddList setNewListName={setNewListName} handleAddList={handleAddList} error={error} showModal={showModal} handleCloseModal={handleCloseModal} setNewListDescription={setNewListDescription} newListName={newListName} newListDescription={newListDescription} />
            <DeleteList deleteConfirmationId={deleteConfirmationId} confirmDeleteList={confirmDeleteList} setDeleteConfirmationId={setDeleteConfirmationId} />
            <DeleteTask deleteConfirmationTaskId={deleteConfirmationTaskId} confirmDeleteTodo={confirmDeleteTodo} setDeleteConfirmationTaskId={setDeleteConfirmationTaskId} />
        </>
    );
}
