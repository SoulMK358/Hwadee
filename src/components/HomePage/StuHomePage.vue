<template>
  <el-container style="height: 690px; border: 10px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router>
<!--        <template v-for="x in menus">-->
<!--          <el-submenu :index="x.menuId">-->
<!--            <template slot="title"><i :class="x.menuIcon"></i>{{ x.menuName }}-->
<!--            </template>-->
<!--            <template v-for="y in x.children">-->
<!--              <el-menu-item @click="openUrl(y.menuUrl)" style="padding-left: 60px;"-->
<!--                            :class="y.menuIcon">{{ y.menuName }}-->
<!--              </el-menu-item>-->
<!--            </template>-->
<!--          </el-submenu>-->
<!--          -->
<!--        </template>-->
        <el-menu-item @click="openUrl('/StuHomePage/SelfMsg')" style="padding-left: 60px;"
                      class="el-icon-user-solid">个人信息
        </el-menu-item>
        <el-menu-item @click="openUrl('/StuHomePage/SelfEnroll')" style="padding-left: 60px;"
                      class="el-icon-s-order">个人报考
        </el-menu-item>
        <el-menu-item @click="openUrl('/StuHomePage/ExamScore')" style="padding-left: 60px;"
                      class="el-icon-s-data">考试成绩
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-button type="primary" icon="el-icon-switch-button" @click="exit">退出系统</el-button>
      </el-header>

      <el-main>
        <iframe class="myIfame" scrolling="auto" :src="url" name="right" width="99%"
                height="98%"></iframe>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "StuHomePage",
  data() {
    return {
      Stu:{
        userId:'',
        userName: "xxxxx",
        realName:"",
        school:'',
        aimSchool:"xxx"
      },

      url: "/StuHomePage/SelfMsg",
      menus: [
        {
        "menuId": 1,
        "menuIcon": "el-icon-user-solid",
        "menuName": "测试菜单",
        "menuUrl": "/scoreList",
        "children": [
          {
            "menuId": 2,
            "menuIcon": "el-icon-user-solid",
            "menuName": "测试菜单2",
            "menuUrl": "/scoreList"
          },]
      },
        {
          "menuId": 3,
          "menuIcon": "el-icon-user-solid",
          "menuName": "测试菜单",
          "menuUrl": "/scoreList",

        },
        {
          "menuId": 5,
          "menuIcon": "el-icon-user-solid",
          "menuName": "测试菜单",
          "menuUrl": "/scoreList",
          "children": [
            {
              "menuId": 6,
              "menuIcon": "el-icon-user-solid",
              "menuName": "测试菜单2",
              "menuUrl": "/scoreList"
            },]
        }
      ]
    };
  },

  methods: {
    openUrl(url) {
      this.url = url
    },
    exit(){
      var _this = this
      this.$message({
        type:"success",
        message:"正在退出..."
      })
      setTimeout(function (){
        localStorage.removeItem("currentUser")
        _this.$router.push("/")
      },500)
    }
  },
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
</style>
