<template>
    <div class="pagination">
        <a @click="prevList">&laquo;</a>
        <a v-for="(item,index) in totalPages" :key="index"
            @click="$emit('paging',index)"
            >{{index + 1 }}</a>
        <a @click="nextList">&raquo;</a>
    </div>
</template>

<script>
export default {
    props:{
        totalPages:{
            type:Number,
        },
        pageNum:{
            type:Number,
        }
    },
    methods: {
        prevList(){
            if(0 == this.pageNum){
                return;
            }
            this.pageNum -= 1;
            this.fetchUserList(this.pageNum);
        },
        nextList(){
            if(this.pagingData.totalPages -1 == this.pageNum){
                return;
            }
            this.pageNum += 1;
            this.fetchUserList(this.pageNum);
        },
    },

}
</script>

<style>

.pagination {
  padding-left:830px;
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border: 1px solid #ddd;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.pagination a:hover:not(.active) {background-color: #ddd;}

.pagination a:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.pagination a:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

</style>