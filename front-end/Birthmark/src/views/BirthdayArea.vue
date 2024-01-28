<template>
  <div class="main-container">
    
    <!-- Header -->
    <div class="header">
      <HeaderSection />
      <!-- <HeaderSection @toggleForm="toggleSignup" :loggedIn="loggedIn" /> -->
    </div>

    <!--Message div-->
    <div class="message" :class="{ hidden: !messageActive }">
      <h1>{{ message }}</h1>
    </div>

    <!-- Info Form area-->
    <div class="date">
      <birthday-form />
    </div>

    <!--Footer area-->
    <div class="footer">
      <FooterSection class="hidden"/>
    </div>

    <div class="designRound first"></div>
    <div class="designRound second"></div>
    <div class="designRound third"></div>

  </div>
</template>

<script>

import BirthdayForm from '../components/BirthdayForm.vue'
import HeaderSection from '../components/HeaderSection.vue'
import FooterSection from '../components/FooterSection.vue'

export default {
  name: "App",
  components: {
    HeaderSection,
    FooterSection,
    BirthdayForm
  }

}
</script>


<style src="../assets/BirthdayArea.css"></style>