import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
export const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/user'
        },
        {
            path:'/login',
            component: ()=> import('@/views/LoginView.vue'),
        },
        {
            path:'/main',
            component:  ()=> import('@/views/MainView.vue'),
        },
        {
            path:'/user',
            component : ()=> import('@/views/UserView.vue'),
        },
        {
            path:'/userInfo/:id',
            component : ()=> import('@/components/user/UserInfo.vue'),
        },
        {
            path:'/board',
            component : ()=> import('@/views/BoardView.vue'),
        }
    ]
    
})