import React, {useState, useEffect} from 'react';
import ButtonStyle from "./SubButton.module.css"
import {apiService} from '../../../../services/apiService';

const SubButton = ({subscribed, ...props}) => {
    return (
        <div className={ButtonStyle.btnBody}>
            <button {...props}
                className={subscribed ? ButtonStyle.subscribedBtn : ButtonStyle.btn}
            >
                {subscribed ? 'Отписаться' : 'Подписаться'}
            </button>
        </div>
    );
};

export default SubButton;