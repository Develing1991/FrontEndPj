<template>
   
   <div style="overflow-x:auto;" >
       <b-card no-body class="container" >
            <b-tabs card>
                <b-tab :title="item.name" v-for=" (item,index) in boardTypeList" :key="index" @click="serchBoardType(item.type)">
                    <b-card-text>
                        <div class="middle-style">
                            <input type="text" class="search-input-style" v-model="searchKewoard" @keypress.enter="fetchBoardList">
                            <b-button class="btn-style" @click="fetchBoardList">조회</b-button>
                            <b-button variant="success" class="btn-style" @click="createBoard">등록</b-button>
                        </div>
                        <table class="container">
                            <thead>
                                <th class="cth">
                                    <i class="cehckBtn far fa-check-square" :class="{cehckBtnComp:selectChkAll}" @click="selectItemAll()"></i>
                                    <!-- <input type="checkbox" @click="selectItemAll()"> -->
                                </th>
                                <th class="cth" style="width:140px">유틸</th>
                                <th class="cth">제목</th>
                                <th class="cth">상태</th>
                                <th class="cth">작성자</th>
                                <th class="cth">조회수</th>
                                <th class="cth">등록일</th>
                                <th class="cth">수정일</th>
                            </thead>
                            <tbody>
                                <tr v-for="item in list" :key="item.id" class="ctr">
                                    <td>
                                        <i class="cehckBtn far fa-check-square" style="padding-left: 5px;" 
                                        :class="{cehckBtnComp:item.checked}" @click="selectItem(item)"></i>
                                    </td>
                                    <td>
                                        <b-icon-search class="table-icon-style" @click="itemDetail(item.boardId)"></b-icon-search>
                                        <b-icon-trash class="table-icon-style" @click="itemDelete(item)"></b-icon-trash>
                                    </td>
                                    <td class="ctd">{{item.title}}</td>
                                    <td class="ctd" v-if="item.deleteYn == 'Y'">
                                        <b-button pill variant="outline-danger">삭제됨</b-button>
                                    </td>
                                    <td class="ctd" v-else>
                                        <b-button pill variant="success">사용중</b-button>
                                    </td>
                                    <td class="ctd">{{item.userLoginId}}</td>
                                    <td class="ctd">{{item.views}}</td>
                                    <td class="ctd">{{item.createdDate | formatDate}}</td>
                                    <td class="ctd">{{item.modifiedDate | formatDate}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>
       
        <br>
        <!-- 페이지 네이션 -->
        <Pagination :totalPages="pagingData.totalPages" :pageNum="pageNum" @paging="fetchBoardList"/>
        <!-- use the modal component, pass in the prop -->
        <BoardDetail v-if="showDetail" @close="showDetail = false" @updateFetch="fetchUpdateListTab">
            <h3 slot="header">게시글정보</h3>
        </BoardDetail>

        <BoardCreate v-if="showCreate" @close="showCreate = false" @updateFetch="fetchUpdateListTab" :boardGbn="boardType">
            <h3 slot="header">게시글등록</h3>
        </BoardCreate>
   </div>
   
</template>

<script>
import {mapActions, mapState} from 'vuex';
import BoardDetail from '@/components/modal/BoardDetail';
import BoardCreate from '@/components/modal/BoardCreate';
import Pagination from '@/components/common/Pagination';
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
            list:[],
            boardTypeList:[
                {  'name' : '자유게시판', "type" : 'FREE'},
                {  'name' : '도서게시판', "type" : 'BOOK'},
                {  'name' : '건강게시판', "type" : 'HEALTH'},
                {  'name' : '커피게시판', "type" : 'COFFEE'},
                {  'name' : '공지사항', "type" : 'NOTICE'},
            ],
            boardType:'FREE',
        }
    },
    components:{
        BoardDetail,
        BoardCreate,
        Pagination,
    },
    watch:{
        boardList(newValue){
            this.list = newValue;
        },
    },
    computed:{
        ...mapState({
            boardList : state => state.bs.boardList,
            pagingData : state => state.bs.pagingData,
        })
    },
    methods: {
        //개별 선택
        selectItem(item){
            item.checked = !item.checked;
            var targetList = [];
            this.list.forEach(element => {
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
                this.list.forEach(element => {
                    element.checked = true;
                    targetList.push(element.id);
                });
            }else{
                this.list.forEach(element => {
                    element.checked = false;
                });
            }
            this.selectItems = targetList;
        },
        createBoard(){ 
            this.showCreate = true;
        },
        serchBoardType(type){
            this.searchKewoard = '';
            this.boardType = type;
            this.fetchBoardList();
        },
        async fetchBoardList(index){
            this.$emit('start');
            var data = this.getPageSet();
           
            data.type = this.boardType;
            data.title = this.searchKewoard;
            if(typeof(index) == "number"){
                //data.page = index;
                this.pageNum = index;
                data.page = this.pageNum;
            }
            
            await this.$store.dispatch('bs/FETCH_BOARD_LIST',data);
            this.$emit('end');
        },
        getPageSet(){
            var data = {
                page : this.pageNum,
                size : this.pageSize,
            }
            return data;
        },
        //삭제
        async itemDelete(item){
            if(item.deleteYn == 'N'){
                if(confirm(`<${item.title}> 해당 게시물을 삭제하시겠습니까?`)){
                    await this.$store.dispatch('bs/FETCH_BOARD_DELETE',item.boardId);
                    this.fetchUpdateList(item.boardType);
                }
            }
        },
        //상세
        async itemDetail(id){  
            this.$emit('start');
            await this.$store.dispatch('bs/FETCH_BOARD_INFO',id);
            this.$emit('end');
            this.showDetail = true;
            //this.$router.push(`/userInfo/${id}`);
            
        },
        async fetchUpdateList(bType){
            this.$emit('start');
            this.searchKewoard = ''
            var data = this.getPageSet();
            data.type = bType;
            data.title = this.searchKewoard;
            await this.$store.dispatch('bs/FETCH_BOARD_LIST',data);
            this.$emit('end');
        },
        fetchUpdateListTab(bType){
            var changeTab = document.getElementsByTagName('li');
            switch(bType){
                case 'FREE':
                    document.getElementById(changeTab[0].getElementsByTagName('a')[0].id).click();
                break;
                case 'BOOK':
                    document.getElementById(changeTab[1].getElementsByTagName('a')[0].id).click();
                break;
                case 'HEALTH':
                    document.getElementById(changeTab[2].getElementsByTagName('a')[0].id).click();
                break;
                case 'COFFEE':
                    document.getElementById(changeTab[3].getElementsByTagName('a')[0].id).click();
                break;
                case 'NOTICE':
                    document.getElementById(changeTab[4].getElementsByTagName('a')[0].id).click();
                break;
            }
        }
    },
    mounted () {
        this.fetchBoardList();
        
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
    padding-left: 720px;
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
</style>