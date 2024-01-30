<template>
    <div class="search-container">
        <input type="text" placeholder="Search" id="search-input" v-model="searchData"/>
        <i class="bx bx-search"></i>
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    props: {
        birthmarkArray: Array
    },
    data() {
        return {
            searchData: "",
            token: localStorage.getItem("token"),
            user_id: localStorage.getItem("user_id")
        }
    },
    methods: {
        async searchClients(searchValue) {
            const res = await fetch(`http://localhost:3444/recipients/search/${this.user_id}/?q=${searchValue}`, {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const { searchResults } = await res.json();
            console.log("search results ==== ", searchResults);
            return searchResults;
        }
    },
    watch: {
        async searchData() {
            //Back-end option
            //const results = await this.searchClients(this.searchData);
            //front-end option (PREFERRED)
            const results = this.birthmarkArray.filter(birthmark => birthmark.last_name.toLowerCase().includes(this.searchData.toLowerCase()));
            this.$emit("searchResults", results);
        }
    }

}
</script>

<style scoped>
input,
input:active,
input:focus {
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    transition: 0.8s;
}

.search-container {
    background: #fff;
    padding: 15px 30px;
    border-radius: 30px;
    font-size: 18px;
    width: 300px;
    display: flex;
    transition: all 0.3s ease-out;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .3),
        -4px -4px 6px 0 rgba(116, 125, 136, .2),
        inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
        inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
}

.search-container .bx-search {
    color: #5cbdbb;
}

/* codePen */

.bx:hover {
    cursor: pointer;
    transform: scale(360deg);
}

#search-input {
    width: 100%;
    height: 100%;
    box-shadow: none; /*to remove the 'global' style */
}
</style>