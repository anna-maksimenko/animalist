<script>
    export let name
    export let icon
    export let flipRotate = false
</script>

<style>
    .setting-list-item{
        flex: 0 0 16.666667%;
        display: flex;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
    }

    .setting-icon :global(svg) {
        width: 25px;
        height: 100%;
        transition: transform 0.3s;
        transform: rotate(0deg)
    }

    .setting-icon.rotate :global(svg){
        transform: rotate(180deg)
    }

    .setting-name{
        text-align: center;
        margin-top: -8px;
    }

    .setting-name span{
        color: #000000;
        font-family: "Avenir Next";
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0.7px;
        line-height: 26px;
        text-transform: uppercase;
    }
</style>

<div class="setting-list-item" on:click>
    <div class="setting-icon" class:rotate={flipRotate}>
        <svelte:component this={icon} />
    </div>
    <div class="setting-name">
        <span>{name}</span>
    </div>
</div>