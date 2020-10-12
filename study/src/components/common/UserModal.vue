<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
            <button class="modal-default-button" @click="$emit('close')">
                OK
            </button>
          </div>

          <div class="modal-body">
            <slot name="body" v-if="modalGbn === 0">
              <!-- {{userInfo}} -->
              <b-list-group>
                <b-list-group-item href="#" class="flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{userInfo.name}}</h5>
                    <small class="text-muted">{{userInfo.userLoginId}}, {{userInfo.userType}}</small>
                  </div>

                  <p class="mb-1">
                    {{userInfo.address.city}}
                    {{userInfo.address.street}}
                    {{userInfo.address.zipcode}}
                  </p>

                  <small class="text-muted">
                    <br>
                    <b-list-group-item href="#" class="flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">게시글</h6>
                      </div>
                      <p class="mb-1" v-for="item in userInfo.boards" :key="item.id">
                        <b-container class="bv-example-row">
                          <b-row>
                            <b-col>{{item.id}}</b-col>
                            <b-col>{{item.title}}</b-col>
                            <b-col>{{item.views}}</b-col>
                            <b-col>{{item.boardType}}</b-col>
                          </b-row>
                        </b-container>
                      </p>
                    </b-list-group-item>
                    <br>
                    <b-list-group-item href="#" class="flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">주문 내역</h6>
                      </div>
                      <p class="mb-1" v-for="(item,index) in userInfo.orders" :key="index">
                        <b-container class="bv-example-row">
                          <b-row v-for="(dto,index) in item.userOrderItemResponseDtos" :key="index">
                            <b-col>{{dto.productName}}</b-col>
                            <b-col>{{dto.orderPrice}}</b-col>
                            <b-col>{{dto.count}}</b-col>
                            <b-col>{{item.orderDate}}</b-col>
                          </b-row>
                        </b-container>
                      </p>
                    </b-list-group-item>
                  </small>
                </b-list-group-item>
              </b-list-group>
            </slot>
            <slot name="body" v-else>
              {{userInfo}}
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
      modalGbn:{
        type: Number,
        required:true,
      }
    },
    data() {
        return {
            setUserInfo: {},
        }
    },
    computed: {
        ...mapState({
            userInfo : state => state.us.userInfo,
        })
    },
    mounted () {
        this.setUserInfo = this.userInfo;
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
  width: 700px;
  height: 600px;
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

.modal-default-button {
  float: right;
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