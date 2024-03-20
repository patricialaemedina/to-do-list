import '../assets/css/TodoForm.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function TodoForm({ addNewActivity }) {
    const [text, setText] = useState('');

    const handleChange = (evt) => {
        setText(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (text.trim().length > 0) {
            addNewActivity(text.trim());
            setText("");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup className="mb-4">
                <InputGroup.Checkbox />
                <Form.Control
                    className="input"
                    required
                    pattern="\S.*"
                    value={text}
                    onChange={handleChange}
                    placeholder='Enter new to-do'
                />
                <Button className="submitbtn" type="submit">Submit</Button>
            </InputGroup>
        </form>
    );
}
