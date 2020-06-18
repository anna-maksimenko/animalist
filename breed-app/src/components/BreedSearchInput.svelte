<script>
    export let filterQuery
</script>

<style lang="less">
    .search-input-cont{
        padding: 30px;
    }
    label{
        position: relative;
        border: 2px solid;
        width: 100%;
    }
    input{
        margin-bottom: 0;
        padding: 5px 30px 5px 10px;
        background-color: transparent;
        font-size: 14px;
        &:focus{
            outline: none;
        }
        &::placeholder{
            color: black;
            opacity: 1;
        }
    }
    .search-icon{
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        vertical-align: middle;
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/332516/search.svg);
        width: 16px;
        height: 16px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
    @media(max-width: 640px){
        .search-input-cont{
            padding-left: 0;
            padding-right: 0;
        }
    }
</style>

<div class="search-input-cont">
    <label for="breed-search-input">
        <input type="text" placeholder="Search" name="breed-search-input" bind:value={filterQuery}>
        <div class="search-icon">
        </div>
    </label>
</div>