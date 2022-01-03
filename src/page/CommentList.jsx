import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
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
import DisplayProcess from "../tool/DisplayProcess";
import URL from "../info/Url";

function CommentList() {
    // board id received by parameter
    const { threadId }                        = useParams();
    
    // context
    const { user }                            = useUserContext();
    
    // csrf token
    const [csrfToken, setCsrfToken]           = useState("");
    
    // thread information
    const [threadInfo, setThreadInfo]         = useState([])
    
    // Message when there is no threads
    const [message, setMessage]               = useState("");
    const [comments, setComments]             = useState([]);
    const [commentCount, setCommentCount]     = useState(0);
    
    // Input Item
    // refs
    const inputCommentRef                     = useRef();
    // state
    const [inputComment, setInputComment]     = useState("");
    const [commentMessage, setCommentMessage] = useState("");

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

    // Get All Comments and Thread Information using Thread id
    useEffect(() => {
        axios[URL.commentList.method](URL.commentList.url, {
            params: {
                thread_id: threadId
            }
        })
        .then((res) => {
            // Be sure to set even if the number of comments is 0
            const resThreadInfo = res.data.data.thread_info;
            resThreadInfo.thread_explanation = DisplayProcess.replaceLineFeed(resThreadInfo.thread_explanation);
            setThreadInfo(resThreadInfo);

            if(res.data.data.item.length > 0) {
                setComments(res.data.data.item);
                setCommentCount(res.data.data.item.length);
            } else {
                setMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [threadId]);

    // Register a new comment in the DB
    const createComment = () => {
        // Exit if validation check results is false
        if(!ValidationCheck()) return;

        axios[URL.createComment.method](URL.createComment.url, {
            thread_id      : threadInfo.thread_id,
            comment_body   : inputComment,
            user_id        : user.user_id,
            csrf_token     : csrfToken,
            withCredentials: true
        })
        .then((res) => {
            if(res.data.success) {
                // Empty the "comment form" and "comment form state"
                inputCommentRef.current.value = "";
                setInputComment("");

                // Add the new comments
                addNewComment();
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

    // Add the new comments to the Array
    const addNewComment = () => {
        // HACK: 
        // Get the "comment id" of the last comment currently displayed
        let lastCommentId = 0
        if(commentCount > 0) {
            const commentNum = comments.length;
            lastCommentId = comments[commentNum - 1].comment_id;
        }
        
        axios[URL.selectNewComment.method](URL.selectNewComment.url, {
            params: {
                thread_id: threadInfo.thread_id,
                comment_id: lastCommentId
            }
        })
        .then((res) => {
            if(res.data.success) {
                // When the number of comments is 0, the display of "commentContent" is switched
                if(!commentCount) setMessage("");

                // Update the "comments" and "commentCount"
                setComments(prev => [...prev, ...res.data.data.item]);
                setCommentCount(prev => prev + res.data.data.item.length);
            } else {
                console.log(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Comment content for display
    let commentContent;
    if(message !== "") {
        commentContent = <div>{ message }</div>;
    } else {
        commentContent = comments.map(function(comment) {
            // Replace Line Feed(Newline) with "<br />"
            const commentBody = DisplayProcess.replaceLineFeed(comment.comment_body);

            return <Comment
                        key={ comment.comment_id }
                        createdAt={ comment.created_at }
                        comment={ commentBody }
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
                    refItem={ inputCommentRef }
                    value={ inputComment }
                    changeFunction={ setInputComment }
                    clickFunction={ createComment }
                />
            </div>
        </div>
    )
}

export default CommentList;
