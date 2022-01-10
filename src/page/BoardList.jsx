import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/BoardList.css";
import PageTitle from "../component/PageTitle";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SearchIcon from "@material-ui/icons/Search";
import Card from "../component/Card";
import BreadcrumbNavigation from "../component/BreadcrumbNavigation";
import CreateLink from "../component/CreateLink";
import URL from "../info/Url";
import InputPlusButton from "../component/InputPlusButton";
import NoContent from "../component/NoContent";

function BoardList() {
    // category id received by parameter
    const { categoryId } = useParams();

    // state
    const [csrfToken, setCsrfToken] = useState("");
    // // word
    // const [searchWord, setSearchWord] = useState("");
    // // Message when there is no board
    // const [message, setMessage] = useState("");
    // // Database board infomation
    // const [boards, setBoards] = useState([]);
    // state
    // initail process
    const [initialLoading, setInitialLoading] = useState(true);
    const [categoryExists, setCategoryExists] = useState(false);
    // board
    const [boards, setBoards] = useState([]);
    const [boardCount, setBoardCount] = useState(0);
    // input item
    const [inputSearchWord, setInputSearchWord] = useState("");
    // message
    const [contentMessage, setContentMessage] = useState("");

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

    // check if the category exists
    useEffect(() => {
        axios[URL.fetchCategoryInformation.method](URL.fetchCategoryInformation.url, {
            params: {
                category_id: categoryId
            }
        })
        .then((res) => {
            if(res.data.success) {
                setCategoryExists(true);
            } else {
                setCategoryExists(false);
                setInitialLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [categoryId])

    useEffect(() => {
        if(!categoryExists) return;

        axios[URL.boardList.method](URL.boardList.url, {
            params: {
                category_id: categoryId
            }
        })
        .then((res) => {
            if(res.data.success) {
                setBoards(res.data.data.boards);
                setBoards(res.data.data.boards.length);
                setContentMessage("");
            } else {
                setBoards([]);
                setBoardCount(0);
                setContentMessage(res.data.message);
            }
            setInitialLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [categoryId, categoryExists]);

    /**
     * Search boards
     */
    const searchBoardList = () => {
        axios[URL.searchBoardList.method](URL.searchBoardList.url, {
            params: {
                search_word: inputSearchWord,
                category_id: categoryId,
                csrf_token : csrfToken
            }
        })
        .then((res) => {
            if(res.data.success) {
                setBoards(res.data.data.boards);
                setBoards(res.data.data.boards.length);
                setContentMessage("");
            } else {
                setBoards([]);
                setBoardCount(0);
                setContentMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Board content for display
    let boardContent;
    if(!boardCount) {
        boardContent = <div>{ contentMessage }</div>;
    } else {
        boardContent = boards.map(function(board) {
            return <Card
                    key={ board.board_id }
                    title={ board.board_name }
                    count={ board.thread_count }
                    path={ "/threadList/" + board.board_id }
                    />;
        })
    }

    return(
        <div className="board-list">
            <div className="wrapper">

                {initialLoading ? (
                    <div>Now initialLoading</div>
                ) : (<>

                    {!categoryExists ? (
                        <NoContent text="存在しないカテゴリーです。" />
                    ) : (<>

                    <div className="board-list-title">
                        <PageTitle Icon={ ReceiptIcon } title="掲示板" />
                    </div>

                    <div className="breadcrumb-navigation-container">
                        <BreadcrumbNavigation />
                    </div>

                    <div className="create-link-content">
                        <CreateLink
                            path={ "/createBoard/" + categoryId }
                            title="掲示板作成ページに移動する"
                        />
                    </div>

                    <div className="search-content">
                        <InputPlusButton
                            value={ inputSearchWord }
                            changeFunction={ setInputSearchWord }
                            buttonFunction={ searchBoardList }
                            Icon={ SearchIcon }
                            placeholderText="掲示板を検索する..."
                        />
                    </div>

                    <div className="board-list-body">
                        { boardContent }
                    </div>

                    </>)}

                </>)}

            </div>
        </div>
    )
}

export default BoardList;
