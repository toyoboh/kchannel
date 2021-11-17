import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ThreadSpace.css";
import ThreadSpaceTitle from "../component/ThreadSpaceTitle";
import Explanation from "../component/Explanation";
import Comment from "../component/Comment";

function ThreadSpace() {
    const [threadName, setThreadName] = useState("");

    //基本的にidを受け取り、その後DBよりスレッド名を取得するものとする
    //ユーザがパラメータを悪意をもって変更する可能性があり、そのままページに表示するのは危険なため
    const { threadId } = useParams;

    useEffect(() => {
        //テストデータ threadIdをもとにDBから取得されたthread情報
        const threadDbData = {
            thread_id: 1,
            thread_name: "straykidsのらいぶについて"
        };
        setThreadName(threadDbData.thread_name);
        
    }, [])

    return(
        <div className="thread-space">
            <div className="title-container">
                <ThreadSpaceTitle title={ threadName } />
            </div>

            <div className="explanation-container">
                <Explanation 
                    content={ "test content" }
                    createdAt={ "2021/11/17 12:55:00"}
                    createdUserName={ "sho" }
                />
            </div>

            <div className="comment-container">
                <Comment />
            </div>
        </div>
    )
}

export default ThreadSpace;
