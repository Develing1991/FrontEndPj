<template>
  <div>
      <div>
          id : <input type="text" v-model="loginId">
      </div>
          pass : <input type="text" v-model="password">
      <b-button variant="success"  @click="loginUser">로그인</b-button>
  </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            loginId: '',
            password : '',
        }
    },
    methods: {
        loginUser() {
            var data ={
                "userLoginId":this.loginId,
                "pass1" : this.password
            }
            this.$store.dispatch('us/LOGIN',data);
        }
    },
}
</script>

<style>

</style>