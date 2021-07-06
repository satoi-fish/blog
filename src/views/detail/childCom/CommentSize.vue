<template>
  <div class="commentSize">
    <div class="comment">
      <h2>评论<i>comment</i></h2>
      <textarea
        v-model.lazy.trim="postCommentData.content"
        name="commentArea"
        @keydown.enter="commentPostClick"
        placeholder="请输入你想说的评论,右下方边缘可拉动伸展"
      ></textarea>
      <button class="btn" @click="commentPostClick">确定</button>
    </div>
    <div
      class="commentSizeContent"
      v-for="(item,index) in commentData.slice().reverse()"
      v-show="item.show"
    >
      <div class="cImage">
        <img src="@/assets/img/lisa.jpg" alt="" />
        <span class="user">{{ item.username }}</span>
        <span class="time"
          >{{ getTime(item) }}
          <span
            class="del"
            v-show="item.delShow"
            @click="toDelComment(item.createtime,index)"
            >删除</span
          ></span
        >
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
import { postBlogComment } from "network/detail";
import { delComment } from "network/delComment";

export default {
  name: "commentSize",
  data() {
    return {
      postCommentData: {
        content: "",
      },
      isComment: 0,
      // delShow:false,
    };
  },
  props: {
    commentData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    toDelComment(createtime,index) {
      delComment(this.$route.params.id, createtime).then((data) => {
        if (data.error !== -1) {
          this.$set(this.commentData[this.commentData.length - index -1],
          'show',
          false
          )
          this.$forceUpdate()
          // this.commentData = data
          this.$store.dispatch("changeTips",'删除成功');
        }
      });
    },
    getTime(item) {
      return formatDate(new Date(item.createtime), "yyyy-MM-dd, hh:mm");
    },
    commentPostClick() {
      // console.log(this.postCommentData);
      postBlogComment(this.$route.params.id, this.postCommentData).then(
        (data) => {
          // this.isComment = Number(data)
          // console.log(data);
          if (data) {
            
            data.data[this.commentData.length].show = true;
            data.data[this.commentData.length].delShow = true;
            this.$set(
              this.commentData,
              this.commentData.length,
              data.data[this.commentData.length]
            );
            // this.$set(this.commentData,this.commentData.length,data.data[this.commentData.length])
            // console.log(data);
            // console.log(this.commentData);
          }
        }
      );
    },
  },
  created() {},
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
.comment > h2,
.comment > i {
  color: #fff;
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
.time {
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
.btn {
  height: 35px;
  width: 130px;
  border-radius: 12px;
  cursor: pointer;
}
.btn:hover {
  background-color: #333;
  color: #fff;
  transition: all 0.5s;
}
.del {
  margin-left: 5px;
  color: rgb(255, 71, 71);
  cursor: pointer;
}
</style>