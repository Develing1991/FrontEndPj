import {fetchUserList
        ,fetchUserInfo
        ,fetchUserUpdate
        ,fetchUserDelete} from '@/api/index';

export default{
    namespaced: true,
    state:{
        userList:[],
        userInfo:{},
        userInfoAddr:{},
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
            state.userInfoAddr = data.address;
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
        },
        async FETCH_USER_UPDATE({commit},data){
            const response = await fetchUserUpdate(data.id, data);
            return response;
        }
    }
}