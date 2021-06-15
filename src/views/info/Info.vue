<template>
  <div class="info">
    <div class="title">{{this.$store.state.username}}的个人信息</div>
    <Banner class="banner" :imageData="imgData" />
    <Upload
      class="upload"
      name="files"
      :multiple="true"
      action="/api/upload"
      @change="handleChange"
    >
      <div class="insideUpload">
        <Icon type="inbox" />
        <span>头像上传</span>
        <span>拖动图片到此处,或点击上传</span>
      </div>
    </Upload>
    div{nihao}*1000
  </div>
</template>

<script>
import { Upload, Icon } from "ant-design-vue";
import Banner from "components/content/Banner";
import { uploadProfile } from "network/uploadProfile";


export default {
  name: "info",
  data() {
    return {
      imgData:'http://localhost/images/background.jpg'
    };
  },
  components: {
    Upload,
    Icon,
    Banner,
  },
  methods:{
    handleChange(info) {
      const status = info.file.status;
      if (status === "done") {
        // console.log(info.file);
        // console.log(this.tempData.image);
        uploadProfile(this.$store.state.username,info.file.name).then(data=>{
          if(data.error === -1){
            this.$store.dispatch('changeTips','存入数据库失败')
          }
        })
      } else if (info.file.status === "error") {
        this.$store.dispatch('changeTips','error on upload image')
      }
    },
  },
};
</script>

<style scoped>
.title{
  position: relative;
  margin-top: 0px;
  z-index: 99;
  min-height: calc( 30vh + 58px + 140px);
  line-height:calc( 30vh + 58px + 140px) ;
  font-size: 3rem;
  color: #fff;
  text-align: center;
}
.upload {
  display: flex;
  flex-direction: column;
  font-size: 50px;
  margin:200px auto;
  /* margin-top: 100px;
  margin-bottom: 100px; */
  z-index: 10;
  background-color: #fff;
  border-radius: 5px;
  width: 80vw;
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
</style>