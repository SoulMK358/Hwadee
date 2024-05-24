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
                  <el-step title="学校缴费"></el-step>
                  <el-step title="报名成功"></el-step>
                  <el-step title="成绩公布"></el-step>
                </el-steps>
            </el-form-item>

            <el-form-item label="名单上传">
<!--              <el-upload-->
<!--                action="#"-->
<!--                list-type="text"-->
<!--                :on-remove="handleRemove"-->
<!--                :on-success="handleSuccess"-->
<!--                :before-upload="beforeUpload"-->
<!--                :http-request="uploadFile"-->
<!--                :file-list="fileList"-->
<!--                :auto-upload="false"-->
<!--                :headers="headers"-->
<!--                drag>-->
<!--                <i class="el-icon-upload"></i>-->
<!--                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em><br>Upload.xlsx</div>-->
<!--              </el-upload>-->
              <el-upload
                class="upload-demo" action
                :http-request="uploadFile"
                ref="upload"
                :limit="fileLimit"
                :on-remove="handleRemove"
                :file-list="fileList"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :headers="headers">
              <el-button class="btn"><i class="el-icon-paperclip"></i>上传附件</el-button>
              </el-upload>

            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="dialogVisible = true" style="position: relative; left: 320px;">集体缴费</el-button>
              <el-button type="danger" @click="handleRegister">报名</el-button>
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
      groupInfoForm: {
        idCard:'',
        schoolerAccount: '',
        schoolName: '',
        schoolId: '',
      },
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
      fileLimit: 5,
      //请求头
      headers: { "Content-Type": "multipart/form-data" },
      //用于保存后端传回的可选科目
      courses:[{
        label:"123",
        value:"2323",
      }],
      schoolMsg:'',
      // 控制弹出框显示隐藏
      dialogVisible: false,

      step:1
    };
  },
  methods: {
    handleCollectivePayment() {
      console.log('集体缴费');
    },
    handleRegister() {
      this.$message({
        type:"success",
        message:"报名成功"
      })
      this.step = 4
      console.log('报名');
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
          this.$message.error("上传文件格式不正确!");
          return false;
        }
      }
    },
    //上传文件的事件
    uploadFile(item){
      var _this = this
      this.$message('文件上传中........')
      //上传文件的需要formdata类型;所以要转
      let FormDatas = new FormData()
      FormDatas.append('file',item.file);
      FormDatas.append('courseName', this.collectiveExamForm.examType)
      FormDatas.append('originSchoolName', this.schoolMsg.schoolName)
      this.$axios({
        method: 'post',
        url: '/groupApply',
        headers: this.headers,
        timeout: 30000,
        data: FormDatas
      }).then(res=>{
        console.log(res)
        _this.$message({
          type:res.data.code == 200 ? "success" :"error",
          message: res.data.message
        })
        if(res.data.code == 200){
          _this.collectiveExamForm.examType = {
            examType: ''
          }
        }
        // if(res.data.id != '' || res.data.id != null){
        //   this.fileList.push(item.file);//成功过后手动将文件添加到展示列表里
        //   let i = this.fileList.indexOf(item.file)
        //   this.fileList[i].id = res.data.id;//id也添加进去，最后整个大表单提交的时候需要的
        //   if(this.fileList.length > 0){//如果上传了附件就把校验规则给干掉
        //     this.fileflag = false;
        //     this.$set(this.rules.url,0,'')
        //   }
        //   //this.handleSuccess();
        // }
      })
    },
    handleRemove(file, fileList) {
      console.log('移除文件', file, fileList);
    },
    handleClose() {
      this.$confirm('确定要关闭弹出框吗？')
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {});
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

    courseSelected(){
      this.$message({
        type:"success",
        message:"选择成功"
      })
      this.step = 2
    },

    afterPay(){
      this.$message({
        type:"success",
        message:"支付成功"
      })
      this.dialogVisible = false
      this.step = 3
    },

  },
  mounted() {
    //从localStorage取学校相关信息
    this.schoolMsg = JSON.parse(localStorage.getItem("currentSchool"))
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
