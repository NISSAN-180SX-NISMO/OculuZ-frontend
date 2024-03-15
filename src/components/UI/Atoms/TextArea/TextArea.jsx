import React from 'react';
import styles from './TextAreaStyle.module.css';

const TextArea = ({...props}) => {
    return (
        <textarea className={styles.body} {...props}>
            {props.children}
        </textarea>
    );
};

export default TextArea;