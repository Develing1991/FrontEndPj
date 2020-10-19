<template>
    <div>
        <TitleList :title="name"></TitleList>
        <LoadingSpinner v-show="loading"></LoadingSpinner>
        <UserList v-show="!loading" @start="startLoading" @end="endLoading"></UserList>
    </div>
</template>

<script>
import TitleList from '@/views/contents/TitleList';
import UserList from '@/components/user/UserList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
export default {
    components: {
        TitleList,
        UserList,
        LoadingSpinner,
    },
    data() {
      return {
        loading: false,
        name:'',
      }
    },
    methods: {
      startLoading() {
        this.loading = true;
      },
      endLoading(){
        this.loading = false;
      }
    },
    mounted () {
      this.name = this.$route.name;
    },
}
</script>

<style>

</style>