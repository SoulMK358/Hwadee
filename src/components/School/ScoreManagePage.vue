<template>
  <el-container style="height: 100vh;">
    <!-- 头部 -->
    <el-header
      style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
      <div style="font-size: 20px; font-weight: bold;">成绩管理</div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-user"></i> 你好，{{ groupInfoForm.schoolerAccount }} <i class="el-icon-arrow-down el-icon--right"></i>
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
        <el-button type="primary" @click="getStuMarkList">刷新列表</el-button>
        <div style="display: flex; justify-content: center; align-items: center; padding: 0;">
          <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 80%; text-align: center;">
            <el-table-column prop="idCard" label="身份证号" width="250" align="center"></el-table-column>
            <el-table-column prop="stuName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="schoolName" label="所属院校" align="center"></el-table-column>
            <el-table-column prop="courseName" label="科目" align="center"></el-table-column>
            <el-table-column prop="stuMark" label="分数" align="center"></el-table-column>
            <el-table-column label="操作" width="170"  align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="updateRecord(scope.row)">评分</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          layout="prev, pager, next, jumper, ->, total"
          :total="tableData.length"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          style="text-align: center; margin-top: 20px;">
        </el-pagination>
      </el-card>
    </el-main>

    <!-- 弹出框组件 -->
    <el-dialog
      title="成绩录入"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form :model="singleStuScore" label-width="auto">
        <el-form-item label="身份证号:">
          <el-input v-model="singleStuScore.idCard" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="singleStuScore.stuName" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属院校:">
          <el-input v-model="singleStuScore.schoolName" disabled></el-input>
        </el-form-item>
        <el-form-item label="科目:">
          <el-input v-model="singleStuScore.courseName" disabled></el-input>
        </el-form-item>
        <el-form-item label="分数:">
          <el-input v-model="singleStuScore.stuMark"></el-input>
        </el-form-item>
      </el-form>
      <div style="display: flex; justify-content: center; align-items: center;">
        <el-button type="primary" @click="confirmModify">确认分数</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "ScoreManagePage",
  data() {
    return {
      //学校管理员信息
      groupInfoForm: {
        idCard: '',
        schoolerAccount: '',
        schoolName: '',
        schoolId: '',
      },
      //学生成绩名单
      tableData: [
        {
          punishId: 1,
          idCard: 'xxxxxxxxxxxxxxxxxx',
          stuName: 'xx',
          schoolName: 'xxx',
          examRoomName: 'xXXx大学-E2301',
          punishReason: 'xxx',
          courseName: 'xx',
        }],
      //单个学生成绩信息
      singleStuScore: {
        courseName: '',
        idCard: '',
        schoolName: '',
        stuMark: '',
        stuName: ''
      },
      // 控制弹出框显示隐藏
      dialogVisible: false,

      //用于分页的变量
      //当前页 刷新后默认显示第一页
      currentPage: '1',
      //每一页显示的数据量 此处每页显示6条数据
      pageSize: '6',
    }
  },
  methods: {
    //点击按钮切换页面
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //每次点击分页按钮，当前页发生变化
      // console.log(this.currentPage);
    },
    //获得学生考试成绩名单
    getStuMarkList() {
      var _this = this
      // console.log(this.groupInfoForm.schoolName)

      this.$axios({
        method: "get",
        url: "/studentsGrade/selectGradeList",
        params: {schoolName: _this.groupInfoForm.schoolName}
      }).then(res => {
        console.log("----------------getStuMarkList----------------")
        console.log(res)

        _this.$message({
          type: res.data.code == 200 ? "success" : "error",
          message: res.data.message
        })
        if (res.data.code == 200) {
          _this.tableData = res.data.data
        }
      })
    },
    //编辑按钮点击事件
    updateRecord(item) {
      this.dialogVisible = true
      console.log("------------updateRecord--------------")
      this.singleStuScore = JSON.parse(JSON.stringify(item))
      console.log(this.singleStuScore)
      this.singleStuScore.stuMark = ''
    },
    //确认成绩点击事件
    confirmModify() {
      var _this = this

      let datas = {
        idCard: this.singleStuScore.idCard,
        courseName: this.singleStuScore.courseName,
        grade: this.singleStuScore.stuMark
      }

      if (datas.grade < 0 || datas.grade > 100) {
        this.$message({
          type: "error",
          message: "分数范围（0~100）"
        })
      } else {
        this.$confirm('请再次确定成绩无误')
          .then(() => {
            this.$axios({
              method: "post",
              url: "/studentsGrade/updateGrade",
              data: datas
            }).then(res => {
              console.log(res)

              _this.$message({
                type: res.data.code == 200 ? "success" : "error",
                message: res.data.message
              })

              if (res.data.code == 200) {
                _this.getStuMarkList()
                _this.dialogVisible = false
              }
            })

          })
          .catch(() => {
          });
      }
    }
  },
  mounted() {
    //从localStorage读取相关信息
    this.groupInfoForm = JSON.parse(localStorage.getItem("currentSchool"))

    this.getStuMarkList()
  }
}
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
