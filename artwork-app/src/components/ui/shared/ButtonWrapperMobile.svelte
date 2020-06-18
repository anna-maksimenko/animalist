<script>
    import {appSettings} from '../../../globals.js'
    import {addToCartHandler} from '../../../helpers.js'
</script>

<style>
    .button-wrapper-outer-mobile{
        z-index: 1;
        /* background-color: #faf9f6; */
        margin: 0 auto;
        width: 100%;
        /* max-width: 640px; */
        padding: 0 15px 15px 15px;
        -webkit-transition: opacity .2s ease;
        -moz-transition: opacity .2s ease;
        -o-transition: opacity .2s ease;
        transition: opacity .2s ease;  
        max-width: none;
        background-color: #fff;
        position: relative;
    }
    @media (min-width: 1024px) {
        .button-wrapper-outer-mobile{
            display: none;
        }
    }
    .button-wrapper-mobile {
        /* padding: 0 15px; */
        background-color: #fff;
        max-width: 640px;
        margin: 0 auto;
    }

    .button-wrapper-mobile .add-to-cart {
        text-transform: uppercase !important;
        font-family: 'AvenirNext-DemiBold';
        letter-spacing: 1.69px;
        color: #fff;
        display: block;
        min-width: 100%;
        padding: 16px 41px 16px 41px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
        line-height: 1.1;
        -webkit-transition: background-color 0.2s 0.1s,
        border-color 0.2s 0.1s;
        -moz-transition: background-color 0.2s 0.1s,
        border-color 0.2s 0.1s;
        -ms-transition: background-color 0.2s 0.1s,
        border-color 0.2s 0.1s;
        -o-transition: background-color 0.2s 0.1s,
        border-color 0.2s 0.1s;
        transition: background-color 0.2s 0.1s,
        border-color 0.2s 0.1s;
        position: relative;
        background-color: #000000;
        border: 2px solid #000000;
        font-size: 13px;
    }
    @media (max-width: 1023px) {
        .button-wrapper-mobile{
            z-index: 1;
            position: relative;
            max-width: none;
        }
    }
    .button-wrapper-mobile .add-to-cart{
        margin-top: 0;
    }
    .button-wrapper-mobile .notice{
        padding-top: 30px;
    }
    .add-to-cart {
        text-transform: uppercase!important;
        font-family: 'AvenirNext-DemiBold';
        letter-spacing: 1.69px;
        color: #fff;
        display: block;
        min-width: 100%;
        padding: 18px 41px 14px 41px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
        line-height: 1.1;
        -webkit-transition: background-color 0.2s 0.1s, border-color 0.2s 0.1s;
        -moz-transition: background-color 0.2s 0.1s, border-color 0.2s 0.1s;
        -ms-transition: background-color 0.2s 0.1s, border-color 0.2s 0.1s;
        -o-transition: background-color 0.2s 0.1s, border-color 0.2s 0.1s;
        transition: background-color 0.2s 0.1s, border-color 0.2s 0.1s;
        position: relative;  
        background-color: #000000;
        border: 2px solid #000000;
        border-color: #000000;
        margin-top: 37px;
        font-size: 13px;
    }

    @media screen and (max-width: 1023px) {
        .add-to-cart {
            margin-top: 30px;
        }
    }
    .add-to-cart{  
        background-color: #000000;
        border-color: #000000;
    }
    .add-to-cart:after{
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: outline 0.1s linear;
        outline: 2px #000000 solid;
    }  
    .add-to-cart:after{
        outline: 2px #000000 solid;
    }
    .add-to-cart:hover:after{
        outline: 3px solid #000000;
    }
    .add-to-cart div {
        display: inline-block;
    }
    .add-to-cart.text-hidden{
        color: transparent !important;
    }
</style>

<div class="button-wrapper-outer-mobile">
    <div class="button-wrapper-mobile button-wrapper">
        <button type="submit" id="add-to-cart-mobile" class="add-to-cart" on:click|preventDefault={addToCartHandler} class:text-hidden={!($appSettings.variantPrice > 0) || !($appSettings.priceToDisplay !== 0)}>Add to cart <div
            class="price-cont"> / <div class="">{@html $appSettings.priceToDisplay}</div>
            </div></button>
    </div>
</div>