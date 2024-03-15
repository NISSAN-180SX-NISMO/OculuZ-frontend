import FileInput from "../../../Atoms/FileInput/FileInput";

const PreviewFileInput = ({ setPreviewUrl, onParentClick }) => {

    const checkFile = (file) => {
        if (file) {
            // Проверяем размер файла
            if (file.size > 5 * 1024 * 1024) { // размер файла больше 5 МБ
                return 'Размер файла не должен превышать 5 МБ!';
            }

            // Проверяем, является ли файл изображением
            if (!file.type.startsWith('image/')) {
                console.log(file.type);
                return 'Файл должен быть изображением!';
            }
        }

        return null;
    };

    const handlePreviewFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setPreviewUrl(URL.createObjectURL(file));
            onParentClick(e);
        } else {
            setPreviewUrl("");
        }
    };

    return (
        <FileInput onChange={handlePreviewFileChange} checkFile={checkFile}>
            Выберите превью
        </FileInput>
    );
};

export default PreviewFileInput;