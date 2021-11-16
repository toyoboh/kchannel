import React, { useState, useEffect } from "react";
import "../css/CategoryList.css";
import PageTitle from "../component/PageTitle";
import CategoryIcon from "@material-ui/icons/Category";
import Card from "../component/Card";

function CategoryList() {
    const [cardList, setCardList] = useState([]);
    
    useEffect(() => {
        const initialCardList = [
            { key: 1, title: "音楽", count: 1 },
            { key: 2, title: "アイドル", count: 2 },
            { key: 3, title: "美容", count: 3 },
            { key: 4, title: "料理", count: 4 },
            { key: 5, title: "ドラマ", count: 5 }
        ];
        setCardList(initialCardList);
    }, []);

    const Cards = cardList.map(function(card) {
        return <Card key={ card.key } title={ card.title } count={ card.count } />
    })

    console.log(Cards);

    return(
        <div className="category-list">
            <div className="category-list-title">
                <PageTitle Icon={ CategoryIcon } title="Category" />
            </div>

            <div className="category-list-body">
                { Cards }
            </div>
        </div>
    )
}

export default CategoryList;
