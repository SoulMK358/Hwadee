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
                    <el-option label="类型一" value="1"></el-option>
                    <el-option label="类型二" value="2"></el-option>
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
                <el-form-item label="设置开考考区" required>
                  <el-select v-model="form.examArea" placeholder="请选择开考考区">
                    <el-option label="考区一" value="1"></el-option>
                    <el-option label="考区二" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="延长报考时限" required>
                  <el-select v-model="form.extendTime" placeholder="请选择延长报考时限">
                    <el-option label="时限一" value="1"></el-option>
                    <el-option label="时限二" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否延长时间" required>
                  <el-radio-group v-model="form.isExtended">
                    <el-radio label="yes">是</el-radio>
                    <el-radio label="no">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="align-items: center;">
              <el-col :span="20">
                <el-form-item label="进度查看和统计" required>
                  <div class="progress-container">
                    <el-steps :active="0" finish-status="success" style="width: 600px;" align-center>
                      <el-step title="创建考试"></el-step>
                      <el-step title="报名结束"></el-step>
                      <el-step title="考生考试"></el-step>
                      <el-step title="成绩公布"></el-step>
                    </el-steps>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
                <el-form-item label="设置白名单" required>
                  <el-input v-model="form.whitelist" placeholder="请输入白名单" style="width: calc(100% - 100px);"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="display: flex; align-items: center;">
                <el-button type="default" style="border: 1px solid #409eff; color: #409eff;" @click="handleSubmit">提交</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align: center;">
                <el-button type="default" style="border: 1px solid #409eff; color: #409eff;" @click="handleSave">保存</el-button>
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
        examArea: '',
        extendTime: '',
        isExtended: '',
        whitelist: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      // 提交按钮
    },
    handleSave() {
      // 保存按钮
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
