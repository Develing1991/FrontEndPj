<template>
   
   <div style="overflow-x:auto;" >
       <b-card no-body class="container" >
            <b-tabs card>
                <b-tab :title="item.name" v-for=" (item,index) in productTypeList" :key="index" @click="serchProductType(item.type)">
                    <b-card-text>
                        <div class="middle-style">
                            <input type="text" class="search-input-style" v-model="searchKewoard" @keypress.enter="fetchProductList">
                            <b-button class="btn-style" @click="fetchProductList">조회</b-button>
                            <b-button variant="success" class="btn-style" @click="createBoard">등록</b-button>
                        </div>
                        <table class="container">
                            <thead>
                                <th class="cth">
                                    <i class="cehckBtn far fa-check-square" :class="{cehckBtnComp:selectChkAll}" @click="selectItemAll()"></i>
                                    <!-- <input type="checkbox" @click="selectItemAll()"> -->
                                </th>
                                <th class="cth" style="width:140px">유틸</th>
                                <th class="cth">상품이름</th>
                                <th class="cth">상태</th>
                                <th class="cth">가격</th>
                                <th class="cth">수량</th>
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
                                        <b-icon-search class="table-icon-style" @click="itemDetail(item)"></b-icon-search>
                                        <b-icon-trash class="table-icon-style" @click="itemDelete(item)"></b-icon-trash>
                                    </td>
                                    <td class="ctd">{{item.name}}</td>
                                    <td class="ctd" v-if="item.deleteYn == 'Y'">
                                        <b-button pill variant="outline-danger">삭제됨</b-button>
                                    </td>
                                    <td class="ctd" v-else>
                                        <b-button pill variant="success">사용중</b-button>
                                    </td>
                                    <td class="ctd">{{item.price}}</td>
                                    <td class="ctd">{{item.stockQuantity}}</td>
                                    <td class="ctd">{{item.createdDate | formatDate}}</td>
                                    <td class="ctd">{{item.lastModifiedDate | formatDate}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>
       
        <br>
        <!-- 페이지 네이션 -->
        <Pagination :totalPages="pagingData.totalPages" :pageNum="pageNum" @paging="fetchProductList"/>
        <!-- use the modal component, pass in the prop -->
        <ProductDetail v-if="showDetail" @close="showDetail = false" @updateFetch="fetchUpdateListTab">
            <h3 slot="header">상품정보</h3>
        </ProductDetail>

        <ProductCreate v-if="showCreate" @close="showCreate = false" @updateFetch="fetchUpdateListTab" :boardGbn="productType">
            <h3 slot="header">상품등록</h3>
        </ProductCreate>
   </div>
   
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ProductDetail from '@/components/modal/ProductDetail';
import ProductCreate from '@/components/modal/ProductCreate';
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
            productTypeList:[
                {  'name' : '도서 품목', "type" : 'BOOK'},
                {  'name' : '건강 품목', "type" : 'HEALTH'},
                {  'name' : '커피 품목', "type" : 'COFFEE'},
            ],
            productType:'BOOK',
        }
    },
    components:{
        ProductDetail,
        ProductCreate,
        Pagination,
    },
    watch:{
        productList(newValue){
            this.list = newValue;
        },
    },
    computed:{
        ...mapState({
            productList : state => state.ps.productList,
            pagingData : state => state.ps.pagingData,
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
        serchProductType(type){
            this.productType = type;
            this.fetchProductList();
        },
        async fetchProductList(index){
            this.$emit('start');
            var data = this.getPageSet();
           
            data.cate = this.productType;
            data.name = this.searchKewoard;
            if(typeof(index) == "number"){
                //data.page = index;
                this.pageNum = index;
                data.page = this.pageNum;
            }
            
            await this.$store.dispatch('ps/FETCH_PRODUCT_LIST',data);
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
                    this.fetchUpdateList(item.productType);
                }
            }
        },
        //상세
        async itemDetail(item){  
            this.$emit('start');
            var data = {
                "id" : item.productId,
                "cate" : item.cate,
            }
            await this.$store.dispatch('ps/FETCH_PRODUCT_INFO',data);
            this.$emit('end');
            this.showDetail = true;
            //this.$router.push(`/userInfo/${id}`);
            
        },
        async fetchUpdateList(bType){
            this.$emit('start');
            this.searchKewoard = ''
            var data = this.getPageSet();
            data.cate = bType;
            data.title = this.searchKewoard;
            await this.$store.dispatch('bs/FETCH_BOARD_LIST',data);
            this.$emit('end');
        },
        fetchUpdateListTab(bType){
            var changeTab = document.getElementsByTagName('li');
            switch(bType){
                case 'BOOK':
                    document.getElementById(changeTab[0].getElementsByTagName('a')[0].id).click();
                break;
                case 'HEALTH':
                    document.getElementById(changeTab[1].getElementsByTagName('a')[0].id).click();
                break;
                case 'COFFEE':
                    document.getElementById(changeTab[2].getElementsByTagName('a')[0].id).click();
                break;
            }
        }
    },
    mounted () {
        this.fetchProductList();
        
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