<template>
  <el-container>
    <el-main class="my-el-main">
      <el-container>
        <!--登录界面-->
        <el-aside v-if="uiStatus === 1" width="40%">
          <el-card class="el-card2">
            <div slot="header" class="el-login">
              <span>{{role}}登录</span>
            </div>
            <br />
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="51px">
              <el-form-item label="账号" prop="idCard">
                <el-input v-model="loginForm.idCard" placeholder="请输入身份证号"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                <el-link @click="statusChange(3)" type="primary" v-if="role=='学生'" class="forgot-password-link" style="margin-left: -45px;">修改密码</el-link>
              </el-form-item>
              <el-form-item label-width="4px">
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <el-button type="primary" v-if="role=='学生'" @click="statusChange(2)">注册</el-button>
                <el-button type="primary" @click="backEvent">返回选择身份</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-aside>
        <!--注册界面-->
        <el-aside v-if="uiStatus === 2" width="35%">
          <el-card class="el-card">
            <div slot="header" class="el-login">
              <span>{{role}}注册</span>
            </div>
            <!--注册信息填写表单-->
            <el-form :model="registerForm" :rules="rules" ref="loginForm" label-width="79px" class="demo-ruleForm">
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="registerForm.idCard" placeholder="请输入身份证号"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="realName">
                <el-input v-model="registerForm.stuName" placeholder="请输入真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passwordRegister">
                <el-input type="password" v-model="registerForm.stuPassword" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="passwordConfirm">
                <el-input type="password" v-model="registerForm.stuConfirmPassword" @blur="passwordConfirm" placeholder="请确认密码"></el-input>
              </el-form-item>
              <el-form-item label="当前学校">
                <el-select v-model="registerForm.schoolName" placeholder="请选择学校">
                  <el-option v-for="school in schools" :label="school.schoolName" :value="school.schoolName" :key="school.schoolId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="1px">
                <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="primary" @click="statusChange(1)" style="text-align:center;">去登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-aside>
        <!--修改密码 -->
        <el-aside v-if="uiStatus === 3" width="40%">
          <el-card class="el-card2">
            <div slot="header" class="el-login">
              <span>{{role}}修改密码</span>
            </div>
            <br />
            <el-form :model="changePasswordForm" :rules="rules" ref="loginForm" label-width="60px">
              <el-form-item label="账号" prop="idCard">
                <el-input v-model="changePasswordForm.idCard" placeholder="请输入身份证号"></el-input>
              </el-form-item>
              <br />
              <el-form-item label="旧密码">
                <el-input type="password" v-model="changePasswordForm.oldPassword" placeholder="请输入旧密码"></el-input>
              </el-form-item>
              <br />
              <el-form-item label="新密码">
                <el-input type="password" v-model="changePasswordForm.newPassword" placeholder="请输入新密码"></el-input>
              </el-form-item>
              <br />
              <el-form-item label-width="4px">
                <el-button type="primary" @click="changePassword">修改密码</el-button>
                <el-button type="primary" @click="statusChange(1)">返回登录</el-button>
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
      // 控制登录1、注册2、修改密码3 界面的显示
      uiStatus:1,
      //登录人员信息
      loginForm: {
        idCard: '',
        password: ''
      },
      //学生注册信息表
      registerForm:{
        idCard: "",
        stuName: "",
        stuPassword: "",
        stuConfirmPassword: "",
        schoolName: ""
      },
      //学生修改密码表
      changePasswordForm:{
        idCard:'',
        oldPassword:'',
        newPassword:''
      },
      //表单验证规则
      rules: {
        //身份证
        idCard:[{
          pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//身份证正则验证
          required: true,
          message: "请填写正确的身份证号",
          trigger: "blur"
        }],
        //注册界面密码判断
        passwordRegister:[{
          //密码验证，6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种
          pattern:/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/,
          required: true,
          message: '6-20位英文、数字或者符号（除空格）且至少包含两种不同类型',
          trigger: 'blur'
        }],
        //注册界面姓名判断
        realName: [{
          //中文真实名字
          pattern:/^[\u0391-\uFFE5A-Za-z]+$/,
          required: true,
          message: '请输入真实姓名',
          trigger: 'blur'
        }]
      },

      //选择的学校在后台的id
      selectedSchoolId:'',
      //从后台拉取学校信息的临时表格
      schools: [
        {
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
      //防止axios返回then函数中this被覆盖
      var _this = this
      //登录
      if (formName == "loginForm"){
        //学生登录
        if(_this.role=="学生"){
          // this.$router.push("/StuHomePage")
          // console.log("Stu loginSubmit")
          // 设置待传JSON信息的键：值对应方式
          var datas = {
            idCard: this[formName].idCard,
            stuPassword: this[formName].password
          }
          //向后端发送登录人员信息表格
          this.$axios({
            method: "post",
            url: "/studentLogin",
            data: JSON.stringify(datas)
          }).then(res=>{
            console.log(res)
            //弹窗显示后端返回的信息（成功、失败原因）
            _this.$message({
              type: res.data.code == 200 ? "success" : "error",
              message: res.data.data.message
            })

            //登录成功，跳转界面
            if (res.data.code == 200){
              //保存当前用户的个人相关信息，以便后续使用
              localStorage.setItem("currentUser",JSON.stringify(res.data.data))
              setTimeout(function (){
                _this.$router.push("/StuHomePage")
              },800)
            }
          })
        }
        //院校登录
        else if(_this.role=="院校"){
          var datas = {
            idCard:_this.loginForm.idCard,
            schoolerPassword:_this.loginForm.password
          }
          this.$axios({
            method:"post",
            url:"/schoolerLogin",
            data: JSON.stringify(datas)
          }).then(res=>{
            console.log(res)
            //弹窗显示后端返回的信息（成功、失败原因）
            _this.$message({
              type: res.data.code == 200 ? "success" : "error",
              message: res.data.message == null ? "服务器未连接" : res.data.message
            })
            if (res.data.code == 200){
              //成功后保存后端返回信息
              //保存当前用户的个人相关信息，以便后续使用
              res.data.data["idCard"] = _this.loginForm.idCard
              localStorage.setItem("currentSchool",JSON.stringify(res.data.data))
              setTimeout(function (){
                _this.$router.push("/SchoolHomePage")
              },800)

            }

          })

        }
        //管理员登录
        else if(_this.role=="管理员"){
          var datas = {
            idCard:_this.loginForm.idCard,
            adminPassword:_this.loginForm.password
          }
          this.$axios({
            method:"post",
            url:"/adminLogin",
            data: JSON.stringify(datas)
          }).then(res=>{
            console.log(res)
            //弹窗显示后端返回的信息（成功、失败原因）
            _this.$message({
              type: res.data.code == 200 ? "success" : "error",
              message: res.data.message == null ? "服务器未连接" : res.data.message
            })
            if (res.data.code == 200){
              //成功后保存后端返回信息
              localStorage.setItem("currentAdmin", JSON.stringify(res.data.data))
              setTimeout(function (){
                _this.$router.push("/AdminHomePage")
              })

            }

          })
        }
      }

      //注册
      else if (formName == "registerForm"){
        console.log("registerSubmit")
        console.log(this[formName])
        //向后端发送注册人员信息表格
        this.$axios({
          method:"post",
          url: "/register",
          data:JSON.stringify(this[formName])
        }).then(res=>{
          console.log(res)
          //弹窗显示后端返回的信息（成功、失败原因）
          _this.$message({
            type: res.data.code == 200 ? "success" : "error",
            message: res.data.data
          })
          if (res.data.code == 200){
            setTimeout(function (){
              _this.statusChange(1)
            },500)
          }

        })
      }
    },
    //切换登录/注册/修改密码页面
    statusChange(status){
      this.uiStatus = status
      //如果是注册页面，则拉取已有学校列表
      if (status == 2){
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
    },
    //确认密码栏验证
    passwordConfirm(){
      if (this.registerForm.stuPassword != this.registerForm.stuConfirmPassword){
        this.$message({
          type: "error",
          message: "密码不一致，请再次确认"
        })
      }
    },
    //返回选择登录方式界面
    backEvent(){
      this.$router.push('/')
    },
    changePassword(){
      var _this = this

      this.$confirm("是否确认修改密码","提示",{
        iconClass: "el-icon-question",//自定义图标样式
        confirmButtonText: "确认",//确认按钮文字更换
        cancelButtonText: "取消",//取消按钮文字更换
        showClose: true,//是否显示右上角关闭按钮
        type: "warning",//提示类型  success/info/warning/error
      }).then(()=>{
        //确认操作
        this.$axios({
          method:"post",
          url:"/changePassword",
          data:JSON.stringify(_this.changePasswordForm)
        }).then(res=>{
          console.log(res)
          //弹窗显示后端返回的信息（成功、失败原因）
          _this.$message({
            type: res.data.code == 200 ? "success" : "error",
            message: res.data.message
          })
          if (res.data.code == 200){
            _this.changePasswordForm = {
              idCard:'',
              oldPassword:'',
              newPassword:''
            }
            setTimeout(function (){
              _this.statusChange(1)
            },500)

          }
        })

      }).catch(() => {
        //取消操作
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
  width: 350px;
  height: 430px;
}

.el-card2 {
  background: rgb(247,250,255);
  padding: 30px;
  width: 350px;
  height: 380px;
}

.el-login {
  font-size: 30px;
  font-weight: bold;
  font-family: cursive;
  font-style: italic;
}

</style>
