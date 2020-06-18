<script>
    import { fade } from 'svelte/transition'

    import PreviewInfo from './PreviewInfo.svelte'
    import PreviewText from './PreviewText.svelte'

    import {appState, breedList, sizeList, mobileView, uiHeight, dockHeight} from '../../globals.js' 
    
    export let scrollPos

    export function scrollPreviewHandler(){
        let previewPos = previewTextPos.parentNode.getBoundingClientRect()
        // window.scrollTo({top: scrollPos + previewPos.bottom - window.innerHeight + 133 , behavior: 'smooth'})
        let positiveTopValue = document.body.style.top.substr(1)
        document.body.style.top = -(parseFloat(positiveTopValue.substr(0, positiveTopValue.length-2))+(previewPos.top + previewPos.height - $uiHeight))+'px'
    } 

    // export let height
    let width = 0

    let maskWidth
    let maskHeight
    let previewWidth
    let textMargin
    let textSize

    let preloadImgSrc
    
    let maskImgSrc
    let previewImgSrc
    let selectedProduct
    let sizeClass
    let rightOriented
    let reDrawing = true

    let previewTextPos

    $: (async() => {
        if($appState.breed.products){
            reDrawing = true
            selectedProduct = $appState.breed.products[$appState.breed.text+'  ['+$appState.design.text+'-'+$appState.color.text+']']
            selectedProduct.variants.map(function(item){
                if(!(selectedProduct.storedImage)){
                    if(item.option1 === "Vertical" && item.option2 === "Left" && item.option3 === "70x100cm"){
                    preloadImgSrc = 'https://7c07wecc95.execute-api.eu-north-1.amazonaws.com/prod/motif/'+item.sku+'.jpg'
                    }
                }           
            });  
            if(!$appState.size.storedImage){
                let sizeIndex = $sizeList.reduce((acc, item, index) => (item.selected) ? index : acc, 0)
                let preloadPromise = await imagePreload($appState.size.maskImageSrc)
                $sizeList[sizeIndex].storedImage = await preloadPromise
            }
            if(!$appState.breed.products[$appState.breed.text+'  ['+$appState.design.text+'-'+$appState.color.text+']'].storedImage){
                let preloadPromise = await imagePreload(preloadImgSrc)
                $breedList[$appState.breed.index].products[$appState.breed.text+'  ['+$appState.design.text+'-'+$appState.color.text+']'].storedImage = await preloadPromise
            }
            sizeClass = 'size-'+$appState.size.id
            maskImgSrc = $appState.size.storedImage.src
            rightOriented = ($appState.flip.id === 'right') ? true : false
            previewImgSrc = $appState.breed.products[$appState.breed.text+'  ['+$appState.design.text+'-'+$appState.color.text+']'].storedImage.src
            reDrawing = false
        }
    })()

    $: {
        const contH = $uiHeight
        const contW = width
        const contAR = contW/contH
        const motifProportion = 0.474919
        const textMarginProportion = 0.302475
        const textSizeProportion = 0.01076426
        let measureBase
        if(contAR>1){
            measureBase = contW
        } else {
            measureBase = contH
        }
        maskWidth = measureBase
        maskHeight = measureBase
        previewWidth = measureBase * motifProportion
        textMargin = measureBase * textMarginProportion
        textSize = measureBase * textSizeProportion
    }

    async function imagePreload(url){
        return new Promise((resolve, reject) => {
            let maskImgPreload = new Image;
            maskImgPreload.onload = () => resolve(maskImgPreload)
            maskImgPreload.onerror = reject
            maskImgPreload.src = url;
        })
    }
</script>

