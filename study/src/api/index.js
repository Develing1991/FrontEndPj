import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
})

/**
 * 유저 
 */
function fetchUserList(){
    return instance.get('/user');
}
function fetchUserInfo(id){
    return instance.get(`/user/${id}`);
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
    fetchUserInfo,
    fetchBoardList,
    fetchBoardInfo,
    fetchUserUpdate,
    fetchUserDelete,
}