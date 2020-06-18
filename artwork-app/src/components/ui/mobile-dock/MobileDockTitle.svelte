<script>
    export let icon
    export let text
</script>

<style>
    .dock-title{
        display: flex;
        align-items: center;
        /* padding: 9px 12px; */
        padding: 12px 12px 11px;
        border-bottom: 1px solid #faf9f6;
    }
    .icon-cont{
        width: 27px;
        height: 27px;
    }
    .title-cont{
        font-size: 13px;
        /* font-weight: 600; */
        /* letter-spacing: 0.93px; */
        letter-spacing: 0.8px;
        line-height: 26px;
        text-transform: uppercase;
        margin-left: 7px;
        font-family: 'AvenirNext-Medium';
        vertical-align: middle;
        font-weight: 500;
        color: #000;
        margin-bottom: -2px;
    }
</style>

<div class="dock-title">
    <div class="icon-cont"><svelte:component this={icon} /></div>
    <div class="title-cont">{text}</div>
</div>