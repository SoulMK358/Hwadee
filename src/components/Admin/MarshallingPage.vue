<!-- 编场管理 -->
<template>
  <div>
    <el-container style="height: 100vh;">
      <!-- 头部 -->
      <el-header style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div style="font-size: 20px; font-weight: bold;">编场管理</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-user"></i> 管理员 {{userName}} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <!-- 主要内容 -->
      <el-main>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2>考试编场</h2>
            <p>填写表格内容，创建考试场地。</p>
          </div>
          <div>
            <el-button type="default" @click="saveForm" style="border: 1px solid #409eff; color: #409eff; margin-left: 10px;">保存</el-button>
            <el-button type="primary" @click="createMarshalling">发送</el-button>
          </div>
        </div>
        <el-card>
          <el-form ref="form">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="考试类型">
                  <el-select v-model="form.examType" placeholder="请选择考试类型">
                    <el-option v-for="course in courses" :label="course.label" :value="course.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="场次时间">
                  <el-date-picker v-model="form.sessionTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="临时准考证打印时间">
                  <el-date-picker v-model="form.tempExamCardPrintTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
<!--                <el-form-item label="卷袋规格">-->
<!--                  <el-select v-model="form.paperBagSize" placeholder="请选择卷袋规格">-->
<!--                    <el-option label="规格一" value="1"></el-option>-->
<!--                    <el-option label="规格二" value="2"></el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="考场配置">
                  <br>
<!--                  <el-input v-model="form.examRoomConfig" placeholder="请输入考场配置"></el-input>-->
                  <el-select v-model="form.examRoomConfig" placeholder="请选择考场配置">
                    <el-option v-for="course in courses" :label="course.label" :value="course.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="教室数量">
                  <el-input v-model="form.classroomNumber" placeholder="请输入教室数量"></el-input>
                </el-form-item>
              </el-col>
<!--              <el-col :span="8">-->
<!--                <el-form-item label="监考老师数量">-->
<!--                  <el-input v-model="form.invigilatorNumber" placeholder="请输入监考老师数量"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-button type="default" style="border: 1px solid #409eff; color: #409eff;" @click="handleReset">
                  <i class="el-icon-refresh"></i> 重置
                </el-button>
              </el-col>
              <el-col :span="12" style="text-align: right;">
                <el-button type="primary" @click="handleAdd">
                  <i class="el-icon-plus"></i> 添加考场
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "MarshallingPage",
  data() {
    return {
      form: {
        examType: '',
        sessionTime: '',
        tempExamCardPrintTime: '',
        examRoomConfig: '',
        classroomNumber: '',
      },
      //用于保存后端传回的可选科目
      courses:[{
        label:"123",
        value:"2323",
      }],
      //用户名
      userName:'xxxx'
    };
  },
  methods: {
    handleReset() {
      //重置按钮
      this.$refs.form.resetFields();
    },
    handleAdd() {
      // 添加考场按钮
    },
    //从后端获得已创建的考试科目(要改）
    getCourseList(){
      var _this = this

      this.$axios({
        method:"get",
        url:"/getCoursesBySchool?schoolName=" + _this.schoolName
      }).then(res=>{
        console.log(res)
        //弹窗显示后端返回的信息（成功、失败原因）
        // _this.$message({
        //   type: res.data.code == 200 ? "success" : "error",
        //   message: res.data.message
        // })
        _this.courses = res.data
      })
    },
    //保存Form内容
    saveForm(){
      console.log("-------------------savaEvent------------------------")
      localStorage.removeItem("marshallingSave")
      localStorage.setItem("marshallingSave", JSON.stringify(this.form))
      this.$message({
        type:"success",
        message:"保存成功"
      })
    },
    // 页面加载时，从localStorage取出信息
    getSavedMsg(){
      var t = localStorage.getItem("marshallingSave")
      // console.log(t)
      if(t != null){
        this.form = JSON.parse(t)
      }
    },
    // 安排考场信息，发往后端
    createMarshalling(){
      var datas = {

      }

      this.$axios({
        method:"post",
        url:'/',
        data:JSON.stringify(datas)
      }).then(res=>{

      })
    },
  },
  mounted() {
    var parse = JSON.parse(localStorage.getItem("currentAdmin"))
    this.userName = parse.adminName
    this.courses = parse.courseList

    this.getCourseList()
    this.getSavedMsg()
  }
}
</script>

<style scoped>
.el-header {
  height: 60px;
  line-height: 60px;
}
.el-main {
  padding: 20px;
}
.el-card {
  padding: 20px;
}
.el-button + .el-button {
  margin-left: 10px;
}
</style>
