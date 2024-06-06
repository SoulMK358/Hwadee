<!-- 个人信息 -->
<template>
  <el-container style="height: 100vh;">
    <!-- 头部 -->
    <el-container>

      <el-header style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div style="font-size: 20px; font-weight: bold;">个人信息</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-user"></i> 学生：{{Stu.stuName}} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <br><br><br>
      <div class="el-card-outside">
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
            <el-form-item label="人脸识别：">
              <el-button @click="faceRegisterOpen">点击注册</el-button>
            </el-form-item>
          </el-form>

          <span style="display: flex; ">已报考科目</span><br>
          <el-table :data="allCourseStatus" style="width: 100%">
            <el-table-column prop="courseName" label="科目" width="320" align="center"></el-table-column>
            <el-table-column prop="schoolName" label="考试学校" width="300" align="center"></el-table-column>
            <el-table-column prop="step" label="报名进度" width="310" align="center"></el-table-column>
          </el-table>

        </el-card>

      </div>
      <!-- 弹出框组件 -->
      <el-dialog
        title="人脸识别注册"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="50%">
        <div>
          <video ref="video" width="0" height="0" autoplay></video>
          <canvas ref="canvas" v-show="cameraStatus" width="480" height="360" style="display: flex;margin-bottom: 40px; margin-left: 50px;"></canvas>
        </div>
        <div style="display: flex; align-items: center; align-content: center">
          <el-button type="primary" v-show="cognitionStatus" @click="startCamera">开始注册</el-button><br>
          <el-button type="danger" v-show="!cognitionStatus" @click="stopCamera">停止识别</el-button>
          <el-button type="primary" v-show="!cognitionStatus" @click="faceRegister">确认上传</el-button>
        </div>
      </el-dialog>

    </el-container>


  </el-container>
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
      // 控制弹出框显示隐藏
      dialogVisible: false,
      //控制识别按钮的显示
      cognitionStatus: true,
      //摄像机流与绘制暂存对象
      stream: null,
      video: null,
      canvas: null,
      ctx: null,
      //控制摄像机显示
      cameraStatus:false,
      //循环绘制事件对象
      canvasId: null,
      //循环人脸识别登录事件对象
      faceLoginId: null,
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
    },
    //调用摄像头
    startCamera() {
      this.cameraStatus=true;
      this.cognitionStatus = false
      this.video = this.$refs.video;
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.stream = stream;
          this.video.srcObject = stream;

          // 开始绘制翻转的视频帧
          this.canvasId = setInterval(this.flipAndDraw, 20); // 每20毫秒绘制一次
          // 开始人脸识别注册尝试
          // this.faceLoginId = setInterval(this.faceRegister, 2000);//每2s进行一次登录尝试
        })
        .catch(error => {
          console.error("Something went wrong!", error);
        });
    },
    //翻转摄像头图像
    flipAndDraw() {
      // 清空画布
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 绘制翻转的视频帧
      this.ctx.save(); // 保存当前的绘图状态
      this.ctx.translate(this.canvas.width, 0); // 移动画布
      this.ctx.scale(-1, 1); // 水平翻转
      this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.restore(); // 恢复之前保存的绘图状态
    },
    //关闭摄像头
    stopCamera() {

      if (this.stream) {
        // 停止视频流的所有轨道
        this.stream.getTracks().forEach(track => track.stop());
        // 清除视频源
        this.video.srcObject = null;
        // 重置 stream 属性
        this.stream = null;
        //关闭20ms执行的摄像头翻转绘制函数
        clearInterval(this.canvasId);
        //关闭每2s执行的登录尝试函数
        // clearInterval(this.faceLoginId);

        this.cameraStatus = false

        this.cognitionStatus = true
      }

    },
    //人脸登录注册窗口打开
    faceRegisterOpen(){
      this.dialogVisible = true;

    },
    //人脸识别注册事件
    faceRegister(){
      var _this = this
      this.$confirm('确定上传该人脸信息吗？')
        .then(() => {
          // 从 canvas 获取图像数据
          this.canvas.toBlob((blob)=>{
            var formData = new FormData();
            formData.append('file', blob)
            formData.append('idCard', _this.Stu.idCard)

            this.$axios({
              method:"post",
              url:"/face/addFaceData",
              data: formData
            }).then(res=>{
              console.log(res)

              _this.$message({
                type: res.data.isSuccess ? "success" : "error",
                duration: 1000,
                message: res.data.message
              })
              if(res.data.isSuccess){
                _this.stopCamera();
                this.dialogVisible = false
              }
            })
          })
        })
        .catch(() => {});



    },
    //关闭摄像头框事件
    handleClose(){
      var _this = this
      this.$confirm('确定要关闭弹出框吗？')
        .then(() => {
          this.stopCamera();
          this.dialogVisible = false;
        })
        .catch(() => {});

    }

  },
  mounted() {
    console.log("PreRead----------------------------------")
    //取出登录传回的个人信息
    this.Stu = JSON.parse(localStorage.getItem("currentUser"))
    //读取学生已选的课程信息
    this.getStuSelectedCourse()

  },
  beforeDestroy() {
    this.stopCamera()
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
