import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from '@/components/user/UserStore';
import BoardStore from '@/components/board/BoardStore';
import ProductStore from '@/components/product/ProductStore';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        us:UserStore,
        bs:BoardStore,
        ps:ProductStore,
    },
    actions:{
        
    }
})

export default store;