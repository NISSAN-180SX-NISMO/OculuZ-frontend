import React, {useContext, useState} from 'react';
import styles from './AuthPage.module.css'
import Input from "../../UI/Atoms/Input/Input";
import Button from "../../UI/Atoms/Button/Button";
import LogoAlt from "../../UI/Atoms/Logo/LogoAlt";
import {Link} from "react-router-dom";
import { apiService } from "../../../services/apiService"
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../../../context";


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {login} = useContext(AuthContext);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await apiService.getAuth(username, password);
        const data = await response.json(); // Save the response body
        if (response.status === 200) {
            login(response.headers.get('Authorization'));
        } else {
            setError(data.message); // Use the saved response body
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
                    <Link to={'/regist'}>Зарегистрируйтесь!</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


