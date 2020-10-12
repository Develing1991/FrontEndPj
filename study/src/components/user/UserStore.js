import {fetchUserList
        ,fetchUserInfo} from '@/api/index';

export default{
    namespaced: true,
    state:{
        userList:[],
        userInfo:{},
        userInfoAdd:{},
    },
    mutations:{
        SET_USERLIST(state, data){
            if(data){
                data.forEach(element => {
                    element.checked = false
                });
            }
            state.userList = data;   
        },
        SET_USER_INFO(state, data){
            state.userInfo = data;
            state.userInfoAdd = data.address;
        }
    },
    actions:{
        async FETCH_USER_LIST({commit}){
            const response = await fetchUserList();
            commit('SET_USERLIST',response.data.content);
            return response;
        },
        async FETCH_USER_INFO({commit}, id){
            const response = await fetchUserInfo(id);
            commit('SET_USER_INFO',response.data);
            return response;
        }
    }
}