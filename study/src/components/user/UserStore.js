import {fetchUserList
        ,fetchUserInfo
        ,fetchUserUpdate
        ,fetchUserDelete} from '@/api/index';

export default{
    namespaced: true,
    state:{
        userList:[],
        userInfo:{},
        pagingData:{},
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
        SET_USERLIST_PAGE(state, data){
            state.pagingData = data;
        },
        SET_USER_INFO(state, data){
            state.userInfo = data;
            state.userInfoAddr = data.address;
        }
    },
    actions:{
        async FETCH_USER_LIST({commit},data){
            const response = await fetchUserList(data);
            commit('SET_USERLIST',response.data.content);
            var paging = {
                "totalElements" : response.data.totalElements,
                "totalPages" : response.data.totalPages,
            }
            commit('SET_USERLIST',response.data.content);
            commit('SET_USERLIST_PAGE',paging);
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