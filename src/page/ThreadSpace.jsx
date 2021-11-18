import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ThreadSpace.css";
import ThreadSpaceTitle from "../component/ThreadSpaceTitle";
import Explanation from "../component/Explanation";
import Comment from "../component/Comment";

function ThreadSpace() {
    const [threadInfo, setThreadInfo] = useState("");
    const [threadComment, setThreadComment] = useState([]);

    //基本的にidを受け取り、その後DBよりスレッド名を取得するものとする
    //ユーザがパラメータを悪意をもって変更する可能性があり、そのままページに表示するのは危険なため
    const { threadId } = useParams();

    useEffect(() => {
        //テストデータ threadIdをもとにDBから取得されたthread情報
        const threadDbData = {
            thread_id: 1,
            thread_name: "straykidsのらいぶについて",
            thread_explanation: "こんにちは、特に説明はありません",
            created_at: "2021/11/17 12:55:00",
            created_user_name: "user"
        };
        const threadCommentDbData = [
            { comment_id: 1, comment_content: "comment1", created_at: "2021/11/18 00:14:00", created_user_name: "user" },
            { comment_id: 2, comment_content: "comment2", created_at: "2021/11/18 00:15:00", created_user_name: "user" },
            { comment_id: 3, comment_content: "comment3", created_at: "2021/11/18 00:18:00", created_user_name: "user" }
        ]
        setThreadInfo(threadDbData);
        setThreadComment(threadCommentDbData);
        
    }, [])

    const comments = threadComment.map(function(comment) {
        return <Comment
                key={ comment.comment_id }
                createdAt={ comment.created_at }
                comment={ comment.comment_content }
                createdUserName={ comment.created_user_name }
                />;
    })

    return(
        <div className="thread-space">
            <div className="title-container">
                <ThreadSpaceTitle title={ threadInfo.thread_name } />
            </div>

            <div className="explanation-container">
                <Explanation 
                    content={ threadInfo.thread_explanation }
                    createdAt={ threadInfo.created_at }
                    createdUserName={ threadInfo.created_user_name }
                />
            </div>

            <div className="total-comment-container">
                コメント：全102件
            </div>

            <div className="comment-container">
                { comments }
            </div>
        </div>
    )
}

export default ThreadSpace;
