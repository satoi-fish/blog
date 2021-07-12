<!--  -->
<template>
  <div class="home">
      <Banner class="banner" :imageData="imgData" />
      <div class="searchBox">
        <span class="searchtext">搜索:</span>
        <input type="text" v-model="keyword" @keydown.enter="searching">
        <input type="button" class="searchBtn"  @click="searching" value="搜索">
      </div>
      <BlogListItem
        ref="bloglist"
        style="top: calc(58px + 30vh + 58px + 140px); min-height: 1000px"
        :page="this.$store.state.pages"
      />
  </div>
</template>

<script>
import BlogListItem from "./chlidCom/blogListItem"
import Banner from "components/content/Banner"
import VueDataLoading from "vue-data-loading"
import { getBlogList } from "network/home"


export default {
  name: "Home",
  data() {
    return {
      data: [],
      blogList: {},
      imgData: "http://localhost/images/background.jpg",
      keyword:"",

    };
  },
  methods: {
    searching(){
      getBlogList(this.keyword).then(data=>{
        // console.log(data);
        this.$refs.bloglist.listData = data.data
        // console.log(this.$refs.bloglist.listData);
      })
    },
  },
  components: {
    BlogListItem,
    Banner,
    VueDataLoading,
  },
  created() {
  },
};
</script>

<style scoped>
.home {
  color: #ddd;
}
.searchBox{
  margin-top: 50px;
  position:relative;
  top: calc(50vh + 30px);
  margin-left: 10vw;
  border-radius: 10px;
}
.searchBox > input{
  height: 30px;
  line-height: 25px;
  margin-left: 10px;
  color: #000;
  outline: none;
}
.searchtext{
  font-size: 20px;
}
.searchBtn{
  border-radius: 10px;
  outline: none;
  background-color: #ddd;
  padding: 0 8px;
}
.searchBtn:hover{
  background-color: #fff;
}
</style>
