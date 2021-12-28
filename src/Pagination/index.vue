<template>
  <div class="pagination">
    <button @click="$emit('getPage',pageNo-1)" :disabled="pageNo==1">上一页</button>
    <button v-if="startEnd.start>1" @click="$emit('getPage',1)" :disabled="pageNo==1" :class="{active:pageNo==1}">1</button>
    <button v-if="startEnd.start>2">···</button>
    <button v-for="(page,index) in startEnd.end" :key="index" v-if="page>=startEnd.start" @click="$emit('getPage',page)" :class="{active:pageNo==page}">{{page}}</button>
    <button v-if="startEnd.end<totalPage-1">···</button>
    <button v-if="startEnd.end<totalPage" @click="$emit('getPage',totalPage)" :disabled="pageNo==totalPage" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button @click="$emit('getPage',pageNo+1)" :disabled="pageNo==totalPage">下一页</button>
    <button style="margin-left: 30px">共{{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','total','continues'],
  computed:{
    totalPage(){
      return Math.ceil(this.total/this.pageSize)
    },
    startEnd(){
      let start=0,end=0
      if(this.continues>this.totalPage){
        start=1
        end=this.totalPage
      }else{
        start=this.pageNo-parseInt(this.continues/2)
        end=this.pageNo+parseInt(this.continues/2)
        if(start<1){
          start=1
          end=this.continues
        }
        if(end>this.totalPage){
          end=this.totalPage
          start=end-this.continues+1
        }
      }
      return {start,end}
    }
  }
}
</script>

<style scoped>
.pagination {
  text-align: center;
}
.pagination button {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  outline: none;
  border-radius: 2px;
  padding: 0 4px;
  vertical-align: top;
  display: inline-block;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  border: 0;
}
.pagination button[disabled]{
  color: #c0c4cc;
  cursor: not-allowed;
}

.pagination button.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
}
</style>