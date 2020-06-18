<script>
    export let mode = 'text'
    export let text = ''
    export let sideNote = ''
    export let colorHex = ''
    export let mixed = false
    export let selected = false
</script>

<style lang="less">
    li{
        font-size: 12px;
        text-transform: initial;
        letter-spacing: 1.27px;
        line-height: 1.14;
        padding: 12px 17px;
        cursor: pointer;
        @media(max-width: 1023px){
            padding: 15px 17px;
        }
    }
    li:not(:last-of-type){
        border-bottom: 1px solid #faf9f6;
    }

    li.selected{
        background-color: #f7f7f7;
        border-bottom-color: #fff;
    }
    @media(min-width: 1024px){
        li:hover{
            background-color: #f7f7f7;
            border-bottom-color: #fff;
            
        }     
    }   
    li.color-mode {
        padding: 0;
        border-bottom: none;
    }

    li :global(a){
        color: #000;
    }

    .color-selection {
        line-height: 1.1;
        display: flex;
    }
    .color-square {
        width: 38px;
        flex-shrink: 0;
        @media(max-width: 1023px){
            width: 44px;
        }
    }
    .color-square.mixed{
        display: flex;
    }
    .color-part{
        display: block;
        width: 33%;
        height: 100%;
        flex-basis: 33%;
        flex-grow: 1;
        flex-shrink: 1;
    }
    .color-square.shadow {
        box-shadow: inset -1px 0px 0px 0px #faf9f6;
    }
    .color-label {
        width: 100%;
        padding: 12px 18px;
        border-bottom: 1px solid #faf9f6;
        text-transform: capitalize !important;
        @media(max-width: 1023px){
            padding: 15px 17px;
        }
    }	

    .side-selection{
        display: flex;
        justify-content: space-between;
    }	
</style>

{#if mode === "color"}
    <li class:selected={selected} class:color-mode={mode === "color"} on:click >
        <div class="color-selection">
            {#if mixed}
                <span class="color-square mixed">
                    {#each colorHex as color,i (color)}
                        <span class="color-part" style={`background-color: ${color}`}></span>
                    {/each}
                </span>
            {:else}
                <span class="color-square" class:shadow={ text === "White" } style={(colorHex) ? `background-color:${colorHex}` : ""}></span>
            {/if}            
            <span class="color-label">{text}</span>
        </div>
    </li>
{:else if mode === "side-note"}
    <li class:selected={selected} on:click >
        <div class="side-selection">
            <span class="side-text">{text}</span>
            <span class="side-note">{@html sideNote}</span>
        </div>
    </li>
{:else}
    <li class:selected={selected} on:click >{@html text}</li>
{/if}
