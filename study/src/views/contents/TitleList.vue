<template>
  <div class="list-container contents">
    <h1 class="page-header">{{title}}</h1>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            required:true,
        }
    }

}
</script>

<style>

</style>