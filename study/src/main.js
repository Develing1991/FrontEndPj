import Vue from 'vue'
import App from './App.vue'
import {router} from '@/router/index';
import store from '@/store/index';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import {formatDate} from '@/utils/filters'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.filter('formatDate',formatDate);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
