import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/BoardList.css";
import PageTitle from "../component/PageTitle";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Card from "../component/Card";
import BreadcrumbNavigation from "../component/BreadcrumbNavigation";

function BoardList() {
    // category id received by parameter
    const { categoryId } = useParams();

    // Message when there is no board
    const [message, setMessage] = useState("");
    // Database board infomation
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        const fetchBoard = async () => {
            axios.get(
                `http://localhost:3000/GitHub/self/kchannel/backend/Api/boardList.php?category_id=${categoryId}`
            )
            .then((res) => {
                if(res.data.data.item.length > 0) {
                    setBoards(res.data.data.item);
                } else {
                    setMessage(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        fetchBoard();
    }, [categoryId]);

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
            <div className="board-list-title">
                <PageTitle Icon={ ReceiptIcon } title="Board" />
            </div>
            
            <div className="breadcrumb-navigation-container">
                <BreadcrumbNavigation />
            </div>

            <div className="board-list-body">
                { boardContent }
            </div>
        </div>
    )
}

export default BoardList;
