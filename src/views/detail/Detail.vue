<!--  -->
<template>
  <div class="detail">
    <div class="wrap">
      <Banner :imageData="detailData.image"/>
      <div class="topInf">
        <h1 class="title">{{ detailData.title }}</h1>
        <span class="information"
          >时间：{{ detailData.createtime }}，作者：{{
            detailData.author
          }}</span
        >
      </div>
    </div>
    <section class="main" @click="btnClick($event)" >
      <article class="content" v-html="detailData.contentHtml"></article>
      <CommentSize :commentData="commentData" />
    </section>
  </div>
</template>

<script>
import Banner from "components/content/Banner";
import CommentSize from "./childCom/CommentSize";
import { getBlogDetail,getBlogComment } from "network/detail";
import { formatDate } from "utils";

export default {
  name: "detail",
  data() {
    return {
      detailData: [],
      commentData: [],
    };
  },
  components: {
    Banner,
    CommentSize,
  },
  methods:{
    btnClick(event){
      if(event.target.localName === 'button'){
        // console.log(123);
        this.$forceUpdate()
      }
        // console.log(event.target.localName);
    }
  },
  created() {
    getBlogComment(this.$route.params.id).then(data=>{
      // console.log(data);
      this.commentData = data.data
      
    })
    getBlogDetail(this.$route.params.id)
      .then((result) => {
        // console.log(result);
        this.detailData = result.data[0];
        this.detailData.createtime = formatDate(
          new Date(result.data[0].createtime),
          "yyyy-MM-dd,hh:mm"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.detail {
  position: relative;
}
.content{
  background-color: #fff;
  border-radius:10px;
  padding-top:30px;
  padding-bottom:30px;
  width: 860px;
}
img{
  width: 100%;
}

.wrap {
  padding-top: 58px;
}
.topInf {
  color: #fff;
  min-height: 30vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 45px;
  position: relative;
  font-family: -apple-system, system-ui, sans-serif;
}
.banner {
  position: absolute;
  top: 0;
  width: 100%;
  min-height: calc(30vh + 58px + 140px);
}
.banner img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}
.title {
  font-size: 4.5rem;
  margin: 0;
  color: #fff;
}
.information {
  font-size: 15px;
  margin-top: 14px;
}
.main {
  width: 860px;
  margin: 0 auto;
  /* margin-top:30px; */
  padding-top:50px;
  color: rgb(119, 115, 115);
}
.main article {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
