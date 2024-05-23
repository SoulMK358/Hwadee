<!-- 报名报考 -->
<template>
  <div>
    <el-container style="height: 100vh;">
      <!-- 头部 -->
      <el-header style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div style="font-size: 20px; font-weight: bold;">报名报考</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-user"></i> 你好，xxx <i class="el-icon-arrow-down el-icon--right"></i>
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
        <div>
          <h2>报名报考</h2>
          <p>填写表格内容，创建考试。</p>
        </div>
        <el-card>
          <el-form ref="form">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="创建考试类型" required>

                  <el-select v-model="form.examType" placeholder="请选择创建考试类型">
                    <el-option v-for="course in courses" :label="course.label" :value="course.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="报名报考时限" required>
                  <el-date-picker v-model="form.startTime" type="datetime" placeholder="开始日期时间"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束" required>
                  <el-date-picker v-model="form.endTime" type="datetime" placeholder="结束日期时间"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
<!--                <el-form-item label="设置开考考区" required>-->
<!--                  <el-select v-model="form.examArea" placeholder="请选择开考考区">-->
<!--                    <el-option label="考区一" value="1"></el-option>-->
<!--                    <el-option label="考区二" value="2"></el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
              </el-col>
            </el-row>
<!--            <el-row :gutter="20">-->
<!--              <el-col :span="12">-->
<!--                <el-form-item label="延长报考时限" required>-->
<!--                  <el-select v-model="form.extendTime" placeholder="请选择延长报考时限">-->
<!--                    <el-option label="时限一" value="1"></el-option>-->
<!--                    <el-option label="时限二" value="2"></el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="12">-->
<!--                <el-form-item label="是否延长时间" required>-->
<!--                  <el-radio-group v-model="form.isExtended">-->
<!--                    <el-radio label="yes">是</el-radio>-->
<!--                    <el-radio label="no">否</el-radio>-->
<!--                  </el-radio-group>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20" style="align-items: center;">-->
<!--              <el-col :span="20">-->
<!--                <el-form-item label="进度查看和统计" required>-->
<!--                  <div class="progress-container">-->
<!--                    <el-steps :active="form.step" finish-status="success" style="width: 600px;" align-center>-->
<!--                      <el-step title="创建考试"></el-step>-->
<!--                      <el-step title="报名结束"></el-step>-->
<!--                      <el-step title="考生考试"></el-step>-->
<!--                      <el-step title="成绩公布"></el-step>-->
<!--                    </el-steps>-->
<!--                  </div>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20">-->
<!--              <el-col :span="18">-->
<!--                <el-form-item label="设置白名单" required>-->
<!--                  <el-input v-model="form.whitelist" placeholder="请输入白名单" style="width: calc(100% - 100px);"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="6" style="display: flex; align-items: center;">-->
<!--                <el-button type="default" style="border: 1px solid #409eff; color: #409eff;" @click="handleSubmit">提交</el-button>-->
<!--              </el-col>-->
<!--            </el-row>-->
            <el-row>
              <el-col :span="24" style="text-align: center;">
                <el-button type="default" style="border: 1px solid #409eff; color: #409eff;" @click="handleSave">保存</el-button>
                <el-button type="default" style="border: 1px solid #409eff; color: #409eff;" @click="handleSubmit">提交</el-button>
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
  name: "EnrollmentPage",
  data() {
    return {
      form: {
        examType: '',
        startTime: '',
        endTime: '',
      },
      courses:[{
        label:"123",
        value:"2323",
      }],
      schoolName:''
    };
  },
  methods: {
    // 提交按钮,点击后提交信息到后端
    handleSubmit() {
      var _this = this
      console.log(_this.form)
      this.$confirm("是否确认创建当前考试科目","提示",{
        iconClass: "el-icon-question",//自定义图标样式
        confirmButtonText: "确认",//确认按钮文字更换
        cancelButtonText: "取消",//取消按钮文字更换
        showClose: true,//是否显示右上角关闭按钮
        type: "warning",//提示类型  success/info/warning/error
      }).then(()=>{
        var datas = {
          schoolName: _this.schoolName,
          courseName: _this.form.examType,
          startTime: _this.form.startTime,
          endTime: _this.form.endTime
        }
        console.log(datas)
        this.$axios({
          method:"post",
          url:"/addExamType",
          data:JSON.stringify(datas)
        }).then(res=>{
          console.log(res)
          //弹窗显示后端返回的信息（成功、失败原因）
          _this.$message({
            type: res.data.code == 200 ? "success" : "error",
            message: res.data.data
          })
          if (res.data.code == 200){
            _this.form = {}
            localStorage.removeItem("schoolCourseCreate")
          }
        })

      }).catch(()=>{

      })



    },
    // 保存按钮，点击后保存当前form信息到localStorage
    handleSave() {
      localStorage.removeItem("schoolCourseCreate")
      localStorage.setItem("schoolCourseCreate", JSON.stringify(this.form))
      this.$message({
        type:"success",
        message:"保存成功"
      })
    },
    // 页面加载时，从localStorage取出信息
    getSavedMsg(){
      var t = localStorage.getItem("schoolCourseCreate")
      // console.log(t)
      if(t != null){
        this.form = JSON.parse(t)
      }
    },
    // 从后端获得可创建考试的科目
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
    }
  },
  mounted() {
    //从localStorage取学校相关信息
    var schoolMsg= JSON.parse(localStorage.getItem("currentSchool"))
    this.schoolName = schoolMsg.schoolName

    this.getSavedMsg()
    this.getCourseList()

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
.progress-container {
  display: flex;
  align-items: center;
}
.el-steps__title {
  font-size: 12px;
}
</style>
