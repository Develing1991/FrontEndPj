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
              <b-button pill variant="info" @click="updateBoard()" v-else>완료</b-button>
              <b-button pill variant="danger" @click="cancelUpdate()" v-if="updatable">취소</b-button>
              <b-button pill variant="secondary" @click="$emit('close')" v-else>닫기</b-button>
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
                              <b-col><strong>번호</strong></b-col>
                              <b-col><strong>상품이름</strong></b-col>
                              <!-- <b-col><strong>작성자</strong></b-col> -->
                              <b-col><strong>가격</strong></b-col>
                              <b-col><strong>수량</strong></b-col>
                            </b-row>
                          </b-container>
                      </p>
                      <hr>
                      <div>
                        <p class="mb-1">
                          <b-container class="bv-example-row">
                            <b-row>
                              <b-col>{{productInfoSet.productId}}</b-col>
                              <template v-if="!updatable">
                                  <b-col>{{productInfoSet.name}}</b-col>
                                  <b-col>{{productInfoSet.price}}</b-col>
                                  <b-col>{{productInfoSet.stockQuantity}}</b-col>
                              </template>
                              <template v-else>
                                  <b-col><input type="text" class="update-input" v-model="productInfoSet.name"></b-col>
                                  <b-col><input type="text" class="update-input" v-model="productInfoSet.price"></b-col>
                                  <b-col><input type="text" class="update-input" v-model="productInfoSet.stockQuantity"></b-col>
                              </template>
                            </b-row>
                          </b-container>
                        </p>
                      </div>


                      <br>
                      <p class="mb-1" >
                          <b-container class="bv-example-row">
                            <b-row>
                              <template v-if="productInfoSet.cate ==='BOOK'">
                                  <b-col><strong>저자</strong></b-col>
                                  <b-col><strong>ISBN</strong></b-col>
                              </template>
                              <template v-else-if="productInfoSet.cate ==='HEALTH'">
                                  <b-col><strong>트레이너</strong></b-col>
                              </template>
                              <template v-else>
                                  <b-col><strong>블렌딩</strong></b-col>
                              </template>

                              <b-col><strong>카테고리</strong></b-col>
                            </b-row>
                          </b-container>
                      </p>
                      <hr>
                      <div>
                        <p class="mb-1">
                          <b-container class="bv-example-row">
                            <b-row>
                              <template v-if="!updatable">
                                  <template v-if="productInfoSet.cate ==='BOOK'">
                                    <b-col>{{productInfoSet.author}}</b-col>
                                    <b-col>{{productInfoSet.isbn}}</b-col>
                                  </template>
                                  <template v-else-if="productInfoSet.cate ==='HEALTH'">
                                    <b-col>{{productInfoSet.trainer}}</b-col>
                                  </template>
                                  <template v-else>
                                    <b-col>{{productInfoSet.blendingType}}</b-col>
                                  </template>
                              </template>
                              <template v-else>
                                  <template v-if="productInfoSet.cate ==='BOOK'">
                                    <b-col><input type="text" class="update-input" v-model="productInfoSet.author"></b-col>
                                    <b-col><input type="text" class="update-input" v-model="productInfoSet.isbn"></b-col>
                                  </template>
                                  <template v-else-if="productInfoSet.cate ==='HEALTH'">
                                    <b-col><input type="text" class="update-input" v-model="productInfoSet.trainer"></b-col>
                                  </template>
                                  <template v-else>
                                    <b-col><input type="text" class="update-input" v-model="productInfoSet.blendingType"></b-col>
                                  </template>
                              </template>

                              <b-col>{{productInfoSet.cate}}</b-col>
                              <!-- <template v-if="!updatable">
                                  <b-col>{{productInfoSet.cate}}</b-col>
                              </template>
                              <template v-else>
                                  <b-col>
                                     <b-form-select
                                        v-model="productInfoSet.cate"
                                        :options="options"
                                        class="mb-3"
                                        value-field="value"
                                        text-field="name"
                                     ></b-form-select>
                                  </b-col>
                              </template> -->
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
                                
                                <template v-if="!updatable">
                                    <b-container class="bv-example-row">
                                        {{productInfoSet.contents}}
                                    </b-container>
                                </template>
                                <template v-else>
                                    <textarea v-model="productInfoSet.contents"></textarea>
                                </template>
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
import { mapGetters, mapState } from 'vuex';
import DetailMixin from '@/mixins/DetailMixin.js';
export default {
    props:{
      // modalGbn:{
      //   type: Number,
      //   required:true,
      // }
    },
    watch:{
    },
    mixins: [DetailMixin],
    data() {
        return {
            productInfoSet:{},
            old :{},
            updatable:false,
            options: [
                { value: 'BOOK', name: '도서' },
                { value: 'HEALTH', name: '건강'},
                { value: 'COFFEE', name: '커피'},
            ]
        }
    },
    methods: {
      cancelUpdate(){
        this.updatable = false;
        this.productInfoSet = this.productInfo;
      },
      async updateBoard(){
        if(confirm('해당 게시글을 수정하시겠습니까?')){
            var data = {
                "id":this.productInfoSet.productId,
                updateData:{
                    "name":this.productInfoSet.name,
                    "contents": this.productInfoSet.contents,
                    "price":this.productInfoSet.price,
                    "stockQuantity":this.productInfoSet.stockQuantity,
                    "cate": this.productInfoSet.cate,
                    "deleteYn": this.productInfoSet.deleteYn,
                }
            }
            if(this.productInfoSet.cate === 'BOOK'){
                data.updateData.author = this.productInfoSet.author;
                data.updateData.isbn = this.productInfoSet.isbn;
            }else if(this.productInfoSet.cate === 'HEALTH'){
                data.updateData.trainer = this.productInfoSet.trainer;
            }else{
                data.updateData.blendingType = this.productInfoSet.blendingType;
            }
            await this.$store.dispatch('ps/FETCH_PRODUCT_UPDATE',data);
            alert('수정되었습니다.');
            this.$emit('close');
            this.$emit('updateFetch',this.productInfoSet.cate);
        }
      },
    },
    computed: {
        ...mapState({
            productInfo : state => state.ps.productInfo,
        }),
        ...mapGetters({
            getProductInfo : 'ps/getProductInfo',
        })
    },
    mounted () {
        this.productInfoSet = this.deepCopy(this.productInfo);
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