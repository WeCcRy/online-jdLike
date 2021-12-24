<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i></li>
            <li class="with-x" v-for="(attr,index) in searchParams.props" :key="index">{{ attr.split(':')[1] }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getTrademark="getTrademark" @getAttr="getAttr"/>
        <router-view></router-view>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i style="margin-left: 3px">{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters} from "vuex";
  export default {
    name: 'Search',
    data(){
      return {
        searchParams: {
          "category1Id": "",
          "category2Id": "",
          "category3Id": "",
          "categoryName": "",
          "keyword": "",
          "order": "",
          "pageNo": 1,
          "pageSize": 5,
          "props": [],
          "trademark": ""
        }
      }
    },
    beforeMount() {
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted() {
      this.getData()
    },
    components: {
      SearchSelector
    },
    computed:{
      ...mapGetters(['goodsList','attrsList','trademarkList']),
    },
    methods:{
      getData(){
        this.$store.dispatch('getSearch',this.searchParams)
      },
      getTrademark(trademark){
        this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
        this.getData()
      },
      getAttr(attr,attrValue){
        let props=`${attr.attrId}:${attrValue}:${attr.attrName}`;
        if(this.searchParams.props.indexOf(props)==-1){
          this.searchParams.props.push(props);
          this.getData()
        }
      },
      removeCategoryName(){
        this.searchParams.categoryName = undefined;
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        if(this.$route.params){
          this.$router.push({name:"search",params:this.$route.params})
        }
      },
      removeKeyword(){
        this.searchParams.keyword = undefined;
        this.$bus.$emit("clearKeyword");
        if (this.$route.query) {
          this.$router.push({ name: "search", query: this.$route.query });
        }
      },
      removeTrademark(){
        this.searchParams.trademark=undefined;
        this.getData();
      },
      removeAttr(index){
        this.searchParams.props.splice(index,1)
        this.getData()
      }
    },
    watch: {
      //监听路由的信息是否发生变化，如果发生变化，再次发起请求
      $route() {
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        this.getData();
        //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给他赋予新的数据
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
      },
    },
  }
</script>

<style scoped>
.main {
  margin: 10px 0;
}
.main .py-container {
  width: 1200px;
  margin: 0 auto;
}
.main .py-container .bread {
  margin-bottom: 5px;
  overflow: hidden;
}
.main .py-container .bread .sui-breadcrumb {
  padding: 3px 15px;
  margin: 0;
  font-weight: 400;
  border-radius: 3px;
  float: left;
}
.main .py-container .bread .sui-breadcrumb li {
  display: inline-block;
  line-height: 18px;
}
.main .py-container .bread .sui-breadcrumb li a {
  color: #666;
  text-decoration: none;
}
.main .py-container .bread .sui-breadcrumb li a:hover {
  color: #4cb9fc;
}
.main .py-container .bread .sui-tag {
  margin-top: -5px;
  list-style: none;
  font-size: 0;
  line-height: 0;
  padding: 5px 0 0;
  margin-bottom: 18px;
  float: left;
}
.main .py-container .bread .sui-tag .with-x {
  font-size: 12px;
  margin: 0 5px 5px 0;
  display: inline-block;
  overflow: hidden;
  color: #000;
  background: #f7f7f7;
  padding: 0 7px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #dedede;
  white-space: nowrap;
  transition: color 400ms;
  cursor: pointer;
}
.main .py-container .bread .sui-tag .with-x i {
  margin-left: 10px;
  cursor: pointer;
  font: 400 14px tahoma;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.main .py-container .bread .sui-tag .with-x:hover {
  color: #28a3ef;
}
.main .py-container .selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;
}
.main .py-container .selector .logo {
  border-top: 0;
  margin: 0;
  position: relative;
  overflow: hidden;
}
.main .py-container .selector .logo .key {
  padding-bottom: 87px!important;
}
.main .py-container .selector .type-wrap {
  margin: 0;
  position: relative;
  border-top: 1px solid #ddd;
  overflow: hidden;
}
.main .py-container .selector .type-wrap .key {
  width: 100px;
  background: #f1f1f1;
  line-height: 26px;
  text-align: right;
  padding: 10px 10px 0 15px;
  float: left;
}
.main .py-container .selector .type-wrap .value {
  overflow: hidden;
  padding: 10px 0 0 15px;
  color: #333;
  margin-left: 120px;
  padding-right: 90px;
}
.main .py-container .selector .type-wrap .value .logo-list li {
  float: left;
  border: 1px solid #e4e4e4;
  margin: -1px -1px 0 0;
  width: 105px;
  height: 52px;
  text-align: center;
  line-height: 52px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  color: #e1251b;
  font-style: italic;
  font-size: 14px;
}
.main .py-container .selector .type-wrap .value .logo-list li img {
  max-width: 100%;
  vertical-align: middle;
}
.main .py-container .selector .type-wrap .value .type-list li {
  float: left;
  display: block;
  margin-right: 30px;
  line-height: 26px;
}
.main .py-container .selector .type-wrap .value .type-list li a {
  text-decoration: none;
  color: #666;
}
.main .py-container .selector .type-wrap .ext {
  position: absolute;
  top: 10px;
  right: 10px;
}
.main .py-container .selector .type-wrap .ext .sui-btn {
  display: inline-block;
  padding: 2px 14px;
  box-sizing: border-box;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  padding: 0 10px;
  background: #fff;
  border: 1px solid #d5d5d5;
}
.main .py-container .selector .type-wrap .ext a {
  color: #666;
}
.main .py-container .details {
  margin-bottom: 5px;
}
.main .py-container .details .sui-navbar {
  overflow: visible;
  margin-bottom: 0;
}
.main .py-container .details .sui-navbar .filter {
  min-height: 40px;
  padding-right: 20px;
  background: #fbfbfb;
  border: 1px solid #e2e2e2;
  padding-left: 0;
  border-radius: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
}
.main .py-container .details .sui-navbar .filter .sui-nav {
  position: relative;
  left: 0;
  display: block;
  float: left;
  margin: 0 10px 0 0;
}
.main .py-container .details .sui-navbar .filter .sui-nav li {
  float: left;
  line-height: 18px;
}
.main .py-container .details .sui-navbar .filter .sui-nav li a {
  display: block;
  cursor: pointer;
  padding: 11px 15px;
  color: #777;
  text-decoration: none;
}
.main .py-container .details .sui-navbar .filter .sui-nav li.active a {
  background: #e1251b;
  color: #fff;
}
.main .py-container .details .goods-list {
  margin: 20px 0;
}
.main .py-container .details .goods-list ul {
  display: flex;
  flex-wrap: wrap;
}
.main .py-container .details .goods-list ul li {
  height: 100%;
  width: 20%;
  margin-top: 10px;
  line-height: 28px;
}
.main .py-container .details .goods-list ul li .list-wrap .p-img {
  padding-left: 15px;
  width: 215px;
  height: 255px;
}
.main .py-container .details .goods-list ul li .list-wrap .p-img a {
  color: #666;
}
.main .py-container .details .goods-list ul li .list-wrap .p-img a img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}
.main .py-container .details .goods-list ul li .list-wrap .price {
  padding-left: 15px;
  font-size: 18px;
  color: #c81623;
}
.main .py-container .details .goods-list ul li .list-wrap .price strong {
  font-weight: 700;
}
.main .py-container .details .goods-list ul li .list-wrap .price strong i {
  margin-left: -5px;
}
.main .py-container .details .goods-list ul li .list-wrap .attr {
  padding-left: 15px;
  width: 85%;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.main .py-container .details .goods-list ul li .list-wrap .attr a {
  color: #333;
  text-decoration: none;
}
.main .py-container .details .goods-list ul li .list-wrap .commit {
  padding-left: 15px;
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
.main .py-container .details .goods-list ul li .list-wrap .commit span {
  font-weight: 700;
  color: #646fb0;
}
.main .py-container .details .goods-list ul li .list-wrap .operate {
  padding: 12px 15px;
}
.main .py-container .details .goods-list ul li .list-wrap .operate .sui-btn {
  display: inline-block;
  padding: 2px 14px;
  box-sizing: border-box;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 0;
  background-color: transparent;
  margin-right: 15px;
}
.main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered {
  min-width: 85px;
  background-color: transparent;
  border: 1px solid #8c8c8c;
  color: #8c8c8c;
}
.main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered:hover {
  border: 1px solid #666;
  color: #fff !important;
  background-color: #666;
  text-decoration: none;
}
.main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger {
  border: 1px solid #e1251b;
  color: #e1251b;
}
.main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger:hover {
  border: 1px solid #e1251b;
  background-color: #e1251b;
  color: white!important;
  text-decoration: none;
}
.main .py-container .details .page {
  width: 733px;
  height: 66px;
  overflow: hidden;
  float: right;
}
.main .py-container .details .page .sui-pagination {
  margin: 18px 0;
}
.main .py-container .details .page .sui-pagination ul {
  margin-left: 0;
  margin-bottom: 0;
  vertical-align: middle;
  width: 490px;
  float: left;
}
.main .py-container .details .page .sui-pagination ul li {
  line-height: 18px;
  display: inline-block;
}
.main .py-container .details .page .sui-pagination ul li a {
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #e0e9ee;
  margin-left: -1px;
  font-size: 14px;
  padding: 9px 18px;
  color: #333;
}
.main .py-container .details .page .sui-pagination ul li.active a {
  background-color: #fff;
  color: #e1251b;
  border-color: #fff;
  cursor: default;
}
.main .py-container .details .page .sui-pagination ul li.prev a {
  background-color: #fafafa;
}
.main .py-container .details .page .sui-pagination ul li.disabled a {
  color: #999;
  cursor: default;
}
.main .py-container .details .page .sui-pagination ul li.dotted span {
  margin-left: -1px;
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  font-size: 14px;
  border: 0;
  padding: 9px 18px;
  color: #333;
}
.main .py-container .details .page .sui-pagination ul li.next a {
  background-color: #fafafa;
}
.main .py-container .details .page .sui-pagination div {
  color: #333;
  font-size: 14px;
  float: right;
  width: 241px;
}
.main .py-container .hot-sale {
  margin-bottom: 5px;
  border: 1px solid #ddd;
}
.main .py-container .hot-sale .title {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  border-bottom: 1px solid #ddd;
  background: #f1f1f1;
  color: #333;
  margin: 0;
  padding: 5px 0 5px 15px;
}
.main .py-container .hot-sale .hot-list {
  padding: 15px;
}
.main .py-container .hot-sale .hot-list ul {
  display: flex;
}
.main .py-container .hot-sale .hot-list ul li {
  width: 25%;
  height: 100%;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .p-img,
.main .py-container .hot-sale .hot-list ul li .list-wrap .price,
.main .py-container .hot-sale .hot-list ul li .list-wrap .attr,
.main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
  padding-left: 15px;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .p-img img {
  max-width: 100%;
  vertical-align: middle;
  border: 0;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .attr {
  width: 85%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .price {
  font-size: 18px;
  color: #c81623;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .price strong {
  font-weight: 700;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .price strong i {
  margin-left: -5px;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
</style>