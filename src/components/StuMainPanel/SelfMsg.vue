<template>
  <el-container>


    <el-form :model="user" label-width="80px">
      <el-form-item label="头像:">
        <el-input placeholder="请输入内容"  v-model="input" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input placeholder="请输入内容"  v-model="input" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="身份证号:">
        <el-input placeholder="请输入内容"  v-model="input" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="学校:">
        <el-input placeholder="请输入内容"  v-model="input" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="报考学校:">
        <el-input placeholder="请输入内容"  v-model="input" :disabled="true"></el-input>
      </el-form-item>
    </el-form>


  </el-container>

</template>

<script>
export default {
  name: "selfMsg",
  data() {
    return {
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
