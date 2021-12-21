<template>
  <div class="type-nav" >
    <div class="container">
      <h2 class="all" @mouseenter="mouseEnter" @mouseleave="mouseLeave">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="fade">
      <div class="sort" v-show="navShow" >
        <div class="all-sort-list2" @click="search" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
          <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
            <h3>
              <a :data-categoryname="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a :data-categoryname="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryname="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "TypeNav",
  data(){
    return {
      navShow: true
    }
  },
  mounted() {
    if(this.$route.path!='/home'){
      this.navShow=false
    }
  },
  methods:{
    search(event){
      let element=event.target
      let {categoryname,category1id,category2id,category3id}=element.dataset
      if(categoryname){
        let location={name:"search"}
        let query={categoryName:categoryname}
        if(category1id){
          query.category1Id=category1id
        }else if(category2id){
          query.category2Id=category2id
        }else if(category3id){
          query.category3Id=category3id
        }
        location.query=query
        this.$router.push(location)
      }
    },
    mouseEnter(){
      if(this.$route.path!='/home'){
        this.navShow=true
      }
    },
    mouseLeave(){
      if(this.$route.path!='/home'){
        this.navShow=false
      }
    }
  },
  computed:{
    ...mapState({
      categoryList:(state) => {
        return state.home.categoryList
      }
    })
  }
}
</script>

<style scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
}
.type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 510px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
.type-nav .container .sort .all-sort-list2 .item:hover{
  background-color: #ff9c9c;
  cursor: pointer;
}
.type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
.type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}
.type-nav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
  border-top: 0;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
.type-nav .container .sort .all-sort-list2 .item:hover .item-list {
  display: block;
}
</style>