import React from 'react';
import styles from './ChannelHeadHeaderStyle.module.css';

const ChannelHeadHeader = ({headerUrl}) => {
    return (
        <picture>
            <source srcSet={headerUrl} type="image/webp"/>
            <img src={'https://s3.timeweb.cloud/fd22a2a2-oculuz-media-storage/header/defaultChannelHeader.jpg'} alt="header" className={styles.headerImage}/>
        </picture>
    );
};

export default ChannelHeadHeader;