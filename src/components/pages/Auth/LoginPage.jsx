import React, {useContext, useState} from 'react';
import styles from './AuthPage.module.css'
import Input from "../../UI/Atoms/Input/Input";
import Button from "../../UI/Atoms/Button/Button";
import LogoAlt from "../../UI/Atoms/Logo/LogoAlt";
import {Link, useLocation} from "react-router-dom";
import {LoginRequest} from "../../../model/AuthDTO.tsx";
import {AuthContext} from "../../../context";


const LoginPage = () => {
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get('redirect');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(new LoginRequest({username, password}), redirect ? redirect : '/');
        } catch (e) {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + e.message);
            setError(e.message);
        }
    };

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
                            placeholder={"Пароль"}
                            type={"password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required={true}
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <Button>Войти</Button>
                </form>
                <div className={styles.registLink}>Нет аккаунта?&nbsp;
                    <Link to={`/regist?${redirect ? 'redirect=' + redirect : ''}`}>Зарегистрируйтесь!</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


