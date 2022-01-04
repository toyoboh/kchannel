import React, { useState, useEffect } from "react";
import "../css/CategoryList.css";
import PageTitle from "../component/PageTitle";
import CategoryIcon from "@material-ui/icons/Category";
import Card from "../component/Card";
import axios from "axios";
import CreateLink from "../component/CreateLink";
import URL from "../info/Url";
import InputPlusButton from "../component/InputPlusButton";
import SearchIcon from "@material-ui/icons/Search";

function CategoryList() {
    // state
    // csrf token
    const [csrfToken, setCsrfToken] = useState("");
    // search word
    const [searchWord, setSearchWord] = useState("");
    // Message when there is no category
    const [message, setMessage] = useState("");
    // Database category infomation
    const [categories, setCategories] = useState([]);

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

    const searchCategoryList = () => {
        axios[URL.searchCategoryList.method](URL.searchCategoryList.url, {
            params: {
                search_word: searchWord,
                csrf_token : csrfToken
            }
        })
        .then((res) => {
            if(res.data.data.item.length > 0) {
                setCategories(res.data.data.item);
                setMessage("");
            } else {
                setMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

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
            <div className="wrapper">
                <div className="title-content">
                    <PageTitle Icon={ CategoryIcon } title="カテゴリー" />
                </div>

                <div className="create-link-content">
                    <CreateLink
                        path="/createCategory"
                        title="カテゴリー作成ページに移動する"
                    />
                </div>

                <div className="search-content">
                    <InputPlusButton
                        value={ searchWord }
                        changeFunction={ setSearchWord }
                        buttonFunction={ searchCategoryList }
                        Icon={ SearchIcon }
                        placeholderText="カテゴリー検索"
                    />
                </div>

                <div className="body-content">
                    { categoryContent }
                </div>
            </div>
        </div>
    )
}

export default CategoryList;
