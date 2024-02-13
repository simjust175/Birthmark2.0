<template>
    <div class="main-form-container">
        <div class="logo-con">
            <logo-component />
        </div>
        <img src="/bird.png" class="birdImg">
        <img src="/confettiCorner.svg" class="design_one">

        <div class="exit" @click="$router.push('/')">
            <h1 class="x">&#10060;</h1>
        </div>

        <main class="container formGroup">
            <div class="form" @input="clearError">
                <!-- <div class="info"></div> -->
                <div class="form-content">
                    <h1>Signup</h1>
                    <h1 id="signup_message"></h1>
                    <form>
                        
                        <div :class="{ 'error': msg }">{{ msg }}</div>

                        <div class="field input-field">
                            <input autofocus type="text" placeholder="Name" class="input userName oval-lg" :class="{'err': msg}" v-model="user_name">
                        </div>

                        <div class="field input-field">
                            <input type="email" placeholder="Email" class="input userName oval-lg" :class="{'err': msg}" v-model="user_email">
                        </div>

                        <div class="field input-field">
                            <input type="password" placeholder="Create password" class="password oval-lg" id="pwd1" :class="{'err': msg}" v-model="pwd1">
                        </div>

                        <div class="field input-field">
                            <input type="password" placeholder="Confirm password" class="password oval-lg" id="pwd2" :class="{'err': msg}" v-model="pwd2">
                            <i class='bx bx-hide eye-icon'></i>
                        </div>

                        <div class="field button-field">
                            <button type="click" @click.prevent="signupSystem" class=" btn oval-lg"> Signup </button>
                        </div>
                    </form>

                    <div class="form-link">
                        <span><a href="#" class="link login-link" @click="$router.push('/login')">Already have an account?
                                Login</a></span>
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
                    <a href="#" class="field google">
                        <i class='bx bxl-google google-icon'></i>
                        <span>Login with Google</span>
                    </a>
                </div>
            </div>

            <!-- <div class="designRound first"></div>
        <div class="designRound second"></div>
        <div class="designRound third"></div> -->
        </main>
    </div>
</template>

