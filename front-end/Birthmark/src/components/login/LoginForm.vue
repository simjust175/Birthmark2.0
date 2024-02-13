<template>
    <img src="/public/bird.png" class="birdImg" alt="birthmarkBird">
    <div class="logo-con">
        <logo-component />
    </div>
    <div class="exit" @click="$router.push('/')">
        <h1 class="x">&#10060;</h1>
    </div>

    <!-- <div class="loginRoundDesign first"></div>
    <div class="loginRoundDesign second"></div> -->
    <main class="container formGroup">
        <div class="form login__form">
            <div class="form-content">
                <h1>Login</h1>
                <div id="error-msg" :class="{'error': msg}">{{ msg }}</div>
                <form action="#" @input="msg = ''">
                    <div class="field input-field oval-lg">
                        <input autofocus="email" placeholder="Enter email" class="input oval-lg" :class="{'err': msg}" v-model="email">
                    </div>

                    <div class="field input-field">
                        <input type="password" placeholder="Password" class="password oval-lg" :class="{'err': msg}" v-model="pwd">
                        <i class='bx bx-hide eye-icon'></i>
                    </div>

                    <div class="field button-field">
                        <button type="submit" @click.prevent="logIn" class="btn oval-lg">Login</button>
                    </div>
                </form>

                <div class="form-link">
                    <span> <a href="#" class="link signup-link" @click="$router.push('/signup')">Don't have an account?
                            Signup</a></span>
                </div>

                <div class="form-link">
                    <a href="#" class="forgot-pass" @click="retrievePwd($event)">Forgot password?</a>
                </div>

            </div>

            <div class="line"></div>

            <div class="media-options">
                <a href="#" class="field github">
                    <i class='bx bxl-github github-icon'></i>
                    <span>Login with Github</span>
                </a>
            </div>

            <div class="media-options">
                <GoogleLogin />
            </div>

        </div>
    </main>
</template>

<script>
import GoogleLogin from './GoogleLogin.vue';
import LogoComponent from '../child-components/LogoComponent.vue';
export default {
    name: "LoginForm",
    components: {
        GoogleLogin,
        LogoComponent
    },
    data() {
        return {
            email: "",
            pwd: "",
            msg: ''
        }
    },
    methods: {
        credentials() {
            if (!this.email || !this.pwd) return null;
            return {
                user_email: this.email,
                user_pwd: this.pwd
            }
        },
        upperCase(txt) {
            return txt.split(" ").map(word => word.charAt(0)).join(" ").toUpperCase();
        },
        async logIn() {
            const credentials = this.credentials();
            const response = await fetch("http://localhost:3444/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            console.log("rs:", response);
            const data = await response.json();
            console.log("loginData ", data);
            if(response.status > 400)  {
                this.msg = 'Username or password incorrect';
                return null
            }
            const { newToken: { id, user_name, newToken: { token } } } = data;
            const user_initials = this.upperCase(user_name)
            localStorage.setItem("token", token);
            localStorage.setItem("user_id", id);
            localStorage.setItem("user_initials", user_initials);
            this.$router.push("/input");
        },
        async retrievePwd() {
            await fetch(`http://localhost:3444/admin/forgot/?email=${this.email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            localStorage.setItem('user_email', this.email)
            this.$router.push('/forgot');
        }
    }
}
</script>

<style scoped>
/* Global styles */

/* Import Google Fonts - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

/* Reset default margin and padding & font-family */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

:root {
    --border-radius: 4px;
    --color-primary: #333;
}

/* Logo styles */
.logo {
    position: absolute;
    top: 20px;
    left: 20px;
}

.logo img {
    height: 90px;
    width: auto;
    transition: all 0.3s ease-in-out;
}

.logo img:hover {
    cursor: pointer;
    transform: scale(1.10);

}

/* Container styles */
template,
.container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 30px;
    text-align: center;
    background: #fdfdff;
    border-top-left-radius: 420px 120px;
}

/* Form container styles */
form {
    margin-top: 30px;
}

</style>