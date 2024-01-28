<template>
    <div class="form-container" v-if="!success">
        <div class="form-info">
            <h1>Forgot password?</h1>
            <h4>Enter the code you received to email ********</h4>
        </div>

        <div class="number-input">

            <input type="number" min="0" max="9" class="oval-lg" :class="{ 'err': isError }"
                placeholder="Enter temporary code:" v-model="inputs" @input="inputHandler($event, inputs)" />
        </div>
    </div>

    <div class="form-container" v-else-if="success">
        <div class="form-content">
            <h1>New password</h1>
            <form>
                <div class="field input-field">
                    <input type="email" placeholder="Re-enter email" :class="{ 'err': isError }" class="input userName oval-lg" v-model="reEnteredEmail">
                </div>

                <div class="field input-field">
                    <input type="password" placeholder="Create new password" :class="{ 'err': isError }" class="password oval-lg" id="pwd1"
                        v-model="pwd1">
                    <div :class="{ 'error': pwdMsg }">{{ pwdMsg }}</div>
                </div>

                <div class="field input-field">
                    <input type="password" placeholder="Confirm new password" :class="{ 'err': isError }" class="password oval-lg" id="pwd2"
                        v-model="pwd2">
                    <i class='bx bx-hide eye-icon'></i>
                </div>

                <div class="field button-field">
                    <button type="click" @click.prevent="patchUsers" class=" btn oval-lg"> Update password </button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>

export default {
    name: 'ForgotPassword',
    data() {
        return {
            inputs: "",
            email: localStorage.getItem('user_email'),
            success: null,
            isError: false,
            pwd1:'',
            pwd2:'',
            reEnteredEmail:''
        }
    },
    methods: {
        async validateTempPwd(inputs) {
            console.log("in valiadte email:", this.email, "pwd", inputs)
            this.isError = false
            const res = await fetch(`http://localhost:3444/admin/validateForgot/?email=${this.email}&&pwd=${inputs}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json()
            console.log(!data.Error);
            if (data.Error) return this.isError = true;
            this.success = true;
        },

        async inputHandler({ target }, inputs) {
            if (inputs.toString().length >= 6) {
                console.log(inputs);
                this.inputs = target.value.slice(0, 6);
                await this.validateTempPwd(inputs);
            }
        },

        // ~~~~ // patch new password // ~~~~ //

        // Function to validate password
        isPasswordValid(pwd) { return /[A-Za-z]/.test(pwd) },

        // Function to validate password match and strength
        newPasswordValidator(pwd1, pwd2) {
            if (pwd1 === pwd2 && this.isPasswordValid(pwd1)) {
                return pwd1;
            }
            throw new Error(`Invalid password!`);
        },
        async patchUsers(){
            const patch = { user_pwd: this.newPasswordValidator(this.pwd1, this.pwd2) };
            console.log("patch>>>>>", patch, "re-entered", this.reEnteredEmail);
            if(!patch.user_pwd) return null;
            const res = await fetch(`http://localhost:3444/admin/newpwd/${this.reEnteredEmail}/`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patch)
            })
            const data = await res.json();
            console.log(data);
            if(res.status > 400) return null;
            this.$router.push('/login');
            return data;
        }
    }
}
</script>

<style scoped>
.form-info {
    text-align: center;
}

.form-container {
    margin-top: 100px;
    background: rgba(245, 245, 250, 0.416);
    backdrop-filter: blur(5px);
    padding: 18px;
    border-radius: 20px;
    height: 75vh;
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
}

.new-password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 6px;
}

.number-input {
    display: flex;
    column-gap: 4px;
}

.number-input input {
    text-align: center;
    color: black;
}

.number-input input[type="number"]::-webkit-inner-spin-button,
.number-input input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.number-input input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
}
</style>