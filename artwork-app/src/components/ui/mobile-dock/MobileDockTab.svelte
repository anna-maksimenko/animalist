<script>
    export let icon
    export let text
    export let active = false
</script>

<style>
    .tab{
        flex: 0 50%;
        /* padding: 10px 65px; */
        background-color: #fff;
        display: flex;
        flex-direction: row;
        /* justify-content: center; */
        justify-content: flex-start;
        align-items: center;
        position: relative;
        padding: 12px 12px 11px;
        box-shadow: inset 0 -1px 0 0 #faf9f6;
    }

    .tab .tab-icon{
        width: 27px;
        height: 27px;
        align-self: center;
    }

    .tab .tab-icon :global(svg>*){
        stroke: #d3d3d3
    }

    .tab span{
        color: #d3d3d3;
        font-family: "Avenir Next";
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.8px;
        line-height: 1;
        text-transform: uppercase;
        /* margin-left: 10px; */
        margin-left: 7px;
    }
    
    .tab:after{
        content: '';
        box-shadow: 0 19px 24px rgba(0, 0, 0, 0.5);
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .tab.active{
        z-index: 1;
        border-color: #faf9f6;
    }
    
    .tab.active:after{
        opacity: 1;
    }

    .tab.active span{
        color: #000000;
    }

    .tab.active .tab-icon :global(svg>*){
        stroke: #000;
    }
</style>

<div class="tab" class:active={active} on:click>
    <div class="tab-icon">
        <svelte:component this={icon} />
    </div>
    <span>{text}</span>
</div>