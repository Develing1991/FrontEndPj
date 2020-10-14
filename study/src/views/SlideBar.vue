<template>
  <div>
    <!-- <b-button v-b-toggle.sidebar-backdrop>Toggle Sidebar</b-button> -->

    <b-sidebar
      id="sidebar-backdrop"
      title="Sidebar with backdrop"
      
      backdrop
      shadow
    >
      <!-- <div class="px-3 py-2">
        <b-form-group label="Backdrop variant" label-for="backdrop-variant">
          <b-form-select id="backdrop-variant" v-model="variant" :options="variants"></b-form-select>
        </b-form-group>
      </div> -->
      <b-list-group>
        <b-list-group-item v-for="(item,index) in menuList" :key="index">
          <router-link :to="item.path">
            {{item.name}}
          </router-link>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menuList:[
          {
            path:'/user', name:'사용자'
          },
          {
            path:'/board', name:'게시판'
          },
          {
            path:'/order', name:'주문'
          },
          {
            path:'/product', name:'상품'
          },
        ]
      }
    }
  }
</script>