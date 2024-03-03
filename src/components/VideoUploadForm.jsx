import React, { useState } from 'react';
import '../styles/VideoUploadForm.css';

function VideoUploadForm() {

    const [key, setKey] = useState('введите название');

    const handleInputChange = (event) => {
        setKey(event.target.value);
    };

    return (
        <div className="upload-form-container">
            <form action="https://storage.yandexcloud.net/oculuz-media-storage" method="post" enctype="multipart/form-data">

                <input type="input" name="key" value={key} onChange={handleInputChange}/><br/>

                <input type="hidden" name="acl" value="public-read" />
                <input type="hidden" name="Content-Type" value="video/mp4" />
                <input type="hidden" name="success_action_redirect" value="localhost:3000" />

                <input type="file" name="file" /> <br />

                <input type="submit" name="submit" value="Загрузить" />
            </form>

        </div>
    );
}

export default VideoUploadForm;
