<template>
  <div class="commentSize">
    <div class="comment">
      <h2>评论 {{postCommentData.content}}<i>comment</i></h2>
      <textarea v-model.lazy.trim="postCommentData.content"
        name="commentArea"
        placeholder="请输入你想说的评论,右下方边缘可拉动伸展"
      ></textarea>
      <button @click="commentPostClick">确定</button>
    </div>
    <div class="commentSizeContent" v-for="item in commentData.slice().reverse()" >
      <div class="cImage">
        <img src="@/assets/img/lisa.jpg" alt="" />
        <span class="user">{{ item.username }}</span>
        <span class="time">{{ getTime(item) }}</span>
      </div>
      <div class="triangle"></div>
      <span class="ctext">
        {{ item.commentdata }}
      </span>
    </div>
  </div>
</template>

<script>
import { formatDate } from "utils";
import { postBlogComment } from 'network/detail'

export default {
  name: "commentSize",
  data(){
    return{
      postCommentData:{
        content:''
      },
      isComment:0,
    }
  },
  props: {
    commentData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods:{
    getTime(item){
      return formatDate(new Date(item.createtime),"yyyy-MM-dd, hh:mm");
    },
    commentPostClick(){
      // console.log(this.postCommentData);
      postBlogComment(this.$route.params.id,this.postCommentData).then(data=>{
        // this.isComment = Number(data)
        // console.log(data);
        if(data){
          this.$set(this.commentData,this.commentData.length,data.data[this.commentData.length])
          // console.log(data);
        }
      })
    },
  },
  created(){
  }
};
</script>

<style scoped>
.commentSizeContent {
  width: 100%;
  /* background-color: #fff; */
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  align-content: flex-start;
}
.comment {
  padding: 25px 0;
  border-top: 7px solid black;
}
.comment textarea {
  margin: 0;
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  width: 100%;
  min-height: 150px;
  max-height: 250px;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.cImage {
  min-width: 120px;
  height: 120px;
  flex: 2;
  display: flex;
  flex-direction: column;
  /* margin:10px 10px 10px; */
}
.user {
  font-size: 20px;
  color: rgb(22, 172, 218);
} 
.time{
  font-size: 15px;
}
.triangle {
  position: relative;
  width: 0;
  height: 0;
  border: 10px solid;
  border-color: transparent rgb(207, 205, 205) transparent transparent;
  z-index: 10;
  top: 50px;
  left: 0px;
}
.cImage img {
  /* float: left; */
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.ctext {
  color: #000;
  margin-left: 0px;
  border-radius: 25px;
  padding: 10px;
  padding-left: 17px;
  flex: 8;
  display: block;
  background-color: rgb(207, 205, 205);
}
</style>