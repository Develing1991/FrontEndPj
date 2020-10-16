import {fetchBoardList,
        fetchBoardInfo,
        fetchBoardCreate,
        fetchBoardUpdate,
        fetchBoardDelete,} from '@/api/index';

export default{
    namespaced: true,
    state:{
        boardList:[],
        boardInfo:{},
        pagingData:{},
    },
    mutations:{
        SET_BOARDLIST(state, data){
            if(data){
                data.forEach(element => {
                    element.checked = false
                });
            }
            state.boardList = data;   
        },
        SET_BOARDLIST_PAGE(state, data){
            state.pagingData = data;
        },
        SET_BOARD_INFO(state, data){
            state.boardInfo = data;
        },
        
    },
    actions:{
        async FETCH_BOARD_LIST({commit},data){
            try {
                const response = await fetchBoardList(data);
                var paging = {
                    "totalElements" : response.data.totalElements,
                    "totalPages" : response.data.totalPages,
                }
                commit('SET_BOARDLIST',response.data.content);
                commit('SET_BOARDLIST_PAGE',paging);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        async FETCH_BOARD_INFO({commit}, id){
            try {
                const response = await fetchBoardInfo(id);
                commit('SET_BOARD_INFO',response.data);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        async FETCH_BOARD_CREATE({commit},data){
            try {
                const response = await fetchBoardCreate(data);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        async FETCH_BOARD_UPDATE({commit},data){
            try {
                const response = await fetchBoardUpdate(data);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        async FETCH_BOARD_DELETE({commit},id){
            try {
                const response = await fetchBoardDelete(id);
                return response;   
            } catch (error) {
                console.log(error);
            }
        },
    }
}