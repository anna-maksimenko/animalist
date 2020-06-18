<script>
    import BreedItem from "./BreedItem.svelte";

    export let list
    export let filterQuery = ''

    $: filteredList = list.filter(item => {
        if (filterQuery === '') {
            return null;
        }
        if (typeof item.text === 'undefined') {
            return item;
        }
        if(item.tags && item.tags.length > 0){
            var dataFound;
            item.tags.split(',').map(function(tag){
            if (tag.toLowerCase().indexOf(filterQuery.toLowerCase()) > -1) {
                dataFound = true;
            }
            })
            if(dataFound){
                return null
            } else {
                return item
            }
        }
        if (item.text.toLowerCase().indexOf(filterQuery.toLowerCase()) > -1) {
            return null;
        }
        return item;
    })
    $: selectedList = list.filter(item => {
        if (filterQuery === '') {
            return item;
        }
        if (typeof item.text === 'undefined') {
            return null;
        }
        if(item.tags && item.tags.length > 0){
            var dataFound;
            item.tags.split(',').map(function(tag){
            if (tag.toLowerCase().indexOf(filterQuery.toLowerCase()) > -1) {
                dataFound = true;
            }
            })
            if(dataFound){
                return item
            }
        }
        if (item.text.toLowerCase().indexOf(filterQuery.toLowerCase()) > -1) {
            return item;
        }
        return null;
    })
</script>

<style lang="less">
    ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
        transition: height 0.1s;
        @media (max-width: 1023px){
            padding-bottom: 32px;
        }
    }
    hr{
        width: auto;
        margin: 40px 30px;
        @media (max-width: 640px){
            margin: 40px 0;
        }
        border: none;
        height: 1px;
        background-color: black;
    }
    .no-breed{
        br{
            display: none;
        }

        @media(max-width: 640px){
            br{
                display: block;
            }
        }
        a::after{
            bottom: 0;
        }
    }
    .breed-list-cont{
        display: flex;
        flex-wrap: wrap;
    }
    .breed-list-column{
        flex: 0 0 50%;
        @media (max-width: 1023px){
            flex: 0 0 100%;
        }
    }
</style>

<div class="breed-list-cont">
    <div class="breed-list-column">
        <h3 class="h3">Dogs</h3>
        {#if filterQuery}
            <ul class="filtered-list">
                {#if selectedList.filter(item => item.type === 'Print-Dog').length > 0}
                    {#each selectedList.filter(item => item.type === 'Print-Dog') as item,i (i)}
                        <BreedItem text={item.text} id={item.id} highlighted={true}/>
                    {/each}
                {:else}
                    <p class="no-breed">We don't seem to have your breed.<br/> <a href="/pages/contact-us">Let us know!</a></p>
                {/if}
            </ul>
            {#if filteredList.length > 0}
                <hr/>
                <ul class="breed-list">
                    {#each filteredList.filter(item => item.type === 'Print-Dog') as item,i (i)}
                        <BreedItem text={item.text} id={item.id}/>
                    {/each}
                </ul>
            {/if}
            
        {:else}
            <ul class="breed-list">
                {#each list.filter(item => item.type === 'Print-Dog') as item,i (i)}
                    <BreedItem text={item.text} id={item.skuCode}/>
                {/each}
            </ul>
        {/if}
    </div>
    <div class="breed-list-column">
        <h3 class="h3">Cats</h3>
        {#if filterQuery}
            <ul class="filtered-list">
                {#if selectedList.filter(item => item.type === 'Print-Cat').length > 0}
                    {#each selectedList.filter(item => item.type === 'Print-Cat') as item,i (i)}
                        <BreedItem text={item.text} id={item.id} highlighted={true}/>
                    {/each}
                {:else}
                    <p class="no-breed">We don't seem to have your breed.<br/> <a href="/pages/contact-us">Let us know!</a></p>
                {/if}
            </ul>
            {#if filteredList.length > 0}
                <hr/>
                <ul class="breed-list">
                    {#each filteredList.filter(item => item.type === 'Print-Cat') as item,i (i)}
                        <BreedItem text={item.text} id={item.id}/>
                    {/each}
                </ul>
            {/if}
            
        {:else}
            <ul class="breed-list">
                {#each list.filter(item => item.type === 'Print-Cat') as item,i (i)}
                    <BreedItem text={item.text} id={item.skuCode}/>
                {/each}
            </ul>
        {/if}
    </div>
</div>