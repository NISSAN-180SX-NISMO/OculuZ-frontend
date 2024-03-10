import React, {useContext, useEffect, useState} from 'react';
import styles from './AuthPage.module.css'
import Input from "../../UI/Atoms/Input/Input";
import Button from "../../UI/Atoms/Button/Button";
import LogoAlt from "../../UI/Atoms/Logo/LogoAlt";
import {Link, useLocation} from "react-router-dom";

import {AuthContext} from "../../../context";
import {SignupRequest} from "../../../model/AuthDTO.tsx";


const RegistPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);
    const {signup} = useContext(AuthContext);
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get('redirect');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            signup(new SignupRequest({username, email, role: ['ROLE_USER'], password}),
                redirect ? redirect : '/');
        } catch (e) {
            setError(e.message);
        }

    };

    useEffect(() => {
        if (password !== passwordConfirm) {
            setError('Пароли не совпадают!');
        } else {
            setError(null);
        }
    }, [passwordConfirm]); // Зависимости useEffect

    return (
        <div className={styles.authBody}>
            <div className={styles.authForm}>
                <form onSubmit={handleSubmit} className={styles.authFormBody}>
                    <LogoAlt className={styles.logo}/>
                    <div className={styles.userInput}>
                        <Input
                            placeholder={"Имя пользователя"}
                            type={"text"}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required={true}
                        />
                        <Input
                            placeholder={"Email"}
                            type={"email"}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required={true}
                        />
                        <Input
                            placeholder={"Придумайте пароль"}
                            type={"password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required={true}
                        />
                        <Input
                            placeholder={"Подтвердите пароль"}
                            type={"password"}
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)}
                            required={true}
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <Button>Зарегистрироваться</Button>
                </form>
                <div className={styles.registLink}>Уже есть аккаунт?&nbsp;
                    <Link to={`/login?${redirect ? 'redirect=' + redirect : ''}`}>Войдите!</Link>
                </div>
            </div>
        </div>
    );
};

export default RegistPage;


