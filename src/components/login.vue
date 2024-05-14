<template>
  <el-container>
    <el-header>引导栏内容</el-header>

    <el-main>
      <el-container>
        <el-aside width="65%">
          <img src="path-to-your-image.jpg" alt="Logo" style="width:100%; height:auto;" />
        </el-aside>
        <el-main>
          <el-card class="box-card" style="background: rgba(255, 255, 255, 0.8); padding: 65px;">
            <div slot="header" class="clearfix">
              <span>登录</span>
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
        </el-main>
      </el-container>

    </el-main>
    <el-footer>123</el-footer>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
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
    }
  };
</script>

<style scoped>
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
