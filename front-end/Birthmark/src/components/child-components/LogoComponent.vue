<template>
  <div class="birthmark-logo-container" @click="$router.push('/')">
    <div class="logo-link">
      <img src="/logo/bird_logo.svg" alt="BirthMark Logo" class="birthmark-logo">
    </div>
  </div>
</template>

<script>
export default {
  name: "LogoComponent"

}
</script>

<style scoped>
img {
  height: 180px;
  width: auto;
  transition: all ease-in-out 0.3s;
  /* taken from logo-link */
  position: absolute;
  left: -12px;
  top: -31px;
}

.logo-link {
  height: 180px;
  width: 180px;
  border-radius: 50%;
}

/* .logo-link:hover {
  transform: scale(1.05);
  cursor: pointer;
  box-shadow: inset -4px -4px 6px -1px white, inset 2px 2px 8px -1px rgba(72, 79, 96, 0.5);
  border-color: rgba(255, 255, 255, 0);
} */

.birthmark-logo:active {
  transform: scale(0.9);
}

/* .birthmark-logo-container {
  position: absolute;
  left: -12px;
  top: -31px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 3;
  margin-right: 0;
  height: 180px;
  width: 180px;
  border-radius: 50%;
  /* background: #f0f0f3; */
  /*box-shadow: 8px 8px 12px -2px rgba(72, 79, 96, 0.4), -6px -6px 12px -1px white;
} */

/* .birthmark-logo-container:hover {
  transform: scale(1.1);
} */

.logoLink {
  cursor: pointer;
}
</style>