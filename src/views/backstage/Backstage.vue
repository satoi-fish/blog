<template>
  <div class="Backstage">
    <header class="headertitle">后 台 管 理 系 统</header>
    <Banner class="banner" :imageData="imgData" />
    <div class="wrapper" @click="listClick">
      <Midbox class="new" title="新建">
        <article class="newblog" v-show="showNew">
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
            class="mavon-editor"
            v-model="content"
            @save="saveNew"
            @imgAdd="addImg"
          />
        </article>
      </Midbox>
      <Midbox class="update" title="更新">
        <div class="listbox" v-show="udShow">
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
      </Midbox>
      <Midbox class="del" title="删除">
        <div class="listbox" v-show="delShow" @click="delClick">
          <div class="list" v-for="item2 in data2">
            <div class="id">{{ item2.id }}</div>
            <div class="title">{{ item2.title }}</div>
            <div class="content">{{ item2.content }}</div>
          </div>
        </div>
      </Midbox>
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
import { Upload, Button, Icon } from "ant-design-vue";

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
    Button,
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
        return;
      }
      if (e.target.innerText === "更新") {
        this.udShow = true;
        this.delShow = false;
        this.showDetail = false;
        this.showNew = false;
        this.content = "";
        return;
      }
      if (e.target.innerText === "删除") {
        this.udShow = false;
        this.delShow = true;
        this.showDetail = false;
        this.showNew = false;
        this.content = "";
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
            data.data[0].title + "," + "\n" + data.data[0].contentHtml;
        });
      }
    },
    async delClick(e) {
      this.$bus.$off('selected')
      this.tempId = Number(e.toElement.parentNode.firstChild.innerText);
      if (this.tempId !== NaN && this.delShow === true) {
        // console.log(this.tempId);
        this.$store
        .dispatch('changeShowSelect',`确定删除标题id为${this.tempId}的博客吗？`)
        await this.$bus.$on('selected',(d)=>{
          // console.log(d);
          if(d){
            // this.$store.dispatch("changeTips", "删除成功");
            delBlog(this.tempId).then((result) => {
              // console.log(result);
              if(!result.error){
                this.$store.dispatch("changeTips", "删除成功");
              }else{
                this.$store.dispatch("changeTips", "删除失败");
              }
            });
          }
        })   
      }
    },
    async saveUpdate(s1, s2) {
      this.$bus.$off('selected')
      // console.log(s1, ",", s2);
      this.tempData.title = s1.slice(0, s1.indexOf(","));
      this.tempData.contentText = s1;
      this.tempData.contentHtml = s2;
      this.$store
        .dispatch('changeShowSelect',`确定更新标题id为${this.tempId}的博客吗？`)
      await this.$bus.$on('selected',(d)=>{
        if(d){
          updateBlog(this.tempId, this.tempData).then((data) => {
            if (data.error !== -1) {
              this.$store.dispatch("changeTips", "更新成功");
            }else{
              this.$store.dispatch("changeTips", "更新失败");
            }
          });
        }
        this.$bus.$off('changeShowSelect')
      })   
    },
    async saveNew(s1, s2) {
      this.$bus.$off('selected')
      // console.log(2);
      // console.log(s1.slice((s1.indexOf("\n")) + 1));
      // console.log(s1,'\n',s2);
      this.tempData.title = s1.slice(0, s1.indexOf("\n"));
      this.tempData.contentText = s1.slice(s1.indexOf("\n") + 1);
      this.tempData.contentHtml = "<p>" + s2.slice(s2.indexOf("<br />") + 6);
      // console.log(this.tempData);
      this.$store
        .dispatch('changeShowSelect',`确定新建标题为${this.tempData.title}的博客吗？`)
      await this.$bus.$on('selected',(d)=>{
        // console.log(d);
        if(d){
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
      })   
    },
    addImg(filename, fileobj) {
      console.log(filename, ",", fileobj);
    },
    handleChange(info) {
      const status = info.file.status;
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
  created() {
    // console.log(this.tempId);
    getBlogList().then((data) => {
      this.data1 = data.data;
      this.data2 = data.data;
    });
  },
  mounted() {},
  beforeDestroy(){
    this.$bus.$off('changeShowSelect')
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
  margin: 0 10%;
  margin-top: calc(50vh + 158px);
  justify-content: space-around;
}
.headertitle {
  font-size: 40px;
  color: #ddd;
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.listbox {
  position: absolute;
  left: 0;
  top: 80px;

  background-color: #fff;
  width: 80vw;
  min-height: 600px;
  margin-top: 25px;
}
.list {
  display: flex;
  width: 80%;
  justify-content: center;
  /* margin: 0 auto; */
  cursor: pointer;
}
.list:hover {
  background-color: #333;
}
.id {
  min-width: 50px;
  border-right: 3px solid red;
}
.title {
  min-width: 200px;
  border-right: 3px solid red;
}
.content {
  min-width: 400px;
  border-right: 3px solid red;
}
.mavon-editor {
  position: absolute;
  /* width: 100vh; */
  left: 0;
  height: 80vh;
  margin-top: 308px;
  right: 0;
}
.upload {
  display: flex;
  flex-direction: column;
  font-size: 50px;
  position: absolute;
  height: 200px;
  /* width: 300px; */
  /* margin: 0 120px; */
  left: 0;
  /* padding: 0 20%; */
  right: 0;
  margin-top: 55px;
  z-index: 10;
  background-color: #fff;
}
.insideUpload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 30px;
  padding-top: 50px;
  text-align: center;
}
/* .new{
  animation:goheight 5s;
}
@keyframes goheight {
  from{
    height: 0px;
  }
} */
</style>