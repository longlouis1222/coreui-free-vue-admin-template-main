<script setup>
import ValidService from '@/service/ValidService'
import MethodService from '@/service/MethodService'
import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { FormInstance } from 'element-plus'

import modelData from './EmployerAccountInfoModel'

const ruleFormRef = ref(FormInstance);
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
});
// const
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Thông tin tài khoản</span>
        </div>
      </template>

    </el-card>
  </div>
</template>

<style lang="scss" scoped>
</style>
