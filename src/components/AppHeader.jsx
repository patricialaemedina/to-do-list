import '../assets/css/AppHeader.css';
import Logo from '../assets/images/logo.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function AppHeader() {
    return (
        <Navbar className="gradient bg-body-tertiary">
            <Container>
                <Navbar.Brand className="brand">
                    <img
                        src={Logo}
                        className="d-inline-block align-top img"
                        alt="LexMeet"
                    />
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="font-dm-sans">
                        To-Do List App
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}