<!-- 考点库管理 -->
<template>
  <div>
    <el-container style="height: 100vh;">
      <!-- 头部 -->
      <el-header style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div style="font-size: 20px; font-weight: bold;">考点库管理</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-user"></i> 管理员 {{userName}} <i class="el-icon-arrow-down el-icon--right"></i>
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
          <h2>考点库</h2>
          <p>考点考场管理，考次考点设置。</p>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="exam-center-card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div style="font-size: 16px; font-weight: bold; color: #409eff;">设置考点</div>
                <div>
                  <el-button type="primary">增加</el-button>
                  <el-button type="success" style="margin-left: 10px;">导出</el-button>
                </div>
              </div>
              <el-table :data="examCenters" style="width: 100%" align="center">
                <el-table-column prop="schoolName" label="学校名称" align="center"></el-table-column>
                <el-table-column prop="schoolId" label="学校编号" align="center"></el-table-column>
                <el-table-column prop="capacity" label="可容纳人数" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.row)" style="color: #409eff;">编辑</el-button>
                    <el-button type="text" size="small" @click="handleDelete(scope.row)" style="color: #f56c6c;">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination layout="prev, pager, next" :total="50" style="text-align: right; margin-top: 20px;"></el-pagination>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="exam-session-card">
              <div style="font-size: 16px; font-weight: bold; color: #409eff; margin-bottom: 20px;">考次考点管理</div>
              <el-form :model="examSessionForm">
                <el-form-item label="考次编号" style="display: flex; align-items: center;">
                  <el-input v-model="examSessionForm.sessionId" style="flex: 3; width: 180%;"></el-input>
                </el-form-item>
                <el-form-item label="考次时间">
                  <el-date-picker v-model="examSessionForm.sessionTime" type="datetime" placeholder="选择日期时间" style="width: 74%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="考次地点">
                  <el-select v-model="examSessionForm.examLocation" placeholder="请选择考次地点" style="width: 74%;">
                    <el-option label="地点一" value="1"></el-option>
                    <el-option label="地点二" value="2"></el-option>
                    <el-option label="地点三" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注信息" style="display: flex; align-items: center;">
                  <el-input type="textarea" v-model="examSessionForm.notes" style="flex: 3; width: 195%;"></el-input>
                </el-form-item>
                <div style="display: flex; justify-content: center; margin-top: 10px;">
                  <el-button type="primary" @click="handleSubmit">提交</el-button>
                </div>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="24">
            <el-card>
              <div style="font-size: 16px; font-weight: bold; color: #409eff; margin-bottom: 20px;">考场管理</div>
              <el-table :data="examRooms" style="width: 100%">
                <el-table-column prop="schoolName" label="学校名称" align="center"></el-table-column>
                <el-table-column prop="schoolId" label="学校编号" align="center"></el-table-column>
                <el-table-column prop="session" label="场次" align="center"></el-table-column>
                <el-table-column prop="examNumber" label="考号" align="center"></el-table-column>
                <el-table-column prop="notes" label="备注" align="center"></el-table-column>
              </el-table>
              <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
                <el-button type="primary" style="margin-right: 10px;">打印临时准考证</el-button>
                <el-button type="success">打印座位通知单</el-button>
              </div>
              <el-pagination layout="prev, pager, next" :total="50" style="text-align: right; margin-top: 20px;"></el-pagination>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "TestLibraryPage",
  data() {
    return {
      examCenters: [
        { schoolName: '学校一', schoolId: '001', capacity: 100 },
        { schoolName: '学校二', schoolId: '002', capacity: 150 },
        { schoolName: '学校三', schoolId: '003', capacity: 200 },
      ],
      examSessionForm: {
        sessionId: '',
        sessionTime: '',
        examLocation: '',
        notes: ''
      },
      examRooms: [
        { schoolName: '学校一', schoolId: '001', session: '1', examNumber: '001001', notes: '备注一' },
        { schoolName: '学校二', schoolId: '002', session: '2', examNumber: '002002', notes: '备注二' },
        { schoolName: '学校三', schoolId: '003', session: '3', examNumber: '003003', notes: '备注三' },
      ],
      //用户名
      userName:'xxxx'
    };
  },
  methods: {
    handleEdit(row) {
      console.log('编辑', row);
    },
    handleDelete(row) {
      console.log('删除', row);
    },
    handleQuery() {
      console.log('查询', this.examSessionForm.sessionId);
    },
    handleSubmit() {
      console.log('提交', this.examSessionForm);
    }
  },
  mounted() {
    var parse = JSON.parse(localStorage.getItem("currentAdmin"))
    this.userName = parse.adminName
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
.exam-center-card, .exam-session-card {
  min-height: 400px;
}
.el-table th, .el-table td {
  text-align: center;
}
</style>
