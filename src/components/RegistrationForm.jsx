import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/LoginForm.css';
import { jwtDecode } from 'jwt-decode';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setConfirmPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8080/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                passwordConfirm: passwordConfirm,
            }),
        });

        const clonedResponse = response.clone();
        const authToken = clonedResponse.headers.get('Authorization');
        console.log(authToken); // Вывод токена из заголовка Authorization

        if (authToken) {
            localStorage.setItem('authToken', authToken);
            const decodedToken = jwtDecode(authToken);
            console.log(decodedToken); // Вывод декодированного токена
        } else console.log('Ошибка какаято бляха');
    };

    return (
        <div className={'form'}>
            <Form onSubmit={handleSubmit} id={"registerForm"}>
                <img src="/images/logo_v3.png" alt="Logo" width={"auto"} height={50}/>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" value={password}
                                  onChange={handlePasswordChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Control type="password" placeholder="Confirm Password" value={passwordConfirm}
                                  onChange={handleConfirmPasswordChange}/>
                </Form.Group>
                <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                    Зарегистрироваться
                </Button>
                </div>
            </Form>
        </div>
    );
};

export default RegistrationForm;