import React from 'react';
import styles from './NotFoundPageStyle.module.css';
import mainStyles from '../../pages/MainPage/MainPageStyle.module.css'
import Header from "../../UI/Blocks/Header/Header";
import Navbar from "../../UI/Blocks/Navbar/Navbar";


const NotFoundPage = () => {
    return (
        <div>
            <Header/>
            <div className={mainStyles.mainPageBody}>
                <Navbar className={mainStyles.navbar}/>
                <div className={styles.notFoundBody}>
                    <div>РЕСУРС НЕ НАЙДЕН (ʘᗩʘ')</div>
                </div>
            </div>
        </div>
    )
        ;
};

export default NotFoundPage;