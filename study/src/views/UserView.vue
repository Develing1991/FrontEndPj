<template>
    <div>
        <h1>사용자 관리</h1>
        <LoadingSpinner v-show="loading"></LoadingSpinner>
        <UserList v-show="!loading" @start="startLoading" @end="endLoading"></UserList>
    </div>
</template>

<script>
import UserList from '@/components/user/UserList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
export default {
    components: {
        UserList,
        LoadingSpinner,
    },
    data() {
      return {
        loading: false,
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
}
</script>

<style>

</style>