import React, {useState, useRef} from 'react';
import styles from './FileInputStyle.module.css';
import Button from "../Button/Button";
import Input from "../Input/Input";

const FileInput = (props) => {
    const [fileName, setFileName] = useState('Файл не выбран');
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);


    const handleChange = (event) => {
        const file = event.target.files[0];

        if (props.checkFile) {
            setError(props.checkFile(file));
        } else {
            setError(null);
        }


        setFileName(file ? file.name : 'Файл не выбран');

        if (props.onChange)
            props.onChange(event);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={styles.inputBody}>
            <input type="file" className={styles.input} onChange={handleChange} ref={fileInputRef}/>
            <div className={styles.fileName}>
                <Input type="text" value={error ? error : fileName} error={error ? true : false} readOnly/>
            </div>
            <div className={styles.choiceButton}>
                <Button onClick={handleButtonClick}>
                    {props.children} {/* Используем children для отображения текста кнопки */}
                </Button>
            </div>
        </div>
    );
};

export default FileInput;