import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from '@/components/user/UserStore';
import BoardStore from '@/components/board/BoardStore';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        us:UserStore,
        bs:BoardStore,
    },
    actions:{
        
    }
})

export default store;