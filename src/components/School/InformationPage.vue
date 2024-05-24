<!-- 集体信息 -->
<template>
  <div>
    <el-container style="height: 100vh;">
      <!-- 头部 -->
      <el-header style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div style="font-size: 20px; font-weight: bold;">院校信息</div>
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
          <h2>院校信息</h2>
          <p>填写表格内容，创建信息。</p>
        </div>
        <el-card class="large-card">
          <el-form :model="groupInfoForm" label-width="120px">
            <el-form-item label="用户身份证">
              <el-input v-model="groupInfoForm.idCard"></el-input>
            </el-form-item>
            <el-form-item label="学校名称">
              <el-input v-model="groupInfoForm.schoolName"></el-input>
            </el-form-item>
            <el-form-item label="学校编号">
              <el-input v-model="groupInfoForm.schoolId"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "InformationPage",
  data() {
    return {
      groupInfoForm: {
        idCard:'',
        schoolerAccount: '',
        schoolName: '',
        schoolId: '',
      }
    };
  },

  mounted() {
    //从localStorage读取相关信息
    this.groupInfoForm = JSON.parse(localStorage.getItem("currentSchool"))
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
</style>
