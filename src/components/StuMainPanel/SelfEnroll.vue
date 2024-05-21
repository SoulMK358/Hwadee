<template>
  <div class="el-card-outside">
    <!--      报考学校信息栏目-->
    <el-card class="el-card-aimSchool">
      <el-form size="large" label-width="auto">
        <span>个人报考<br><br></span>
        <el-form-item label="考试科目/考场:">
          <el-cascader v-model="selectedCourseSchool" :options="examClass" @change="selectExamClass"/>
          <el-button type="success" @click="confirmCourseSchool">确认科目/考场</el-button>
        </el-form-item>
        <el-form-item label="进度流程:">
          <el-steps style="max-width: 1200px" :active="courseStatus.step" align-center>
            <el-step title="未开始报名" description=""/>
            <el-step title="选择科目/考场" description=""/>
            <el-step title="个人缴费" description=""/>
            <el-step title="确认报名" description=""/>
            <el-step title="打印准考证" description=""/>
            <el-step title="考试结束" description=""/>
          </el-steps>
        </el-form-item>
        <el-form-item>
          <el-button type="success">个人缴费</el-button>
          <el-button type="success">打印座位通知单</el-button>
          <el-button type="success">打印考生准考证</el-button>
          <el-button type="danger">报名</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "selfEnroll",
  data() {
    return {
      //学生个人信息
      Stu: {
        stuName: "阿萨大大",
        idCard: "111111111111111111",
        schoolName: '二仙桥职业学院',
      },
      allCourseStatus: [{
        schoolName: "成都理工大学",
        courseName: "操作系统",
        step: 1
      }],
      //目前用户已选科目的状态信息
      courseStatus: {
        schoolName: "",
        courseName: "",
        step: 1
      },
      //已选择的考试类型(数组类型，0为考试科目、1为考试学校）
      selectedCourseSchool: [],
      //从数据库拉取的考试科目与可考试学校
      examClass: [
        //1级-考试科目；2级-考试学校
        {
          value: '操作系统',
          label: '操作系统',
          children: [
            {
              value: '成都理工大学',
              label: '成都理工大学',
            }
          ],
        },
      ],
    }
  },
  methods: {
    //点击之后，通过用户id、所选科目、所选学校，获得用户当前进度
    selectExamClass() {
      // console.log(this.selectedCourseSchool[0])
      // console.log(this.allCourseStatus[0])
      var ifFind = false
      for(let course of this.allCourseStatus){
        // console.log(this.selectedCourseSchool)
        // console.log(course)
        if (course.courseName == this.selectedCourseSchool[0] && course.schoolName == this.selectedCourseSchool[1]){
          this.courseStatus = course
          ifFind = true
          break
        }
      }
      if(ifFind) {
        this.$message({
          type: "success",
          message: "选择成功"
        })
      }

    },
    // 选择科目/考场后，点击确定选择，传到后端：用户id、所选科目、所选学校、状态
    confirmCourseSchool() {
      var _this = this
      let datas = {
        idCard: this.Stu.idCard,
        courseName: this.selectedCourseSchool[0],
        schoolName: this.selectedCourseSchool[1],
        step: 2
      }
      //JSON.stringify(datas)
      this.$confirm("是否确认当前科目/考场","提示",{
        iconClass: "el-icon-question",//自定义图标样式
        confirmButtonText: "确认",//确认按钮文字更换
        cancelButtonText: "取消",//取消按钮文字更换
        showClose: true,//是否显示右上角关闭按钮
        type: "warning",//提示类型  success/info/warning/error
      }).then(()=>{
        //确认操作
        this.$axios({
          method: "post",
          url: "/addExam",
          data: JSON.stringify(datas)
        }).then(res => {
          //弹窗显示后端返回的信息（成功、失败原因）
          _this.$message({
            type: res.data.code == 200 ? "success" : "error",
            message: res.data.message
          })
          //传回信息处理（如果有）

          //及时更新状态--选择学校
          this.courseStatus.step = 2

        })
      }).catch(() => {
        //取消操作
      })



    }
  },
  mounted() {
    console.log("PreRead----------------------------------")
    var stuMsg = JSON.parse(localStorage.getItem("currentUser"))
    console.log(stuMsg)
    //学生个人信息
    this.Stu = stuMsg.student
    // console.log(this.Stu)

    //所有的考试信息,处理成对应格式-examClass
    var exams = stuMsg.exams
    var tempExamClasses = [] //初始化考试列表
    for(let exam of exams){ //批量格式化
      var key = Object.keys(exam)[0]
      var tempExamClass = {
        value:key,
        label:key,
        disabled:false,
        children:[]
      }
      for(let school of exam[key]){
        // console.log(school)
        tempExamClass.children.push({
          value:school,
          label:school,
        })
      }
      tempExamClasses.push(tempExamClass)
    }
    this.examClass = tempExamClasses

    //该学生已选的课程信息,并在选择列表中禁用选项
    this.allCourseStatus = stuMsg.chosen
    // console.log(this.allCourseStatus)
    for (let course of this.allCourseStatus){
      for(let exam of this.examClass){
        if (course.courseName == exam.value){
          exam.disabled = true
          break
        }
      }
    }

  }

}
</script>

<style scoped>
.el-card-outside {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.el-button--success {
  background: #094067;
  border: #eeeeee;
}
</style>
