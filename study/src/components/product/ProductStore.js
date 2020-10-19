import {fetchProductList,
        fetchProductInfo,
        fetchProductCreate,
        fetchProductUpdate,
        fetchProductDelete,} from '@/api/index';
    
export default{
    namespaced: true,
    state:{
        productList:[],
        productInfo:{},
        pagingData:{},
    },
mutations:{
    SET_PRODUCTLIST(state, data){
        if(data){
            data.forEach(element => {
                element.checked = false
            });
        }
        state.productList = data;   
    },
    SET_PODUCTLIST_PAGE(state, data){
        state.pagingData = data;
    },
    SET_PRODUCT_INFO(state, data){
        state.productInfo = data;
    },
    
},
actions:{
    async FETCH_PRODUCT_LIST({commit},data){
        try {
            const response = await fetchProductList(data);
            var paging = {
                "totalElements" : response.data.totalElements,
                "totalPages" : response.data.totalPages,
            }
            commit('SET_PRODUCTLIST',response.data.content);
            commit('SET_PODUCTLIST_PAGE',paging);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async FETCH_PRODUCT_INFO({commit}, data){
        try {
            const response = await fetchProductInfo(data);
            commit('SET_PRODUCT_INFO',response.data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async FETCH_PRODUCT_CREATE({commit},data){
        try {
            const response = await fetchProductCreate(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async FETCH_PRODUCT_UPDATE({commit},data){
        try {
            const response = await fetchProductUpdate(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async FETCH_PRODUCT_DELETE({commit},data){
        try {
            const response = await fetchProductDelete(data);
            return response;   
        } catch (error) {
            console.log(error);
        }
    },
}
}