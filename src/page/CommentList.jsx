import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/CommentList.css";
import CommentListTitle from "../component/CommentListTitle";
import Explanation from "../component/Explanation";
import Comment from "../component/Comment";

function CommentList() {
    // board id received by parameter
    const { threadId } = useParams();

    //
    const [threadInfo, setThreadInfo] = useState({
        thread_id: "thread1",
        thread_name: "ソリクン",
        thread_explanation: "explanation",
        created_at: "2021/11/11",
        created_user_name: "sho"
    });
    // Message when there is no threads
    const [message, setMessage] = useState("");
    // Database thread infomation
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        const fetchComment = async () => {
            axios.get(
                `http://localhost:3000/GitHub/self/kchannel/backend/Api/commentList.php?thread_id=${threadId}`
            )
            .then((res) => {
                if(res.data.data.length > 0) {
                    setComments(res.data.data);
                    setCommentCount(res.data.data.length);
                } else {
                    setMessage(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        fetchComment();
    }, [threadId]);

    // Comment content for display
    let commentContent;
    if(message !== "") {
        commentContent = <div>{ message }</div>;
    } else {
        commentContent = comments.map(function(comment) {
            return <Comment
                    key={ comment.comment_id }
                    createdAt={ comment.created_at }
                    comment={ comment.comment_body }
                    createdUserName={ comment.created_user_name }
                    />;
        })
    }

    return(
        <div className="thread-space">
            <div className="title-container">
                <CommentListTitle title={ threadInfo.thread_name } />
            </div>

            <div className="explanation-container">
                <Explanation 
                    content={ threadInfo.thread_explanation }
                    createdAt={ threadInfo.created_at }
                    createdUserName={ threadInfo.created_user_name }
                />
            </div>

            <div className="total-comment-container">
                コメント：全{ commentCount }件
            </div>

            <div className="comment-container">
                { commentContent }
            </div>
        </div>
    )
}

export default CommentList;
