import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/ThreadList.css";
import PageTitle from "../component/PageTitle";
import DescriptionIcon from "@material-ui/icons/Description";
import Card from "../component/Card";
import BreadcrumbNavigation from "../component/BreadcrumbNavigation";
import CreateLink from "../component/CreateLink";

function ThreadList() {
    // board id received by parameter
    const { boardId } = useParams();

    // Message when there is no threads
    const [message, setMessage] = useState("");
    // Database thread infomation
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const fetchThread = async () => {
            axios.get(
                `http://localhost:3000/GitHub/self/kchannel/backend/Api/threadList.php?board_id=${boardId}`
            )
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
        }
        fetchThread();
    }, [boardId]);

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
            <div className="thread-list-title">
                <PageTitle Icon={ DescriptionIcon } title="Thread" />
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

            <div className="thread-list-body">
                { threadContent }
            </div>
        </div>
    )
}

export default ThreadList;
