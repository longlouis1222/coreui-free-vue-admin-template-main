<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'
import Validate from '../../service/ValidService'
const ruleFormRef = ref(FormInstance)
const router = useRouter()
let loadingBtn = ref(false)
const showLayLaiMatKhau = ref(false)
const is_readonly = ref(true)
const isStep1 = ref(true)
const isStep2 = ref(false)
// dữ liệu form
let dataForm = reactive({
  value: {
    account: '',
    code: '',
    passwordNew: '',
    passwordCheck: '',
  },
})
// validate form
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập mật khẩu mới'))
  } else if (value.length < 6) {
    callback(new Error('Mật khẩu dài ít nhất 6 ký tự'))
  } else if (value.includes(dataForm.value.account)) {
    callback(new Error('Mật khẩu không được chứa tài khoản'))
  } else {
    callback()
  }
}
const validatePassCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập lại mật khẩu'))
  } else if (value !== dataForm.value.passwordNew) {
    callback(new Error('Nhập lại mật khẩu chưa trùng khớp với mật khẩu mới'))
  } else {
    callback()
  }
}
const rulesForm = reactive({
  account: [
    { trigger: 'blur', required: true, message: 'Vui lòng nhập tài khoản' },
  ],
  code: [
    { trigger: 'blur', required: true, message: 'Vui lòng nhập mã xác thực' },
    Validate.checkNumber,
  ],
  passwordNew: [{ required: true, validator: validatePass, trigger: 'blur' }],
  passwordCheck: [
    { required: true, validator: validatePassCheck, trigger: 'blur' },
  ],
})

// function
const fn_layMaXacThuc = async () => {
  loadingBtn.value = true
  if (!dataForm.value.account) {
    loadingBtn.value = false
    return false
  }

  try {
    // toastr.success("Mã code lấy lại mật khẩu đã được gửi vào tài khoản email");
    showLayLaiMatKhau.value = true
    isStep1.value = false
    isStep2.value = true
  } catch (e) {
    console.log(e.code)
    if (e.code === 4) {
      // toastr.error("Gặp sự cố kết nối mạng Internet");
    } else console.log('Lấy mã xác thực thất bại. Vui lòng thử lại!')
  } finally {
    setTimeout(() => {
      loadingBtn.value = false
    }, 2000)
  }
}

const fn_layLaiMatKhau = async (formEl) => {
  loadingBtn.value = true
  is_readonly.value = false

  formEl.validate(async (valid) => {
    if (valid) {
      try {
        await mushroom.$auth.resetPasswordAsync(
          dataForm.value.account,
          dataForm.value.code,
          dataForm.value.passwordNew,
        )
        // toastr.success("Đã đặt lại mật khẩu dựa trên mã khôi phục mật khẩu");
        setTimeout(() => {
          router.push({ name: 'login' })
        }, 2000)
      } catch (e) {
        if (e.code === 4) {
          // toastr.error("Gặp sự cố kết nối mạng Internet");
        } else console.log('Lấy lại mật khẩu thất bại. Vui lòng thử lại!')
      } finally {
        setTimeout(() => {
          loadingBtn.value = false
        }, 2000)
      }
    } else loadingBtn.value = false
  })
}

const trimAccount = () => {
  dataForm.value.account = dataForm.value.account.trim()
}
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
              <div style="font-size: 40px; font-weight: 600">
                Forgot password
              </div>
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
                    <h5 class="text-primary text-center">KHÔI PHỤC MẬT KHẨU</h5>
                    <p style="color: #747474" :class="{ active: isStep1 }">
                      1. Lấy mã xác thực: Mã xác thực sẽ được gửi vào tài khoản
                      email đã đăng ký
                    </p>
                    <p style="color: #747474" :class="{ active: isStep2 }">
                      2. Khôi phục mật khẩu với mã xác thực
                    </p>
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
                      <el-form-item label="Tài khoản" prop="account">
                        <el-input
                          type="text"
                          v-model="dataForm.value.account"
                          tabindex="0"
                          :autofocus="showLayLaiMatKhau === false"
                          :disabled="showLayLaiMatKhau === true"
                          @change="trimAccount"
                        />
                      </el-form-item>
                      <el-form-item
                        label="Mã xác thực"
                        prop="code"
                        v-if="showLayLaiMatKhau === true"
                      >
                        <el-input
                          type="text"
                          autocomplete="off"
                          v-model="dataForm.value.code"
                          tabindex="1"
                          :autofocus="showLayLaiMatKhau === true"
                        />
                      </el-form-item>
                      <el-form-item
                        label="Mật khẩu mới"
                        prop="passwordNew"
                        v-if="showLayLaiMatKhau === true"
                      >
                        <el-input
                          type="password"
                          autocomplete="new-password"
                          v-model="dataForm.value.passwordNew"
                          tabindex="2"
                          show-password
                        />
                      </el-form-item>
                      <el-form-item
                        label="Nhập lại mật khẩu"
                        prop="passwordCheck"
                        v-if="showLayLaiMatKhau === true"
                      >
                        <el-input
                          type="password"
                          autocomplete="off"
                          v-model="dataForm.value.passwordCheck"
                          tabindex="3"
                          show-password
                        />
                      </el-form-item>

                      <el-form-item class="mb-0">
                        <el-button
                          v-if="showLayLaiMatKhau === true"
                          type="button"
                          style="height: 36px"
                          class="btn btn-success btn-load w-100 mt-2"
                          @click="fn_layLaiMatKhau(ruleFormRef)"
                          tabindex="4"
                          native-type="submit"
                          :loading="loadingBtn"
                        >
                          Đồng ý
                        </el-button>
                        <el-button
                          v-else
                          type="button"
                          class="btn btn-success btn-load w-100 mt-2"
                          @click="fn_layMaXacThuc(ruleFormRef)"
                          tabindex="5"
                          native-type="submit"
                        >
                         Đồng ý
                        </el-button>
                        <div
                          class="text-center w-100"
                          style="font-size: 11px"
                          v-if="showLayLaiMatKhau === true"
                        >
                          Chưa nhận được mã xác thực?
                          <a
                            @click="fn_layMaXacThuc()"
                            style="color: #409eff; cursor: pointer"
                            >Lấy lại mã xác thực</a
                          >
                          hoặc
                          <a
                            style="color: #409eff; cursor: pointer"
                            @click="router.go(-1)"
                            >Quay lại</a
                          >
                        </div>
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
  color: #019d88 !important;
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
  background: linear-gradient(90deg, #0b0b15, #151529);
  opacity: 0.9;
}
.bg-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
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
