import React, { useState } from 'react';
import styles from './FileInputStyle.module.css';
import Button from "../Button/Button";
import Input from "../Input/Input";


const FileInput = React.forwardRef((props, ref) => {
    const [fileName, setFileName] = useState('Файл не выбран');

    const handleClick = () => {
        ref.current.click();
    };

    const handleChange = (event) => {
        setFileName(event.target.files[0] ? event.target.files[0].name : 'Файл не выбран');

        // Если был передан обработчик props.onChange, вызываем его
        if (props.onChange) {
            props.onChange(event);
        }
    };

    return (
        <div className={styles.inputBody}>
            <input type="file" ref={ref} className={styles.input} onChange={handleChange} />
            <div className={styles.fileName}>
                <Input type="text" value={fileName} readOnly />
            </div>
            <div className={styles.choiceButton}>
                <Button onClick={handleClick}>
                    {props.children} {/* Используем children для отображения текста кнопки */}
                </Button>
            </div>
        </div>
    );
});

export default FileInput;