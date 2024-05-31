<!-- 集体报考 -->
<template>
  <div>
    <el-container style="height: 100vh;">
      <!-- 头部 -->
      <el-header style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div style="font-size: 20px; font-weight: bold;">院校报考</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-user"></i> 你好，{{groupInfoForm.schoolerAccount}} <i class="el-icon-arrow-down el-icon--right"></i>
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
          <h2>院校报考</h2>
          <p>填写表格内容，报名考试。</p>
        </div>
        <el-card class="large-card">
          <el-form :model="collectiveExamForm" label-width="120px">

            <el-form-item label="考试类型">
              <el-select v-model="collectiveExamForm.examType" @change="courseSelected" placeholder="请选择考试类型">
                <el-option v-for="course in courses" :key="course.value" :label="course.label" :value="course.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="进度流程">
                <el-steps :active="step" finish-status="success" style="width: 900px;" align-center>
                  <el-step title="开始报名"></el-step>
                  <el-step title="选择科目"></el-step>
                  <el-step title="上传名单"></el-step>
                  <el-step title="完成缴费"></el-step>
                  <el-step title="报名成功"></el-step>
                </el-steps>
            </el-form-item>

            <el-form-item label="名单上传">
              <el-upload
                class="upload-demo" action
                :disabled="uploadDisabled"
                :http-request="uploadFile"
                ref="upload"
                :limit="fileLimit"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :on-success="handleSuceess"
                :file-list="fileList"
                :before-upload="beforeUpload"
                :show-file-list="true"
                :headers="headers">
              <el-button @click="onUpload" class="btn"><i class="el-icon-paperclip"></i>上传附件</el-button>
              </el-upload>

            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onPayButton" style="position: relative; left: 320px;">集体缴费</el-button>
              <el-button type="danger" :disabled="step == 4" @click="handleRegister">报名</el-button>
            </el-form-item>

          </el-form>
        </el-card>
      </el-main>


    </el-container>
    <!-- 弹出框组件 -->
    <el-dialog
      title="集体缴费"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <!-- 在这里加入你的图片 -->
        <img src="../../assets/微信收款.png" alt="描述文字" style="width: 100%; height: auto;">
      </div>
      <div style="display: flex; align-items: center; align-content: center">
        <el-button @click="dialogVisible = false">取消支付</el-button><br>
        <el-button type="primary" @click="afterPay">已支付</el-button>
      </div>


    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ApplyPage",
  data() {
    return {
      //学校、学校管理员信息
      groupInfoForm: {
        idCard:'',
        schoolerAccount: '',
        schoolName: '',
        schoolId: '',
      },
      //报考表单信息存储
      collectiveExamForm: {
        examType: '',
      },
      //文件保存处
      fileList: [],
      //允许上传文件类型
      fileType:["xls", "xlsx"],
      // 运行上传文件大小，单位 M
      fileSize: 50,
      // 附件数量限制
      fileLimit: 1,
      //请求头
      headers: { "Content-Type": "multipart/form-data" },
      //用于保存后端传回的可选科目
      courses:[{
        label:"123",
        value:"2323",
      }],
      //学校信息暂存
      // schoolMsg:'',
      // 控制弹出框显示隐藏
      dialogVisible: false,
      // 院校报考进度控制
      step:1,
      //上传文件暂存
      uploadData: new FormData()
    };
  },
  computed:{
    //控制上传附件操作不能在进度1进行
    uploadDisabled(){
      return this.step == 1
    }
  },
  methods: {
    //从选择框选择课程事件
    courseSelected(){
      this.$message({
        type:"success",
        message:"选择成功"
      })
      //进度条切回到2
      this.step = 2
      //删除上传名单文件
      this.fileList.pop()

    },
    //点击上传附件事件
    onUpload(){
      if(this.step == 1){
        this.$message({
          type:"error",
          message:"目前不可上传附件（请按进度完成报名）"
        })
      }

    },
    //上传文件前检查格式
    beforeUpload(file){
      if (file.type != "" || file.type != null || file.type != undefined){
        //截取文件的后缀，判断文件类型
        const FileExt = file.name.replace(/.+\./, "").toLowerCase();
        //计算文件的大小
        const isLt5M = file.size / 1024 / 1024 < 50; //这里做文件大小限制
        //如果大于50M
        if (!isLt5M) {
          this.$message('上传文件大小不能超过 50MB!');
          return false;
        }
        //如果文件类型不在允许上传的范围内
        if(this.fileType.includes(FileExt)){
          return true;
        }
        else {
          this.$message.error("上传文件格式不正确!")
          return false;
        }
      }
    },
    //上传文件的事件
    uploadFile(item){
      var _this = this
      this.$message('文件上传中........')
      //上传文件的需要formdata类型;在data中声明好，在此处以键值对形式存入,暂存不上传
      this.uploadData.append('file',item.file);
      this.uploadData.append('courseName', this.collectiveExamForm.examType)
      this.uploadData.append('originSchoolName', this.groupInfoForm.schoolName)

      this.step = 3

      // console.log(this.uploadData.get('file'))
      // this.$axios({
      //   method: 'post',
      //   url: '/groupApply',
      //   headers: this.headers,
      //   timeout: 30000,
      //   data: FormDatas
      // }).then(res=>{
      //   console.log(res)
      //   _this.$message({
      //     type:res.data.code == 200 ? "success" :"error",
      //     message: res.data.message
      //   })
      //   if(res.data.code == 200){
      //     _this.collectiveExamForm.examType = {
      //       examType: ''
      //     }
      //   }
      // })
    },
    //移除上传文件
    handleRemove(file, fileList) {
      console.log('移除文件', file, fileList);
      this.$message({
        type:"success",
        message:"文件已移除"
      })
      this.step = 2
    },
    //上传文件超过数量限制事件
    handleExceed(){
      this.$message({
        type:"error",
        message:"只能上传一个附件"
      })
    },
    //上传文件成功事件
    handleSuceess(){
      this.$message({
        type:"success",
        message:"文件上传成功"
      })
    },
    //集体缴费按钮点击事件
    onPayButton(){
      if(this.step != 3){
        this.$message({
          type:"error",
          message:"当前进度不可缴费（请按进度完成报名）"
        })
        return
      }

      this.dialogVisible = true
    },
    //付款对话框取消事件
    handleClose() {
      this.$confirm('确定要关闭弹出框吗？')
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {});
    },
    //缴费对话框点击已支付事件
    afterPay(){
      var _this = this
      this.$message({
        type:"success",
        message:"支付成功"
      })
      this.dialogVisible = false
      this.step = 4

      setTimeout(function (){
        _this.$message("报名中......")
        _this.handleRegister()
      },500)

    },

    //报名事件--上传文件
    handleRegister() {
      var _this = this

      this.$axios({
        method: 'post',
        url: '/groupApply',
        headers: this.headers,
        timeout: 30000,
        data: this.uploadData
      }).then(res=>{
        console.log(res)
        _this.$message({
          type:res.data.code == 200 ? "success" :"error",
          message: res.data.message
        })
        if(res.data.code == 200){
          _this.step = 5
          _this.collectiveExamForm.examType = {
            examType: ''
          }

        }
      })
    },

    //从后端获得已创建的考试科目
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



  },
  mounted() {
    // //从localStorage取学校相关信息
    // this.schoolMsg = JSON.parse(localStorage.getItem("currentSchool"))
    //从localStorage读取相关信息
    this.groupInfoForm = JSON.parse(localStorage.getItem("currentSchool"))


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
.large-card {
  padding: 20px;
  min-height: 400px;
}
.el-form-item {
  margin-bottom: 20px;
}
.el-button + .el-button {
  margin-left: 392px;
}
</style>
