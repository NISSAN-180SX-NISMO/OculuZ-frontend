import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/LoginForm.css';
import {Link} from "react-router-dom";


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Здесь вы можете обработать данные формы
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <div className={'form'}>
            <Form onSubmit={handleSubmit} id={"loginForm"}>
                <img src="/images/logo_v3.png" alt="Logo" width={"auto"} height={50}/>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" value={password}
                                  onChange={handlePasswordChange}/>
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button variant="primary" type="submit" id={"loginBtn"}>
                        Вход
                    </Button>
                    <Button variant="primary" type="submit" as={Link} to="/registration" id={"registBtn"}>
                        Регистрация...
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;