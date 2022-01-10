import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/CommentList.css";
import CommentListTitle from "../component/CommentListTitle";
import Explanation from "../component/Explanation";
import CommentItem from "../component/CommentItem";
import BreadcrumbNavigation from "../component/BreadcrumbNavigation";
import CommentForm from "../component/CommentForm";
import Validation from "../tool/Validation";
import ErrorMessage from "../component/ErrorMessage";
import { useUserContext } from "../context/User";
import DisplayProcess from "../tool/DisplayProcess";
import URL from "../info/Url";

function CommentList() {
    // thread id received by parameter
    const { threadId }                              = useParams();
    
    // context
    const { user }                                  = useUserContext();
    
    // state
    // csrf token
    const [csrfToken, setCsrfToken]                 = useState("");
    // initial process flag
    const [initialLoading, setInitialLoading]       = useState(true);
    const [threadExists, setThreadExists]           = useState(false);
    // information to display
    const [threadInformation, setThreadInformation] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount]           = useState(0);
    // input items
    const [inputComment, setInputComment]           = useState("");
    // error message of the input item
    const [commentMessage, setCommentMessage]       = useState("");
    
    // refs
    // the ref element to clear of input information 
    const inputCommentRef                     = useRef();

    // Set CSRF Token
    useEffect(() => {
        axios[URL.csrfToken.method](URL.csrfToken.url)
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
     * get thread information
     */
    useEffect(() => {
        axios[URL.fetchThreadInformation.method](URL.fetchThreadInformation.url, {
            params: {
                thread_id: threadId
            }
        })
        .then((res) => {
            // It's true if thread information exist.
            if(res.data.success) {
                setThreadExists(true);

                // Perform line break processing in thread explanation.
                const tempThreadInformation = res.data.data.thread_information;
                tempThreadInformation.thread_explanation = DisplayProcess.replaceLineFeed(tempThreadInformation.thread_explanation);
                
                setThreadInformation(tempThreadInformation);
            } else {
                setThreadExists(false);
                setThreadInformation([]);
                // exit initial loading
                setInitialLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [threadId])

    /**
     * Get comment data if thread information exist.
     */
    useEffect(() => {
        if(!threadExists) return;

        axios[URL.commentList.method](URL.commentList.url, {
            params: {
                thread_id: threadId
            }
        })
        .then((res) => {
            if(res.data.success) {
                setComments(res.data.data.comments);
                setCommentCount(res.data.data.comment_count);
            } else {
                setComments([]);
                setCommentCount(0);
            }
            // exit initial loading
            setInitialLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [threadId, threadExists])

    /**
     * @param {void}
     * @returns {void}
     * 
     */
    const clickCreateButton = () => {
        // validation check
        if(!ValidationCheck()) return;

        // create
        axios[URL.createComment.method](URL.createComment.url, {
            csrf_token  : csrfToken,
            thread_id   : threadId,
            comment_body: inputComment,
            user_id     : user.user_id
        })
        .then((res) => {
            if(res.data.success) {
                // Empty the "comment form" and "comment form state" and "error message of the form"
                inputCommentRef.current.value = "";
                setInputComment("");
                setCommentMessage("");

                // load new comment
                loadNewComment();
            } else {
                setCommentMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    /**
     * Update comment data if new comments exist.
     */
    const loadNewComment = () => {
        const lastCommentId = searchLastCommentId();
        
        axios[URL.selectNewComment.method](URL.selectNewComment.url, {
            params: {
                thread_id : threadId,
                comment_id: lastCommentId
            }
        })
        .then((res) => {
            if(res.data.success) {
                // Update the "comments" and "commentCount"
                setComments(prev => [...prev, ...res.data.data.comments]);
                setCommentCount(prev => prev + res.data.data.comments.length);
            } else {
                console.log("新しいコメントはありませんでした。");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    /**
     * @returns {integer} lastCommentId
     * HACK: 
     * Get the "comment id" of the last comment currently displayed
     */
         const searchLastCommentId = () => {
            let lastCommentId = 0
            if(commentCount > 0) {
                const commentNum = comments.length;
                lastCommentId = comments[commentNum - 1].comment_id;
            }
            return lastCommentId;
        }

    /**
     * @returns {boolean}
     * Check all validations on the form.
     * Returns ture only if all are true.
     */
    const ValidationCheck = () => {
        const commentCheckResult = commentValidation();

        return commentCheckResult;
    }

    /**
     * @returns {boolean}
     * Check the validation of the comment form.
     */
    const commentValidation = () => {
        if(!Validation.checkNotEmpty(inputComment, setCommentMessage)) return false;

        return true;
    }

    // Comment content for display
    let commentContent;
    if(!commentCount) {
        commentContent = <div>このスレッドにはまだコメントがありません。初めてのコメントをしましょう！</div>;
    } else {
        commentContent = comments.map(function(comment) {
            // Replace Line Feed(Newline) with "<br />"
            const commentBody = DisplayProcess.replaceLineFeed(comment.comment_body);

            return <CommentItem
                        key={ comment.comment_id }
                        createdAt={ comment.created_at }
                        comment={ commentBody }
                        createdUserName={ comment.created_user_name }
                    />;
        })
    }

    return(
        <div className="comment-list">
            <div className="wrapper">

                {initialLoading ? (

                <div>Now Initial Loading</div>

                ) : (<>

                    {!threadExists ? (

                        <div>
                            <p>存在しないスレッドIDです</p>
                            <p><Link to="categoryList">カテゴリ一覧ページ</Link>へ戻る</p>
                        </div>

                    ) : (<>

                    <div className="title-container">
                        <CommentListTitle title={ threadInformation.thread_name } />
                    </div>

                    <div className="breadcrumb-navigation-container">
                        <BreadcrumbNavigation />
                    </div>

                    <div className="explanation-container">
                        <Explanation 
                            content={ threadInformation.thread_explanation }
                            createdAt={ threadInformation.created_at }
                            createdUserName={ threadInformation.created_user_name }
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
                            clickFunction={ clickCreateButton }
                        />
                    </div>

                    </>)}
                
                </>)}

            </div>
        </div>
    )
}

export default CommentList;
