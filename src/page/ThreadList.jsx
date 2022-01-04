import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/ThreadList.css";
import PageTitle from "../component/PageTitle";
import DescriptionIcon from "@material-ui/icons/Description";
import Card from "../component/Card";
import BreadcrumbNavigation from "../component/BreadcrumbNavigation";
import CreateLink from "../component/CreateLink";
import URL from "../info/Url";
import SearchIcon from "@material-ui/icons/Search";
import InputPlusButton from "../component/InputPlusButton";

function ThreadList() {
    // board id received by parameter
    const { boardId } = useParams();

    // state
    const [csrfToken, setCsrfToken] = useState("");
    // word
    const [searchWord, setSearchWord] = useState("");
    // Message when there is no threads
    const [message, setMessage] = useState("");
    // Database thread infomation
    const [threads, setThreads] = useState([]);

    // Set csrf token
    useEffect(() => {
        axios[URL.csrfToken.method](URL.csrfToken.url, {
            withCredentials: true
        })
        .then((res) => {
            if(res.data.success) {
                setCsrfToken(res.data.csrf_token);
            } else {
                // nothing
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios[URL.threadList.method](URL.threadList.url, {
            params: {
                board_id: boardId
            }
        })
        .then((res) => {
            if(res.data.data.item.length > 0) {
                setThreads(res.data.data.item);
            } else {
                setMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [boardId]);

    const searchThreadList = () => {
        axios[URL.searchThreadList.method](URL.searchThreadList.url, {
            params: {
                search_word: searchWord,
                board_id   : boardId,
                csrf_token : csrfToken
            },
            withCredentials: true
        })
        .then((res) => {
            if(res.data.data.item.length > 0) {
                setThreads(res.data.data.item);
                setMessage("");
            } else {
                setMessage(res.data.message);
            }
        })
    }

    // Thread content for display
    let threadContent;
    if(message !== "") {
        threadContent = <div>{ message }</div>;
    } else {
        threadContent = threads.map(function(thread) {
            return <Card
                    key={ thread.thread_id }
                    title={ thread.thread_name }
                    count={ thread.comment_count }
                    createdAt={ thread.created_at }
                    createdUserName={ thread.created_user_name }
                    path={ "/commentList/" + thread.thread_id }
                    />;
        })
    }

    return(
        <div className="thread-list">
            <div className="wrapper">
                <div className="thread-list-title">
                    <PageTitle Icon={ DescriptionIcon } title="スレッド" />
                </div>

                <div className="breadcrumb-navigation-container">
                    <BreadcrumbNavigation />
                </div>

                <div className="create-link-content">
                    <CreateLink
                        path={ "/createThread/" + boardId }
                        title="スレッド作成ページに移動する"
                        />
                </div>

                <div className="search-content">
                    <InputPlusButton
                        value={ searchWord }
                        changeFunction={ setSearchWord }
                        buttonFunction={ searchThreadList }
                        Icon={ SearchIcon }
                        placeholderText="スレッドを検索する..."
                    />
                </div>

                <div className="thread-list-body">
                    { threadContent }
                </div>
            </div>
        </div>
    )
}

export default ThreadList;