<script>
import confetti from "https://esm.run/canvas-confetti@1";
import LogoComponent from "../child-components/LogoComponent.vue";
export default {
    name: "SignupForm",
    components : {
        LogoComponent
    },
    props: {
        DATABASE: Array
    },
    data() {
        return {
            user_name: "",
            user_email: "",
            pwd1: "",
            pwd2: "",
            msg: "",
            data: "Signup"
        }
    },
    methods: {
        clearError(){
            this.msg = '';
        },
        //search the Database for email availability
        async isUsernameValid(user_email) {
            const res = await fetch(`http://localhost:3444/admin/validateEmail/?email=${user_email}`);
            const data = await res.json();
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            return data;
        },

        // Function to validate username availability >>>>EXTRA!!!!<<<<<
        async userNameValidator(user_email) {
            const isValid = await this.isUsernameValid(user_email);
            if (isValid) {
                return user_email;
            }
            this.msg = 'Incorrect username'
            throw new Error(`Username: ${user_email} is already in use`);
        },

        // Function to validate password
        isPasswordValid(pwd) { return /[A-Za-z]/.test(pwd) },

        // Function to validate password match and strength
        passwordValidator(pwd1, pwd2) {
            if (pwd1 === pwd2 && this.isPasswordValid(pwd1)) {
                return pwd1;
            }
            this.msg = 'Invalid password';
            throw new Error(`Invalid password!`);
        },

        async detailValidator() {
            const user_name = this.user_name;
            const user_email = await this.userNameValidator(this.user_email);
            console.log("user5bemail:", user_email);
            const user_pwd = this.passwordValidator(this.pwd1, this.pwd2);
            if (!user_name || !user_email || !user_pwd) {
                this.msg = 'Invalid password';
                throw new Error(`User name or password not valid`)};
            return { user_name, user_pwd, user_email };
        },

        async postToDB(user) {
            const res = await fetch('http://localhost:3444/users/post', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await res.json();
            this.data = data;
            return data;
        },

        // Sign-up form submission handler
        async signupSystem() {
            try {
                const user = await this.detailValidator();
                if (!user) return null;
                const posted = await this.postToDB(user);
                confetti({
                    particleCount: 400,
                    spread: 60
                });
                console.log(posted);
                this.$router.push('/login');
            } catch (error) {
                this.msg = error.message;
                console.error("oy", error.message);
            }
        },
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
.container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}


/* Header styles */
header {
    font-size: 28px;
    font-weight: 600;
    color: #ffffff58;
    text-align: center;
}

/* Form container styles */
form {
    margin-top: 30px;
}
</style>
<style>
.main-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    /* min-height: 100vh; */
    width: 100vw;
    overflow: hidden;
}

.birdImg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.design_one {
    z-index: 0;
    position: absolute;
    right: -5500px;
}

.exit {
    position: absolute;
    top: 15px;
    right: 15px;
}

.x {
    transition: all ease 0.2s;
}

.x:hover {
    cursor: pointer;
    transform: rotate(360deg);
}

/* .info {
    width: 100%;
    border: 1px red solid;
} */

/* Form styles */
.form {
    opacity: 80%;
    position: absolute;
    max-width: 430px;
    width: 100%;
    padding: 30px;
    border-radius: 6px;
    /* background: #FFF; */
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;

}

/* Hide form */
.formHidden {
    display: none;
}

/* Arrow styles */
.arrow {
    color: #3373cc;
    font-size: 13px;
}

/* Form field styles */
.form .field {
    position: relative;
    height: 50px;
    width: 100%;
    margin-top: 20px;
    border-radius: var(--border-radius);
}

/* Form input and button styles */
.field input,
.field button {
    background-color: #CACACA;
    /* height: 100%;
    width: 100%; */
    border: none;
    font-size: 16px;
    font-weight: 600;
    /* border-radius: var(--border-radius); */
}

/* Form input focus styles */
.field input:focus {
    border-bottom-width: 2px;
}

/* Form input focus styles */
.field input:focus {
    border-color: var(--color-primary);
    background: #ffffff;
}

/* Form button styles */
.field button {
    color: #fff;
    background-color: #0171d3;
    transition: all 0.3s ease;
    cursor: pointer;
}

/* Form button hover styles */
.field button:hover {
    background-color: #0171d395;
}

/* Eye icon styles */
.eye-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #8b8b8b;
    cursor: pointer;
    padding: 5px;
}

/* Form link styles */
.form-link {
    text-align: center;
    margin-top: 10px;
}

/* Form link text styles */
.form-link span,
.form-link a {
    font-size: 14px;
    font-weight: 400;
    color: #232836;
}

/* Form link hover styles */
.form a {
    color: #0171d3;
    text-decoration: none;
}

/* Form content link hover styles */
.form-content a:hover {
    text-decoration: underline;
}

/* Line separator styles */
.line {
    position: relative;
    height: 1px;
    width: 100%;
    margin: 36px 0;
    background-color: #d4d4d4;
}

/* Line separator text styles */
.line::before {
    content: 'Or';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
    color: #8b8b8b;
    padding: 0 15px;
}



/* Responsive styles for screens up to 400px */
@media screen and (max-width: 400px) {
    .form {
        padding: 20px 10px;
    }
}

/* Social media options styles */
.media-options a {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

/* GitHub link styles */
a.github {
    color: #fff;
    background-color: #222222;
}

/* GitHub icon styles */
a.github .github-icon {
    height: 28px;
    width: 28px;
    color: #f6f6f6;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0b0b0b;
}

/* GitHub icon and Google image positioning styles */
.github-icon,
img.google-img {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
}

/* Google image styles */
img.google-img {
    height: 20px;
    width: 20px;
    object-fit: cover;
}

/* Google link styles */
a.google {
    border: 1px solid #CACACA;
}

/* Google link text styles */
a.google span {
    font-weight: 500;
    opacity: 0.6;
    color: #232836;
}
</style>