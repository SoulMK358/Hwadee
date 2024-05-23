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
          <el-input v-model="singleData.idCard" placeholder="身份证号" style="margin-right: 10px;"></el-input>
<!--          <el-input v-model="singleData.stuName" placeholder="姓名" style="margin-right: 10px;"></el-input>-->
          <el-input v-model="singleData.schoolName" placeholder="学校" style="margin-right: 10px;"></el-input>
          <el-input v-model="singleData.examRoomName" placeholder="考场" style="margin-right: 10px;"></el-input>
<!--          <el-input v-model="singleData.courseName" placeholder="科目" style="margin-right: 10px;"></el-input>-->
          <el-input v-model="singleData.punishReason" placeholder="违规说明" style="margin-right: 10px;"></el-input>

          <el-button type="primary" @click="addRecord" style="margin-right: 10px;">新增</el-button>
          <el-button type="success" @click="exportData">导出</el-button>
        </div>

        <el-card style="margin: 0 auto; width: 90%; padding: 0;">
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

<!--          <el-pagination-->
<!--            background-->
<!--            layout="prev, pager, next"-->
<!--            :total="tableData.length"-->
<!--            style="text-align: center; margin-top: 20px;">-->
<!--          </el-pagination>-->
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
        punishId:1,
        idCard:'',
        stuName:'',
        schoolName:'',
        examRoomName:'',
        punishReason:'',
        courseName:''
      },
      //从后端获取用于展示的栏
      tableData: [
        {
          punishId:1,
          idCard:'xxxxxx',
          stuName:'xx',
          schoolName:'xxx',
          examRoomName:'xxxxxxxxx',
          punishReason:'xxx',
          courseName:'xx',
        },
        // 添加更多数据
      ],
      //用户名
      userName:'xxxx',

      //用于分页的变量
      //当前页 刷新后默认显示第一页
      currentPage: '1',
      //每一页显示的数据量 此处每页显示6条数据
      pageSize: '6',
    };
  },
  methods: {
    // 新增按钮
    addRecord() {
      var _this = this
      var datas = {
        examReason:this.singleData.punishReason,
        schoolName:this.singleData.schoolName,
        idCard: this.singleData.idCard,
        examRoomName: this.singleData.examRoomName
      }

      this.$confirm("是否确认添加该条违规数据","提示",{
        iconClass: "el-icon-question",//自定义图标样式
        confirmButtonText: "确认",//确认按钮文字更换
        cancelButtonText: "取消",//取消按钮文字更换
        showClose: true,//是否显示右上角关闭按钮
        type: "warning",//提示类型  success/info/warning/error
      }).then(()=>{
        this.$axios({
          method:"post",
          url:"/addPunish",
          data: JSON.stringify(datas)
        }).then(res=>{
          console.log(res)
          // 弹窗显示后端返回的信息（成功、失败原因）
          _this.$message({
            type: res.data.code == 200 ? "success" : "error",
            message: res.data.message
          })

          if(res.data.code == 200){
            setTimeout(function (){
              _this.singleData = {
                punishId:1,
                idCard:'',
                stuName:'',
                schoolName:'',
                examRoomName:'',
                punishReason:'',
                courseName:''
              }
              _this.getPunishList()
            }, 500)
          }
        })
      }).catch(()=>{

      })



    },
    // 导出数据为excle表格
    exportData() {
      // 导出按钮
      // 获取表单数据
      const formData = this.tableData; // 假设你的表单引用是formRef

      // 准备要导出的数据
      const data = [];
      for (let value of formData) {
        var t = {
          punishId : value.punishId,
          "身份证号":value.idCard,
          "姓名":value.stuName,
          "考场":value.examRoomName,
          "科目":value.courseName,
          "违规说明":value.punishReason,
        }
        data.push(t);
      }

      // 将数据转换为工作簿
      const worksheet = XLSX.utils.json_to_sheet(data);

      // 添加工作表到工作簿
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // 下载Excel文件
      XLSX.writeFile(workbook, '违规上报.xlsx');
    },
    // 删除按钮
    deleteRecord(row) {
      var _this = this

      this.$confirm("是否确认删除该条违规数据","提示",{
        iconClass: "el-icon-question",//自定义图标样式
        confirmButtonText: "确认",//确认按钮文字更换
        cancelButtonText: "取消",//取消按钮文字更换
        showClose: true,//是否显示右上角关闭按钮
        type: "warning",//提示类型  success/info/warning/error
      }).then(()=>{
        //确认操作
        this.$axios({
          method:"delete",
          url:"deletePunish?punishId=" + row.punishId,
        }).then(res=>{
          console.log(res)
          // 弹窗显示后端返回的信息（成功、失败原因）
          _this.$message({
            type: res.data.code == 200 ? "success" : "error",
            message: res.data.message
          })
          if(res.data.code == 200){
            setTimeout(function (){
              _this.getPunishList()
            },500)
          }
        })
      }).catch(() => {
        //取消操作
      })
    },
    //获得惩罚名单
    getPunishList(){
      var _this = this

      this.$axios({
        method:"post",
        url:"/punishList"
      }).then(res=>{
        console.log(res.data)
        _this.tableData = res.data
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

    this.getPunishList()

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
</style>

