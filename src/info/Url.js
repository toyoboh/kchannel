const hostName = document.location.host;

const URL = hostName === "www.kchannel.jp" ?
{
    csrfToken: { // param: none
        method: "put",
        url   : "http://api.kchannel.jp/backend/Api/csrfToken.php"
    },
    breadcrumbInformation: { // param: pagename, id = default:false
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/breadcrumbInformation.php"
    },
    categoryList: { // param: none
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/categoryList.php"
    },
    searchCategoryList: { // param: search_word, csrf_token
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/searchCategoryList.php"
    },
    boardList: { // param: category_id
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/boardList.php"
    },
    searchBoardList: { // param: search_word, category_id, csrf_token
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/searchBoardList.php"
    },
    threadList: { // param: board_id
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/threadList.php"
    },
    fetchThreadInformation: { // param: thread_id
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/fetchThreadInformation.php"
    },
    searchThreadList: { // param: search_word, board_id, csrf_token
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/searchThreadList.php"
    },
    commentList: { // param: thread_id
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/commentList.php"
    },
    selectNewComment: { // param: thread_id, comment_id
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/selectNewComment.php"
    },
    createCategory: {
        method: "post",
        url   : "http://api.kchannel.jp/backend/Api/createCategory.php"
    },
    createBoard: { // param: category_id, board_name, board_explanation, user_id, csrf_token
        method: "post",
        url: "http://api.kchannel.jp/backend/Api/createBoard.php"
    },
    createThread: { // param: board_id, thread_name, thread_explanation, user_id, csrf_token
        method: "post",
        url   : "http://api.kchannel.jp/backend/Api/createThread.php"
    },
    createComment: { // param: thread_id, comment_body, user_id, csrf_token
        method: "post",
        url   : "http://api.kchannel.jp/backend/Api/createComment.php"
    },
    checkCategoryExists: { // param: category_id
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/checkCategoryExists.php"
    },
    checkBoardExists: { // param: board_id
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/checkBoardExists.php"
    },
    userProfile: { // param: user_id
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/userProfile.php"
    },
    updateUserProfile: { // param: user_id, user_name, introduction, csrf_token
        method: "post",
        url   : "http://api.kchannel.jp/backend/Api/updateUserProfile.php"
    },
    login: {
        method: "post",
        url   : "http://api.kchannel.jp/backend/Api/login.php"
    },
    loggedInCheck: {
        method: "post",
        url   : "http://api.kchannel.jp/backend/Api/loggedInCheck.php"
    },
    logout: { // param: none
        method: "get",
        url   : "http://api.kchannel.jp/backend/Api/logout.php"
    },
    temporaryRegistration: {
        method: "post",
        url   : "http://api.kchannel.jp/backend/Api/temporaryRegistration.php"
    },
    accountRegistration: {
        method: "post",
        url   : "http://api.kchannel.jp/backend/Api/accountRegistration.php"
    }
} : {
    csrfToken: { // param: none
        method: "put",
        url   : "http://localhost:49002/backend/Api/csrfToken.php"
    },
    breadcrumbInformation: { // param: pagename, id = default:false
        method: "get",
        url   : "http://localhost:49002/backend/Api/breadcrumbInformation.php"
    },
    categoryList: { // param: none
        method: "get",
        url   : "http://localhost:49002/backend/Api/categoryList.php"
    },
    searchCategoryList: { // param: search_word, csrf_token
        method: "get",
        url   : "http://localhost:49002/backend/Api/searchCategoryList.php"
    },
    boardList: { // param: category_id
        method: "get",
        url   : "http://localhost:49002/backend/Api/boardList.php"
    },
    searchBoardList: { // param: search_word, category_id, csrf_token
        method: "get",
        url   : "http://localhost:49002/backend/Api/searchBoardList.php"
    },
    threadList: { // param: board_id
        method: "get",
        url   : "http://localhost:49002/backend/Api/threadList.php"
    },
    fetchThreadInformation: { // param: thread_id
        method: "get",
        url   : "http://localhost:49002/backend/Api/fetchThreadInformation.php"
    },
    searchThreadList: { // param: search_word, board_id, csrf_token
        method: "get",
        url   : "http://localhost:49002/backend/Api/searchThreadList.php"
    },
    commentList: { // param: thread_id
        method: "get",
        url   : "http://localhost:49002/backend/Api/commentList.php"
    },
    selectNewComment: { // param: thread_id, comment_id
        method: "get",
        url   : "http://localhost:49002/backend/Api/selectNewComment.php"
    },
    createCategory: {
        method: "post",
        url   : "http://localhost:49002/backend/Api/createCategory.php"
    },
    createBoard: { // param: category_id, board_name, board_explanation, user_id, csrf_token
        method: "post",
        url: "http://localhost:49002/backend/Api/createBoard.php"
    },
    createThread: { // param: board_id, thread_name, thread_explanation, user_id, csrf_token
        method: "post",
        url   : "http://localhost:49002/backend/Api/createThread.php"
    },
    createComment: { // param: thread_id, comment_body, user_id, csrf_token
        method: "post",
        url   : "http://localhost:49002/backend/Api/createComment.php"
    },
    checkCategoryExists: { // param: category_id
        method: "get",
        url   : "http://localhost:49002/backend/Api/checkCategoryExists.php"
    },
    checkBoardExists: { // param: board_id
        method: "get",
        url   : "http://localhost:49002/backend/Api/checkBoardExists.php"
    },
    userProfile: { // param: user_id
        method: "get",
        url   : "http://localhost:49002/backend/Api/userProfile.php"
    },
    updateUserProfile: { // param: user_id, user_name, introduction, csrf_token
        method: "post",
        url   : "http://localhost:49002/backend/Api/updateUserProfile.php"
    },
    login: {
        method: "post",
        url   : "http://localhost:49002/backend/Api/login.php"
    },
    loggedInCheck: {
        method: "post",
        url   : "http://localhost:49002/backend/Api/loggedInCheck.php"
    },
    logout: { // param: none
        method: "get",
        url   : "http://localhost:49002/backend/Api/logout.php"
    },
    temporaryRegistration: {
        method: "post",
        url   : "http://localhost:49002/backend/Api/temporaryRegistration.php"
    },
    accountRegistration: {
        method: "post",
        url   : "http://localhost:49002/backend/Api/accountRegistration.php"
    }
}


export default URL;
