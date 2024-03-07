import {useParams} from "react-router-dom";
import NotFoundSplitter from "../NotFoundSplitter/NotFoundSplitter";
import {apiService} from "../../services/apiService";
import UserPage from "../pages/UserPage/UserPage";
import React from "react";
import ChannelPage from "../pages/ChannelPage/ChannelPage";

const ChannelPageWrapper = () => {
    const { name } = useParams();

    return (
        <NotFoundSplitter
            apiMethod={() => apiService.getChannelByName(name)}
            Component={ChannelPage}
        />
    );
};

export default ChannelPageWrapper;