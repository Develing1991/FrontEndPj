<template>
   <div style="overflow-x:auto;">
       <div class="middle-style">
           <input type="text" class="search-input-style" v-model="searchKewoard" @keypress.enter="fetchUserList">
           <b-button class="btn-style" @click="fetchUserList">조회</b-button>
           <b-button variant="success" class="btn-style" @click="createUser">등록</b-button>
       </div>
       <table class="container">
            <thead>
                <th class="cth">
                    <i class="cehckBtn far fa-check-square" :class="{cehckBtnComp:selectChkAll}" @click="selectItemAll()"></i>
                    <!-- <input type="checkbox" @click="selectItemAll()"> -->
                </th>
                <th class="cth" style="width:140px">유틸</th>
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
                    <td>
                        <i class="cehckBtn far fa-check-square" style="padding-left: 5px;" 
                        :class="{cehckBtnComp:item.checked}" @click="selectItem(item)"></i>
                    </td>
                    <b-icon-search class="table-icon-style" @click="itemDetail(item.id)"></b-icon-search>
                    
                    <b-icon-trash class="table-icon-style" @click="itemDelete(item)"></b-icon-trash>
                    <td class="ctd">{{item.id}}</td>
                    <td class="ctd">{{item.name}}</td>
                    <td class="ctd">{{item.userLoginId}}</td>
                    <td class="ctd">{{item.address.city}}</td>
                    <td class="ctd" v-if="item.deletedYn == 'Y'">
                        <b-button pill variant="outline-danger">삭제됨</b-button>
                    </td>
                    <td class="ctd" v-else>
                        <b-button pill variant="success">사용중</b-button>
                    </td>
                    <td class="ctd">{{item.createdDate | formatDate}}</td>
                    <td class="ctd">{{item.lastModifiedDate | formatDate}}</td>
                </tr>
            </tbody>
        </table>
        <br>
        <div class="pagination">
            <a @click="prevList">&laquo;</a>
            <a v-for="(item,index) in pagingData.totalPages" :key="index"
                @click="fetchUserList(index)"
                >{{index + 1 }}</a>
            <!-- <a class="active" href="#">2</a> -->
            <a @click="nextList">&raquo;</a>
        </div>
        <!-- use the modal component, pass in the prop -->
        <UserModal v-if="showDetail" @close="showDetail = false" @updateFetch="fetchUpdateList">
            <h3 slot="header">회원정보</h3>
        </UserModal>

        <UserCreate v-if="showCreate" @close="showCreate = false" @updateFetch="fetchUpdateList">
            <h3 slot="header">회원등록</h3>
        </UserCreate>
        <!-- <UserInfo :viewsGbn="this.viewsGbn"></UserInfo> -->
        
   </div>
   
</template>

<script>
import {mapActions, mapState} from 'vuex';
import UserModal from '@/components/modal/UserModal';
import UserCreate from '@/components/modal/UserCreate';
import UserInfo from '@/components/user/UserInfo';

export default {
    data() {
        return{
            selectItems:[],
            selectChkAll:false,
            showDetail:false,
            showCreate:false,
            searchKewoard:'',
            pageNum:0,
            pageSize:10,
        }
    },
    components:{
        UserInfo,
        UserModal,
        UserCreate,
    },
    computed:{
        ...mapState({
            users : state => state.us.userList,
            pagingData : state => state.us.pagingData,
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
        //삭제
        async itemDelete(item){
            if(item.deletedYn == 'N'){
                if(confirm(`${item.userLoginId} 사용자를 삭제하시겠습니까?`)){
                    await this.$store.dispatch('us/FETCH_USER_DELETE',item.id);
                    this.fetchUpdateList();
                }
            }
        },
        //상세
        async itemDetail(id){  
            await this.$store.dispatch('us/FETCH_USER_INFO',id);
            this.showDetail = true;
            //this.$router.push(`/userInfo/${id}`);
            
        },
        async fetchUpdateList(){
            this.searchKewoard = ''
            var data = this.getPageSet();
            await this.$store.dispatch('us/FETCH_USER_LIST',data);
        },
        async fetchUserList(index){
            var data = this.getPageSet();
            if(this.searchKewoard != ''){ //현재 이름으로만..
                data.name = this.searchKewoard;
            }
            if(typeof(index) == "number"){
                //data.page = index;
                this.pageNum = index;
                data.page = this.pageNum;
            }
            await this.$store.dispatch('us/FETCH_USER_LIST',data);
        },
        prevList(){
            if(0 == this.pageNum){
                return;
            }
            this.pageNum -= 1;
            this.fetchUserList(this.pageNum);
        },
        nextList(){
            if(this.pagingData.totalPages -1 == this.pageNum){
                return;
            }
            this.pageNum += 1;
            this.fetchUserList(this.pageNum);
        },
        createUser(){ 
            this.showCreate = true;
        },
        getPageSet(){
            var data = {
                page : this.pageNum,
                size : this.pageSize,
            }
            return data;
        }
    },
    mounted () {
        this.fetchUserList();
    },

}
</script>
<style scoped>
.container {
    border-collapse: collapse;
    width: 100%;
}

.cth, .ctd {
    text-align: left;
    padding: 8px;
    height: 60px;
}

.ctr:nth-child(even) {background-color: #f2f2f2;}
.btn-style{
    margin: 0px 5px 5px 5px;
}
.middle-style{
    padding-left: 1200px;
}
.table-icon-style{
    margin: 22px 12px 0px 12px;
}
.search-input-style{
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.cehckBtn{
    line-height: 45px;
    color: #b3adad;
    margin-right: 5px;
    font-size: 25px;
}
.cehckBtnComp{
    color: #62acde;
}

.pagination {
  padding-left:830px;
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border: 1px solid #ddd;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.pagination a:hover:not(.active) {background-color: #ddd;}

.pagination a:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.pagination a:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>