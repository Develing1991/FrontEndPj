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
            name:'로그인 페이지',
            component: ()=> import('@/views/contents/LoginView.vue'),
        },
        {
            path:'/main',
            name:'메인 페이지',
            component:  ()=> import('@/views/contents/MainView.vue'),
        },
        {
            path:'/user',
            name:'사용자 관리',
            component : ()=> import('@/views/contents/UserView.vue'),
        },
        {
            path:'/userInfo/:id',
            component : ()=> import('@/components/user/UserInfo.vue'),
        },
        {
            path:'/board',
            name:'게시판 관리',
            component : ()=> import('@/views/contents/BoardView.vue'),
        },
        {
            path:'/product',
            name:'상품 관리',
            component : ()=> import('@/views/contents/ProductView.vue'),
        }
    ]
    
})