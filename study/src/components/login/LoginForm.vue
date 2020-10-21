<template>
  <div>
      <div class="contents">
        <div class="form-wrapper form-wrapper-sm">
            <h1 class="page-header">로그인</h1>
            <form @submit.prevent="loginUser" class="form">
            <div>
                id : <input type="text" v-model="loginId">
            </div>
            <div>
                pass : <input type="text" v-model="password">
            </div>
            <button type="submit" class="btn-common">로그인</button>

            <button style="background-color: #138496; margin-left:5px;" class="btn-common">회원가입</button>
            </form>
        </div>
      </div>
      
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
            this.$router.push('/main');
        }
    },
}
</script>

<style>

</style>