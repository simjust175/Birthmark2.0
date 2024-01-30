<template>
    <div class="row-container top">
        <!-- v-bind="$attrs" passes the emits from the "grandchild(TableControllers) to the "grandparent(BirthmarkTable) -->
        <table-controllers :birthmarkArray ="birthmarkArray" :filter-options ="filterOptions" @search-results="updateBirthmarks" v-bind="$attrs"/>
    </div>

    <div class="table-names">

    </div>


    <div class="row-container" v-for="(birthmark, index) in birthmarks" :key="index" :class="{ grey: index % 2 }">
        <div><i class='bx bxs-pin' id="pin"></i></div>
        <div class="index">{{ index + 1 }}</div>

        <div class="name input_value">
            <template v-if="birthmark.editing">
                <input v-model="birthmark.last_name" type="text" class="editable-input">
                <input v-model="birthmark.first_name" type="text" class="editable-input">
            </template>
            <template v-else>
                {{ birthmark.last_name }} {{ birthmark.first_name }}
            </template>
        </div>

        <div class="email input-value">
            <template v-if="birthmark.editing">
                <input v-model="birthmark.email" type="email" class="editable-input">
            </template>
            <template v-else>
                {{ birthmark.email }}
            </template>
        </div>

        <div class="birthday input-value">
            <template v-if="birthmark.editing">
                <input :value="birthmark.birthday.slice(0, 10)" @input="birthmark.birthday = $event.target.value"
                    type="date" class="editable-input">
            </template>
            <template v-else>
                {{ new Date(birthmark.birthday).toLocaleDateString() }}
            </template>
        </div>

        <div class="created">{{ new Date(birthmark.created_at).toLocaleDateString() }}</div>
        <div class="updated">{{ new Date(birthmark.updated_at).toLocaleDateString() }}</div>

        <div class="buttons hidden" v-if="!birthmark.editing && !birthmark.deleteState">
            <div class="edit" @click="startEditing(birthmark)">
                <i class="bx bxs-edit-alt" title="Edit recipient"></i>
            </div>
            <div class="delete" @click="setDeleteState(birthmark)">
                <i class="bx bx-trash" title="Delete recipient"></i>
            </div>
            <div class="edit"><i class="bx bxs-heart" title="Favorite"></i></div>
        </div>

        <!-- delete state buttons -->
        <div class="delete-buttons buttons" v-else-if="birthmark.deleteState">
            <div class="save-delete filter" @click="deleteRecipient(birthmark)">
                <i class="bx bx-trash" title="Delete recipient"></i>
            </div>
            <div class="cancel filter" @click="cancelDeleteState(birthmark)">
                <i class="bx bx-x" title="Cancel deleting"></i>
            </div>
        </div>

        <!-- edit state buttons -->
        <div class="editing-buttons buttons" v-else>
            <div class="cancel filter" @click="cancelEditing(birthmark)">
                <i class="bx bx-x" title="Cancel editing"></i>
            </div>
            <div class="save filter" @click="patchRecipient(birthmark)">
                <i class="bx bx-lock" title="Save"></i>
            </div>
        </div>
    </div>
</template>

<script>
//import SearchBar from './SearchBar.vue'
import TableControllers from '../TableControllers.vue';

export default {
    name: 'BirthmarkRow',
    components: {
        // SearchBar,
        TableControllers
    },
    props: {
        birthmarkArray: Array,
        columns: Array
    },
    data() {
        return {
            birthmarks: [...this.birthmarkArray]
        }
    },
    methods: {
        startEditing(birthmark) {
            birthmark.editing = true;
            birthmark.originalState = { ...birthmark };
        },
        cancelEditing(birthmark) {
            birthmark.editing = false;
            birthmark.firstName = birthmark.originalState.firstName;
            birthmark.lastName = birthmark.originalState.lastName;
            birthmark.email = birthmark.originalState.email;
            birthmark.birthday = birthmark.originalState.birthday;
        },
        setDeleteState(birthmark) {
            birthmark.deleteState = true;
        },
        cancelDeleteState(birthmark) {
            birthmark.deleteState = false;
        },
        formatDate(date) {
            const formattedDate = new Date(date).toISOString().split('T')[0];
            return formattedDate;
        },
        async patchRecipient(birthmark) {
            birthmark.editing = false;
            let { id, first_name, last_name, email, style, birthday } = birthmark;
            let patch = {
                ...(first_name && { first_name }),
                ...(last_name && { last_name }),
                ...(email && { email }),
                ...(style && { style }),
                ...(birthday && { birthday: this.formatDate(birthday) })
            };
            const res = await fetch(`http://localhost:3444/recipients/patch/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify(patch)
            })
            const data = await res.json();
            return data;
        },

        // delete recipient
        async deleteRecipient(birthmark) {
            const confirm = window.confirm(`Are you sure you want to delete ${birthmark.first_name} ${birthmark.first_name}?`)
            if ( !confirm) return birthmark.deleteState = false;
            const { id } = birthmark;
            const res = await fetch(`http://localhost:3444/recipients/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                }
            });
            const data = await res.json();
            if(res.status < 400) return false;
            birthmark.deleteState = false;
            this.$emit('recipientDeleted')
            return data;
        },
        updateBirthmarks(searchResults){
            this.birthmarks = searchResults;
        }
    },
    watch: {
        birthmarkArray(newVal) {
            this.birthmarks = newVal;
        }

    },
    computed: {
        filterOptions() {
            const columnArray = [...this.columns];
            const columnName = columnArray.map(col => col.Field);
            return columnName.filter(name => {
                if (name !== "id" && name !== "user_id" && name !== "deleted_at") {
                    return name
                }
            });
        }
    }
}
</script>

<style scoped src="../../../assets/birthmarkRow.css"></style>
