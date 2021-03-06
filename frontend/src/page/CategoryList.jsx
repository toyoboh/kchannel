import "../css/CategoryList.css";
import Authorization                  from "../tool/Authorization";
import axios                          from "axios";
import Card                           from "../component/Card";
import CategoryOutlinedIcon           from "@material-ui/icons/CategoryOutlined";
import CreateLink                     from "../component/CreateLink";
import PageTitle                      from "../component/PageTitle";
import React, { useState, useEffect } from "react";
import ReceiptOutlinedIcon                    from "@material-ui/icons/ReceiptOutlined";
import UISearchInput                  from "../component/ui/UISearchInput";
import URL                            from "../info/Url";
import { useUserContext }             from "../context/User";

function CategoryList() {
    const { user }                            = useUserContext();
    const authorization                       = new Authorization(user.authority);
    
    // state
    // initail loaging
    const [initialLoading, setInitialLoading] = useState(true);
    // csrf token
    const [csrfToken, setCsrfToken]           = useState("");
    // search word
    const [searchWord, setSearchWord]         = useState("");
    // Message when there is no category
    const [message, setMessage]               = useState("");
    // Database category infomation
    const [categories, setCategories]         = useState([]);

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
            if(res.data.success) {
                setCategories(res.data.data.categories);
                setMessage("");
            } else {
                setMessage(res.data.message);
            }
            setInitialLoading(false);
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
            if(res.data.success) {
                setCategories(res.data.data.categories);
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
                    createdAt={ category.created_at }
                    path={ "/boardList/" + category.category_id }
                    Icon={ ReceiptOutlinedIcon }
                />
            )
        })
    }

    return(
        <div className="category-list">
            <div className="wrapper">
                
                {initialLoading ? (
                <div>Now initial loading</div>
                ) : (<>

                <div className="title-content">
                    <PageTitle Icon={ CategoryOutlinedIcon } title="???????????????" />
                </div>

                {authorization.createCategory() &&
                <div className="create-link-content">
                    <CreateLink
                        path="/createCategory"
                        title="?????????????????????????????????????????????"
                    />
                </div>
                }

                <div className="search-content">
                    <UISearchInput
                        value={ searchWord }
                        placeholder={ "?????????????????????" }
                        clickFunction={ searchCategoryList }
                        changeFunction={ setSearchWord }
                    />
                </div>

                <div className="body-content">
                    { categoryContent }
                </div>
                
                </>)}
            </div>
        </div>
    )
}

export default CategoryList;
