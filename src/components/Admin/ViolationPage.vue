<!-- 违规上报管理 -->
<template>
  <el-container style="height: 100vh;">
    <!-- 头部 -->
    <el-container>
      <el-header style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div style="font-size: 20px; font-weight: bold;">违规上报管理</div>
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
        <div style="margin-bottom: 20px;">
          <h2>违规上报</h2>
          <p>上报违规情况，查询违规内容。</p>
        </div>

        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
          <el-input v-model="singleData.studentId" placeholder="学号" style="margin-right: 10px;"></el-input>
          <el-input v-model="singleData.name" placeholder="姓名" style="margin-right: 10px;"></el-input>
          <el-input v-model="singleData.examRoom" placeholder="考场" style="margin-right: 10px;"></el-input>
          <el-input v-model="singleData.subject" placeholder="科目" style="margin-right: 10px;"></el-input>
          <el-input v-model="singleData.remark" placeholder="违规说明" style="margin-right: 10px;"></el-input>

          <el-button type="primary" @click="addRecord" style="margin-right: 10px;">新增</el-button>
          <el-button type="success" @click="exportData">导出</el-button>
        </div>

        <el-card style="margin: 0 auto; width: 90%; padding: 0;">
          <div style="display: flex; justify-content: center; align-items: center;padding-left: 53px">
            <el-table :data="tableData" style="width: 90%;">
              <el-table-column prop="studentId" label="学号" width="150"></el-table-column>
              <el-table-column prop="name" label="姓名" width="150"></el-table-column>
              <el-table-column prop="examRoom" label="考场" width="150"></el-table-column>
              <el-table-column prop="subject" label="科目" width="150"></el-table-column>
              <el-table-column prop="remark" label="违规说明" width="200"></el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
<!--                  <el-button size="mini" type="success" @click="editRecord(scope.row)" style="margin-right: 10px;">编辑</el-button>-->
                  <el-button size="mini" type="danger" @click="deleteRecord(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <el-pagination
            background
            layout="prev, pager, next"
            :total="tableData.length"
            style="text-align: center; margin-top: 20px;">
          </el-pagination>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'ViolationPage',
  data() {
    return {
      singleData:{
        studentId: '',
        name: '',
        examRoom: '',
        subject: '',
        remark: ''
      },
      tableData: [
        {
          studentId: '20210001',
          name: '张三',
          examRoom: 'A101',
          subject: '数学',
          remark: '迟到'
        },
        {
          studentId: '20210002',
          name: '李四',
          examRoom: 'A102',
          subject: '语文',
          remark: '作弊'
        },
        // 添加更多数据

      ],
      //用户名
      userName:'xxxx'
    };
  },
  methods: {
    addRecord() {
      // 新增按钮
    },
    exportData() {
      // 导出按钮
    },
    editRecord(row) {
      // 编辑按钮
    },
    deleteRecord(row) {
      // 删除按钮
    },
  },
  mounted() {
    var parse = JSON.parse(localStorage.getItem("currentAdmin"))
    this.userName = parse.adminName  }
};
</script>

<style scoped>
.el-header {
  background-color: #f5f7fa;
  padding: 20px;
}
.el-aside {
  background-color: rgb(18, 90, 160);
  color: white;
}
.el-menu-item {
  color: white;
}
.el-dropdown-link {
  cursor: pointer;
  color: #333;
}
</style>

