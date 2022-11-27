<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const backToPrev = () => {
  router.go(-1);
}

</script>

<template>
  <div class="min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">404</h1>
            <h4 class="pt-3">Oops! You're lost.</h4>
            <p class="text-medium-emphasis float-start">
              The page you are looking for was not found.
            </p>
          </div>
          <CInputGroup class="input-prepend">
            <CButton color="primary" variant="outline" @click="backToPrev"><CIcon icon="cil-arrow-left"/> Go back</CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    </CContainer>
    <img src="../../assets/gifs/404.gif" alt="404" style="padding-right: 110px;">
  </div>
</template>
