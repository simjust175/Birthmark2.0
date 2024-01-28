<template>
  <main>
    <router-view />
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
<style>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Dancing+Script:wght@400;500;700&family=Marhey:wght@300;400;500&display=swap');

html,
#app {
  width: 0;
  padding: 0;
  margin: 0;
  background: #EBECF0;
}
.hidden {
  display: none;
}
</style>