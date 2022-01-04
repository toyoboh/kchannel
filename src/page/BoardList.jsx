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

function BoardList() {
    // category id received by parameter
    const { categoryId } = useParams();

    // state
    const [csrfToken, setCsrfToken] = useState("");
    // word
    const [searchWord, setSearchWord] = useState("");
    // Message when there is no board
    const [message, setMessage] = useState("");
    // Database board infomation
    const [boards, setBoards] = useState([]);

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

    useEffect(() => {
        axios[URL.boardList.method](URL.boardList.url, {
            params: {
                category_id: categoryId
            }
        })
        .then((res) => {
            const resData = res.data;
            if(resData.data.item.length > 0) {
                setBoards(resData.data.item);
            } else {
                setMessage(resData.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [categoryId]);

    const searchBoardList = () => {
        axios[URL.searchBoardList.method](URL.searchBoardList.url, {
            params: {
                search_word: searchWord,
                category_id: categoryId,
                csrf_token : csrfToken
            }
        })
        .then((res) => {
            if(res.data.data.item.length > 0) {
                setBoards(res.data.data.item);
                setMessage("");
            } else {
                setMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Board content for display
    let boardContent;
    if(message !== "") {
        boardContent = <div>{ message }</div>;
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
                        value={ searchWord }
                        changeFunction={ setSearchWord }
                        buttonFunction={ searchBoardList }
                        Icon={ SearchIcon }
                        placeholderText="掲示板を検索する..."
                    />
                </div>

                <div className="board-list-body">
                    { boardContent }
                </div>
            </div>
        </div>
    )
}

export default BoardList;
