<!-- 考试分数管理 -->
<template>
  <el-container style="height: 100vh;">
    <!-- 头部 -->
    <el-container>
      <el-header style="background-color: #f5f7fa; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div style="font-size: 20px; font-weight: bold;">考试分数管理</div>
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

        <div style="display: flex;  align-items: center; margin-bottom: 20px;">
          <el-select v-show="false" v-model="schoolName" @change="getCourseList" placeholder="请选择查询学校" >
            <el-option v-for="school in schools" :key="school.value" :label="school.schoolName" :value="school.schoolName"></el-option>
          </el-select>&nbsp&nbsp&nbsp
          <el-select v-model="courseName" placeholder="请选择查询科目" >
            <el-option v-for="course in courses" :key="course.value" :label="course.label" :value="course.value"></el-option>
          </el-select>&nbsp&nbsp&nbsp
          <el-button type="primary" @click="getScoreList" style="margin-right: 10px;">查询</el-button>
          <el-button type="success" @click="exportData">导出</el-button>
        </div>

        <el-card style="margin: auto; width: 99%; padding: 0;">
          <div style="display: flex; justify-content: center; align-items: center; margin-left: 140px">
            <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%;" :row-style="{'text-align': 'center'}">
              <el-table-column v-if="false" prop="punishId" label="punishId" width="100"></el-table-column>
              <el-table-column prop="idCard" label="身份证号" width="265" align="center">
              </el-table-column>
              <el-table-column prop="stuName" label="姓名" width="140" align="center"></el-table-column>
              <el-table-column prop="schoolName" label="考试学校" width="160" align="center"></el-table-column>
              <el-table-column prop="courseName" label="科目" width="160" align="center"></el-table-column>
              <el-table-column prop="stuMark" label="分数" width="175" align="center"></el-table-column>
            </el-table>
          </div>

          <el-pagination
            background
            layout="prev, pager, next,jumper, ->, total"
            :total="tableData.length"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            style="text-align: center;">
          </el-pagination>

        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  name: 'ViolationPage',
  data() {
    return {
      //添加栏信息保存
      singleData:{
        idCard:'xxxxxx',
        stuName:'xx',
        schoolName:'xxx',
        stuMark:'xxx',
        courseName:'xx',
      },
      //从后端获取用于展示的栏
      tableData: [
        {
          idCard:'',
          stuName:'',
          schoolName:'',
          stuMark:'',
          courseName:'',
        },
        // 添加更多数据
      ],
      //用户名
      userName:'xxxx',

      //用于分页的变量
      //当前页 刷新后默认显示第一页
      currentPage: '1',
      //每一页显示的数据量 此处每页显示6条数据
      pageSize: '7',

      //从后台拉取学校信息的临时表格
      schools: [
        {
          schoolId: 1,
          schoolName: '二仙桥职业学院'
        },
        {
          schoolId: 2,
          schoolName: '成都恐龙专科学校'
        }],
      //选择学校
      schoolName: '成都理工大学',
      //用于保存后端传回的可选科目
      courses:[{
        label:"",
        value:"",
      }],
      //选择课程
      courseName:''
    };
  },
  methods: {
    // 导出数据为excle表格
    exportData() {
      // 导出按钮
      // 获取表单数据
      const formData = this.tableData; // 假设你的表单引用是formRef

      // 准备要导出的数据
      const data = [];
      for (let value of formData) {
        var t = {
          "身份证号":value.idCard,
          "姓名":value.stuName,
          "学校":value.schoolName,
          "科目":value.courseName,
          "考试分数":value.stuMark,
        }
        data.push(t);
      }

      // 将数据转换为工作簿
      const worksheet = XLSX.utils.json_to_sheet(data);

      // 添加工作表到工作簿
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // 下载Excel文件
      XLSX.writeFile(workbook, '考试分数.xlsx');
    },
    //根据科目-获得分数名单
    getScoreList(){
      var _this = this
      this.$axios({
        method:"get",
        url:"/studentGrade/getStuMarkByCourse",
        params:{courseName:this.courseName}
      }).then(res=>{
        console.log(res.data)
        _this.tableData = res.data.data
      })
    },
    //获取学校列表
    getSchoolList(){
      console.log("getSchoolList")
      var _this = this
      this.$axios({
        method:"get",
        url:"/getSchoolList"
      }).then(res=>{
        //console.log(res)
        var result = res.data
        _this.schools = result
        console.log(_this.schools)
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
    //点击按钮切换页面
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //每次点击分页按钮，当前页发生变化
      // console.log(this.currentPage);
    }
  },
  mounted() {
    var parse = JSON.parse(localStorage.getItem("currentAdmin"))
    this.userName = parse.adminName
    this.getScoreList()
    // this.getSchoolList()
    this.getCourseList()
  }
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
.el-table th, .el-table td {
  text-align: center;
}
</style>
