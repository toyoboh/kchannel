import "../css/ThreadList.css";
import Authorization                  from "../tool/Authorization";
import axios                          from "axios";
import BreadcrumbNavigation           from "../component/BreadcrumbNavigation";
import Card                           from "../component/Card";
import CreateLink                     from "../component/CreateLink";
import DescriptionIcon                from "@material-ui/icons/Description";
import MessageOutlinedIcon            from "@material-ui/icons/MessageOutlined";
import NoContent                      from "../component/NoContent";
import PageTitle                      from "../component/PageTitle";
import React, { useState, useEffect } from "react";
import UISearchInput                  from "../component/ui/UISearchInput";
import URL                            from "../info/Url";
import { useParams }                  from "react-router-dom";
import { useUserContext }             from "../context/User";

function ThreadList() {
    const { user }                              = useUserContext();
    const authorization                         = new Authorization(user.authority);

    // board id received by parameter
    const { boardId }                           = useParams();

    // state
    // CSRF token
    const [csrfToken, setCsrfToken]             = useState("");
    // initial process
    const [initialLoading, setInitialLoading]   = useState(true);
    const [boardExists, setBoardExists]         = useState(false);
    // thread information
    const [threads, setThreads]                 = useState([]);
    const [threadCount, setThreadCount]         = useState(0);
    // input item
    const [inputSearchWord, setInputSearchWord] = useState("");
    // content message
    const [contentMessage, setContentMessage]   = useState("");

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

    /**
     * check if the board exists
     */
    useEffect(() => {
        axios[URL.fetchBoardInformation.method](URL.fetchBoardInformation.url, {
            params: {
                board_id: boardId
            }
        })
        .then((res) => {
            if(res.data.success) {
                setBoardExists(true);
            } else {
                setBoardExists(false);
                setInitialLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [boardId]);

    /**
     * Get thread data if board information exist.
     */
    useEffect(() => {
        if(!boardExists) return;

        axios[URL.threadList.method](URL.threadList.url, {
            params: {
                board_id: boardId
            }
        })
        .then((res) => {
            if(res.data.success) {
                setThreads(res.data.data.threads);
                setThreadCount(res.data.data.threads.length);
                setContentMessage("");
            } else {
                setThreads([]);
                setThreadCount(0);
                setContentMessage(res.data.message)
            }
            setInitialLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [boardId, boardExists])

    /**
     * Search threads based on search word
     */
    const searchThreadList = () => {
        axios[URL.searchThreadList.method](URL.searchThreadList.url, {
            params: {
                search_word: inputSearchWord,
                board_id   : boardId,
                csrf_token : csrfToken
            }
        })
        .then((res) => {
            if(res.data.success) {
                setThreads(res.data.data.threads);
                setThreadCount(res.data.data.threads.length);
                setContentMessage("");
            } else {
                setThreads([]);
                setThreadCount(0);
                setContentMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Thread content for display
    let threadContent;
    if(!threadCount) {
        threadContent = <div>{ contentMessage }</div>;
    } else {
        threadContent = threads.map(function(thread) {
            return <Card
                    key={ thread.thread_id }
                    title={ thread.thread_name }
                    count={ thread.comment_count }
                    createdAt={ thread.created_at }
                    createdUserName={ thread.created_user_name }
                    path={ "/commentList/" + thread.thread_id }
                    Icon={ MessageOutlinedIcon }
                    />;
        })
    }

    return(
        <div className="thread-list">
            <div className="wrapper">
                {initialLoading ? (

                <div>Now Initial Loading</div>

                ) : (<>

                    {!boardExists ? (

                        <NoContent text="存在しないスレッドです。" />

                    ) : (<>

                        <div className="thread-list-title">
                            <PageTitle Icon={ DescriptionIcon } title="スレッド" />
                        </div>

                        <div className="breadcrumb-navigation-container">
                            <BreadcrumbNavigation />
                        </div>

                        {authorization.createThread() &&
                        <div className="create-link-content">
                            <CreateLink
                                path={ "/createThread/" + boardId }
                                title="スレッド作成ページに移動する"
                                />
                        </div>
                        }

                        <div className="search-content">
                            <UISearchInput
                                value={ inputSearchWord }
                                placeholder={ "スレッド検索" }
                                clickFunction={ searchThreadList }
                                changeFunction={ setInputSearchWord }
                            />
                        </div>

                        <div className="thread-list-body">
                            { threadContent }
                        </div>

                    </>)}

                </>)}

            </div>
        </div>
    )
}

export default ThreadList;
