import React, { useState, useEffect } from "react";
import "../css/CategoryList.css";
import PageTitle from "../component/PageTitle";
import CategoryIcon from "@material-ui/icons/Category";
import Card from "../component/Card";
import axios from "axios";
import CreateLink from "../component/CreateLink";
import URL from "../info/Url";

function CategoryList() {
    // Message when there is no category
    const [message, setMessage] = useState("");
    // Database category infomation
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios[URL.categoryList.method](URL.categoryList.url)
        .then((res) => {
            if(res.data.data.item.length > 0) {
                setCategories(res.data.data.item);
            } else {
                setMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    // Category content for display
    let categoryContent;
    if(message !== "") {
        categoryContent = <div>{ message }</div>;
    } else {
        categoryContent = categories.map(function(category) {
            return (
                <Card
                    key={ category.category_id }
                    title={ category.category_name }
                    count={ category.board_count }
                    path={ "/boardList/" + category.category_id }
                />
            )
        })
    }

    return(
        <div className="category-list">
            <div className="title-content">
                <PageTitle Icon={ CategoryIcon } title="カテゴリー" />
            </div>

            <div className="create-link-content">
                <CreateLink
                    path="/createCategory"
                    title="カテゴリー作成ページに移動する"
                />
            </div>

            <div className="body-content">
                { categoryContent }
            </div>
        </div>
    )
}

export default CategoryList;
