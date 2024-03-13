import React, { forwardRef } from 'react';
import styles from './FileInputStyle.module.css';

const FileInput = forwardRef((props, ref) => (
    <input className={styles.input} ref={ref} {...props} />
));

export default FileInput;