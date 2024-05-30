<template>

  <div class="el-card-outside">
    <br>
    <!--      个人信息栏-->
    <el-card class="el-card-selfMsg">
      <span style="display: flex; font-size: 20px">考试成绩</span><br>
      <el-button type="primary" @click="getExamScore" style="display:flex; justify-content: flex-end; margin-left: 850px;">刷新列表</el-button>
      <el-table :data="allCourseScores">
        <el-table-column prop="courseName" label="科目" width="280"></el-table-column>
        <el-table-column prop="schoolName" label="考试学校" width="280"></el-table-column>
        <el-table-column prop="stuMark" label="成绩"></el-table-column>
      </el-table>
    </el-card>
    <br>
  </div>
</template>

<script>
export default {
  name: "ExamScore",
  data(){
    return{
      //学生个人信息
      Stu: {
        stuName: "阿萨大大",
        idCard: "111111111111111111",
        schoolName: '二仙桥职业学院',
      },
      //学生成绩列表
      allCourseScores: [
        {
        courseName: "测试课程1",
        schoolName: "测试学校1",
        stuMark: "测试分数1"
      },
        {
        courseName: "测试课程2",
        schoolName: "测试学校2",
        stuMark: "测试分数2"
      }
      ],
    }
  },
  methods:{
    //从后端获取考试成绩
    getExamScore(){
      var _this = this
      var datas = {
        idCard: this.Stu.idCard
      }

      this.$axios({
        method:"get",
        url:"/student/getOneStudentMark",
        params:datas
      }).then(res=>{
        console.log(res)
        this.$message({
          type: res.data.code == 200 ? "success" : "error",
          message: res.data.message
        })

        if (res.data.code == 200){
          _this.allCourseScores = res.data.data
        }
      })

    }

  },
  mounted() {
    console.log("PreRead----------------------------------")
    //学生个人信息
    this.Stu = JSON.parse(localStorage.getItem("currentUser"))
    //获取学生考试成绩
    this.getExamScore()
  }
}
</script>

<style scoped>
.el-card-selfMsg {
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
</style>
