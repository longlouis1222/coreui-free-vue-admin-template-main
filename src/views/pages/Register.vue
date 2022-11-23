<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="firstname"
                    placeholder="Firstname"
                    autocomplete="firstname"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput v-model="lastname" placeholder="Lastname" autocomplete="lastname" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput v-model="email" placeholder="Email" autocomplete="email" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput v-model="username" placeholder="Username" autocomplete="username" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="repeatPassword"
                    type="password"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton @click="signUp" color="success">Create Account</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
const router = useRouter()
const store = useStore()

const firstname = ref(null)
const lastname = ref(null)
const email = ref(null)
const username = ref(null)
const password = ref(null)
const repeatPassword = ref(null)

const signUp = () => {
  const data = {
    firstName: firstname.value,
    lastName: lastname.value,
    email: email.value,
    username: username.value,
    password: password.value,
    confirmPassword: repeatPassword.value,
  };
  console.log('>>>data', data)
  console.log('Login func from Register Component')
  store.dispatch('register', data)
}

</script>
