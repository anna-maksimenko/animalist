<script>
    export let text
    export let id
    export let highlighted
</script>

<style lang="less">
    li{
        margin-bottom: 0;
    }
    a{
        text-decoration: none;
        line-height: 1.8;
        font-size: 14px;
        &:not(:hover){
            &:after{
                display: none;
            } 
        }
    }
    .highlighted{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.8;
    }
    
</style>

<li class="breed-item">
    <a class:highlighted={highlighted} href={`/pages/create-artwork?setup=${id}-LIN-BLA-V-R-30x40`}>{text}</a>
</li>