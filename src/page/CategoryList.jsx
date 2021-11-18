import React, { useState, useEffect } from "react";
import "../css/CategoryList.css";
import PageTitle from "../component/PageTitle";
import CategoryIcon from "@material-ui/icons/Category";
import Card from "../component/Card";
import axios from "axios";

function CategoryList() {
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            axios.get(
                "http://localhost:8888/GitHub/self/kchannel/backend/Api/searchCategoryList.php"
            )
            .then((res) => {
                setCategoryData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        fetchCategory();
    }, []);

    //取得されたcategoryの数によって処理を分岐
    let categoryContent = null;
    if(categoryData === null) {
        categoryContent = <div>表示するcategoryはありません</div>
    } else {
        categoryContent = categoryData.map(function(category) {
            return <Card
                    key={ category.category_id }
                    title={ category.category_name }
                    count={ category.count }
                    />
        })
    }

    return(
        <div className="category-list">
            <div className="category-list-title">
                <PageTitle Icon={ CategoryIcon } title="Category" />
            </div>

            <div className="category-list-body">
                { categoryContent }
            </div>
        </div>
    )
}

export default CategoryList;
