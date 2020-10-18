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
              <b-button pill variant="success" @click="createBoard()" >등록</b-button>
              <b-button pill variant="secondary" @click="$emit('close')">닫기</b-button>
            </span>
          </div>

          <div class="modal-body">
            <slot name="body" >
              <b-list-group>
                <b-list-group-item href="#" class="flex-column align-items-start">
                      <br>
                      <p class="mb-1" >
                          <b-container class="bv-example-row">
                            <b-row>
                              <b-col><strong>제목</strong></b-col>
                              <b-col><strong>게시판유형</strong></b-col>
                            </b-row>
                        </b-container>
                      </p>
                      <hr>
                      <div>
                        <p class="mb-1">
                          <b-container class="bv-example-row">
                            <b-row>
                                <b-col><input type="text" class="create-input" v-model="title"></b-col>
                                <b-col>
                                     <b-form-select
                                        v-model="boardType"
                                        :options="options"
                                        class="mb-3"
                                        value-field="value"
                                        text-field="name"
                                     ></b-form-select>
                                </b-col>
                            </b-row>
                          </b-container>
                        </p>
                      </div>
                      <br>
                      <b-list-group-item href="#" class="flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                Contents
                            </div>
                            <hr>
                            <div style="width:100%; height:300px; overflow:auto">
                                <p class="mb-1" >
                                    <b-container class="bv-example-row">
                                        <textarea v-model="contents"></textarea>
                                    </b-container>
                                </p>
                            </div>
                        </b-list-group-item>
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
      boardGbn:{
        type: String,
        required:true,
      }
    },
    watch:{
        boardInfoSet(newValue){
            this.boardInfoSet = newValue;
        }
    },
    data() {
        return {
            title:'',
            contents:'',
            boardType: this.boardGbn,

            options: [
                { value: 'FREE', name: '자유' },
                { value: 'BOOK', name: '도서' },
                { value: 'HEALTH', name: '건강'},
                { value: 'COFFEE', name: '커피'},
                { value: 'NOTICE', name: '공지'},
            ]
        }
    },
    methods: {
      async createBoard(){
        if(confirm('해당 게시글을 등록하시겠습니까?')){
            var data = {
                "userId" : this.loginUser.userId,
                "title" : this.title,
                "contents":this.contents,
                "boardType":this.boardType,
            }
            await this.$store.dispatch('bs/FETCH_BOARD_CREATE',data);
        }
        alert('글이 등록 되었습니다.');
        this.$emit('close');
        this.$emit('updateFetch',this.boardGbn);
      },
    },
    computed: {
        ...mapState({
            boardInfo : state => state.bs.boardInfo,
            loginUser: state => state.us.loginUser,
        })
    },
    mounted () {
        this.boardInfoSet = this.boardInfo;
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
.create-input{
  width: 350px;
  height: 60px;
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