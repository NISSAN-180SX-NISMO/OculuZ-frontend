import {useParams} from "react-router-dom";
import NotFoundSplitter from "../NotFoundSplitter/NotFoundSplitter";
import {apiService} from "../../services/apiService";
import UserPage from "../pages/UserPage/UserPage";
import React from "react";

const UserPageWrapper = () => {
    const { username } = useParams();

    return (
        <NotFoundSplitter
            apiMethod={() => apiService.getUserByUsername(username)}
            Component={UserPage}
        />
    );
};

export default UserPageWrapper;