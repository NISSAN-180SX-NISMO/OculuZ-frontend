import React, {useContext, useState} from 'react';
import styles from './HeaderStyle.module.css';
import SearchComponent from "../../Atoms/SearchComponent/SearchComponent";
import IconButton from "../../Atoms/IconButton/IconButton";
import Sidebar from "../Sidebar/Sidebar";
import LogoAlt from "../../Atoms/Logo/LogoAlt";
import {AuthContext} from "../../../../context";
import VideoUploadModal from "../Video/VideoUploadModal/VideoUploadModal"; // Импортируйте VideoUploadModal

const Header = () => {
    const {isAuth} = useContext(AuthContext);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isVideoUploadModalOpen, setVideoUploadModalOpen] = useState(false);

    const handleButtonClick = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    const handleVideoUploadButtonClick = () => {
        setVideoUploadModalOpen(true);
    };

    const handleVideoUploadModalClose = () => {
        setVideoUploadModalOpen(false);
    };

    return (
        <header className={styles.headerBody}>
            <LogoAlt/>
            <div className={styles.searchComponent}>
                <SearchComponent />
            </div>
            <div className={styles.navigateButtons}>
                {
                    isAuth &&
                    <IconButton onClick={handleVideoUploadButtonClick} iconPath={"/resources/downloadIconButton.png"} alt={"videoUpload"}/>
                }
                <IconButton iconPath={"/resources/bellIconButton.png"} alt={"notifies"}/>
                <IconButton onClick={handleButtonClick} iconPath={"/resources/userMenuIconButton.png"} alt={"userMenu"}/>
                {isSidebarOpen && <div className={styles.overlay} onClick={handleSidebarClose}></div>}
                {isVideoUploadModalOpen && <div className={styles.overlay} onClick={handleVideoUploadModalClose}></div>}
            </div>
            <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
            <VideoUploadModal isOpen={isVideoUploadModalOpen} onClose={handleVideoUploadModalClose} /> {/* Добавьте VideoUploadModal */}
        </header>
    );
};

export default Header;