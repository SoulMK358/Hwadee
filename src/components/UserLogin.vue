<template>
  <el-container>
    <el-header>引导栏内容</el-header>

    <el-main class="my-el-main">
      <el-container>
        <el-aside width="35%">
          <el-card class="box-card" style="background: rgba(255, 255, 255, 0.8); padding: 65px;">
            <div slot="header" class="clearfix">
              <span>{{role}}登录</span>
            </div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <el-button type="primary" @click="submitForm('loginForm')">注册</el-button>
              </el-form-item>
            </el-form>
          </el-card>

        </el-aside>

      </el-container>

    </el-main>
    <el-footer>123</el-footer>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        role: this.params,
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        // this.$axios({
        //   method:,
        //   url:,
        // })
      }
    },
    created() {
      this.role =  JSON.parse(this.$route.query.params).name // 获取从router中传过来的参数
      console.log(this.role)
    }
  };
</script>

<style scoped>
.my-el-main{
  height: 570px;
  background-image: url("../assets/用户登陆页面.png");
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #464646;
}
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    line-height: 60px;
    padding: 0 20px;
  }

  .el-aside {
    background-color: #d3dce6;
    text-align: center;
  }

  .el-main {
    background-color: #e9ecef;
    padding: 20px;
  }

  .box-card {
    width: 340px;
  }
</style>
