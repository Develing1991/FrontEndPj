<template>
  <div>
    <h1>게시판 관리</h1>
    <LoadingSpinner v-show="loading"></LoadingSpinner>
    <BoardList v-show="!loading" @start="startLoading" @end="endLoading"></BoardList>
  </div>
</template>

<script>
import BoardList from '@/components/board/BoardList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
export default {
    data() {
      return {
        loading: false,
      }
    },
    components: {
        BoardList,
        LoadingSpinner,
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