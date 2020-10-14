<template>
   <div style="overflow-x:auto;">
       <table class="container">
            <thead>
                <th class="cth">
                    <input type="checkbox" @click="selectItemAll()">
                </th>
                <th class="cth">유틸</th>
                <th class="cth">아이디</th>
                <th class="cth">이름</th>
                <th class="cth">로그인 아이디</th>
                <th class="cth">지역</th>
                <th class="cth">상태</th>
                <th class="cth">등록일</th>
                <th class="cth">수정일</th>
            </thead>
            <tbody>
                <tr v-for="item in users" :key="item.id" class="ctr">
                    <td class="ctd">
                        <input type="checkbox" @click="selectItem(item)" :checked="item.checked">
                    </td>
                    <b-icon-search style="padding:12px;" @click="itemDetail(item.id,0)"></b-icon-search>
                    <!-- <b-icon-search style="padding:12px;" @click="itemDetail(item.id,0)">
                        <router-link :to="`/userInfo/${item.id}`"></router-link>
                    </b-icon-search> -->
                    <b-icon-pen style="padding:12px;" @click="itemDetail(item.id,1)"></b-icon-pen>
                    <b-icon-trash style="padding:12px;"></b-icon-trash>
                    <td class="ctd">{{item.id}}</td>
                    <!-- <td class="ctd">{{item.checked}}</td> -->
                    <td class="ctd">{{item.name}}</td>
                    <td class="ctd">{{item.userLoginId}}</td>
                    <td class="ctd">{{item.address.city}}</td>
                    <td class="ctd">{{item.deletedYn}}</td>
                    <td class="ctd">{{item.createdDate}}</td>
                    <td class="ctd">{{item.lastModifiedDate}}</td>
                </tr>
            </tbody>
        </table>
        <!-- {{selectItems}} -->
        <!-- use the modal component, pass in the prop -->
        <!-- <UserModal v-if="showDetail" @close="showDetail = false" :modalGbn="this.modalGbn">
            <h3 slot="header">회원정보</h3>
        </UserModal> -->
        <!-- <UserInfo :viewsGbn="this.viewsGbn"></UserInfo> -->
        
   </div>
   
</template>

<script>
import {mapActions, mapState} from 'vuex';
//import UserModal from '@/components/common/UserModal';
import UserInfo from '@/components/user/UserInfo';

export default {
    data() {
        return{
            selectItems:[],
            selectChkAll:false,
            //showDetail:false,
            viewsGbn:0,
            //modalGbn:0,
        }
    },
    components:{
        UserInfo,
        //UserModal,
    },
    computed:{
        ...mapState({
            users : state => state.us.userList,
        })
    },
    methods: {
        //개별 선택
        selectItem(item){
            item.checked = !item.checked;
            var targetList = [];
            this.users.forEach(element => {
                if(element.checked){
                    targetList.push(element.id);
                }
            });
            this.selectItems = targetList;
        },
        //전체 선택
        selectItemAll(){
            this.selectChkAll = !this.selectChkAll;
            var targetList = [];
            if(this.selectChkAll){
                this.users.forEach(element => {
                    element.checked = true;
                    targetList.push(element.id);
                });
            }else{
                this.users.forEach(element => {
                    element.checked = false;
                });
            }
            this.selectItems = targetList;
        },
        //상세
        itemDetail(id,gbn){  
            this.viewsGbn = gbn;
            //this.showDetail = true;
            this.$router.push(`/userInfo/${id}`);
        }
        // ...mapActions([
        //     'FETCH_USER_LIST',
        // ]),
    },
    mounted () {
        //this.FETCH_USER_LIST1();
        this.$store.dispatch('us/FETCH_USER_LIST');
        
        //this.$store.dispatch('FETCH_USER_LIST');
    },

}
</script>
<style>
    .container {
    border-collapse: collapse;
    width: 100%;
    }

    .cth, .ctd {
    text-align: left;
    padding: 8px;
    }

    .ctr:nth-child(even) {background-color: #f2f2f2;}
</style>