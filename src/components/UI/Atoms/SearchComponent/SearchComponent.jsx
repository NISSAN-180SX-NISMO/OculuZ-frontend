import React from 'react';
import styles from './SearchComponentStyle.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";

const SearchComponent = () => {
    return (
        <div className={styles.searchContainer}>
            <Input placeholder={"Введите поисковый запрос ..."}/>
            <Button>Поиск</Button>
        </div>
    );
};

export default SearchComponent;