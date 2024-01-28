<template>
    <div class="main-view-container">
        <header>
            <header-section />
        </header>

        <main>
            <birthmarks-table />
        </main>
    </div>
</template>

<script>
import BirthmarksTable from '../../components/child-components/headerComponents/BirthmarksTable.vue';
import HeaderSection from '@/components/HeaderSection.vue';
export default {
    name: "BirthmarksArea",
    components: {
        BirthmarksTable,
        HeaderSection
    }

}
</script>

<style scoped>
/* .main-view-container {
    display: flex;
    flex-direction: column;
}
main{
    margin-top: 71px;
} */
</style>