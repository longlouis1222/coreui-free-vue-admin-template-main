<script setup>
import Validate from '../../service/ValidService'
import { ElNotification } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { FormInstance } from 'element-plus'

const ruleFormRef = ref(FormInstance)
const route = useRoute()
const router = useRouter()
const store = useStore()

let loadingBtn = ref(false)
// dữ liệu form
let dataForm = reactive({
  value: {
    oldPassword: null,
    newPassword: null,
    token: null,
  },
})
// validate form
const validatePass = (rule, value, callback) => {
  if (!value || value === '') {
    callback(new Error('Vui lòng nhập mật khẩu mới'))
  } else if (value.length < 6) {
    callback(new Error('Mật khẩu dài ít nhất 6 ký tự'))
  }
  //  else if (value.includes(dataForm.value.newPassword)) {
  //   callback(new Error('Mật khẩu không được chứa tài khoản'))
  // }
   else {
    callback()
  }
}
const validatePassCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập lại mật khẩu'))
  } else if (value !== dataForm.value.oldPassword) {
    callback(new Error('Nhập lại mật khẩu chưa trùng khớp với mật khẩu mới'))
  } else {
    callback()
  }
}
const rulesForm = reactive({
  token: [
    { trigger: 'blur', required: true, message: 'Vui lòng nhập mã xác thực' },
  ],
  oldPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
  newPassword: [
    { required: true, validator: validatePassCheck, trigger: 'blur' },
  ],
})

// function
const updatePassword = async (formEl) => {
  loadingBtn.value = true

  formEl.validate(async (valid) => {
    if (!valid) {
      loadingBtn.value = false
    }
    try {
      store.dispatch('updatePassword', {
        oldPassword: dataForm.value.oldPassword,
        newPassword: dataForm.value.newPassword,
        token: dataForm.value.token,
      })
      ElNotification({
        title: 'Success',
        message: `Thay đổi mật khẩu thành công`,
        type: 'success',
        duration: 3000,
      })
      setTimeout(() => {
        router.push({
          name: 'Login',
        })
      }, 1000)
    } catch (e) {
      ElNotification({
        title: 'Error',
        message: `${e}`,
        type: 'error',
        duration: 3000,
      })
    } finally {
      setTimeout(() => {
        loadingBtn.value = false
      }, 1500)
    }
  })
}

const hashUrl = () => {
  if (route.query.token) {
    dataForm.value.token = route.query.token
  }
}

onMounted(() => {
  hashUrl()
})
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <!-- auth page bg -->
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
          ></path>
        </svg>
      </div>
    </div>

    <!-- auth page content -->
    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div style="font-size: 40px; font-weight: 600">Đổi mật khẩu</div>
            </div>
          </div>
        </div>
        <!-- end row -->
        <div class="login-container position-relative">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
              <div class="card mt-4">
                <div class="card-body p-4">
                  <div class="mt-2">
                    <h5 class="text-center">ĐỔI MẬT KHẨU</h5>
                  </div>

                  <div class="p-2">
                    <el-form
                      ref="ruleFormRef"
                      :model="dataForm.value"
                      status-icon
                      :rules="rulesForm"
                      label-width="150px"
                      label-position="top"
                      @submit.prevent
                    >
                      <el-form-item label="Mã xác thực" prop="token">
                        <el-input
                          type="text"
                          autocomplete="off"
                          v-model="dataForm.value.token"
                          tabindex="1"
                          disabled
                        />
                      </el-form-item>
                      <el-form-item label="Mật khẩu mới" prop="oldPassword">
                        <el-input
                          type="password"
                          autocomplete="off"
                          v-model="dataForm.value.oldPassword"
                          tabindex="2"
                          show-password
                        />
                      </el-form-item>
                      <el-form-item
                        label="Nhập lại mật khẩu"
                        prop="newPassword"
                      >
                        <el-input
                          type="password"
                          autocomplete="off"
                          v-model="dataForm.value.newPassword"
                          tabindex="3"
                          show-password
                        />
                      </el-form-item>

                      <el-form-item class="mb-0">
                        <el-button
                          type="primary"
                          style="height: 36px"
                          class="btn btn-success btn-load w-100 mt-3"
                          @click="updatePassword(ruleFormRef)"
                          tabindex="4"
                          native-type="submit"
                          :loading="loadingBtn"
                        >
                          Đồng ý
                        </el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end auth page content -->
  </div>
  <!-- end auth-page-wrapper -->
</template>

<style scoped>
.active {
  color: #7c7c7c;
  font-weight: 600;
}
.auth-one-bg {
  background-image: url('@/assets/images/vue400.jpg');
  background-position: 50%;
  background-size: cover;
}
.auth-one-bg-position {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 380px;
}
.auth-one-bg .bg-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  background: linear-gradient(90deg, #0b0b15, #151529);
  opacity: 0.7;
  background-color: #000;
}
.auth-one-bg .shape {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}
.auth-one-bg .shape > svg {
  width: 100%;
  height: auto;
  fill: #fff;
}
.auth-page-wrapper .auth-page-content {
  padding-bottom: 60px;
  position: relative;
  z-index: 2;
  width: 100%;
}
</style>
