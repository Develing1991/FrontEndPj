import {fetchUserList
        ,fetchUserDuple
        ,fetchUserInfo
        ,fetchUserUpdate
        ,fetchUserCreate
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
            try {
                const response = await fetchUserList(data);
                var paging = {
                    "totalElements" : response.data.totalElements,
                    "totalPages" : response.data.totalPages,
                }
                commit('SET_USERLIST',response.data.content);
                commit('SET_USERLIST_PAGE',paging);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        async FETCH_USER_DUPL({commit},data){
            try {
                const response = await fetchUserDuple(data);
                return response;   
            } catch (error) {
                console.log(error);
            }
        },
        async FETCH_USER_INFO({commit}, id){
            try {
                const response = await fetchUserInfo(id);
                commit('SET_USER_INFO',response.data);
                return response;   
            } catch (error) {
                console.log(error);
            }
        },
        async FETCH_USER_CREATE({commit},data){
            try {
                const response = await fetchUserCreate(data);
                return response;   
            } catch (error) {
                console.log(error);
            }
        },
        async FETCH_USER_UPDATE({commit},data){
            try {
                const response = await fetchUserUpdate(data);
                return response;   
            } catch (error) {
                console.log(error);
            }
        },
        async FETCH_USER_DELETE({commit},id){
            try {
                const response = await fetchUserDelete(id);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
    }
}