<template>
  <div class="Backstage">
    <header class="headertitle">后 台 管 理 系 统</header>
    <Banner class="banner" :imageData="imgData" />
    <div class="wrapper" @click="listClick">
      <div class="boxWrapper">
        <Midbox class="new" title="新建"></Midbox>
        <Midbox class="update" title="更新"></Midbox>
        <Midbox class="del" title="删除"></Midbox>
      </div>
      <div class="newblog" v-show="showNew">
        <Upload
          class="upload"
          name="files"
          :multiple="true"
          action="/api/upload"
          @change="handleChange"
        >
          <div class="insideUpload">
            <Icon type="inbox" />
            <span>拖动图片到此处</span>
          </div>
        </Upload>
        <div class="titlebox">
          <div  class="new-text-title">
            <span>标题</span>
          </div>
          <input type="text" class="newtitle" v-model="title">
        </div>
        <mavonEditor
          ref="me"
          class="mavon-editor"
          v-model="content"
          @save="saveNew"
          @imgAdd="addImg"
        />
      </div>
      <div class="listbox updatebox" v-show="udShow">
        <div class="pageBox">
          <span>页数：{{currentPage}}</span>
          <input class="pageInput" type="text" v-model.lazy="currentPage" placeholder="请输入页数">
          <input class="confirmBtn" type="button" @click="changePage" @keydown.enter="changePage" value="确定"> 
          <span @click="prevPage" class="prevPage">上一页</span>
          <span @click="nextPage" class="nextPage">下一页</span>
        </div>
        <div class="list" v-for="item1 in data1.slice((this.currentPage-1)* 13, this.currentPage * 13)" @click="udClick">
          <div class="id">{{ item1.id }}</div>
          <div class="title">{{ item1.title }}</div>
          <div class="content">{{ item1.content }}</div>
        </div>
      </div>
      <article class="detail" v-show="showDetail">
      <div class="titlebox">
          <div  class="ud-text-title">
            <span>标题</span>
          </div>
          <input type="text" class="newtitle" v-model="title">
      </div>
        <mavonEditor
          class="mavon-editor"
          v-model="content"
          @save="saveUpdate"
        />
      </article>
      <div class="listbox delbox" v-show="delShow">
        <div class="pageBox">
          <span>页数：{{currentPage}}</span>
          <input class="pageInput" type="text" v-model.lazy="currentPage">
          <input class="confirmBtn" type="button" @click="changePage" @keydown.enter="changePage" value="确定"> 
          <span @click="prevPage" class="prevPage">上一页</span>
          <span @click="nextPage" class="nextPage">下一页</span>
        </div>
        <div class="list" v-for="(item2,index) in data2.slice((this.currentPage-1)* 13, this.currentPage * 13)" @click="delClick(item2,index)">
          <div class="id">{{ item2.id }}</div>
          <div class="title">{{ item2.title }}</div>
          <div class="content">{{ item2.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "components/content/Banner";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Midbox from "./childCom/Midbox.vue";
import { getBlogList } from "network/home";
import { getBlogDetail } from "network/detail";
import { delBlog } from "network/delBlog";
import { updateBlog } from "network/udBlog";
import { newBlog } from "network/newBlog";
import { Upload, Icon } from "ant-design-vue";

export default {
  name: "Backstage",
  data() {
    return {
      content: "",
      imgData: "http://localhost/images/background.jpg",
      data1: [],
      data2: [],
      udShow: false,
      delShow: false,
      showDetail: false,
      showNew: false,
      tempId: -1,
      tempData: {},
      title:'',
      currentPage:1,
      totalPages:0,
      plusone:0,
    };
  },
  components: {
    mavonEditor,
    Midbox,
    Banner,
    Upload,
    Icon,
  },
  methods: {
    listClick(e) {
      if (e.target.innerText === "新建") {
        this.udShow = false;
        this.delShow = false;
        this.showDetail = false;
        this.showNew = true;
        this.content = "";
        // getBlogList().then((data) => {
        //   this.data1 = data.data;
        //   this.data2 = data.data;
        // });
        return;
      }
      if (e.target.innerText === "更新") {
        this.udShow = true;
        this.delShow = false;
        this.showDetail = false;
        this.showNew = false;
        this.content = "";
        // getBlogList().then((data) => {
        //   this.data1 = data.data;
        //   this.data2 = data.data;
        // });
        return;
      }
      if (e.target.innerText === "删除") {
        this.udShow = false;
        this.delShow = true;
        this.showDetail = false;
        this.showNew = false;
        this.content = "";
        // getBlogList().then((data) => {
        //   this.data1 = data.data;
        //   this.data2 = data.data;
        // });
        return;
      }
    },
    udClick(e) {
      this.tempId = Number(e.toElement.parentNode.firstChild.innerText);
      if (this.tempId !== NaN && this.udShow === true && this.content === "") {
        getBlogDetail(this.tempId).then((data) => {
          // console.log(data);
          this.showDetail = true;
          this.udShow = false;
          this.title = data.data[0].title
          this.content = data.data[0].contentText;
        });
      }
    },
    async delClick(item,index) {
      this.$bus.$off("selected");
      // console.log(index);
      // console.log(this.data2);
      
      // console.log(this.tempId);
      if (item.id !== NaN && this.delShow === true) {
        this.$store.dispatch(
          "changeShowSelect",
          `确定删除标题id为${item.id}的博客吗？`
        );
        await this.$bus.$on("selected", (d) => {
          // console.log(d);
          if (d) {
            // this.$store.dispatch("changeTips", "删除成功");
            delBlog(item.id).then((result) => {
              // console.log(result);
              if (!result.error) {
                this.$store.dispatch("changeTips", "删除成功");
                this.data2.splice(index,1)
              } else {
                this.$store.dispatch("changeTips", "删除失败");
              }
            });
          }
        });
      }
    },
    async saveUpdate(s1, s2) {
      this.$bus.$off("selected");
      // console.log(s1, ",", s2);
      this.tempData.title = this.title
      this.tempData.contentText = s1
      this.tempData.contentHtml = s2
      this.tempData.image = this.tempData.image[0]
      console.log(this.tempData);
      this.$store.dispatch(
        "changeShowSelect",
        `确定更新标题id为${this.tempId}的博客吗？`
      );
      await this.$bus.$on("selected", (d) => {
        if (d) {
          updateBlog(this.tempId, this.tempData).then((data) => {
            if (data.error !== -1) {
              this.$store.dispatch("changeTips", "更新成功");
            } else {
              this.$store.dispatch("changeTips", "更新失败");
            }
          });
        }
      });
    },
    async saveNew(s1, s2) {
      this.$bus.$off("selected");
      this.tempData.title = this.title
      this.tempData.contentText = s1
      this.tempData.contentHtml = s2
      this.tempData.image = this.tempData.image[0]
      // console.log(this.tempData.image);
      console.log(s1, ",", s2);
      this.$store.dispatch(
        "changeShowSelect",
        `确定新建标题为${this.tempData.title}的博客吗？`
      );
      await this.$bus.$on("selected", (d) => {
        // console.log(d);
        if (d) {
          newBlog(this.tempData).then((data) => {
            // console.log(data);
            if (!data.error) {
              this.$store.dispatch(
                "changeTips",
                `新建博客成功，编号为${data.data.insertId}.`
              );
              this.content = "";
            }
          });
        }
      });
    },
    addImg(filename, fileobj) {
    //   console.log(filename,',', fileobj);
    //   // this.tempData.image.push(filename)
    },
    handleChange(info) {
      const status = info.file.status;
      if (status === "done") {
        // console.log(info.file);
        this.tempData.image.push(info.file.name)
        console.log(this.tempData.image);
      } else if (info.file.status === "error") {
        console.log('error on upload image');
      }
    },
    changePage(){
      // this.currentPage = 
    },
    prevPage(){
      if(this.currentPage !== 1){
        this.currentPage--
      }else{
        return
      }
    },
    nextPage(){
      // console.log(this.totalPages);
      if(this.currentPage < (this.totalPages * 1 + this.plusone)){
        this.currentPage++
      }else{
        return
      }
    },
  },
  created() {
    // console.log(this.tempId);
    this.tempData.image = []
    getBlogList().then((data) => {
      this.totalPages = (data.data.length / 13).toFixed()
      if(data.data.length % 13 !== 0){
        this.plusone = 1
      }
      this.data1 = data.data;
      this.data2 = data.data;
    });
  },
  mounted() {
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 10%;
  margin-top: calc(50vh + 158px);
}
.boxWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.headertitle {
  font-size: 40px;
  color: #ddd;
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
}
.listbox {
  position: relative;
  left: 0;
  border-radius:10px;
  background-color: #aaa;
  width: 100%;
  min-height: 600px;
  margin-top: 23px;
  margin-bottom:50px;
  padding-left:10px;
  padding-right:10px;
  padding-top:10px;
  padding-bottom:10px;
}
.updatebox{
  animation: goheight 1.7s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.updatebox::before{
  content: "";
  border: 15px solid transparent;
  border-bottom: 20px solid #aaa;
  position: absolute;
  top: -35px;
  left: 38.5vw;
}
.delbox{
  animation: goheight 1.7s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.delbox::before{
  content: "";
  border: 15px solid transparent;
  border-bottom: 20px solid #aaa;
  position: absolute;
  right: 12.2vw;
  top: -35px;
}
.pageBox{
  height: 30px;
  line-height: 30px;
}
.pageInput{
  width: 50px;
  text-align: center;
  margin-left: 20px;
  /* padding-left: 10px; */
  border: 0px;
  border-radius: 10px;
  height: 20px;
  line-height: 20px;
  outline: none;
}
.confirmBtn{
  margin-left: 20px;
  border-radius: 10px;
  border: 3px;
  height: 25px;
  width: 60px;
  cursor: pointer;
}
.confirmBtn:hover{
  color: #fff;
  background-color: rgba(66, 66, 66,.6);
}
.prevPage{
  color: #000;
  margin-left: 20px;
  cursor: pointer;
}
.nextPage{
  color: #000;
  margin-left: 20px;
  cursor: pointer;
}
.list {
  display: flex;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-radius:10px;
  margin-top: 10px;
  /* justify-content: space-around; */
  cursor: pointer;
  background-color: #fff;
}
.list:hover {
  background-color: #333;
  color: #fff;
  transition:all .2s;
}
.list>div{
  text-align: center;
}
.id {
  border-right: 2px solid rgb(66, 66, 66,0.3);
  /* border-left: 2px solid #444; */
  min-width: 50px;
  flex : 0;
}
.title {
  flex: 1;
  border-right: 2px solid rgb(66, 66, 66,0.3);
}
.content {
  flex: 3;
}
.mavon-editor {
  height: 80vh;
  margin-top: 40px;
}
.upload {
  display: flex;
  flex-direction: column;
  font-size: 50px;
  margin-top: 10px;
  z-index: 10;
  background-color: #fff;
  border-radius: 5px;
}
.insideUpload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 30px;
  padding-top: 50px;
  padding-bottom: 50px;
  text-align: center;
}
.newblog {
  position: relative;
  width: 100%;
  animation: goheight 1.7s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #aaa;
  border-radius: 15px;
}
.newblog::before {
  content: "";
  border: 15px solid transparent;
  border-bottom: 20px solid #aaa;
  position: absolute;
  top: -35px;
  left: 12.2vw;
}
.titlebox{
  margin-top: 30px;
  margin-left: 5px;
  text-align: center;
}
.new-text-title{
  font-size: 20px;
  margin-bottom: 10px;
  color: #222;
}
.newtitle{
  color: #222;
  height: 25px;
  width: 300px;
  border: 0px;
  border-radius: 6px;
}
.ud-text-title{
  font-size: 20px;
  margin-bottom: 10px;
  color: #ddd;
}
@keyframes goheight {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>