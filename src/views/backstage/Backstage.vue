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
        <mavonEditor
          ref="me"
          class="mavon-editor"
          v-model="content"
          @save="saveNew"
          @imgAdd="addImg"
        />
      </div>
      <div class="listbox updatebox" v-show="udShow">
        <div class="list" v-for="item1 in data1" @click="udClick">
          <div class="id">{{ item1.id }}</div>
          <div class="title">{{ item1.title }}</div>
          <div class="content">{{ item1.content }}</div>
        </div>
      </div>
      <article class="detail" v-show="showDetail">
        <mavonEditor
          class="mavon-editor"
          v-model="content"
          @save="saveUpdate"
        />
      </article>
      <div class="listbox delbox" v-show="delShow" @click="delClick">
        <div class="list" v-for="item2 in data2">
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
        getBlogList().then((data) => {
          this.data1 = data.data;
          this.data2 = data.data;
        });
        return;
      }
      if (e.target.innerText === "更新") {
        this.udShow = true;
        this.delShow = false;
        this.showDetail = false;
        this.showNew = false;
        this.content = "";
        getBlogList().then((data) => {
          this.data1 = data.data;
          this.data2 = data.data;
        });
        return;
      }
      if (e.target.innerText === "删除") {
        this.udShow = false;
        this.delShow = true;
        this.showDetail = false;
        this.showNew = false;
        this.content = "";
        getBlogList().then((data) => {
          this.data1 = data.data;
          this.data2 = data.data;
        });
        return;
      }
    },
    udClick(e) {
      this.tempId = Number(e.toElement.parentNode.firstChild.innerText);
      if (this.tempId !== NaN && this.udShow === true && this.content === "") {
        getBlogDetail(this.tempId).then((data) => {
          console.log(data);
          this.showDetail = true;
          this.udShow = false;
          this.content =
            data.data[0].title + "\n" + data.data[0].contentText;
        });
      }
    },
    async delClick(e) {
      this.$bus.$off("selected");
      this.tempId = Number(e.toElement.parentNode.firstChild.innerText);
      if (this.tempId !== NaN && this.delShow === true) {
        // console.log(this.tempId);
        this.$store.dispatch(
          "changeShowSelect",
          `确定删除标题id为${this.tempId}的博客吗？`
        );
        await this.$bus.$on("selected", (d) => {
          // console.log(d);
          if (d) {
            // this.$store.dispatch("changeTips", "删除成功");
            delBlog(this.tempId).then((result) => {
              // console.log(result);
              if (!result.error) {
                this.$store.dispatch("changeTips", "删除成功");
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
      this.tempData.title = s1.slice(0, s1.indexOf("\n"));
      this.tempData.contentText = s1.slice(s1.indexOf("\n") + 1);
      this.tempData.contentHtml = s2.slice(s2.indexOf("<br />") + 6);
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
      this.tempData.title = s1.slice(0, s1.indexOf("\n"));
      this.tempData.contentText = s1.slice(s1.indexOf("\n") + 1);
      this.tempData.contentHtml = "<p>" + s2.slice(s2.indexOf("<br />") + 6);
      this.tempData.image = this.tempData.image[0]
      console.log(this.tempData.image);
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
  },
  created() {
    // console.log(this.tempId);
    this.tempData.image = []
    getBlogList().then((data) => {
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
.list {
  display: flex;
  width: 100%;
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
  border-right: 2px solid #444;
  text-align: center;
}
.id {
  border-left: 2px solid #444;
  min-width: 50px;
  flex : 0;
}
.title {
  flex: 1;
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
@keyframes goheight {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>