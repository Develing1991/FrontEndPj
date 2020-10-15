import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
})

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
function fetchUserUpdate(id, updateData){
    delete updateData.id;
    return instance.post(`/user/${id}`, updateData);
}
function fetchUserDelete(id){
    return instance.delete(`/user/${id}`);
}

function fetchBoardList(){
    return instance.get('/board');
}
function fetchBoardInfo(id){
    return instance.get(`/board/${id}`);
}

export {
    fetchUserList,
    fetchUserDuple,
    fetchUserInfo,
    fetchBoardList,
    fetchBoardInfo,
    fetchUserUpdate,
    fetchUserDelete,
    fetchUserCreate,
    
    
}