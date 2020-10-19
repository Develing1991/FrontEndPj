import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
})

/**
 * 로그인 관련
 */
function fetchLogin(data){
    return instance.post(`/login`,data);
}


/**
 * 유저 
 */
function fetchUserList(data){ 
    return instance.post(`/userlist?page=${data.page}&size=${data.size}`,data);
}
function fetchUserDuple(data){ //아이디 중복
    return instance.post(`/userlist`,data);
}
function fetchUserInfo(id){
    return instance.get(`/user/${id}`);
}
function fetchUserCreate(data){
    return instance.post(`/user`,data);
}
function fetchUserUpdate(data){
    return instance.post(`/user/${data.id}`, data.updateData);
}
function fetchUserDelete(id){
    return instance.delete(`/user/${id}`);
}

/**
 * 게시판
 */
function fetchBoardList(data){ //검색 다른방식으로
    return instance.get(`/board/list/${data.type}?page=${data.page}&size=${data.size}&title=${data.title}`); 
}
function fetchBoardInfo(id){
    return instance.get(`/board/${id}`);
}
function fetchBoardCreate(data){
    return instance.post('/board',data);
}
function fetchBoardUpdate(data){
    return instance.post(`/board/${data.id}`,data.updateData);
}
function fetchBoardDelete(id){
    return instance.delete(`/board/${id}`);
}

/**
 * 상품
 */
function fetchProductList(data){ //검색 다른방식으로
    return instance.get(`/product/list/${data.cate}?page=${data.page}&size=${data.size}&name=${data.name}`); 
}
function fetchProductInfo(data){
    return instance.get(`/product/${data.cate}/${data.id}`);
}
function fetchProductCreate(data){
    return instance.post(`/product/${data.cate}`,data);
}
function fetchProductUpdate(data){
    return instance.post(`/product/${data.updateData.cate}/${data.id}`,data.updateData);
}
function fetchProductDelete(data){
    return instance.delete(`/product/${data.cate}/${data.id}`);
}

export {
    fetchLogin,

    fetchUserList,
    fetchUserDuple,
    fetchUserInfo,
    fetchUserUpdate,
    fetchUserDelete,
    fetchUserCreate,

    fetchBoardList,
    fetchBoardInfo,
    fetchBoardCreate,
    fetchBoardUpdate,
    fetchBoardDelete,
    
    fetchProductList,
    fetchProductInfo,
    fetchProductCreate,
    fetchProductUpdate,
    fetchProductDelete,
}