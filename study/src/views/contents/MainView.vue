<template>
  <div>
    <TitleList :title="name"></TitleList>
    main
  </div>
</template>

<script>
import TitleList from '@/views/contents/TitleList';
export default {
  components: {
    TitleList,
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