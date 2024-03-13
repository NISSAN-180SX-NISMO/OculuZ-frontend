import React from 'react';
import styles from "../AuthPage.module.css";
import LogoAlt from "../../../UI/Atoms/Logo/LogoAlt";
import Input from "../../../UI/Atoms/Input/Input";
import Button from "../../../UI/Atoms/Button/Button";
import {ChannelPageDTO, CreateChannelRequest} from "../../../../model/ChannelDTO.tsx";
import {UserService} from "../../../../services/UserService";

const ChannelRegistPage = () => {
    const [channelName, setChannelName] = React.useState('');
    const [error, setError] = React.useState('');

    const createChannel = async (createChannelRequest: CreateChannelRequest) => {
        await UserService.createChannel(createChannelRequest.channelName).then(
            () => {
                window.location.href = '/channel/' + createChannelRequest.channelName;
            }
        );
        // let channelPage : ChannelPageDTO = new ChannelPageDTO(response.json());
        // window.location.href = '/channel/' + createChannelRequest.channelName;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createChannel(new CreateChannelRequest({channelName: channelName}))
        } catch (e) {
            setError(e.message);
        }

    };

    return (
        <div className={styles.authBody}>
            <div className={styles.authForm}>
                <form onSubmit={handleSubmit} className={styles.authFormBody}>
                    <LogoAlt className={styles.logo}/>
                    <div className={styles.userInput}>
                        <Input
                            placeholder={"Придумайте название своего канала"}
                            type={"text"}
                            value={channelName}
                            onChange={e => setChannelName(e.target.value)}
                            required={true}
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <Button>Создать канал!</Button>
                </form>
            </div>
        </div>
    );
};

export default ChannelRegistPage;