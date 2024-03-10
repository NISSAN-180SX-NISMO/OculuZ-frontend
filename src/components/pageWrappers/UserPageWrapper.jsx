import {useParams} from "react-router-dom";
import NotFoundSplitter from "../NotFoundSplitter/NotFoundSplitter";
import UserPage from "../pages/UserPage/UserPage";
import React from "react";
import {UserService} from "../../services/UserService";

const UserPageWrapper = () => {
    const { username } = useParams();

    return (
        <NotFoundSplitter
            apiMethod={() => UserService.getUserPage(username)}
            Component={UserPage}
        />
    );
};

export default UserPageWrapper;