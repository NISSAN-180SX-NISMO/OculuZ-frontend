import React, { useRef } from 'react';
import FileInput from "../../../Atoms/FileInput/FileInput";

const PreviewFileInput = ({ setPreviewUrl }) => {
    const previewFileRef = useRef();

    const handlePreviewFileChange = (e) => {
        if (e.target.files[0]) {
            setPreviewUrl(URL.createObjectURL(e.target.files[0]));
        } else {
            setPreviewUrl("");
        }
    };

    return (
        <FileInput type="file" ref={previewFileRef} onChange={handlePreviewFileChange}>
            Выберите превью
        </FileInput>
    );
};

export default PreviewFileInput;