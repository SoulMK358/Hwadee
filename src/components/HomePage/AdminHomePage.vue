<template>
  <div>
    <el-container style="height: 100vh;">
      <!-- 左侧菜单栏 -->
      <el-aside width="200px" style="background-color: rgb(18, 90, 160); color: white;">
        <el-menu :default-active="activeIndex" @select="handleSelect" class="el-menu-vertical-demo" style="background-color: rgb(18, 90, 160); color: white;">
          <el-menu-item index="0" style="color: white; text-align: center;">
            <i class="el-icon-menu"></i>
          </el-menu-item>
<!--          <el-menu-item index="1" style="color: white;">-->
<!--            <i class="el-icon-document"></i> 报名报考管理-->
<!--          </el-menu-item>-->
          <el-menu-item index="1" style="color: white;">
            <i class="el-icon-edit"></i> 编场管理
          </el-menu-item>
          <el-menu-item index="2" style="color: white;">
            <i class="el-icon-location"></i> 考点库管理
          </el-menu-item>
          <el-menu-item index="3" style="color: white;">
            <i class="el-icon-tickets"></i> 评卷管理
          </el-menu-item>
          <el-menu-item index="4" style="color: white;">
            <i class="el-icon-warning"></i> 违规上报管理
          </el-menu-item>
          <el-menu-item index="5" @click="exit" style="color: white;">
            <i class="el-icon-close"></i> 退出系统
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右侧内容区域 -->
      <el-container>
        <el-main>
          <component :is="currentComponent"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MarshallingPageVue from '../Admin/MarshallingPage.vue';
import TestLibraryPageVue from '../Admin/TestLibraryPage.vue';
import MarkingPageVue from '../Admin/MarkingPage.vue';
import ViolationPageVue from '../Admin/ViolationPage.vue';

export default {
  name: "AdminHomePage",
  data() {
    return {
      activeIndex: '1',
      currentComponent: 'MarshallingPageVue',
      //用户名
      userName:'xxx'
    };
  },
  components: {
    MarkingPageVue,
    MarshallingPageVue,
    TestLibraryPageVue,
    ViolationPageVue
  },
  methods: {
    handleSelect(key) {
      if (key == '1') {
        this.currentComponent = 'MarshallingPageVue';
      } else if (key == '2') {
        this.currentComponent = 'TestLibraryPageVue';
      } else if (key == '3') {
        this.currentComponent = 'MarkingPageVue';
      } else if (key == '4') {
        this.currentComponent = 'ViolationPageVue';
      }
    },
    exit(){
      var _this = this
      this.$message({
        type:"success",
        message:"正在退出..."
      })
      setTimeout(function (){
        localStorage.removeItem("currentAdmin")
        _this.$router.push("/")
      },500)
    }
  },
  mounted() {


  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
  border-right: none;
}
</style>
