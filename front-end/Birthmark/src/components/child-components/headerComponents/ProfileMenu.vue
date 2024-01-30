<template>
    <div class="profile-menu">
        <ul>
            <li class="menu-header">
                <h3>Profile menu</h3> <span class="x" @click="this.$data.hide = true">x</span>
            </li>
            <li @mouseenter="$data.cake = 'bx-burst'" @mouseleave="$data.cake = ''" @click="$router.push('/prosignup')">
                My status
                <span v-if="$data.status">
                    <div><i :class="crownIcon"></i></div>
                </span>
                <span v-else>
                    <div><i :class="cakeIcon"></i></div>
                </span>
            </li>

            <li @mouseenter="$data.cog = 'bx-spin'" @mouseleave="$data.cog = ''">
                Settings
                <div><i :class="cogIcon"></i></div>
            </li>

            <li @mouseenter="isHover = $data.edit = 'bx-tada'" @mouseleave="$data.edit = ''">
                Edit
                <div><i :class="editIcon"></i></div>
            </li>

            <li @click="logout" @mouseenter="$data.logOut = 'bx-flip-horizontal bx-fade-right'"
                @mouseleave="$data.logOut = ''">
                Log out
                <div><i :class="logOutIcon"></i></div>
            </li>
            <li class="last-li"></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ProfileMenu',
    data() {
        return {
            status: '',
            hide: false,
            crown: '',
            cake: '',
            cog: '',
            edit: '',
            logOut: ''
        }
    },
    methods: {
        logout() {
            const confirm = window.confirm('Are you sure you want to log out?')
            if (confirm) {
                localStorage.removeItem("token");
                this.$router.currentRoute.value.name.length < 2 ? 'refresh' : this.$router.push('/')
            };
        }
    },
    computed: {
        crownIcon($event) {
            return $event.mouseenter ? "bx-tada" : ''
            //$event.mouseleave= return"$data.crown=''"
            // return `bx bx-crown ${this.crown}`
        },
        cakeIcon() {
            return `bx bx-cake ${this.cake}`;
        },
        cogIcon() {
            return `bx bx-cog ${this.cog}`;
        },
        editIcon() {
            return `bx bx-edit-alt ${this.edit}`;
        },
        logOutIcon() {
            return `bx bx-log-out ${this.logOut}`;
        },
    }
}
</script>

<style scoped>
/* CSS for the profile menu */
.profile-menu {
    width: 200px;
    position: absolute;
    top: 90px;
    right: 10px;
    border-radius: 8px;
}

.profile-menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    border: 1px solid #2fa8cc;
    border-radius: 8px;
}

.profile-menu li {
    cursor: pointer;
    padding: 9px 19px;
    background-color: #ffffff;
    color: #BABECC;
    text-shadow: 1px 1px 1px #fff;
    border-top: 1px solid #ddd;
    text-align: center;
    display: flex;
    justify-content: space-between
}

.profile-menu li:hover {
    background-color: #ddd;
    color: #68cdeced;
    text-shadow: none;
}

.profile-menu li.menu-header {
    background: #6282a6;
    font-size: 18px;
    color: #fff;
}

ul li:first-child {
    text-shadow: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

ul li:last-child {
    background: #6282a6;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

li:first-child:hover,
li:last-child:hover {
    cursor: default;
    color: #fff;
    background: #6282a6;
}

.x {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 19px;
}

.x:hover {
    transform: scale(1.5);
    cursor: pointer;
}

i {
    margin-left: 18px;
    font-size: 20px;
    color: #2fa8cc;
}

i:hover {
    transform: scale(1.05);
}</style>
