<template>
  <main>
    <router-view :key="$route.fullPath"/>
  </main>
  
</template>

<script>
//import HeaderSection from './components/HeaderSection.vue';
export default {
  name: "App",
  components: {
     //HeaderSection
  }
}
</script>

<style src="../src/assets/buttons.css"></style>
<style src="../src/assets/common.css"></style>