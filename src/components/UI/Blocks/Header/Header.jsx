import React, {useState} from 'react';
import styles from './HeaderStyle.module.css';
import Logo from "../../Atoms/Logo/Logo";
import SearchComponent from "../../Atoms/SearchComponent/SearchComponent";
import IconButton from "../../Atoms/IconButton/IconButton";
import Sidebar from "../Sidebar/Sidebar";
import LogoAlt from "../../Atoms/Logo/LogoAlt"; // Импортируйте Sidebar

const Header = () => {

    const testPredicate = () => {
        return true;
    };

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleButtonClick = () => {
        console.log("open")
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSidebarClose = () => {
        console.log("close")
        setSidebarOpen(false);
    };

    return (
        <div className={styles.headerBody}>
            <LogoAlt/>
            <div className={styles.searchComponent}>
                <SearchComponent />
            </div>
            <div className={styles.navigateButtons}>
                {
                    testPredicate() &&
                    <IconButton iconPath={"./resources/downloadIconButton.png"} alt={"videoUpload"}/>
                }
                <IconButton iconPath={"./resources/bellIconButton.png"} alt={"notifies"}/>
                <IconButton onClick={handleButtonClick} iconPath={"./resources/userMenuIconButton.png"} alt={"userMenu"}/>
                {isSidebarOpen && <div className={styles.overlay} onClick={handleSidebarClose}></div>}
            </div>
            <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        </div>
    );
};

export default Header;