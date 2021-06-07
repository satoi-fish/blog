<!--  -->
<template>
  <div class="detail">
    <div class="wrap">
      <Banner />
      <div class="topInf">
        <h1 class="title">{{ detailData.title }}</h1>
        <span class="information"
          >时间：{{ detailData.createtime }}，作者：{{
            detailData.author
          }}</span
        >
      </div>
    </div>
    <section class="main">
      <article v-html="detailData.content"></article>
      <CommentSize />
    </section>
  </div>
</template>

<script>
import Banner from "components/content/Banner";
import CommentSize from "./childCom/CommentSize";
import { getBlogDetail } from "network/detail";
import { formatDate } from "utils";

export default {
  name: "detail",
  data() {
    return {
      detailData: [],
      test: "<div>nihao</div>",
    };
  },
  components: {
    Banner,
    CommentSize,
  },
  created() {
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
}
.information {
  font-size: 15px;
  margin-top: 14px;
}
.main {
  width: 860px;
  margin: 0 auto;
  /* margin-top:30px; */
  padding: 50px 10%;
  color: rgb(119, 115, 115);
}
.main article {
  margin-bottom: 50px;
}
</style>
