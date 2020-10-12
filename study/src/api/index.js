import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
})

function fetchUserList(){
    return instance.get('/user');
}
function fetchUserInfo(id){
    return instance.get(`/user/${id}`);
}

export {
    fetchUserList,
    fetchUserInfo,
}