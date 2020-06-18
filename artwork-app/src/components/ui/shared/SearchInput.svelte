<script>
    import {onMount} from 'svelte'
    import {searchString} from '../../../globals.js'

    let searchInput

    onMount(() => {
        if(window.innerWidth > 1023){
            searchInput.focus()
        }
    })
</script>

<style>
    .select-custom--search {
        position: relative;
        z-index: 10;
        background-color: #f1f1f1;
        padding: 0;
    }
    .select-custom--search:before {
        display: inline-block;
        content: "";
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        vertical-align: middle;
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/332516/search.svg);
        width: 14px;
        height: 14px;
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .select-custom--search__field {
        font-size: 12px;
        font-family: 'AvenirNext-Medium';
        margin: 0;
        color: #000;
        letter-spacing: 1.27px;
        text-transform: none;
        border: 1px solid #000;
        line-height: normal;
        padding: 11px 30px 11px 17px;
        margin-bottom: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        width: 100%;
        margin: 0;
        -webkit-user-select: initial;
        -khtml-user-select: initial;
        -moz-user-select: initial;
        -ms-user-select: initial;
        user-select: initial;
    }
    @media screen and (max-width: 1023px) {
        .select-custom--search__field {
            /* font-size: 12px; */
            font-size: 16px;
            padding-top: 11px;
            padding-bottom: 11px;
            border-left: none;
            border-right: none;
        }
    }
    .select-custom--search__field:focus {
        outline: none;
    }
    .select-custom--search__field::-webkit-input-placeholder{
        color: #000 !important;
        opacity: 1;
    }
    .select-custom--search__field::-moz-placeholder{
        color: #000 !important;
        opacity: 1;
    }
    .select-custom--search__field:-ms-input-placeholder{
        color: #000 !important;
        opacity: 1;
    }
    .select-custom--search__field:-moz-placeholder{
        color: #000 !important;
        opacity: 1;
    }
    .select-custom--search__field::placeholder{
        color: #000 !important;
        opacity: 1;
    }
    @media(max-width: 1023px){
        .select-custom--search__field::-webkit-input-placeholder{
            font-family: "Avenir Next"
        }
        .select-custom--search__field::-moz-placeholder{
            font-family: "Avenir Next"
        }
        .select-custom--search__field:-ms-input-placeholder{
            font-family: "Avenir Next"
        }
        .select-custom--search__field:-moz-placeholder{
            font-family: "Avenir Next"
        }
        .select-custom--search__field::placeholder{
            font-family: "Avenir Next"
        }
    }
</style>

<div class="select-custom--search">
    <input class="select-custom--search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" placeholder="Search" bind:value={$searchString} bind:this={searchInput}>
</div>