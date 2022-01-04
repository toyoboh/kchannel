const URL = {
    csrfToken: { // param: none
        method: "put",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/csrfToken.php"
    },
    breadcrumbInformation: { // param: pagename, id = default:false
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/breadcrumbInformation.php"
    },
    categoryList: { // param: none
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/categoryList.php"
    },
    searchCategoryList: { // param: search_word, csrf_token
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/searchCategoryList.php"
    },
    boardList: { // param: category_id
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/boardList.php"
    },
    searchBoardList: { // param: search_word, category_id, csrf_token
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/searchBoardList.php"
    },
    threadList: { // param: board_id
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/threadList.php"
    },
    commentList: { // param: thread_id
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/commentList.php"
    },
    selectNewComment: { // param: thread_id, comment_id
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/selectNewComment.php"
    },
    createCategory: {
        method: "post",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/createCategory.php"
    },
    createBoard: { // param: category_id, board_name, board_explanation, user_id, csrf_token
        method: "post",
        url: "http://localhost:3000/GitHub/self/kchannel/backend/Api/createBoard.php"
    },
    createThread: { // param: board_id, thread_name, thread_explanation, user_id, csrf_token
        method: "post",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/createThread.php"
    },
    createComment: { // param: thread_id, comment_body, user_id, csrf_token
        method: "post",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/createComment.php"
    },
    checkCategoryExists: { // param: category_id
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/checkCategoryExists.php"
    },
    checkBoardExists: { // param: board_id
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/checkBoardExists.php"
    },
    userProfile: { // param: user_id
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/userProfile.php"
    },
    updateUserProfile: { // param: user_id, user_name, introduction, csrf_token
        method: "post",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/updateUserProfile.php"
    },
    login: {
        method: "post",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/login.php"
    },
    loggedInCheck: {
        method: "post",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/loggedInCheck.php"
    },
    logout: { // param: none
        method: "get",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/logout.php"
    },
    temporaryRegistration: {
        method: "post",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/temporaryRegistration.php"
    },
    accountRegistration: {
        method: "post",
        url   : "http://localhost:3000/GitHub/self/kchannel/backend/Api/accountRegistration.php"
    }
}

export default URL;
