import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from '@/components/user/UserStore';
import {fetchUserList} from '@/api/index';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        us:UserStore,
    },
    actions:{
        FETCH_USER_LIST1({commit}){
             //fetchUserList()
             console.log('fdgfd');
             //console.log(response);
             //return;
        }
    }
})

export default store;