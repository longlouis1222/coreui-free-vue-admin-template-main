<script setup>
const tableData = [
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyen',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyen',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyen',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyen',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyen',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
]
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Danh sách thông tin người dùng</span>
        </div>
      </template>
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="account" label="Tài khoản" width="180" />
        <el-table-column prop="password" label="Mật khẩu" width="180" />
        <el-table-column prop="firstname" label="Tên" />
        <el-table-column prop="lastname" label="Họ" />
        <el-table-column prop="username" label="Tên đầy đủ" />
        <el-table-column prop="dateOfbirth" label="Ngày sinh" />
      </el-table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
</style>
