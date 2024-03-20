import '../assets/css/TodoItem.css';
import TodoForm from './TodoForm';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FaTrash } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";

export default function TodoItem({ list, updateTodo, deleteTodo, addNewActivity, editTodo, deleteList, markAllCompleted, clearAllActivities }) {
    const handleToggle = (todoId) => {
        updateTodo(todoId);
    };

    const handleDelete = (todoId) => {
        deleteTodo(todoId);
    };

    const handleEditInputChange = (todoId, newText) => {
        editTodo(todoId, newText);
    };

    return (
        <>
            <div className='main'>
                <div className='header'>
                    <div>
                        <h1 className="heading">{list.name}</h1>
                        <p className="description">{list.description}</p>
                    </div>
                    <div className='button-container'>
                        <Button onClick={clearAllActivities}><MdOutlineClear />  Mark All Incomplete</Button>
                        <Button onClick={markAllCompleted}><MdOutlineCheck />  Mark All Completed</Button>
                        <Button className="delList" onClick={(e) => { e.stopPropagation(); deleteList(list.id) }}>Delete List</Button>
                    </div>
                </div>
                {list.activities.map((todo) => (
                    <InputGroup className="mb-2" key={todo.id}>
                        <InputGroup.Checkbox
                            className='checkbox'
                            checked={todo.completed}
                            onChange={() => handleToggle(todo.id)}
                        />
                        <Form.Control
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            className="input"
                            value={todo.text}
                            onChange={(e) => handleEditInputChange(todo.id, e.target.value)}
                        />
                        <>
                            <Button className="trash" onClick={() => handleDelete(todo.id)}><FaTrash /></Button>
                        </>
                    </InputGroup>
                ))}
                <div className='form-container'>
                    <TodoForm addNewActivity={addNewActivity} />
                </div>
            </div>
        </>
    );
}