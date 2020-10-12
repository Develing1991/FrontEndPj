<template>
  <div>
    <div class="mb-2">
      <br>
      <span class="avatar-custom">
        <b-avatar src="https://placekitten.com/300/300" size="6rem" ></b-avatar>
        이름 : {{userInfo.name}} 아이디 : {{userInfo.userLoginId}}, 타입 : {{userInfo.userType}}
      </span>
      
    </div>
    <div class="address">
      <div>도시  :  {{userInfoAdd.city}}</div>
      <div>지역  :  {{userInfoAdd.street}}</div>
      <div>우편  :  {{userInfoAdd.zipcode}}</div>
    </div>
    <br>
    <h4>≪게시글≫</h4>
    <table class="container">
      <thead>
          <!-- <th class="cth">
            <input type="checkbox" @click="selectItemAll()">
          </th> -->
          <th class="cth">글번호</th>
          <th class="cth">제목</th>
          <th class="cth">조회수</th>
          <th class="cth">게시판타입</th>
       </thead>
       <tbody>
           <tr v-for="item in userInfo.boards" :key="item.id" class="ctr">
             <!-- <td class="ctd">
                 <input type="checkbox" @click="selectItem(item)" :checked="item.checked">
             </td> -->
             <td class="ctd">{{item.id}}</td>
             <td class="ctd">{{item.title}}</td>
             <td class="ctd">{{item.views}}</td>
             <td class="ctd">{{item.boardType}}</td>
             
            </tr>
        </tbody>
    </table>

    <br>
    <h4>≪주문내역≫</h4>
    <table class="container">
      <thead>
          <!-- <th class="cth">
            <input type="checkbox" @click="selectItemAll()">
          </th> -->
          <th class="cth">책이름</th>
          <th class="cth">총 결제</th>
          <th class="cth">개수</th>
          <th class="cth">주문일자</th>
       </thead>
       <tbody v-for="(item,index) in userInfo.orders" :key="index" class="ctr">
           
             <!-- <td class="ctd">
                 <input type="checkbox" @click="selectItem(item)" :checked="item.checked">
             </td> -->
            <tr v-for="(dto,index) in item.userOrderItemResponseDtos" :key="index">
                <td class="ctd">{{dto.productName}}</td>
                <td class="ctd">{{dto.orderPrice}}</td>
                <td class="ctd">{{dto.count}}</td>
                <td class="ctd">{{item.orderDate}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props:{
    //   viewsGbn:{
    //     type: Number,
    //     required:true,
    //   }
    },
    data() {
        return {
            setUserInfo: {},
        }
    },
    computed: {
        ...mapState({
            userInfo : state => state.us.userInfo,
            userInfoAdd : state => state.us.userInfoAdd,
        })
    },
    mounted () {
        this.$store.dispatch('us/FETCH_USER_INFO',this.$route.params.id);
        this.setUserInfo = this.userInfo;
    },
}
</script>

<style>
.avatar-custom{
    padding-left: 20px;
}
.address{
    padding-left: 130px;
    font-size: 1.5em;
}
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