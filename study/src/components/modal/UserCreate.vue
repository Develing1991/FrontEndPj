<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header" >
              default header
            </slot>
            <span>
              <b-button pill variant="info" @click="saveUser" >저장</b-button>
              <b-button pill variant="secondary"  @click="$emit('close')" >닫기</b-button>
            </span>
          </div>

          <div class="modal-body">
            <slot name="body" >
              <!-- {{userInfo}} -->
              <b-list-group >
                <b-list-group-item href="#" class="flex-column align-items-start">
                        <span><small id="tooltip-target-1">이름 </small>* :</span> <span class="validation-alert">{{validation.name}}</span>
                        <b-list-group-item><input type="text" class="create-input" v-model="setName" ></b-list-group-item>
                        <span><small>아이디 *</small> :</span> <span class="validation-alert">{{validation.userLoginId}}</span>
                        <b-list-group-item>
                            <input type="text" class="create-input" v-model="setUserId" @keypress="changeStatus">
                            <b-button pill variant="success" style="margin-left:5px;" id="tooltip-button-1" @click="duplicateCheck">중복확인</b-button>
                            <b-alert :show="!saveIdCheck" variant="info">아이디 중복 확인을 진행해 주세요.</b-alert>
                            <b-alert :show="idYes" variant="primary">사용가능한 아이디 입니다.</b-alert>
                            <b-alert :show="idNo" variant="danger">사용할 수 없는 아이디 입니다.</b-alert>
                        </b-list-group-item>
                        <span><small>비밀번호 *</small> :</span> <span class="validation-alert">
                            {{validation.pass1}} <span :class="{ passCheck :matchPass ==='일치'}">({{matchPass}})</span>
                        </span>
                        <b-list-group-item><input type="text" class="create-input" v-model="setPass1" ></b-list-group-item>
                        <span><small>비밀번호확인 *</small> :</span> <span class="validation-alert">
                            {{validation.pass2}} <span :class="{ passCheck :matchPass ==='일치'}">({{matchPass}})</span>
                        </span>
                        <b-list-group-item><input type="text" class="create-input" v-model="setPass2" ></b-list-group-item>
                        <br>
                        <b-list-group-item>
                        <div><small>도시</small> :</div>
                        <input type="text" class="create-input" v-model="setCity" >
                        <div><small>지역</small> :</div>
                        <input type="text" class="create-input" v-model="setStreet" >
                        <div><small>우편</small> :</div>
                        <input type="text" class="create-input" v-model="setZipcode" >
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
    watch:{
      setPass1(newValue){
        (this.setPass1 == '' || this.setPass2 == '') || this.setPass2 !== newValue ? this.matchPass ='불일치' : this.matchPass = '일치'
      },
      setPass2(newValue){
        (this.setPass1 == '' || this.setPass2 == '') || this.setPass1 !== newValue ? this.matchPass = '불일치' : this.matchPass = '일치'
      }
    },
    data() {
        return {
            saveIdCheck: false,
            idYes:false,
            idNo:false,
            setName : '',
            setUserId : '',
            setPass1 : '', 
            setPass2 : '',
            setCity : '',
            setStreet : '',
            setZipcode : '',
            matchPass:'불일치',
            validation:{
                "name" :'',
                "userLoginId" :'',
                "pass1" :'',
                "pass2" :'',
            },
        }
    },
    methods: {
        saveUser() {
            if(this.validationChk()){
                if(this.saveIdCheck === true && this.idYes === true){
                    var createData = {
                    "name" : this.setName,
                    "userLoginId" : this.setUserId,
                    "pass1":this.setPass1,
                    "pass2":this.setPass2,
                    "city":this.setCity,
                    "street":this.setStreet,
                    "zipcode":this.setZipcode,
                    }
                    
                    //등록
                    this.$store.dispatch('us/FETCH_USER_CREATE',createData);
                    alert('정상적으로 등록되었습니다.');
                    this.$emit('updateFetch');
                    this.$emit('close');   
                }
            }
        },
        validationChk(){
            var chkBool = true;
            if(this.setName == ''){
                this.validation.name = '필수 값 입니다.';
                chkBool = false
            }else if(this.setUserId == ''){
                this.validation.userLoginId = '필수 값 입니다.';
                chkBool = false
            }else if(this.setPass1 == ''){
                this.validation.pass1 = '필수 값 입니다.';
                chkBool = false
            }else if(this.setPass2 == ''){
                this.validation.pass2 = '필수 값 입니다.';
                chkBool = false
            }
            return chkBool;
        },
        async duplicateCheck(){
            if(this.setUserId == ''){
                this.idNo = true;
                return;
            }
             var data = {
                userLoginId : this.setUserId, 
            }
            var response = await this.$store.dispatch('us/FETCH_USER_DUPL',data);
            this.saveIdCheck = true;
            if(response.data.content.length > 0){
                this.idYes = false;
                this.idNo = true;
                return;
            }
            this.idYes = true;
        },
        changeStatus(){
            this.saveIdCheck = false;
            this.idYes = false;
            this.idNo = false;
        }
    },
}
</script>

<style>
.update-input{
  width: 150px;
  border: 2px solid #42b983;
  border-radius: 4px;
}
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
  width: 210px;
  border: 2px solid #42b983;
  border-radius: 4px;
  /* margin-left: 50px; */
}
.naming-style{
    display:inline-block; width:80px;
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
.validation-alert{
    color: red;
}
.passCheck{
  color:#42b983;
}
</style>