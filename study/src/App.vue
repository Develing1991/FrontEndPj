<template>
  <div id="app">
    <AppHeader></AppHeader>
    <SlideBar></SlideBar>
    <router-view></router-view>
  </div>
</template>

<script>
import SlideBar from '@/views/SlideBar.vue';
import AppHeader from '@/views/AppHeader.vue';
export default {
  components: {
    SlideBar,
    AppHeader,
  },

}
</script>

<style>

</style>