<script>
    
</script>

<style lang="less">
    .setting-bar{
        position: relative;
        background-color: #fff;
        z-index: 99;
        margin: 0 auto;        
        max-width: none;
        padding: 13px 15px;
    }

    .setting-list{
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }

</style>    

<div class="setting-bar-outer">
    <div class="setting-bar">
        <div class="setting-list">
            <slot></slot>
        </div>
    </div>
</div>