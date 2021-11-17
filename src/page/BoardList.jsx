import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/BoardList.css";
import PageTitle from "../component/PageTitle";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Card from "../component/Card";

function BoardList() {
    const { categoryId } = useParams();

    const [boardList, setBoardList] = useState([]);

    useEffect(()=> {
        const initialBoardList = [
            { key: 1, title: "board1", count: 1},
            { key: 2, title: "board2", count: 2},
            { key: 3, title: "board3", count: 3},
            { key: 4, title: "board4", count: 4},
            { key: 5, title: "board5", count: 5}
        ];
        setBoardList(initialBoardList);
    }, []);

    const boards = boardList.map(function(board) {
        return <Card key={ board.key } title={ board.title } count={ board.count } />
    })

    return(
        <div className="board-list">
            <div className="board-list-title">
                <PageTitle Icon={ ReceiptIcon } title="Board" />
            </div>

            <div className="board-list-body">
                { boards }
            </div>
        </div>
    )
}

export default BoardList;
