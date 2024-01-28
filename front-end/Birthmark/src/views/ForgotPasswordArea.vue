<template>
    <header>
        <header-section />
    </header>
  <div class="main-forgot-container">
    <forgot-password />
  </div>
</template>

<script>
import ForgotPassword from '@/components/login/ForgotPassword.vue';
import HeaderSection from '@/components/HeaderSection.vue';
export default {
    name: 'ForgotPasswordArea',
    components : {
        ForgotPassword,
        HeaderSection
    }
}
</script>

<style>
    .main-forgot-container {
        background-color: #f1f1f1;
        background-image: url(../../public/bird.png);
        background-repeat: no-repeat;
        background-position: center;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>