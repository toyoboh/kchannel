const hostName = document.location.host;
const domain   = "kchannel.jp";

const URL = hostName.indexOf(domain) > -1 ?
{
    csrfToken: { // param: none
        method: "put",
        url   : "https://api.kchannel.jp/backend/src/Api/csrfToken.php"
    },
    breadcrumbInformation: { // param: pagename, id = default:false
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/breadcrumbInformation.php"
    },
    categoryList: { // param: none
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/categoryList.php"
    },
    searchCategoryList: { // param: search_word, csrf_token
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/searchCategoryList.php"
    },
    boardList: { // param: category_id
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/boardList.php"
    },
    searchBoardList: { // param: search_word, category_id, csrf_token
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/searchBoardList.php"
    },
    threadList: { // param: board_id
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/threadList.php"
    },
    fetchThreadInformation: { // param: thread_id
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/fetchThreadInformation.php"
    },
    fetchBoardInformation: { // param: board_id
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/fetchBoardInformation.php"
    },
    fetchCategoryInformation: { // param: category_id
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/fetchCategoryInformation.php"
    },
    searchThreadList: { // param: search_word, board_id, csrf_token
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/searchThreadList.php"
    },
    commentList: { // param: thread_id
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/commentList.php"
    },
    selectNewComment: { // param: thread_id, comment_id
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/selectNewComment.php"
    },
    createCategory: { // param: category_name, id(t_users), csrf_token
        method: "post",
        url   : "https://api.kchannel.jp/backend/src/Api/createCategory.php"
    },
    createBoard: { // param: category_id, board_name, board_explanation, id, csrf_token
        method: "post",
        url: "https://api.kchannel.jp/backend/src/Api/createBoard.php"
    },
    createThread: { // param: board_id, thread_name, thread_explanation, user_id, csrf_token
        method: "post",
        url   : "https://api.kchannel.jp/backend/src/Api/createThread.php"
    },
    createComment: { // param: thread_id, comment_body, user_id, csrf_token
        method: "post",
        url   : "https://api.kchannel.jp/backend/src/Api/createComment.php"
    },
    checkCategoryExists: { // param: category_id
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/checkCategoryExists.php"
    },
    userProfile: { // param: user_id
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/userProfile.php"
    },
    updateUserProfile: { // param: id, user_name, introduction, csrf_token
        method: "post",
        url   : "https://api.kchannel.jp/backend/src/Api/updateUserProfile.php"
    },
    login: {
        method: "post",
        url   : "https://api.kchannel.jp/backend/src/Api/login.php"
    },
    loggedInCheck: {
        method: "post",
        url   : "https://api.kchannel.jp/backend/src/Api/loggedInCheck.php"
    },
    logout: { // param: none
        method: "get",
        url   : "https://api.kchannel.jp/backend/src/Api/logout.php"
    },
    temporaryRegistration: {
        method: "post",
        url   : "https://api.kchannel.jp/backend/src/Api/temporaryRegistration.php"
    },
    accountRegistration: {
        method: "post",
        url   : "https://api.kchannel.jp/backend/src/Api/accountRegistration.php"
    }
} : {
    csrfToken: { // param: none
        method: "put",
        url   : "http://localhost:49002/backend/src/Api/csrfToken.php"
    },
    breadcrumbInformation: { // param: pagename, id = default:false
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/breadcrumbInformation.php"
    },
    categoryList: { // param: none
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/categoryList.php"
    },
    searchCategoryList: { // param: search_word, csrf_token
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/searchCategoryList.php"
    },
    boardList: { // param: category_id
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/boardList.php"
    },
    searchBoardList: { // param: search_word, category_id, csrf_token
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/searchBoardList.php"
    },
    threadList: { // param: board_id
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/threadList.php"
    },
    fetchThreadInformation: { // param: thread_id
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/fetchThreadInformation.php"
    },
    fetchBoardInformation: { // param: board_id
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/fetchBoardInformation.php"
    },
    fetchCategoryInformation: { // param: category_id
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/fetchCategoryInformation.php"
    },
    searchThreadList: { // param: search_word, board_id, csrf_token
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/searchThreadList.php"
    },
    commentList: { // param: thread_id
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/commentList.php"
    },
    selectNewComment: { // param: thread_id, comment_id
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/selectNewComment.php"
    },
    createCategory: { // param: category_name, id(t_users), csrf_token
        method: "post",
        url   : "http://localhost:49002/backend/src/Api/createCategory.php"
    },
    createBoard: { // param: category_id, board_name, board_explanation, id, csrf_token
        method: "post",
        url: "http://localhost:49002/backend/src/Api/createBoard.php"
    },
    createThread: { // param: board_id, thread_name, thread_explanation, user_id, csrf_token
        method: "post",
        url   : "http://localhost:49002/backend/src/Api/createThread.php"
    },
    createComment: { // param: thread_id, comment_body, user_id, csrf_token
        method: "post",
        url   : "http://localhost:49002/backend/src/Api/createComment.php"
    },
    checkCategoryExists: { // param: category_id
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/checkCategoryExists.php"
    },
    userProfile: { // param: user_id
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/userProfile.php"
    },
    updateUserProfile: { // param: id, user_name, introduction, csrf_token
        method: "post",
        url   : "http://localhost:49002/backend/src/Api/updateUserProfile.php"
    },
    login: {
        method: "post",
        url   : "http://localhost:49002/backend/src/Api/login.php"
    },
    loggedInCheck: {
        method: "post",
        url   : "http://localhost:49002/backend/src/Api/loggedInCheck.php"
    },
    logout: { // param: none
        method: "get",
        url   : "http://localhost:49002/backend/src/Api/logout.php"
    },
    temporaryRegistration: {
        method: "post",
        url   : "http://localhost:49002/backend/src/Api/temporaryRegistration.php"
    },
    accountRegistration: {
        method: "post",
        url   : "http://localhost:49002/backend/src/Api/accountRegistration.php"
    }
}


export default URL;
