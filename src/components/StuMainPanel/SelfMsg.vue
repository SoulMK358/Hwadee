<template>

  <div class="el-card-outside">
    <br>
    <!--      个人信息栏-->
    <el-card class="el-card-selfMsg">
      <el-form :inline="true" :model="Stu" label-width="auto">
        <span>个人信息<br><br></span>
        <el-form-item label="姓名:">
          <el-input placeholder="" v-model="Stu.stuName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input placeholder="" v-model="Stu.idCard" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属院校:">
          <el-input placeholder="" v-model="Stu.schoolName" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <br><br>
      <span style="display: flex; ">已报考科目</span><br>
      <el-table :data="allCourseStatus" style="width: 100%">
        <el-table-column prop="courseName" label="科目" width="280"></el-table-column>
        <el-table-column prop="schoolName" label="考试学校" width="280"></el-table-column>
        <el-table-column prop="step" label="报名进度"></el-table-column>
      </el-table>
    </el-card>
    <br>
<!--    &lt;!&ndash;      报考学校信息栏目&ndash;&gt;-->
<!--    <el-card class="el-card-aimSchool">-->
<!--      <el-form size="large" label-width="110px">-->
<!--        <span>个人报考<br><br></span>-->
<!--        <el-form-item label="考试科目/考场:">-->
<!--          <el-cascader v-model="selectedCourseSchool" :options="examClass" @change="selectExamClass"/>-->
<!--          <el-button type="success" @click="confirmCourseSchool">确认科目/考场</el-button>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="进度流程:">-->
<!--          <el-steps style="max-width: 1200px" :active="courseStatus.step" align-center>-->
<!--            <el-step title="未开始报名" description=""/>-->
<!--            <el-step title="选择科目/考场" description=""/>-->
<!--            <el-step title="个人缴费" description=""/>-->
<!--            <el-step title="确认报名" description=""/>-->
<!--            <el-step title="打印准考证" description=""/>-->
<!--            <el-step title="考试结束" description=""/>-->
<!--          </el-steps>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="success">个人缴费</el-button>-->
<!--          <el-button type="success">打印座位通知单</el-button>-->
<!--          <el-button type="success">打印考生准考证</el-button>-->
<!--          <el-button type="danger">报名</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-card>-->
  </div>

</template>

<script>
export default {
  name: "selfMsg",
  data() {
    return {
      //学生个人信息
      Stu: {
        stuName: "阿萨大大",
        idCard: "111111111111111111",
        schoolName: '二仙桥职业学院',
      },
      //学生已选科目列表
      allCourseStatus: [{
        schoolName: "成都理工大学",
        courseName: "操作系统",
        step: 1
      }],
      //当前报名进度映射
      stepEnum:{
        1:"未开始报名(1/5)",
        2:"选择科目/考场(2/5)",
        3:"个人缴费(3/5)",
        // 4:"确认报名(4/6)",
        4:"打印准考证(4/5)",
        5:"考试结束(5/5)",
      },
    }
  },
  methods: {
    // getStudentCoursesToChose?idCard=510903200811101636
    //从后端获取当前学生已报考科目
    getStuSelectedCourse(){
      var _this = this

      this.$axios({
        method: "get",
        url: "/getStudentCoursesHasChosen",
        params:{idCard: _this.Stu.idCard}
      }).then(res=>{
        console.log("--------------从后端获取当前学生已报考科目-----------------")
        console.log(res)
        //成功将读取的已选择课程显示
        if (res.data.code == 200){
          _this.allCourseStatus = []
          //处理step显示
          for (let x of res.data.data){
            console.log(x)
            x.step = _this.stepEnum[x.step]
            _this.allCourseStatus.push(x)
          }
        }
      })
    }

  },
  mounted() {
    console.log("PreRead----------------------------------")
    //取出登录传回的个人信息
    this.Stu = JSON.parse(localStorage.getItem("currentUser"))
    //读取学生已选的课程信息
    this.getStuSelectedCourse()

  }
}
</script>

<style scoped>
.el-card-selfMsg {
  width: 1000px;
  display: flex;

  /*justify-content: center;*/
}

.el-card-aimSchool {
  width: 1000px;
  display: flex;

  /*justify-content: center;*/
}

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
