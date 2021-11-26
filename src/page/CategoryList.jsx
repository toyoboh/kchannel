import React, { useState, useEffect } from "react";
import "../css/CategoryList.css";
import PageTitle from "../component/PageTitle";
import CategoryIcon from "@material-ui/icons/Category";
import Card from "../component/Card";
import axios from "axios";
import BreadcrumbNavigation from "../component/BreadcrumbNavigation";

function CategoryList() {
    // Message when there is no category
    const [message, setMessage] = useState("");
    // Database category infomation
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            axios.get(
                "http://localhost:3000/GitHub/self/kchannel/backend/Api/categoryList.php"
            )
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
        }
        fetchCategory();
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
            <div className="category-list-title">
                <PageTitle Icon={ CategoryIcon } title="Category" />
            </div><BreadcrumbNavigation />

            <div className="category-list-body">
                { categoryContent }
            </div>
        </div>
    )
}

export default CategoryList;
