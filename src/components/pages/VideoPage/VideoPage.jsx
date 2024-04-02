import React, {useEffect} from 'react';
import Header from "../../UI/Blocks/Header/Header";
import {VideoPageDTO, VideoPreviewDTO} from "../../../model/VideoDTO.tsx";
import styles from './VideoPageStyle.module.css';
import Avatar from "../../UI/Atoms/Avatar/Avatar";
import formatTimeSince from "../../../utils/formatTimeSince";
import Button from "../../UI/Atoms/Button/Button";
import TextArea from "../../UI/Atoms/TextArea/TextArea";
import ItemButton from "../../UI/Atoms/ItemButton/ItemButton";
import VideoPreview from "../../UI/Blocks/Video/VideoPreview/VideoPreview";
import SubButton from "../../UI/Atoms/SubButton/SubButton";

const VideoPage = ({data}) => {


    useEffect(() => {
        console.log(data)
    }, []);

    const video = new VideoPageDTO(data);
    const [subCount, setSubCount] = React.useState(video.subscribersCount);

    return (
        <>
            <Header/>
            <div className={styles.videoPagePayload}>
                <div className={styles.videoPagePayload__video}>
                    <video className={styles.videoPoster} width="100%" height="calc(100% * 9 / 16)" controls
                           src={video.url} poster={video.previewUrl}/>
                    <div className={styles.videoPagePayload__info}>
                        <Avatar avatarUrl={video.channelAvatarUrl}/>
                        <div className={styles.videoStatsBody}>
                            <div className={styles.channelName}>{video.channelName}</div>
                            <div className={styles.videoStats}>
                                {video.views} просмотров,{" "}{formatTimeSince(video.uploadDate)}
                            </div>
                            <div className={styles.videoStats}>
                                {subCount} Подписчиков
                            </div>
                        </div>
                        <div className={styles.ButtonGroup}>
                            <SubButton channelName={video.channelName} subCount={subCount} setSubCount={setSubCount}/>
                            <Button >Лайк</Button>
                            <Button >Дизлайк</Button>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <TextArea value={video.description} readonly={true}/>
                    </div>
                    <div className={styles.comment}>
                        <TextArea placeholder={"Напишите комментарий"}/>
                    </div>
                    <div className={styles.commentSubmitButton}>
                        <Button>Отправить</Button>
                    </div>

                </div>

                <div className={styles.metaContent}>
                    <div className={styles.contentMap}>
                        content map
                    </div>
                    <div className={styles.videoList}>
                        <ItemButton>
                            <VideoPreview video={new VideoPreviewDTO({
                                id: video.id,
                                previewUrl:  video.previewUrl,
                                channelAvatarUrl: video.channelAvatarUrl,
                                url: video.url,
                                title: video.title,
                                channelName: video.channelName,
                                duration: video.duration,
                                uploadDate: video.uploadDate,
                                views: video.views
                            })}/>
                        </ItemButton>
                        <ItemButton>
                            <VideoPreview video={new VideoPreviewDTO({
                                id: video.id,
                                previewUrl:  video.previewUrl,
                                channelAvatarUrl: video.channelAvatarUrl,
                                url: video.url,
                                title: video.title,
                                channelName: video.channelName,
                                duration: video.duration,
                                uploadDate: video.uploadDate,
                                views: video.views
                            })}/>
                        </ItemButton>
                        <ItemButton>
                            <VideoPreview video={new VideoPreviewDTO({
                                id: video.id,
                                previewUrl:  video.previewUrl,
                                channelAvatarUrl: video.channelAvatarUrl,
                                url: video.url,
                                title: video.title,
                                channelName: video.channelName,
                                duration: video.duration,
                                uploadDate: video.uploadDate,
                                views: video.views
                            })}/>
                        </ItemButton>
                        <ItemButton>
                            <VideoPreview video={new VideoPreviewDTO({
                                id: video.id,
                                previewUrl:  video.previewUrl,
                                channelAvatarUrl: video.channelAvatarUrl,
                                url: video.url,
                                title: video.title,
                                channelName: video.channelName,
                                duration: video.duration,
                                uploadDate: video.uploadDate,
                                views: video.views
                            })}/>
                        </ItemButton>
                        <ItemButton>
                            <VideoPreview video={new VideoPreviewDTO({
                                id: video.id,
                                previewUrl:  video.previewUrl,
                                channelAvatarUrl: video.channelAvatarUrl,
                                url: video.url,
                                title: video.title,
                                channelName: video.channelName,
                                duration: video.duration,
                                uploadDate: video.uploadDate,
                                views: video.views
                            })}/>
                        </ItemButton>
                        <ItemButton>
                            <VideoPreview video={new VideoPreviewDTO({
                                id: video.id,
                                previewUrl:  video.previewUrl,
                                channelAvatarUrl: video.channelAvatarUrl,
                                url: video.url,
                                title: video.title,
                                channelName: video.channelName,
                                duration: video.duration,
                                uploadDate: video.uploadDate,
                                views: video.views
                            })}/>
                        </ItemButton>
                        <ItemButton>
                            <VideoPreview video={new VideoPreviewDTO({
                                id: video.id,
                                previewUrl:  video.previewUrl,
                                channelAvatarUrl: video.channelAvatarUrl,
                                url: video.url,
                                title: video.title,
                                channelName: video.channelName,
                                duration: video.duration,
                                uploadDate: video.uploadDate,
                                views: video.views
                            })}/>
                        </ItemButton>
                        <ItemButton>
                            <VideoPreview video={new VideoPreviewDTO({
                                id: video.id,
                                previewUrl:  video.previewUrl,
                                channelAvatarUrl: video.channelAvatarUrl,
                                url: video.url,
                                title: video.title,
                                channelName: video.channelName,
                                duration: video.duration,
                                uploadDate: video.uploadDate,
                                views: video.views
                            })}/>
                        </ItemButton>
                    </div>
                </div>

            </div>
        </>
    );
};

export default VideoPage;