<script>
    import BreedSearchInput from "./BreedSearchInput.svelte";
    import BreedList from "./BreedList.svelte";

    export let list

    let filterQuery
</script>

<BreedSearchInput bind:filterQuery={filterQuery}/>

<BreedList {list} {filterQuery}/>