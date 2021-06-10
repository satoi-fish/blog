<!--  -->
<template>
  <div class="home">
      <Banner class="banner" :imageData="imgData" />
      <!-- <VueDataLoading
        :listens="['infinite-scroll', 'scrolling', 'pull-up']"
        @infinite-scroll="infiniteScroll"> -->
        <BlogListItem
          style="top: calc(58px + 30vh + 58px + 140px); min-height: 1000px"
          :page="this.$store.state.pages"
        />
      <!-- </VueDataLoading> -->
  </div>
</template>

<script>
import BlogListItem from "./chlidCom/blogListItem"
import Banner from "components/content/Banner"
import VueDataLoading from "vue-data-loading"

export default {
  name: "Home",
  data() {
    return {
      data: [],
      blogList: {},
      imgData: "http://localhost/images/background.jpg",

    };
  },
  methods: {
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
</style>
