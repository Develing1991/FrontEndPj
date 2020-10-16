<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
            <span>
              <b-button pill variant="success" @click="updatable = true" v-if="!updatable">수정</b-button>
              <b-button pill variant="info" @click="updateUser()" v-else>완료</b-button>
              <b-button pill variant="danger" @click="cancelUpdate()" v-if="updatable">취소</b-button>
              <b-button pill variant="secondary" @click="$emit('close')" v-else>닫기</b-button>
            </span>
          </div>

          <div class="modal-body">
            <slot name="body" >
              <!-- {{userInfo}} -->
              <b-list-group>
                <b-list-group-item href="#" class="flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1" v-if="!updatable">{{basicUser.name}}</h5>
                    <p v-else>
                            <span style="padding-left:10px">
                              <small>이름</small> : <input type="text" class="update-input" v-model="basicUser.name">
                            </span>
                            <span style="padding-left:10px">
                              <small>비밀번호</small> : <input type="text" class="update-input" v-model="pass1">
                            </span>
                            <span style="padding-left:10px">
                              <small>비밀번호확인</small> : <input type="text" class="update-input" v-model="pass2">
                            </span>
                    </p>
                    <small class="text-muted">{{basicUser.userLoginId}}, {{basicUser.userType}}</small>
                  </div>

                  <p class="mb-1" v-if="!updatable">
                    {{basicUserAddr.city}}
                    {{basicUserAddr.street}}
                    {{basicUserAddr.zipcode}}
                  </p>
                  <p class="mb-1" v-else>
                    <span style="padding-left:10px">
                      <small>도시</small> : <input type="text" class="update-input" v-model="basicUserAddr.city">
                    </span>
                    <span style="padding-left:36px">
                      <small>거리</small> : <input type="text" class="update-input" v-model="basicUserAddr.street">
                    </span>
                    <span style="padding-left:61px">
                      <small>우편</small> : <input type="text" class="update-input" v-model="basicUserAddr.zipcode">
                    </span>
                    <!-- <input v-model="matchPass"> -->
                    :
                    <span class="passCheck1" :class="{ passCheck2 :matchPass ==='일치'}"><small>비밀번호 {{matchPass}}</small></span>
                  </p>

                  <small class="text-muted">
                    <br>
                    <b-list-group-item href="#" class="flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">게시글</h6>
                        <input type="text" v-model="boardSearchInput" @keypress.enter="searchBoard()" placeholder="제목으로 검색">
                      </div>
                      <br>
                      <p class="mb-1" >
                          <b-container class="bv-example-row">
                            <b-row>
                              <b-col><strong>번호</strong></b-col>
                              <b-col><strong>제목</strong></b-col>
                              <b-col><strong>조회수</strong></b-col>
                              <b-col><strong>게시판타입</strong></b-col>
                            </b-row>
                        </b-container>
                      </p>
                      <hr>
                      <div style="width:100%; height:80px; overflow:auto">
                        <p class="mb-1" v-for="item in basicBoardList" :key="item.id">
                          <b-container class="bv-example-row">
                            <b-row>
                              <b-col>{{item.id}}</b-col>
                              <b-col>{{item.title}}</b-col>
                              <b-col>{{item.views}}</b-col>
                              <b-col>{{item.boardType}}</b-col>
                            </b-row>
                          </b-container>
                        </p>
                      </div>
                    </b-list-group-item>
                    <br>
                    <b-list-group-item href="#" class="flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">주문 내역</h6>
                        <input type="text" v-model="orderSearchInput" @keypress.enter="searchOrder()" placeholder="상품이름으로 검색">
                      </div>
                      <br>
                      <p class="mb-1" >
                          <b-container class="bv-example-row">
                            <b-row>
                              <b-col><strong>상품이름</strong></b-col>
                              <b-col><strong>총가격</strong></b-col>
                              <b-col><strong>수량</strong></b-col>
                              <b-col><strong>주문시간</strong></b-col>
                            </b-row>
                        </b-container>
                      </p>
                      <hr>
                      <div style="width:100%; height:100px; overflow:auto">
                        <p class="mb-1" v-for="(item,index) in basicOrderList" :key="index">
                        <b-container class="bv-example-row">
                            <b-row v-for="(dto,index) in item.userOrderItemResponseDtos" :key="index">
                              <b-col>{{dto.productName}}</b-col>
                              <b-col>{{dto.orderPrice}}</b-col>
                              <b-col>{{dto.count}}</b-col>
                              <b-col>{{item.orderDate}}</b-col>
                            </b-row>
                          </b-container>
                        </p>
                      </div>
                    </b-list-group-item>
                  </small>
                </b-list-group-item>
              </b-list-group>
            </slot>
          </div>

          <!-- <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div> -->
        </div>
      </div>
      
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props:{
      // modalGbn:{
      //   type: Number,
      //   required:true,
      // }
    },
    watch:{
      basicUser(newValue){
        this.basicUser = newValue;
        //this.basicUser.orders = newValue.orders;
        this.basicBoardList = newValue.boards;
        this.basicOrderList = newValue.orders;
      },
      basicUserAddr(newValue){
        this.basicUserAddr = newValue;
      },
      pass1(newValue){
        (this.pass1 == '' || this.pass2 == '') || this.pass2 !== newValue ? this.matchPass ='불일치' : this.matchPass = '일치'
      },
      pass2(newValue){
        (this.pass1 == '' || this.pass2 == '') || this.pass1 !== newValue ? this.matchPass = '불일치' : this.matchPass = '일치'
      }
    },
    data() {
        return {
            basicUser: {},        //유저 정보
            basicUserAddr: {},    //유저 주소
            basicBoardList:[],    //조회된 유저의 게시판목록
            boardSearchInput:'',  //유저 게시판 조회 input
            basicOrderList : [],  //조회된 유저의 주문목록
            orderSearchInput:'',  //유저 주문목록 조회 input
            updatable:false,
            pass1:'',
            pass2:'',
            matchPass:'불일치',
        }
    },
    methods: {
      searchBoard() {
        var targetList = [];
        if(this.boardSearchInput != ''){
          this.basicUser.boards.forEach(element => {
            if(element.title.indexOf(this.boardSearchInput)>= 0){
              targetList.push(element);
            }
          });
        }else{
          this.basicBoardList = this.userInfo.boards;
          return;
        }
        this.basicBoardList = targetList;
      },
      searchOrder() {
        var targetList = [];
        if(this.orderSearchInput != ''){
          this.basicUser.orders.forEach(element => {
            element.userOrderItemResponseDtos.forEach(element2 => {
                if(element2.productName.indexOf(this.orderSearchInput)>=0){
                  targetList.push(element);
                }
            });
          });
        }else{
          this.basicOrderList = this.userInfo.orders;
          return;
        }
        this.basicOrderList = targetList;
      },
      cancelUpdate(){
        this.updatable = false;
        this.basicUser.name = this.userInfo.name;
        this.basicUserAddr = this.userInfoAddr; 
        this.pass1 = '';
        this.pass2 = '';
      },
      async updateUser(){
        if(this.matchPass ==='불일치'){
          alert('비밀번호가 일치하지 않습니다.')
          return;
        }
        if(confirm(`${this.basicUser.userLoginId}님의 회원 정보를 수정하시겠습니까?`)){
           var data = {
            "id":this.basicUser.id,
            updateData:{
              "name":this.basicUser.name,
              "pass1":this.pass1,
              "pass2":this.pass2,
              "deleteYn":this.basicUser.deleteYn,
              "city":this.basicUserAddr.city,
              "street":this.basicUserAddr.street,
              "zipcode":this.basicUserAddr.zipcode,
            }
          }
          const response = await this.$store.dispatch('us/FETCH_USER_UPDATE',data);
          this.updatable = false;
          this.$emit('updateFetch');
        }else{
          return;
        }
      },
    },
    computed: {
        ...mapState({
            userInfo : state => state.us.userInfo,
            // userInfoinit : state => state.us.userInfoinit,
            userInfoAddr : state => state.us.userInfoAddr,
        })
    },
    mounted () {
        this.basicUser = this.userInfo;
        this.basicUserAddr = this.userInfoAddr;
        this.basicBoardList = this.userInfo.boards;
        this.basicOrderList = this.userInfo.orders;
    },
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1000px;
  height: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}
.update-input{
  width: 150px;
  border: 2px solid #42b983;
  border-radius: 4px;
}
.passCheck1{
  padding-left:51px; 
  color: red;
}
.passCheck2{
  padding-left:63px; 
  color:#42b983;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>