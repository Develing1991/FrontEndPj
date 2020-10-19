<template>
  <div>
    <TitleList :title="name"></TitleList>
    <LoadingSpinner v-show="loading"></LoadingSpinner>
    <ProductList v-show="!loading" @start="startLoading" @end="endLoading"></ProductList>  
  </div>
</template>

<script>
import TitleList from '@/views/contents/TitleList';
import ProductList from '@/components/product/ProductList';
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
        ProductList,
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