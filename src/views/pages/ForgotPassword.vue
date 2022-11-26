<script setup>
import ValidService from '../../service/ValidService'
import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { FormInstance } from 'element-plus'

const ruleFormRef = ref(FormInstance)
const router = useRouter()
const store = useStore()

const loadingBtn = ref(false)
const isRecoverPw = ref(true)
// dữ liệu form
const dataForm = reactive({
  value: {
    email: null,
  },
})
// validate form
const rulesForm = reactive({
  email: [ValidService.required, ValidService.checkEmail],
})

const getVerificationCodes = async (formEl) => {
  loadingBtn.value = true

  formEl.validate(async (valid) => {
    if (valid) {
      try {
        console.log('Login func from Login Component', dataForm.value.email)
        store.dispatch('forgotPassword', { email: dataForm.value.email})
        setTimeout(() => {
          isRecoverPw.value = false
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
    } else loadingBtn.value = false
  })
}

const backToPrev = () => {
  isRecoverPw.value = true;
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
              <div style="font-size: 40px; font-weight: 600">Quên mật khẩu</div>
            </div>
          </div>
        </div>
        <!-- end row -->
        <div class="login-container position-relative">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
              <div class="card mt-4">
                <div v-if="isRecoverPw" class="card-body p-4">
                  <div class="mt-2 text-center">
                    <h5 class="mb-4">QUÊN MẬT KHẨU</h5>
                    <p :class="{ active: true }">
                      Mã xác thực sẽ được gửi vào tài khoản email đã đăng ký
                      <br />
                      Vui lòng nhập Email bạn đã đăng ký tài khoản.
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
                      <el-form-item label="Email" prop="email">
                        <el-input
                          type="text"
                          v-model="dataForm.value.email"
                          tabindex="0"
                          :autofocus="isRecoverPw"
                          :disabled="!isRecoverPw"
                        />
                      </el-form-item>
                      <div class="d-flex justify-content-between">
                        <el-form-item class="mb-0 w-48">
                          <el-button
                            type="button"
                            style="height: 36px"
                            class="btn btn-success w-100 mt-2"
                            @click="router.go(-1)"
                            tabindex="2"
                            native-type="submit"
                          >
                            Quay lại
                          </el-button>
                        </el-form-item>
                        <el-form-item class="mb-0 w-48">
                          <el-button
                            type="primary"
                            style="height: 36px"
                            class="btn btn-success btn-load w-100 mt-2"
                            @click="getVerificationCodes(ruleFormRef)"
                            tabindex="1"
                            native-type="submit"
                            :loading="loadingBtn"
                          >
                            Gửi
                          </el-button>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                </div>
                <!-- StartNotification check mail -->
                <div v-else class="card-body p-3">
                  <div class="mt-2 text-center">
                    <h5 class="text-center">
                      Gửi thông tin lấy lại mật khẩu thành công !
                    </h5>
                    <img
                      class="w-75"
                      src="../../../src/assets/gifs/mail-download.gif"
                      alt="mail..."
                    />
                    <p class="active text-center">
                      Mã xác thực vào tài khoản email mà bạn đã đăng ký.
                      <br />
                      Hãy kiểm tra email và làm theo hướng dẫn.
                    </p>
                    <div class="text-center w-100" style="font-size: 11px">
                      Chưa nhận được mã xác thực?
                      <a
                        @click="backToPrev"
                        style="color: #409eff; cursor: pointer"
                        >Lấy lại mã xác thực</a
                      >
                      hoặc
                      <a
                        style="color: #409eff; cursor: pointer"
                        @click="router.go(-1)"
                        >Quay lại màn đăng nhập</a
                      >
                    </div>
                  </div>
                </div>
                <!-- Notification check mail -->
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
  font-weight: 500;
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
  background-color: #000;
  opacity: 0.7;
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
