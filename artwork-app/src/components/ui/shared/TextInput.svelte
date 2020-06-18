<script>
    import {onMount} from 'svelte'
    import {errorMessage} from '../../../globals.js'

    export let textDisplayed
    export let textOverflow
    export let showLettersCounter
    export let lettersCounter
    export let mobile = false

    let textInput

    onMount(() => {
        if(window.innerWidth > 1023){
            textInput.focus()
        }
    })
</script>

<style lang="less">
    .text-input-cont {
        -webkit-box-shadow: 18px 18px 19px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 18px 18px 19px rgba(0, 0, 0, 0.1);
        box-shadow: 18px 18px 19px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        padding: 19px 82px 19px 24px;
        /* border-top: 1px solid #faf9f6; */
        box-sizing: border-box;
        position: relative;
        @media(max-width: 1023px){
            padding: 19px 82px 19px 18px;
        }
    }
    .text-input-cont.mobile{
        border-top: none;
    }
    .text-input-cont :global(input) {
        background-color: #f1f1f1;
        text-transform: none!important;
        display: block;
        padding: 10px 20px;
        /* margin: 12px auto!important; */
    }
    .text-input-cont :global(input),
    .text-input-cont :global(textarea)/*,
    .text-input-cont :global(span)*/ {
        font-family: 'AvenirNext-Medium'; 
        font-size: 14px;
        text-transform: uppercase;
        border: none;
        border-radius: 0;
        box-sizing: border-box;
    }
    @media screen and (max-width: 1023px) {
        .text-input-cont :global(input),
        .text-input-cont :global(textarea),
        .text-input-cont :global(span) {
            font-size: 12px;
        }
    }
    .text-input-cont :global(input:focus),
    .text-input-cont :global(textarea:focus),
    .text-input-cont :global(span:focus) {
        outline: none;
    }
    .text-input-cont :global(::-webkit-input-placeholder) {
        color: #8a8a8a;
        font-weight: 400;
        font-family: "Avenir Next";
    }
    .text-input-cont :global(::-moz-placeholder) {
        color: #8a8a8a;
        font-weight: 400;
        font-family: "Avenir Next";
    }
    .text-input-cont :global(:-ms-input-placeholder) {
        color: #8a8a8a;
        font-weight: 400;
        font-family: "Avenir Next";
    }
    .text-input-cont :global(:-moz-placeholder) {
        color: #8a8a8a;
        font-weight: 400;
        font-family: "Avenir Next";
    }
    .text-input-cont label {
        width: 100%;
        margin: 0;
    }
    .text-input-cont label input {
        height: 44px;
        width: 100%;
        display: block;
        resize: none;
        font-family: AvenirNext-Medium;
        text-transform: uppercase!important;
        white-space: nowrap;
        font-size: 12px;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 1.27px;
        background-color: #fff;
        margin: 0 !important;
        padding: 0 !important;
        @media(max-width: 1023px){
            font-size: 16px;
        }
    }

    .text-input-cont label input::placeholder {
        color: #bababa;
        text-transform: initial!important;
        font-weight: 400;
        font-family: "Avenir Next";
    }
    .character-counter-container{
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    .character-counter-container span{
        color: #afafaf;
        font-family: "AvenirNext-Medium";
        font-size: 12px;
        font-weight: 500;
        line-height: 2.166666;
        letter-spacing: 1.27px;
        -webkit-transition: color 0.2s;
        -moz-transition: color 0.2s;
        -ms-transition: color 0.2s;
        -o-transition: color 0.2s;
        transition: color 0.2s;
    }
    .character-counter-container.text-overflow span{
        color: tomato;
    }
    .error-cont{
        background-color: #FD5B58;
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        -webkit-box-shadow: 18px 18px 19px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 18px 18px 19px rgba(0, 0, 0, 0.1);
        box-shadow: 18px 18px 19px rgba(0, 0, 0, 0.1);
    }
    .error-cont .error{
        text-transform: none;
        letter-spacing: 1.27px;
        color: #fff;
        padding: 9px 10px 9px 25px;
        display: block;
    }
</style>

<div class="text-input-cont" class:mobile={mobile}>
    <label for="text-field" class="text-input-label">
        <input autocomplete="off" placeholder="Ex: COCO THE PUG" name="text-field" bind:value={textDisplayed} on:blur on:focus on:keypress={(e) => {
                var key = e.charCode || e.keyCode || 0;     
                if (key == 13) {
                    e.preventDefault();
                }
            }} bind:this={textInput}/>               
    </label>
    {#if showLettersCounter}
        <div class="character-counter-container" class:text-overflow={textOverflow}>
            <span class="current-character-counter">{lettersCounter}</span>
            <span class="divider">/</span>
            <span class="total-character-counter">40</span>
        </div>
    {/if}
    
    {#if $errorMessage}
        <div class="error-cont">
            <span class="error">{@html $errorMessage}</span>
        </div>
    {/if}
</div>