<template>
  <el-container>


    <el-form :model="user" label-width="80px">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入内容"  v-model="Stu.userName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input placeholder="请输入内容"  v-model="Stu.realName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="身份证号:">
        <el-input placeholder="请输入内容"  v-model="Stu.idCard" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="学校:">
        <el-input placeholder="请输入内容"  v-model="Stu.school" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="报考学校:">
        <el-input placeholder="请输入内容"  v-model="Stu.aimSchool" :disabled="true"></el-input>
      </el-form-item>
    </el-form>


  </el-container>

</template>

<script>
export default {
  name: "selfMsg",
  data() {
    return {
      Stu:{
        userId:'1',
        userName: "天才美少女卡莎",
        realName: "黎乐",
        idCard:"xxxxxxxxxxxxxxxxx",
        school:'二仙桥职业学院',
        aimSchool:"成都恐龙专科大学"
      },
      input: '143',
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>

<style scoped>

</style>
