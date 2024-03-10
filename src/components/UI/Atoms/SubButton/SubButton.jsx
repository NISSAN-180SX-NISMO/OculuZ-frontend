import React, {useState, useEffect} from 'react';
import ButtonStyle from "./SubButton.module.css"
import {apiService} from '../../../../services/apiService';

const SubButton = ({username, channelName}) => {
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const response = await apiService.isUserSubscribed(username, channelName);
                setSubscribed(response.ok);
            } catch (err) {
                setSubscribed(false)
                setError(err.message);
            }
        };
        checkSubscription();
    }, [username, channelName]);

    const handleSubscribe = async () => {
        try {
            const response = await apiService.subscribeUSerToChannel(username, channelName);
            if (response.status === 200) {
                setSubscribed(true);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };
    const handleUnsubscribe = async () => {
        try {
            const response = await apiService.unsubscribeUSerToChannel(username, channelName);
            if (response.status === 200) {
                setSubscribed(false);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={ButtonStyle.btnBody}>
            <button
                className={subscribed ? ButtonStyle.subscribedBtn : ButtonStyle.btn}
                onClick={subscribed ? handleUnsubscribe : handleSubscribe}
            >
                {subscribed ? 'Отписаться' : 'Подписаться'}
            </button>
            {error && <div className={ButtonStyle.error}>{error}</div>}
        </div>
    );
};

export default SubButton;