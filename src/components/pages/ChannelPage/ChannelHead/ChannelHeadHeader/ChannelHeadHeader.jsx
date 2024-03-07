import React from 'react';
import styles from './ChannelHeadHeaderStyle.module.css';

const ChannelHeadHeader = ({headerUrl}) => {
    return (
        <picture>
            <source srcSet={headerUrl} type="image/webp"/>
            <img src={'/resources/defaultChannelHeader.jpg'} alt="header" className={styles.headerImage}/>
        </picture>
    );
};

export default ChannelHeadHeader;