<template>
  <div class="el-card-outside">
    <!--      报考学校信息栏目-->
    <el-card class="el-card-aimSchool">
      <el-form size="large" label-width="auto">
        <span>个人报考<br><br></span>
        <el-form-item label="考试科目/考场:">
          <el-cascader v-model="selectedCourseSchool" :options="examClass" @change="selectExamClass"/>
          <el-button type="success" :disabled="comfirmDisabled" @click="confirmCourseSchool">确认科目/考场</el-button>
        </el-form-item>
        <el-form-item label="进度流程:">
          <el-steps style="max-width: 1200px" :active="courseStatus.step" align-center>
            <el-step title="未开始报名" description=""/>
            <el-step title="选择科目/考场" description=""/>
            <el-step title="个 人 缴 费 / 完 成 报 名" description=""/>
<!--            <el-step title="确认报名" description=""/>-->
            <el-step title="可打印准考证" description=""/>
            <el-step title="考试结束" description=""/>
          </el-steps>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = true" :disabled="payDisabled" type="danger">个人缴费</el-button>
<!--          <el-button type="success">打印座位通知单</el-button>-->
          <el-button @click="filePrint" type="success">打印考生准考证</el-button>
<!--          <el-button @click="enrollClick" type="danger">报名</el-button>-->
        </el-form-item>
      </el-form>

      <!-- 弹出框组件 -->
      <el-dialog
        title="个人缴费"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <!-- 在这里加入你的图片 -->
          <img src="../../assets/微信收款.png" alt="描述文字" style="width: 100%; height: auto;">
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消支付</el-button>
        <el-button type="primary" @click="afterPay">已支付</el-button>
      </span>
      </el-dialog>
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
      //学生已经报考的科目列表
      allCourseStatus: [{
        schoolName: "成都理工大学",
        courseName: "操作系统",
        step: 1
      }],
      //报考界面-目前用户已选科目的状态信息
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
      // 控制弹出框显示隐藏
      dialogVisible: false
    }
  },
  computed:{
    //控制只有进度1的科目/考场可以确认
    comfirmDisabled(){
      return this.courseStatus.step != 1 || this.selectedCourseSchool.length == 0
    },
    //控制只有进度2时才能进行缴费
    payDisabled(){
      return this.courseStatus.step != 2
    }
  },
  methods: {
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
          _this.allCourseStatus = res.data.data
        }
      })
    },
    //点击之后，通过用户id、所选科目、所选学校，获得用户当前进度
    selectExamClass() {
      console.log("--------------选择科目/考场----------------")
      // console.log(this.allCourseStatus)
      let ifFind = false;
      for(let course of this.allCourseStatus){
        if (course.courseName == this.selectedCourseSchool[0] && course.schoolName == this.selectedCourseSchool[1]){
          //深拷贝防止后续修改造成的错误
          this.courseStatus = JSON.parse(JSON.stringify(course))
          ifFind = true
          break
        }
      }
      if(ifFind) {
        this.$message({
          type: "success",
          message: "选择成功"
        })
        // this.courseStatus.step = 2
      }
      else {
        this.$message({
          type: "success",
          message: "当前学校还未报考"
        })
        this.courseStatus.step = 1
        this.courseStatus.courseName = this.selectedCourseSchool[0]
        this.courseStatus.schoolName = this.selectedCourseSchool[1]
      }

    },
    // 选择科目/考场后，点击确定选择，让进度条前进
    confirmCourseSchool() {


      this.courseStatus.step = 2
      // {
      //   idCard: this.Stu.idCard,
      //   courseName: this.selectedCourseSchool[0],
      //   schoolName: this.selectedCourseSchool[1],
      //   step: 2
      // }

      // console.log(datas)
      // JSON.stringify(datas)
      // this.$confirm("是否确认当前科目/考场","提示",{
      //   iconClass: "el-icon-question",//自定义图标样式
      //   confirmButtonText: "确认",//确认按钮文字更换
      //   cancelButtonText: "取消",//取消按钮文字更换
      //   showClose: true,//是否显示右上角关闭按钮
      //   type: "warning",//提示类型  success/info/warning/error
      // }).then(()=>{
      //   //确认操作
      //   this.$axios({
      //     method: "post",
      //     url: "/addExam",
      //     data: JSON.stringify(datas)
      //   }).then(res => {
      //     //弹窗显示后端返回的信息（成功、失败原因）
      //     _this.$message({
      //       type: res.data.code == 200 ? "success" : "error",
      //       message: res.data.message
      //     })
      //     //传回信息处理（如果有）
      //
      //     //及时更新状态--选择学校
      //     if (res.data.code == 200){
      //       this.courseStatus.step = 2
      //     }
      //
      //
      //   })
      // }).catch(() => {
      //   //取消操作
      // })



    },
    //弹出框关闭事件
    handleClose() {
      this.$confirm('确定要关闭弹出框吗？')
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {});
    },
    //接收后台发来的准考证文件
    filePrint(){
      var _this = this
      // 数据库触发器会在到准考证打印时间后自动改变进度为4，此时可打印准考证
      if (this.courseStatus.step == 4){
        this.$axios({
          method:"post",
          url:"/fileDownload",
          data:{
            idCard:_this.Stu.idCard,
            courseName: _this.courseStatus.courseName
          }
        }).then(res=>{
          console.log(res)
          var url = res.data.data;
          if (res.data.code == 200){
            window.open( _this.$axios.defaults.baseURL + "download?filename=" + res.data.data.split(".")[0])
            _this.courseStatus.step = 5
          }
        }).catch((error) => {
          console.error('下载文件失败:', error);
        })
      }
      else {
        this.$message({
          type:"error",
          message:"目前还未开始打印准考证"
        })
      }
    },
    //点击报名按钮事件（弃用）
    enrollClick(){
      if(this.courseStatus.step == 3){
        this.$message({
          type:"success",
          message:"报名成功"
        })
        this.courseStatus.step = 4
      }else {
        this.$message({
          type:"error",
          message:"报名失败"
        })
      }

    },
    //点击已支付后事件
    afterPay(){
      if(this.courseStatus.step == 2){
        var _this = this
        let datas = this.courseStatus
        datas['idCard'] = this.Stu.idCard

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

          //更新已选列表
          _this.getStuSelectedCourse()
          //传回信息处理（如果有）

          //及时更新状态--完成缴费
          if (res.data.code == 200){
            this.courseStatus.step = 3
          }
        })
        // this.$message({
        //   type:"success",
        //   message:"缴费成功"
        // })
        // this.courseStatus.step = 3
      }

      this.dialogVisible = false

    },
    //获取可选科目/考场列表
    getCourseClassroomList(){
      var _this = this

      this.$axios({
        method:"get",
        url:"/getStudentCoursesToChose"
      }).then(res=>{
        console.log("-------------获取可选科目/考场列表-------------")
        console.log(res)

        if (res.data.code == 200){
          //所有的考试信息,处理成对应格式-examClass
          var exams = res.data.data
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
          _this.examClass = tempExamClasses
        }
      })

    }
  },
  mounted() {
    console.log("PreRead----------------------------------")
    //学生个人信息
    this.Stu = JSON.parse(localStorage.getItem("currentUser"))
    //获得科目/考场列表
    this.getCourseClassroomList()
    //从后端获取当前学生已报考科目
    this.getStuSelectedCourse()
  },

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
