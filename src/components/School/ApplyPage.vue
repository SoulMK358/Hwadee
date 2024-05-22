<!-- 集体报考 -->
<template>
  <div>
    <el-container style="height: 100vh;">
      <!-- 头部 -->
      <el-header style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div style="font-size: 20px; font-weight: bold;">集体报考</div>
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
          <h2>集体报考</h2>
          <p>填写表格内容，报名考试。</p>
        </div>
        <el-card class="large-card">
          <el-form :model="collectiveExamForm" label-width="120px">

            <el-form-item label="考试类型">
              <el-select v-model="collectiveExamForm.examType" placeholder="请选择考试类型">
                <el-option label="类型一" value="1"></el-option>
                <el-option label="类型二" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="进度流程">
                <el-steps :active="0" finish-status="success" style="width: 900px;" align-center>
                  <el-step title="创建考试"></el-step>
                  <el-step title="报名结束"></el-step>
                  <el-step title="考生考试"></el-step>
                  <el-step title="成绩公布"></el-step>
                </el-steps>
            </el-form-item>

            <el-form-item label="名单上传">
              <el-upload
                action="#"
                list-type="text"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em><br>Upload.xlsx</div>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleCollectivePayment" style="position: relative; left: 320px;">集体缴费</el-button>
              <el-button type="danger" @click="handleRegister">报名</el-button>
            </el-form-item>

          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "ApplyPage",
  data() {
    return {
      collectiveExamForm: {
        examType: '',
      },
      fileList: []
    };
  },
  methods: {
    handleCollectivePayment() {
      console.log('集体缴费');
    },
    handleRegister() {
      console.log('报名');
    },
    handlePreview(file) {
      console.log('预览文件', file);
    },
    handleRemove(file, fileList) {
      console.log('移除文件', file, fileList);
    }
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
