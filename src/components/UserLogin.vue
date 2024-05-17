<template>
  <el-container>

    <el-main class="my-el-main">
      <el-container>

      <!--登录界面-->
        <el-aside v-if="!registerStatus" width="35%">
          <el-card class="el-card2">

            <div slot="header" class="el-login">
              <span>{{role}}登录</span>
            </div>
            <br />
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="51px">

              <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.idCard"></el-input>
              </el-form-item>
              <br />
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.stuPassword"></el-input>
              </el-form-item>
              <br />
              <el-form-item label-width="2px">
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="primary" v-if="role=='学生'" @click="registerStatusInvert">注册</el-button>
              </el-form-item>

            </el-form>

          </el-card>

        </el-aside>

        <!--注册界面-->
        <el-aside v-if="registerStatus" width="35%">
          <el-card class="el-card">
            <div slot="header" class="el-login">
              <span>{{role}}注册</span>
            </div>
        <!--注册信息填写表单-->
            <el-form :model="registerForm" :rules="rules" ref="loginForm" label-width="79px" class="demo-ruleForm">
              <el-form-item label="身份证号" prop="username" >
                <el-input v-model="registerForm.idCard" placeholder="请输入身份证号"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="username">
                <el-input v-model="registerForm.stuName" placeholder="请输入真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.stuPassword" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password">
                <el-input type="password" v-model="registerForm.stuConfirmPassword" placeholder="请确认密码"></el-input>
              </el-form-item>
              <el-form-item label="当前学校" prop="username">
                <el-select v-model="selectedSchoolId" placeholder="请选择学校">
                  <el-option v-for="school in schools" :label="school.schoolName" :value="school.schoolId" :key="school.schoolId"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label-width="1px">
                <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="primary" @click="registerStatusInvert" style="text-align=center">返回登录</el-button>
              </el-form-item>

            </el-form>
          </el-card>

        </el-aside>
      </el-container>

    </el-main>

  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        // 不同入口进入的身份--学生、学校、管理员
        role: this.params,
        // 控制登录和注册界面的显示
        registerStatus:false,
        loginForm: {
          idCard: '',
          stuPassword: ''
        },
        registerForm:{
          idCard: "1234444",
          stuName: "水水水",
          stuPassword: "123",
          schoolName: "二仙桥职业学院"
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
        },

        selectedSchoolId:'',
        schools: [{
          schoolId: 1,
          schoolName: '二仙桥职业学院'
        },
          {
            schoolId: 2,
            schoolName: '成都恐龙专科学校'
          }]
      };
    },
    methods: {
      //提交表单（登录/注册）
      submitForm(formName) {
        console.log(this[formName])
        var _this = this
        //登录
        if (formName == "loginForm"){
          console.log("loginSubmit")
          this.$axios({
            method:"post",
            url: "/login",
            data:JSON.stringify(this[formName])
          }).then(res=>{
            console.log(res)

            //登录成功，跳转界面
            if (res.data.code == 200){
              _this.$router.push("/StuHomePage")
            }
          })
        }
        //注册
        else if (formName == "registerForm"){
          console.log("registerSubmit")
          this.$axios({
            method:"post",
            url: "/register",
            data:JSON.stringify(this[formName])
          }).then(res=>{
            console.log(res)
          })
        }



      },
      //切换登录注册页面
      registerStatusInvert(){
        this.registerStatus = !this.registerStatus
        if (this.registerStatus){
          this.getSchoolList()
        }

      },
      //获取学校列表
      getSchoolList(){
        console.log("getSchoolList")
        var _this = this
        this.$axios({
          method:"get",
          url:"/getSchoolList"
        }).then(res=>{
          //console.log(res)
          var result = res.data
          _this.schools = result
          console.log(_this.schools)
        })
      }

    },
    mounted() {

    },
    created() {
      this.role =  JSON.parse(this.$route.query.params).name // 获取从router中传过来的参数
      console.log(this.role)
    }
  };
</script>

<style scoped>
  .my-el-main{
    /* 设置高度为视口高度 */
    height: 100vh;
    /* 设置宽度为100% */
    width: 100%;
    /* 背景图片 */
    background-image: url("../assets/用户登陆页面.png");
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩，并填满容器 */
    background-size: cover;
  }

  .el-aside {
    text-align: center;
    position: relative;
    top:  70px;
    left: 160px;
  }

  .el-main {
    /* background-color: #e9ecef; */
    /* padding: 20px; */
  }

  .el-card {
    background: rgb(247,250,255);
    padding: 30px;
    width: 320px;
    height: 430px;
  }

  .el-card2 {
    background: rgb(247,250,255);
    padding: 30px;
    width: 300px;
    height: 310px;
  }

  .el-login {
    font-size: 30px;
    font-weight: bold;
    font-family: cursive;
    font-style: italic;
  }

</style>
