<template>
  <el-container>
    <el-main class="my-el-main">
      <el-container>
        <el-header style="height: 300px"></el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="3" :offset="7"><el-button @click="goToUserLogin('学生')" class="btn-content btn-bg-purple">学生登录</el-button></el-col>
            <el-col :span="3" :offset="1"><el-button @click="goToUserLogin('院校')" class="btn-content btn-bg-purple">院校登录</el-button></el-col>
            <el-col :span="3" :offset="1"><el-button @click="goToUserLogin('管理员')" class="btn-content btn-bg-purple">管理员登录</el-button></el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    //跳转到登录页面(附带登录方式)
    goToUserLogin(role){
      this.$router.push({
        path:'/userLogin',
        query: {params: JSON.stringify({name: role})}
      })
    }
  },
  created() {

  }
};
</script>

<style scoped lang="css">
  .my-el-main {
    /* 设置高度为视口高度 */
    height: 97vh;
    /* 设置宽度为100% */
    width: 100%;
    /* 背景图片 */
    background-image: url("../assets/个人集体选择页面.png");
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩，并填满容器 */
    background-size: contain;
    /* 设置背景颜色，背景图加载过程中会显示背景色 */
    background-color: #EFF5FF;
  }

  .btn-bg-purple {
    background: rgba(104, 109, 224, 1);
    box-shadow: 0px 2.96px 5.92px  rgba(20, 14, 62, 0.25),inset 0px 0px 0px 2.96px rgba(72, 52, 212, 1),inset 0px 2.96px 2.96px 2.96px rgba(255, 255, 255, 0.25),inset 0px -2.96px 2.96px 2.96px rgba(52, 35, 170, 0.25);
    width: 200px;
    height: 100px;

  }
  .btn-content {
    border-radius: 29.6px;
    min-height: 80px;
    align-content: center;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    font-size: 30px;
    font-weight: bold;
    font-family: cursive;
    font-style: italic;
  }

  .my-button{
    width: 383px;
    height: 163px;
    opacity: 1;
    border-radius: 29.6px;
    background: rgba(104, 109, 224, 1);
    box-shadow: 0px 2.96px 5.92px  rgba(20, 14, 62, 0.25),inset 0px 0px 0px 2.96px rgba(72, 52, 212, 1),inset 0px 2.96px 2.96px 2.96px rgba(255, 255, 255, 0.25),inset 0px -2.96px 2.96px 2.96px rgba(52, 35, 170, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 53.28px 71.04px 53.28px 71.04px;
  }
</style>
