import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "../css/CommentList.css";
import CommentListTitle from "../component/CommentListTitle";
import Explanation from "../component/Explanation";
import Comment from "../component/Comment";
import BreadcrumbNavigation from "../component/BreadcrumbNavigation";
import CommentForm from "../component/CommentForm";
import Validation from "../tool/Validation";
import ErrorMessage from "../component/ErrorMessage";
import { useUserContext } from "../context/User";

function CommentList() {
    const history = useHistory();

    // board id received by parameter
    const { threadId } = useParams();

    // context
    const { user, setUser } = useUserContext();
    
    // csrf token
    const [csrfToken, setCsrfToken] = useState("");

    // thread information
    const [threadInfo, setThreadInfo] = useState([])

    // Message when there is no threads
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);

    const [inputComment, setInputComment] = useState("");
    const [commentMessage, setCommentMessage] = useState("");

    // Set csrf token
    useEffect(() => {
        const csrfTokenUrl = "http://localhost:3000/GitHub/self/kchannel/backend/Api/csrfToken.php";
        axios.put(
            csrfTokenUrl,
            {
                withCredentials: true
            }
        )
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
        const fetchComment = async () => {
            axios.get(
                `http://localhost:3000/GitHub/self/kchannel/backend/Api/commentList.php?thread_id=${threadId}`
            )
            .then((res) => {
                // Be sure to set even if the number of comments is 0
                setThreadInfo(res.data.data.thread_info);

                if(res.data.data.item.length > 0) {
                    setComments(res.data.data.item);

                    // Change only when the number of items is above 0,
                    // because the initial value of commentCount is 0
                    setCommentCount(res.data.data.item.length);
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

    const createComment = () => {
        // Exit if validation check results is false
        if(!ValidationCheck()) return;

        const createUrl = "http://localhost:3000/GitHub/self/kchannel/backend/Api/createComment.php";

        axios.post(
            createUrl,
            {
                thread_id      : threadInfo.thread_id,
                comment_body   : inputComment,
                user_id        : user.user_id,
                csrf_token     : csrfToken,
                withCredentials: true
            }
        )
        .then((res) => {
            if(res.data.success) {
                // Reload this page
                history.go(0);
            } else {
                console.log(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const ValidationCheck = () => {
        const commentCheckResult = commentValidation();

        return commentCheckResult;
    }

    const commentValidation = () => {
        if(!Validation.checkNotEmpty(inputComment, setCommentMessage)) return false;

        return true;
    }

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
        <div className="comment-list">
            <div className="title-container">
                <CommentListTitle title={ threadInfo.thread_name } />
            </div>

            <div className="breadcrumb-navigation-container">
                <BreadcrumbNavigation />
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

            <div className="form-content">
                {commentMessage !== "" &&
                    <div className="error-content">
                        <ErrorMessage
                            text={ commentMessage }
                        />
                    </div>
                }
                <CommentForm
                    value={ inputComment }
                    changeFunction={ setInputComment }
                    clickFunction={ createComment }
                />
            </div>
        </div>
    )
}

export default CommentList;