<style>
    @media screen and (min-width: 1023px) {
        .preview-cont-outer {
            min-height: 575px;
        }
    }
    @media screen and (min-width: 1100px) {
        .preview-cont-outer {
            min-height: 610px;
        }
    }
    @media screen and (min-width: 1200px) {
        .preview-cont-outer {
            min-height: 640px;
        }
    }
    @media screen and (min-width: 1300px) {
        .preview-cont-outer {
            min-height: 660px;
        }
    }
    @media screen and (min-width: 1360px) {
        .preview-cont-outer {
            min-height: 670px;
        }
    }

    .preview-cont-outer{
        /* background-color: #e9e6df; */
        background-color: #fff;
        /* overflow: hidden; */
        order: 0
    }
    /* @media screen and (max-width: 1023px) {
        .preview-cont-outer{
            order: initial;
        }
    } */
    .preview-cont {
        position: relative;
        height: 100vh;
        /* background-color: #e9e6df; */
        background-color: #efefef;
        overflow: hidden;
    }
    @media (min-width: 1361px) {
        .preview-cont{
            /* max-width: 680px; */
            margin: 0 auto;
        } 
    }
    /* @media (max-width: 1023px) {
        .preview-cont{
            max-width: 730px;
            margin: 0 auto;
            padding-bottom: 40px;
            height: 100vh;
        } 
    } */
    .poster-center{
        width: 1px;
        height: 1px;
        position: absolute;
        top: 60%;
        left: 50%;
        pointer-events: none;
    }
    /* @media (min-width: 1024px) {
        .poster-center{
            display: none;
        }
    } */
    .preview-cont-inner {
        height: 100%;
    }
    /* @media (max-width: 1023px) {
        .preview-cont-inner {
            position: relative;
            top: initial;
            left: initial;
            transform: none;
            padding-top: 30px;
            padding-bottom: 6%;
            margin-top: -21%;
            margin-bottom: -28%;
        }
    } */
    .preview-canvas {
        height: 100%;
        -webkit-transition: opacity 0.3s;
        -o-transition: opacity 0.3s;
        transition: opacity 0.3s;
    }
    .img-wrapper{
        height: 100%;
        font-size: 0;
        position: relative;
    }
    .img-wrapper img {
        position: absolute;
        top: 50%;
        -webkit-touch-callout: none; 
        -webkit-user-select: none; 
        -khtml-user-select: none;
            -moz-user-select: none; 
            -ms-user-select: none; 
                user-select: none;

        max-width: none;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .preview-img{
        mix-blend-mode: multiply;
    }
    .right-oriented img.preview-img {
        filter: FlipH;
        -ms-filter: "FlipH";
        -moz-transform: translate(-50%, -50%) scaleX(-1);
        -o-transform: translate(-50%, -50%) scaleX(-1);
        -webkit-transform: translate(-50%, -50%) scaleX(-1);
        transform: translate(-50%, -50%) scaleX(-1);
    }
    /* @media screen and (max-width: 1023px) {
        .img-wrapper .mask-img{
            position: relative;
            top: initial;
            left: initial;
            transform: none;
            width: 170%;
            max-width: 170%;
            margin: 0 -35.1%;
        }
        .img-wrapper .preview-img{
            position: absolute;
            left: 50%;
            margin: 0;
            transform: translate(-50%, -50%);
            width: 80.5%;
            top: 49.8%;
        }
    } */
    /* .poster-text-wrapper{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: 37.5%;
        font-size: 0.6184615vw;
        text-transform: uppercase;
    } */
    /* @media screen and (min-width: 1361px) {
        .poster-text-wrapper{
            font-size: 8.41108px;
        }
    }
    @media screen and (max-width: 1023px) {
        .poster-text-wrapper{
            margin-top: 51.4%;
            font-size: 12.45px;
        }
    }
    @media screen and (max-width: 747px) {
        .poster-text-wrapper{
            font-size: 1.6666666vw;
        }
    } */

    /*  Text sizes  */
    /*  30x40  */
    /* .size-30x40cm .poster-text-wrapper{
        font-size: 0.723599vw;
    } */
    /*  70x100  */
    /* .size-70x100cm .poster-text-wrapper{
        font-size: 0.630830vw;
    } */
    /*  11x17  */    
    /* .size-11x17inch .poster-text-wrapper{
        font-size: 0.723599vw;
    } */
    /*  18x24  */
    /* .size-18x24inch .poster-text-wrapper{
        font-size: 0.6184615vw;
    } */
    /*  24x36  */
    /* .size-24x36inch .poster-text-wrapper{
        font-size: 0.630830vw;
    }
    @media screen and (min-width: 1361px) {
        .size-30x40cm .poster-text-wrapper{
            font-size: 9.84095px;
        }
        .size-70x100cm .poster-text-wrapper{
            font-size: 8.57929px;
        }
        .size-11x17inch .poster-text-wrapper{
                font-size: 9.84095px;
        }
        .size-18x24inch .poster-text-wrapper{
            font-size: 8.41108px;
        }
        .size-24x36inch .poster-text-wrapper{
            font-size: 8.57929px;
        }
    }
    @media screen and (max-width: 1023px) {
        .size-30x40cm .poster-text-wrapper{
            font-size: 14.5665px;
        }
        .size-70x100cm .poster-text-wrapper{
            font-size: 12.699px;
        }
        .size-11x17inch .poster-text-wrapper{
            font-size: 14.5665px;
        }
        .size-18x24inch .poster-text-wrapper{
            font-size: 12.45px;
        }
        .size-24x36inch .poster-text-wrapper{
            font-size: 12.699px;
        }
    }
    @media screen and (max-width: 747px) {
        .size-30x40cm .poster-text-wrapper{
            font-size: 1.95vw;
        }
        .size-70x100cm .poster-text-wrapper{
            font-size: 1.7vw;
        }
        .size-11x17inch .poster-text-wrapper{
            font-size: 1.95vw;
        }
        .size-18x24inch .poster-text-wrapper{
            font-size: 1.6666666vw;
        }
        .size-24x36inch .poster-text-wrapper{
            font-size: 1.7vw;
        }
    } */
    /*  Sizes end  */
    
    /* .poster-text{
        letter-spacing: 0.235em;
        margin-left: 0.235em;
    }
    .poster-text-wrapper{
        font-family: 'Didact Gothic', sans-serif;
    } */
    .preview-canvas.re-drawing {
        opacity: 0.3;
    }
    .horizontal-rule-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
        margin-top: calc(37.3% + 37px);
        opacity: 0;
        -webkit-transition: opacity .2s ease;
        -moz-transition: opacity .2s ease;
        -o-transition: opacity .2s ease;
        transition: opacity .2s ease;
    }
    @media (max-width: 1023px) {
        .horizontal-rule-wrapper {
            bottom: 14.66666%;
            top: auto;
            margin-top: 0;
            margin-bottom: -16px;
        } 
    }

    .horizontal-rule.rule p{
        text-align: center;
        padding-top: 10px;
        font-size: 12px;
        font-weight: 500;
        color: #333333;
        letter-spacing: 0.93px;
        opacity: 1;
        font-family: "AvenirNext-Medium";
        line-height: 1.857142;
    }
    @media (max-width: 1023px) {
        .horizontal-rule.rule p{
            line-height: 2.6;
        }
    }
</style>

<div class="preview-cont-outer" >
    <div class="preview-cont" bind:offsetWidth={width} style={`${($mobileView) ? 'height: '+maskHeight+'px' : '' }`} >
        <div class="preview-cont-inner">
            <div class="preview-canvas" class:re-drawing={reDrawing}> 
                <div class={'img-wrapper '+sizeClass} class:right-oriented={rightOriented} >
                    <img src={maskImgSrc} alt="" class="mask-img" transition:fade style={`height: ${maskHeight}px; width: ${maskWidth}px`} />
                    <img src={previewImgSrc} alt="" class="preview-img" transition:fade style={`width: ${previewWidth}px;`} on:load/>
                    <PreviewText {textMargin} {textSize} text={$appState.text}/>
                </div>              
            </div>
        </div>
        <div class="poster-center"></div>
    </div>
    <PreviewInfo {previewImgSrc} {rightOriented} {reDrawing} text={$appState.text} bind:previewTextPos={previewTextPos}/>
</div>