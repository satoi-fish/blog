<!--  -->
<template>
  <div class="home">
      <Banner class="banner" :imageData="imgData"/>
      <BlogListItem style="top: calc(58px + 30vh + 58px + 140px);min-height:1000px;"/>
  </div>
</template>

<script>
import BlogListItem from './chlidCom/blogListItem';
import Banner from 'components/content/Banner';

export default {
  name: "Home",
  data() {
    return {
      data:[],
      blogList: {},
      imgData:'http://localhost/images/background.jpg'
    };
  },
  methods: {
    
  },
  components: {
    BlogListItem,
    Banner,
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
