<!--  -->
<template>
  <div class="blogListItem">
    <div
      class="item"
      v-for="(item, index) in listData.slice(0,this.page * 8)"
      @click="imgClick(item)">
      <img :src="item.image" alt="" @load="imgLoad"/>
      <h1 class="title">{{ item.title }}</h1>
      <span>{{ getContent(item) }}</span>
    </div>
  </div>
</template>

<script>
import { debounce, waterFallLayout } from "../../../utils"
import { getBlogList } from "network/home"

export default {
  name: "blogListItem",
  data() {
    return {
      flag: false,
      listData: [],
    };
  },
  props: {
    page:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  computed: {
    getListData(){
      return this.listData.slice(0,this.page * 8)
    }
  },
  methods: {
    getContent(item) {
      return item.contentHtml.replace(/<[^>]+>|&[^>]+;/g, "").trim()
      .split(' ',20)[0]+'...'; //去掉所有的html标签和&nbsp;之类的特殊符合
    },
    imgLoad() {
      waterFallLayout(this)
    },
    imgClick(item) {
      this.$router.push(`/detail/${item.id}`).catch((err) => err)
    },
  },
  created() {
    getBlogList().then((data) => {
      this.listData = data.data
      this.$nextTick(() => {
          this.imgLoad();
      });
    });
  },
  mounted() {
    const that = this;
    window.onresize = debounce(that.imgLoad, 200);
  },
};
</script>
<style scoped>
.blogListItem {
  position: relative;
}
.item {
  position: absolute;
  cursor: pointer;
  padding-bottom: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid rgb(85, 85, 85);
}
.item span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.item::before {
  transition: all .4s;
  position: absolute;
  content: "";
  background-color:rgba(255,255,255,.08);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9;
}
.item:hover::before {
  background-color: rgba(255, 255, 255,0);
  transition: background-color 0.3s;
}
.item img {
  width: 100%;
  height: 100%;
}
.title {
  margin: 0;
  padding: 5px 0;
  color: rgb(22, 172, 218);
}
</style>
