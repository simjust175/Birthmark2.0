<template>
  <message-prompt :isSuccessful="successStat" :msg="msg" />
  <div class="container">
    <div class="bird-logo"></div>
    <form>
      <input type="text" class="oval-lg" placeholder="Enter recipients name" v-model="recipientName" />

      <input type="email" class="oval-lg" placeholder="Enter recipients email" v-model="recipientEmail" />

      <label for="date-input">Enter recipients birthday:</label>
      <input name="date-input" type="date" class="oval-lg" max="9999-12-31" min="0000-01-01" pattern="[0-9]{2}-[0-9]{2}"
        inputmode="month" v-model="birthDate" />

      <div class="style-picker" @mouseenter="showDropDown($event)" @mouseleave="showDropDown($event)">
        <button class="oval-lg style-picked">
          <span>{{ stylePicked }}</span>
          <i class="bx bx-chevron-down icon"></i>
        </button>

        <div class="drop-down">
          <p class="style-choice pro-style-choice" @click.prevent="$router.push('proSignup')">
            Upload your design <i class="bx bx-crown"></i>
          </p>
          <p class="style-choice" v-for="(style, index) in styleList" :key="index" :id="style"
            @click="styleChoice(style, $event)">
            {{ style }}
          </p>
        </div>
      </div>

      <div class="buttons">
        <button class="oval-xlg btn animation reg" type="button" @click.prevent="postRecipient($event)">
          <i class="icon ion-md-lock"></i> Mark me up!
        </button>
        <button class="oval-xlg btn animation pro" id="pro" type="button" @click="checkProStatus">
          <i class="icon ion-md-lock"></i><i class="bx bx-crown"></i> Multiple mark
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import MarkButton from './child-components/MarkButton.vue'
import confetti from 'https://esm.run/canvas-confetti@1'
import MessagePrompt from './child-components/MessagePrompt.vue'
export default {
  name: 'BirthdayForm',
  component: {
    MarkButton,
    MessagePrompt
  },
  data() {
    return {
      styleList: ['dog', 'gold', 'pink', 'gold', 'black', 'blue'],
      stylePicked: 'Choose a style',
      recipientName: '',
      recipientEmail: '',
      birthDate: '',
      user_id: localStorage.getItem('user_id'),
      token: localStorage.getItem('token'),
      pro: localStorage.getItem('subscription'),
      successStat: false,
      msg: ''
    }
  },
  methods: {
    //choose a style
    styleChoice(style, event) {
      event.preventDefault()
      event.stopPropagation()
      this.stylePicked = style
      event.target.parentNode.classList.remove('show-drop-down')
    },
    showDropDown(event) {
      const dropDown = event.target.children[1].classList
      dropDown[event.type === 'mouseenter' ? 'add' : 'remove']('show-drop-down')
    },

    // divides the recipient name into "first_name and  last_name"
    nameSplitter(name) {
      const split = name.split(' ')
      return {
        first_name: split[0],
        last_name: split.pop()
      }
    },

    //collects all the info into an object
    infoCollector() {
      const name = this.nameSplitter(this.recipientName)
      const info = {
        user_id: this.user_id,
        first_name: name.first_name,
        last_name: name.last_name,
        email: this.recipientEmail,
        birthday: this.birthDate,
        style: this.stylePicked
      }
      const keys = Object.keys(info)
      if (keys.forEach((key) => (!info[key] ? false : key))) return false
      return info
    },

    async postRecipient({ target }) {
      // condition if the user is not signed in.
      if (!localStorage.getItem('token')) return this.$router.push('/login')
      const res = await fetch(`http://localhost:3444/recipients/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`
        },
        body: JSON.stringify(this.infoCollector())
      })
      const data = await res.json()
      if (res.status === 200) {
        target.closest('form').reset()
        confetti({ particleCount: 700, spread: 160 })
        setTimeout(() => {
          this.successStat = true
          this.msg = data
        }, 5 * 1000)
      }
    },
    checkProStatus() {
      if (this.pro) {
        this.$router.push('/multimark')
      } else {
        this.$router.push('/proSignup')
      }
    }
  }
}
</script>

<style scoped>
.container {
  border-radius: 25px;
  background-color: #ecf0f3;
  /* background-image: url(../../public/bd-design.svg);
  background-position: center; */
  box-shadow:
    14px 14px 20px #cbced1,
    -14px -14px 20px white;
  padding-top: 40px;
  padding-bottom: 35px;
  width: 650px;
  z-index: 1;
  gap: 10px;
}

input,
button,
.style-picker {
  font-family: var(--main-font);
  letter-spacing: -0.2px;
  font-size: 18px;
}

.btn.animation.pro::before,
.btn.animation.pro::after {
  height: 12px;
  background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA2MCAxMS40IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCAxMS40OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0M0QUU1OTt9Cjwvc3R5bGU+CjxwYXRoIGlkPSJQYXRoXzE2NzciIGNsYXNzPSJzdDAiIGQ9Ik01OC43LDUuMkw0NS41LDBsMi4zLDUuMUgxOGwtNC4yLTQuMkgwbDQuOSw0LjlMMCwxMC41aDEzLjhMMTgsNi4zaDI5LjhsLTIuMyw1LjFsMTMuMi01LjIKCUw2MCw1LjdMNTguNyw1LjJ6IE01NC42LDYuNGwtNi43LDIuNmwxLjItMi42SDU0LjZ6IE0zLjEsOS4zbDMtM2gxMC4ybC0zLDNIMy4xeiIvPgo8L3N2Zz4K') center/contain no-repeat;
  content: '';
}

.btn.animation.reg::before,
.btn.animation.reg::after {
  width: 90px;
  height: 70px;
  background-size: 70px;
  background: url('../../public/bm_bird_nowords.svg') center/89px no-repeat;
  content: '';
}

.btn.animation.pro:hover {
  background-color: #002168;
  color: #c4ae59;
}

div,
p {
  color: #babecc;
  text-shadow: 1px 1px 1px #fff;
}

.bird-logo {
  height: 180px;
  width: 180px;
  background: url('../../public/bird.png');
  background-size: contain;
  z-index: 3;
  margin: auto;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow:
    7px 7px 10px #cbced1,
    -7px -7px 10px white;
}

form {
  padding-top: 70px;
  width: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.segment {
  padding: 32px 0;
  text-align: center;
}

::placeholder,
input[type='date']:invalid::-webkit-datetime-edit {
  color: #cbced1;
}

#pro {
  overflow: hidden;
}

.bx-crown {
  color: #c4ae59;
  font-size: 28px;
}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.input-group label {
  margin: 0;
  flex: 1;
}

.style-picker {
  position: relative;
  font-family: var(--main-font);
  display: flex;
  align-items: center;
  width: 380px;
  margin-top: 4px;
  padding-bottom: 9px;
  color: #333;
  margin-bottom: 8px;
}

.drop-down {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px #2fa8cc(0, 0, 0, 0.2);
  padding: 12px 16px;
  top: 63.5px;
  left: 0;
  right: 0;
  z-index: 4;
  text-align: center;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
}

.icon {
  font-size: 30px;
  color: #4d4d4d;
}

.show-drop-down {
  display: block;
}

.style-choice:hover {
  background: #daeaf3;
  color: #2fa8cc;
}

.pro-style-choice:hover {
  background: rgba(215, 217, 94, 0.231);
  color: #c4ae59;
}

.style-choice {
  border-top: 0.3px solid #e1e1e1;
}
</style>
