<template>
  <div>
    <el-container style="height: 100vh;">
      <!-- 左侧菜单栏 -->
      <el-aside width="200px" style="background-color: rgb(18, 90, 160); color: white;">
        <el-menu :default-active="activeIndex" @select="handleSelect" class="el-menu-vertical-demo" style="background-color: rgb(18, 90, 160); color: white;">
          <el-menu-item index="0" style="color: white; text-align: center;">
            <i class="el-icon-menu"></i>
          </el-menu-item>
         <el-menu-item index="1" style="color: white;">
            <i class="el-icon-document"></i> <span>学校信息</span>
          </el-menu-item>
          <el-menu-item index="2" style="color: white;">
            <i class="el-icon-edit"></i> <span>批量报考</span>
          </el-menu-item>
          <el-menu-item index="3" style="color: white;">
            <i class="el-icon-location"></i><span>创建考试</span>
          </el-menu-item>
          <el-menu-item index="4" @click="exit" style="color: white;">
            <i class="el-icon-close"></i><span>退出系统</span>
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
import InformationPageVue from '../School/InformationPage.vue';
import ApplyPageVue from '../School/ApplyPage.vue';
import EnrollmentPageVue from '../School/EnrollmentPage.vue';

export default {
  name: "SchoolHomePage",
  data() {
    return {
      activeIndex: '1',
      currentComponent: 'InformationPageVue'
    };
  },
  components: {
    InformationPageVue,
    ApplyPageVue,
    EnrollmentPageVue,
  },
  methods: {
    handleSelect(key) {
      if (key == '1') {
        this.currentComponent = 'InformationPageVue';
      } else if (key == '2') {
        this.currentComponent = 'ApplyPageVue';
      } else if (key == '3') {
        this.currentComponent = 'EnrollmentPageVue';
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
