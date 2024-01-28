<template>
    <div class="row-container top">
        <search-bar @search-results="updateRecipients" />
        <div class="amount">

        </div>

        <div class="filter" @click="filterView = !filterView">
            <i class='bx bx-filter-alt' id="filter-icon"></i>
            <div class="filter-selector" :class="{ 'hidden': filterView }">
                <ul>
                    <li v-for="(column, index) in filterOptions" :key="index" @click="selectFilter(column)">
                        {{ column }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from './headerComponents/SearchBar.vue';
export default {
    name: "TableControllers",
    components: {
        SearchBar
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

<style>
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
</style>