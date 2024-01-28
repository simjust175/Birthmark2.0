<template>
    <div class="birthmarks-container" v-if="birthmarksStat">

        <birthmark-row :birthmarkArray="birthmarkArray" :columns="columns" @filter-data="updateFilter"
            @order-update="updateOrder" @recipientDeleted="updateOrder" />
    </div>

    <div class="empty-state" v-else>
        <div class="empty-message" @mouseenter="setHappyState" @mouseleave="setSadState" @click="$router.push('/input')">
            <h3 :class="imageSrc">Lets make someone smile..</h3>
            <img :src="`/${imageSrc}.svg`" class="sad"/>
        </div>
    </div>
</template>

<script>
import BirthmarkRow from './BirthmarkRow.vue';
export default {
    name: "BirthmarkTable",
    components: {
        BirthmarkRow
    },
    emits: ['filter-data', 'order-update'],
    data() {
        return {
            token: localStorage.getItem("token"),
            birthmarkArray: [],
            columns: '',
            //user_id: localStorage.getItem("user_id"),
            user_id: 18,
            orderBy: 'last_name',
            order: 'ASC',
            isHappy: false
        }
    },
    methods: {
        async getRecipients(orderBy) {
            const res = await fetch(`http://localhost:3444/recipients/?orderBy=${orderBy}&&order=${this.order}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            if (res.status > 400) return null;
            console.log(res.status);
            const { recipients, columns } = await res.json();
            this.birthmarkArray = recipients;
            this.columns = columns;
            return recipients;
        },
        async updateFilter(newData) {
            this.orderBy = newData;
            await this.getRecipients(newData);
        },
        async updateOrder(newData) {
            this.order = newData;
            await this.getRecipients(this.orderBy);
        }, setHappyState() {
            this.isHappy = true;
        },
        setSadState() {
            this.isHappy = false;
        }
    },
    async mounted() {
        await this.getRecipients(this.orderBy);
    },
    computed: {
        birthmarksStat() {
            const stat = this.birthmarkArray.length
            console.log("stat", stat);
            return stat ? true : null;
        },
        imageSrc() {
            return this.isHappy ? 'happy' : 'sad';
        }
    }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;700&family=Marhey:wght@300;400;500&display=swap');

:root {
    --main-font: 'Audiowide', sans-serif;
}

.birthmarks-container {
    width: 100vw;
    padding: 0;
    margin-top: 3px;
    background: rgb(211, 211, 211);
}

.sad {
    height: 98vh;
    width: 98vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

h3.sad {
    color: transparent;
}

.happy{
    width: 100vw;
    font-weight: normal;
    position: absolute;
    text-decoration: underline;
    cursor: pointer;
    color: grey;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.empty-message h3 {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* .empty-message h3:hover {
    
} */

.empty-message {
    font-size: 50px;
    font-weight: bolder;
    color: rgb(137, 137, 138);
    font-family: var(--main-font);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>