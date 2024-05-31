<template>
  <el-container style="height: 100vh;">
    <!-- 头部 -->
    <el-header style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
      <div style="font-size: 20px; font-weight: bold;">成绩管理</div>
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
      <br><br>
      <el-card>
        <div style="display: flex; justify-content: center; align-items: center;padding-left: 53px">
          <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 90%;">
            <el-table-column v-if="false" prop="punishId" label="punishId" width="100"></el-table-column>
            <el-table-column prop="idCard" label="身份证号" width="150"></el-table-column>
            <el-table-column prop="stuName" label="姓名" width="140"></el-table-column>
            <el-table-column prop="schoolName" label="学校" width="120"></el-table-column>
            <el-table-column prop="examRoomName" label="考场" width="100"></el-table-column>
            <el-table-column prop="courseName" label="科目" width="150"></el-table-column>
            <el-table-column prop="punishReason" label="违规说明" width="150"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <!--                  <el-button size="mini" type="success" @click="editRecord(scope.row)" style="margin-right: 10px;">编辑</el-button>-->
                <el-button size="mini" type="danger" @click="deleteRecord(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          layout="prev, pager, next,jumper, ->, total"
          :total="tableData.length"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          style="text-align: center">
        </el-pagination>
      </el-card>
    </el-main>

  </el-container>
</template>

<script>
export default {
  name: "ScoreManagePage",
  data(){
    return {
      groupInfoForm: {
        idCard:'',
        schoolerAccount: '',
        schoolName: '',
        schoolId: '',
      },

      tableData: [
        {
          punishId:1,
          idCard:'xxxxxx',
          stuName:'xx',
          schoolName:'xxx',
          examRoomName:'xxxxxxxxx',
          punishReason:'xxx',
          courseName:'xx',
        }]
    }
  }
}
</script>

<style scoped>

</style>
