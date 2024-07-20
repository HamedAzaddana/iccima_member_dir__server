import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from '@inertiajs/react'

export default function TopNav({ }) {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
 
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#">
                    <img style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "20%",
                        filter: "contrast(180%)",
                    }} src="/images/iccima_iran.png" alt="" />
                    <span style={{
                        fontSize: "20px",
                        padding: "5px",
                        margin: "10px",
                    }}>سامانه اتاق بازرگانی</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto top_nav_app">
                        <Link className="nav-link" href={`${appUrl}/#section_1`}>خانه</Link>
                        <Link className="nav-link" href={`${appUrl}/#section_3`}>راهنما</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}