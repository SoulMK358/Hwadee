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
<!--            <el-button type="primary" @click="createMarshalling">发送</el-button>-->
          </div>
        </div>
        <el-card>
          <el-form ref="form">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="考试类型">
                  <el-select v-model="form.examType" @change="getSchoolListByCourse" placeholder="请选择考试类型">
                    <el-option v-for="course in courses" :key="course.value" :label="course.label" :value="course.value"></el-option>
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
                <el-form-item label="考场配置">
                  <el-select v-model="form.examRoomConfig" placeholder="请选择考场配置">
                    <el-option v-for="school in schools" :key="school.value" :label="school.label" :value="school.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
<!--                <el-form-item label="考场配置">-->
<!--&lt;!&ndash;                  <el-input v-model="form.examRoomConfig" placeholder="请输入考场配置"></el-input>&ndash;&gt;-->
<!--                  <el-select v-model="form.examRoomConfig" placeholder="请选择考场配置">-->
<!--                    <el-option v-for="school in schools" :key="school.value" :label="school.label" :value="school.value"></el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
              </el-col>
              <el-col :span="12">
<!--                <el-form-item label="教室数量">-->
<!--                  <el-input v-model="form.classroomNumber" placeholder="请输入教室数量"></el-input>-->
<!--                </el-form-item>-->
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
      schools:[{
        label:"",
        value:"",
      }],
      //用户名
      userName:'xxxx'
    };
  },
  methods: {
    //重置按钮
    handleReset() {
      var _this = this
      this.$confirm("是否确认重置数据","提示",{
        iconClass: "el-icon-question",//自定义图标样式
        confirmButtonText: "确认",//确认按钮文字更换
        cancelButtonText: "取消",//取消按钮文字更换
        showClose: true,//是否显示右上角关闭按钮
        type: "warning",//提示类型  success/info/warning/error
      }).then(()=>{
        //确认操作
        _this.form = {
          examType: '',
          sessionTime: '',
          tempExamCardPrintTime: '',
          examRoomConfig: '',
          classroomNumber: '',
        }
        localStorage.removeItem("marshallingSave")
      }).catch(() => {
        //取消操作
      })

    },
    handleAdd() {
      // 添加考场按钮，安排考场信息，发往后端
      var _this = this
      var datas = {
        courseName:this.form.examType,
        examTime:this.form.sessionTime,
        printTime:this.form.tempExamCardPrintTime,
        examSchools:[]
      }
      datas.examSchools.push(this.form.examRoomConfig)

      this.$confirm("是否确认提交该编场数据","提示",{
        iconClass: "el-icon-question",//自定义图标样式
        confirmButtonText: "确认",//确认按钮文字更换
        cancelButtonText: "取消",//取消按钮文字更换
        showClose: true,//是否显示右上角关闭按钮
        type: "warning",//提示类型  success/info/warning/error
      }).then(()=>{
        //确认操作
        this.$axios({
          method:"post",
          url:'/adminExam',
          data:JSON.stringify(datas)
        }).then(res=>{
          console.log(res)
          //弹窗显示后端返回的信息（成功、失败原因）
          _this.$message({
            type: res.data.code == 200 ? "success" : "error",
            message: res.data.message
          })
          if(res.data.code == 200){
            //如果成功，清空表格数据
            _this.form = {
              examType: '',
              sessionTime: '',
              tempExamCardPrintTime: '',
              examRoomConfig: '',
              classroomNumber: '',
            }
            localStorage.removeItem("marshallingSave")
          }
        })
      }).catch(() => {
        //取消操作
      })

    },
    //根据选择科目，从后端获得学校
    getSchoolListByCourse(){
      var _this = this

      this.$axios({
        method:"get",
        url:"/getSchoolListByCourse?courseName=" + _this.form.examType
      }).then(res=>{
        console.log(res)
        // 弹窗显示后端返回的信息（成功、失败原因）
        _this.$message({
          type: res.data.code == 200 ? "success" : "error",
          message: res.data.code == 200 ?"获取学校成功":"获取学校失败"
        })
         _this.form.examRoomConfig = ''
        if (res.data.code == 200){
          _this.schools = res.data.data
        }


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
  },
  mounted() {
    var parse = JSON.parse(localStorage.getItem("currentAdmin"))
    this.userName = parse.adminName
    this.courses = parse.courseList

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
