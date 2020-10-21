<template>
  <div>
    <!-- <TitleList :title="name"></TitleList> -->
    <LoginForm></LoginForm>
  </div>
</template>

<script>
// import TitleList from '@/views/contents/TitleList';
import LoginForm from '@/components/login/LoginForm';
export default {
    components: {
        // TitleList,
        LoginForm,
    },
    data() {
      return {
        name: ''
      }
    },
    mounted () {
      this.name = this.$route.name;
    },
}
</script>

<style>

</style>