import "../css/CreateCategory.css";
import AddCircleOutlineOutlinedIcon   from "@material-ui/icons/AddCircleOutlineOutlined";
import axios                          from "axios";
import BackLink                       from "../component/BackLink";
import CategoryIcon                   from "@material-ui/icons/Category";
import CreateRule                     from "../component/CreateRule";
import ErrorMessage                   from "../component/ErrorMessage";
import PageTitle                      from "../component/PageTitle";
import React, { useEffect, useState } from "react";
import UIButton                       from "../component/ui/UIButton";
import UIInput                        from "../component/ui/UIInput";
import URL                            from "../info/Url";
import { useHistory }                 from "react-router-dom";
import { useUserContext }             from "../context/User";
import Validation                     from "../tool/Validation";

function CreateCategory() {
    // History
    const history = useHistory();

    // context
    const { user } = useUserContext();

    // Message
    // Error message when category creation fails
    const [categoryNameMessage, setCategoryNameMessage]     = useState("");

    // Csrf token
    const [csrfToken, setCsrfToken] = useState("");

    // Input item
    const [inputCategoryName, setInputCategoryName] = useState("");

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

    // Create the new category
    const createCategory = () => {
        // validation check
        if(!validationCheck()) return;
        
        axios[URL.createCategory.method](URL.createCategory.url, {
            category_name  : inputCategoryName,
            account_id     : user.account_id,
            csrf_token     : csrfToken
        })
        .then((res) => {
            if(res.data.success) {
                history.push("/categoryList");
            } else {
                setCategoryNameMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const validationCheck = () => {
        const categoryNameCheckResult = categoryNameValidation();

        // Return True if each Input element is True
        return categoryNameCheckResult;
    }

    const categoryNameValidation = () => {
        if(!Validation.checkNotEmpty(inputCategoryName, setCategoryNameMessage)) return false;
        if(!Validation.checkSpecifiedNumberOfCharacters(inputCategoryName, 1, 50, setCategoryNameMessage)) return false;
        // Return True if all validation check results are True
        return true;
    }

    return(
        <div className="create-category">
            <div className="wrapper">
                <div className="title-content">
                    <PageTitle Icon={ CategoryIcon } title="?????????????????????" />
                </div>

                <div className="back-link-content">
                    <BackLink
                        path="/categoryList"
                        title="??????"
                    />
                </div>

                <div className="rule-content">
                    <CreateRule
                        title="??????"
                        body="??????????????????????????????????????????????????????????????????????????????????????????????????????"
                    />
                </div>

                <div className="form-content">
                    <div className="name-content">
                        <div className="form-item-title">??????????????????</div>
                        
                        <div className="input-content">
                            <UIInput
                                defaultValue={ inputCategoryName }
                                onChange={ (e) => setInputCategoryName(e.target.value) }
                                placeholder="??????????????????"
                            />
                        </div>

                        {categoryNameMessage !== "" &&
                        <div className="error-content">
                            <ErrorMessage text={ categoryNameMessage } />
                        </div>
                        }
                    </div>

                    <div className="button-content">
                        <UIButton
                            colorkind="green"
                            onClick={ createCategory }
                        ><AddCircleOutlineOutlinedIcon />??????
                        </UIButton>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateCategory;
