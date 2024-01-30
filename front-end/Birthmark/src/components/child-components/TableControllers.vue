<template>
    <search-bar v-bind="$attrs" :birthmark-array="birthmarkArray"/>
    <!-- <search-bar @search-results="updateRecipients" /> -->
    <div class="amount">

    </div>
    <div class="filter-buttons">
        <div class="filter" @click="filterView = !filterView">
            <i class='bx bx-filter-alt' id="filter-icon"></i>
            <div class="filter-selector" :class="{ 'hidden': filterView }">
                <ul>
                    <li id="top-row">
                        <h2>Filter by</h2>
                    </li>
                    <li v-for="(column, index) in filterOptions" :key="index" @click="selectFilter(column)">
                        {{ column }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="order-by filter" @click="orderHandler">
            <i :class="sortByButton" id="filter-icon" :value="orderValue"></i>
        </div>
    </div>
</template>

<script>
import SearchBar from './headerComponents/SearchBar.vue';
export default {
    name: "TableControllers",
    props: {
        birthmarkArray: Array,
        filterOptions: Array
    },
    components: {
        SearchBar
    },
    data() {
        return {
            filterData: '',
            filterView: true,
            token: localStorage.getItem("token"),
            order: 'a-z',
            orderValue: 'ASC'
        }
    },
    methods: {
        updateRecipients(update) {
            this.birthmarks = update;
        },
        selectFilter(option) {
            this.$emit("filterData", option);
        },
        orderHandler() {
            if (this.order === 'a-z') {
                this.order = 'z-a';
                this.$emit("orderUpdate", 'DESC');
            } else {
                this.order = 'a-z';
                this.$emit("orderUpdate", 'ASC');
            }
        },
    },
    computed: {
        sortByButton() {
            return `bx bx-sort-${this.order}`
        }
    }

}
</script>

<!-- <style>
.row-container {
    border-top: 1px solid #858585;
    padding: 13px 60px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.top {
    background-color: #b2e0df;
    border: none;
    margin-top: 150px;
    margin-bottom: 2px;
}

.top:hover {
    background-color: #b2e0df;
}

.filter-selector {
    background: #fff;
    padding: 5px;
    border-radius: 10px;
    position: absolute;
    right: 15px;
    z-index: 2;
}

.filter-selector ul li {
    border-top: 1px solid #7a7979;
    list-style: none;
    width: 100%;
}

.filter-selector ul li:hover {
    background: #b5b4b4;
}

.filter {
    background: #fff;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .3),
        -4px -4px 6px 0 rgba(116, 125, 136, .2),
        inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
        inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
}

#filter-icon {
    color: #5cbdbb;
}

#filter-icon:hover {
    transform: scale(1.2);
}
</style> -->
<style>
.wewe {
    position: absolute;
    top: 300px;
    font-size: 100px;
    color: red;
}
</style>
<style scoped src="../../assets/birthmarkRow.css"></style>