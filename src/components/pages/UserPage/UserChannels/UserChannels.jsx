import React from 'react';
import Button from "../../../UI/Atoms/Button/Button";



const UserChannels = ({username}) => {

    const addChannel = () => {
        window.location.href = `/user/${username}/create-channel`;
    }

    return (
        <div>
            USER CHANNELS
            <Button onClick={addChannel}>ADD CHANNEL</Button>
        </div>
    );
};

export default UserChannels;