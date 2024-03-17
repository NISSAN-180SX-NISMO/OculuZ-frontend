import React, { useState, useEffect } from 'react';
import {ChannelService} from "../../../../services/ChannelService";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import Button from "../Button/Button";

const SubButton = ({ channelName, subCount, setSubCount }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        checkSubscription();
    }, []);

    const checkSubscription = async () => {
        try {
            const response = await ChannelService.checkSubscription(channelName);
            if (response.status === 200) {
                setIsSubscribed(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setIsSubscribed(false);
            }
        }
    };

    const handleSubscribe = async () => {
        console.log("Пытаемся подписаться на канал");
        await ChannelService.subscribe(channelName).then(response => {
            if (response.status === 200) {
                console.log("Подписались на канал");
                setSubCount(prevCount => prevCount + 1);
                //window.location.reload();
            } else {
                console.log("Не удалось подписаться на канал");
            }
        });
        setIsSubscribed(true);
    };

    const handleUnsubscribe = async () => {
        console.log("Пытаемся отписаться от канала");
        await ChannelService.unsubscribe(channelName).then(response => {
            if (response.status === 200) {
                console.log("Отписались от канала");
                setSubCount(prevCount => prevCount - 1);
                //window.location.reload();
            } else {
                console.log("Не удалось отписаться от канала");
            }
        });
        setIsSubscribed(false);
    };

    return (
        isSubscribed ?
            <ButtonSecondary onClick={handleUnsubscribe}>
                Отписаться
            </ButtonSecondary> :
            <Button onClick={handleSubscribe}>
                Подписаться
            </Button>
    );
};

export default SubButton;