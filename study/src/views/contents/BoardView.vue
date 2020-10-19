<template>
  <div>
    <TitleList :title="name"></TitleList>
    <LoadingSpinner v-show="loading"></LoadingSpinner>
    <BoardList v-show="!loading" @start="startLoading" @end="endLoading"></BoardList>
  </div>
</template>

<script>
import TitleList from '@/views/contents/TitleList';
import BoardList from '@/components/board/BoardList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
export default {
    data() {
      return {
        loading: false,
        name:'',
      }
    },
    components: {
        TitleList,
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
    mounted () {
      this.name = this.$route.name;
    },
}
</script>

<style>


</style>