import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/ThreadList.css";
import PageTitle from "../component/PageTitle";
import DescriptionIcon from "@material-ui/icons/Description";
import Card from "../component/Card";

function ThreadList() {
    const { boardId } = useParams();

    const [threadList, setThreadList] = useState([]);

    useEffect(()=> {
        const initialThreadList = [
            { key: 1, title: "thread1", count: 1, createdAt: "2021/11/17 20:30:12", createdUserName: "sho"},
            { key: 2, title: "thread2", count: 2, createdAt: "2021/11/17 20:30:12", createdUserName: "sho"},
            { key: 3, title: "thread3", count: 3, createdAt: "2021/11/17 20:30:12", createdUserName: "sho"},
            { key: 4, title: "thread4", count: 4, createdAt: "2021/11/17 20:30:12", createdUserName: "sho"},
            { key: 5, title: "thread5", count: 5, createdAt: "2021/11/17 20:30:12", createdUserName: "sho"}
        ];
        setThreadList(initialThreadList);
    }, []);

    const Threads = threadList.map(function(thread) {
        return <Card
                key={ thread.key }
                title={ thread.title }
                count={ thread.count }
                createdAt={ thread.createdAt }
                createdUserName={ thread.createdUserName }
                />
    })

    return(
        <div className="thread-list">
            <div className="thread-list-title">
                <PageTitle Icon={ DescriptionIcon } title="Thread" />
            </div>

            <div className="thread-list-body">
                { Threads }
            </div>
        </div>
    )
}

export default ThreadList;
