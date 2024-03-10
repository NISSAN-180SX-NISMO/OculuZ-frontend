import {useParams} from "react-router-dom";
import NotFoundSplitter from "../NotFoundSplitter/NotFoundSplitter";
import {apiService} from "../../services/apiService";
import UserPage from "../pages/UserPage/UserPage";
import React from "react";
import ChannelPage from "../pages/ChannelPage/ChannelPage";
import {ChannelService} from "../../services/ChannelService";

const ChannelPageWrapper = () => {
    const { channelName } = useParams();

    return (
        <NotFoundSplitter
            apiMethod={() => ChannelService.getChannelPage(channelName)}
            Component={ChannelPage}
        />
    );
};

export default ChannelPageWrapper;