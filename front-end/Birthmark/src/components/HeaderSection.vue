<template>
  <div class="header">
    <div class="logo">
      <logo-component />
    </div>

    <nav>
      <ul class="header-ul">
        <li class="oval-lg my-marks"  @click="checkStatus">My Marks</li>
        <li class="oval-lg about"  @click="$router.push('/About')">About</li>
        <li class="oval-lg contact"  @click="$router.push('/Contact')">Contact</li>
      </ul>
    </nav>

    <button @click="$router.push('/login')" class="oval-lg" v-if="!$data.token" >
      Log In
      <span class="first"></span>
      <span class="second"></span>
      <span class="third"></span>
      <span class="fourth"></span>
    </button>

    <div class="profile" @click="hide = !hide" v-else>
      <h2>{{ initials }}</h2>
    </div>
    <div class="profile-menu">
      <profile-menu :class="{ 'hidden': hide }" />
    </div>
  </div>
</template>

<script>
import ProfileMenu from './child-components/headerComponents/ProfileMenu.vue';
import LogoComponent from './child-components/LogoComponent.vue';

export default {
  name: "HeaderSection",
  components: { LogoComponent, ProfileMenu },
  props: { loggedIn: Boolean },
  data() { return {
     token: localStorage.getItem("token"),
      hide: true,
      initials: localStorage.getItem("user_initials")
 } },
  methods: {
    checkStatus() {
      if (this.token) {
        this.$router.push('/marks');
      } else {
        this.$router.push('/login');
      };
    }
  }, watch: {
    token(stat){
      this.token = stat
    }
  }
}
</script>

<style scoped>
:root {
  --color-primary: #238bab;
}


.header {
  height: 100px;
  padding-bottom: 10px;
  backdrop-filter: blur(10px);
  font-family: 'Audiowide', sans-serif;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  z-index: 2;
  right: 0;
  left: 0;
  top: 0;

}

.logo {
  z-index: 3;
  margin-right: 10px;
}


nav {
  padding-top: 10px;
  color: #BABECC;
  text-shadow: 1px 1px 1px #fff;
  font-size: 22px;
}

nav ul {
  display: flex;
  align-content: center;
  list-style: none;
  gap: 25px;
}


nav ul li:hover {
  cursor: pointer;

}

.my-marks:hover {
  color: #fe6a6ad4;
}

.about:hover {
  color:#5fceb4bd;
}

.contact:hover {
  color: #2fa7ccdc;
}
nav ul li:active {
  transform: scale(0.9);
}

/* <<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>> */
.oval-lg {
  height: 54px;
  padding: 0 28px;
  border-radius: 40px;
}


.oval-lg{
  width: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
}

li {
  font-size: 18px;
  line-height: 18px;
  color: #6C7587;
  padding: 0 8px;
  position: relative;
  box-shadow: none;
  border-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  /* background-color: #EBECF0; */
  backdrop-filter: blur(10px);
  transition: all 250ms ease-in-out;
}

 li:hover {
  border: 3px solid rgba(255, 255, 255, 0);
  outline: none;
  box-shadow: 8px 8px 12px -2px rgba(72, 79, 96, 0.4), -6px -6px 12px -1px white;
  cursor: pointer;
}


li:active {
  box-shadow: inset -4px -4px 6px -1px white, inset 2px 2px 8px -1px rgba(72, 79, 96, 0.5);
  border-color: rgba(255, 255, 255, 0);
}

li > * {
  vertical-align: middle;
}

li > span:last-child {
  padding-left: 8px;
}
/* <<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>> */

/* log-in li */
button {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: none;
  padding: 12px 30px;
  font-size: 22px;
  position: relative;
  background: transparent;
  color: var(--color-primary);
  text-transform: uppercase;
  border: 3px solid #2fa8cc;
  cursor: pointer;
  transition: all 0.7s;
  overflow: hidden;
  border-radius: 100px;
  margin-left: 40px;
  margin-right: 15px;
}

/* body{
  height: 100vh;
  width: 100%;
  background: #dde1e7;
  display: flex;
  justify-content: center;
  align-items: center;
}
div{
  height: 54px;
  width: 210px;
  padding: 0 28px;
  background: #dde1e7;
  border-radius: 20px;
  margin: 20px;
 } */

.circle{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 120px;
  box-shadow: -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3);
}
.circle::after{
  content: '';
  position: absolute;
  height: 80%;
  width: 80%;
  background-color: transparent;
  border-radius: 120px;
  box-shadow: inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3);
}

button:hover {
  color: #000;
}

span {
  transition: all 0.7s;
  z-index: -1;
}

button .first {
  content: "";
  position: absolute;
  right: 100%;
  top: 0;
  width: 25%;
  height: 100%;
  /* background: var(--primary-color); */
  background: #2fa8cc;
}

button:hover .first {
  top: 0;
  right: 0;
}

button .second {
  content: "";
  position: absolute;
  left: 25%;
  top: -100%;
  height: 100%;
  width: 25%;
  background: #2fa8cc;
}

button:hover .second {
  top: 0;
  left: 50%;
}

button .third {
  content: "";
  position: absolute;
  left: 50%;
  height: 100%;
  top: 100%;
  width: 25%;
  background: #2fa8cc;
}

button:hover .third {
  top: 0;
  left: 25%;
}

button .fourth {
  content: "";
  position: absolute;
  left: 100%;
  top: 0;
  height: 100%;
  width: 25%;
  background: #2fa8cc;
}

button:hover .fourth {
  top: 0;
  left: 0;
}

/* finished log-in button */

.login {
  font-size: 25px;
  margin-left: 113px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 24px;
  padding: 1px 80px;
  border-radius: 50% 40px;
  background-color: #4848ad;
  color: #fff;

}

.login:hover {
  transform: scale(1.05);
  cursor: pointer;
  box-shadow: 8px 8px 12px -2px rgba(72, 79, 96, 0.4), -6px -6px 12px -1px white;
}

.login:active,
.birthMarkLogo:active {
  transform: scale(0.90);
}

.profile {
  height: 85px;
  width: 85px;
  border-radius: 50%;
  border: 4px solid #0981a5;
  color: #0981a5;
  font-weight: bold;
  font-size: 15px;
  text-shadow: -1px 1px 3px rgba(0,0,0,0.5), 
   1px -1px 3px rgba(255,255,255,0.8);
  margin-left: 113px;
  margin-right: 20px;
  margin-top: 10px;
  z-index: 3;
  padding: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8e8e8;
  box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
  transition: all linear 0.2s;
}


.profile:hover {
  box-shadow: inset 2px 2px 5px #BABECC, inset -5px -5px 10px #FFF;
  cursor: pointer;
}

.profile-menu.hidden {
  display: none;
}
</style>