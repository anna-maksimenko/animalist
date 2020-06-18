<script>
    import PreviewText from './PreviewText.svelte'

    import {mobileView, appState} from '../../globals.js'

    export let previewImgSrc
    export let rightOriented
    export let reDrawing = true
    export let text
    export let previewTextPos = 0

    let paperImgArray = [
        {
            src: '//cdn.shopify.com/s/files/1/0096/7193/4009/t/20/assets/paper-topc.jpg?v=9898458207951480071',
            preview: {
                coords: [50,141],
                width: 280
            }
            
        },
        {
            src: '//cdn.shopify.com/s/files/1/0096/7193/4009/t/20/assets/paper-corner-from-abovec.jpg?v=16142616807333660515',
            preview: {
                coords: [[115, 129, 117.5, 129, 124.5, 122],4.1],
                width: 194,
                sizeDependant: true
            }
        },
        {
            src: '//cdn.shopify.com/s/files/1/0096/7193/4009/t/20/assets/paper-cornerc.jpg?v=8030545865530197103'
        },
        {
            src: '//cdn.shopify.com/s/files/1/0096/7193/4009/t/20/assets/paper-bottomc.jpg?v=3711350000013838768',
            preview: {
                coords: [51,-191],
                width: 180
            },
            text: {
                coords: [51.2,47.5],
                size: 2.06
            }
        }
    ]

    let sizeRelation

    $:{ 
        switch($appState.size.id){
            case '11x17inch':
                sizeRelation = 0
                break;
            case '18x24inch':
                sizeRelation = 1
                break;
            case '24x36inch':
                sizeRelation = 2
                break;
            case '30x40cm':
                sizeRelation = 3
                break;
            case '50x70cm':
                sizeRelation = 4
                break;
            case '70x100cm':
                sizeRelation = 5
                break;
        } 
    }

    let dynamicTitleContHeight
    let dynamicTitleTextHeight
</script>

<style lang="less">
    .poster-info{
        /* background-color: #faf9f6; */
    }

    .poster-desc-outer {
        /* padding: 50px 30px; */
        box-sizing: border-box;
        max-width: 530px;
        margin: 0 auto;
    }

    .poster-desc {
        display: flex;
        flex-flow: column;
        padding: 50px 30px 0;
    }

    .poster-desc >*{
        text-align: center;
        padding-bottom: 20px;
    }

    .breed-name {
        color: #000;
        font-family: 'AvenirNext-Medium';
        font-size: 16px;
        font-weight: 400;
        /* line-height: 1.3; */
        line-height: 1.5;
        text-transform: uppercase;
        letter-spacing: 2.2px;
        margin: 0;
    }

    .breed-name span{
        white-space: nowrap;
        word-break: keep-all;
    }

    .breed-desc{
        color: #000;
        font-family: 'AvenirNext-Medium';
        /* font-size: 12px; */
        font-size: 13px;
        font-weight: 400;
        line-height: 1.8;
        letter-spacing: 0.79px;
        margin: 0;
        max-width: 460px;
        margin: 0 auto;
        /* @media(max-width: 1023px){
            font-size: 12px;
        } */
    }

    .highlights-list {
        display: flex;
        flex-flow: row wrap;
        padding: 20px 20px 50px;
        max-width: 500px;
        margin: 0 auto;
    }

    .highlights-list-item {
        flex: 0 33%;
        display: flex;
        flex-flow: column wrap;
    }

    .highlights-list-item>*{
        align-self: center;
    }

    .highlights-list-item>* p{
        font-size: 13px;
        font-family: 'AvenirNext-Medium';
        letter-spacing: 1.09px;
        line-height: 1.45;
        /* text-transform: uppercase; */
        margin: 10px 0;
        color: #000;
        margin-top: 0;
        @media(max-width: 1023px){
            font-size: 12px;
        }
        span{
            white-space:nowrap;
        }
    }

    .highlights-list-item .image-cont svg{
        /* width: 39px;
        height: 39px; */
        width: 44px;
        height: 44px;
    }

    .highlights-list-item .desc-cont{
        display: flex;
        justify-content: center;
    }

    .highlights-list-item .desc-cont >*{
        flex: 0 110px;
        text-align: center;
        @media(max-width: 1023px){
            flex: 0 100px;
        }
    }

    /* Gallery */
    .poster-gallery{
        display: flex;
        margin: 0 0 -10px -10px;
        max-width: none;
        flex-wrap: wrap;
        align-items: stretch;
        /* background-color: #faf9f6 */
    }

    .gallery-item{
        position: relative;
        margin-bottom: 10px;
        width: 100%;
        flex-basis: 100%;
        overflow: hidden;
        -webkit-transition: opacity 0.3s;
        -o-transition: opacity 0.3s;
        transition: opacity 0.3s;
    }
    .gallery-item.re-drawing {
        opacity: 0.3;
    }
    .gallery-item:first-child,
    .gallery-item:nth-child(2) {
        margin-left: 10px;
        width: calc(50% - 10px);
        flex-basis: calc(50% - 10px);

    }

    .gallery-item:first-child .thumbnail-outer,
    .gallery-item:nth-child(2) .thumbnail-outer {
        padding-bottom: 175%;
    }

    .gallery-item .thumbnail-outer{
        height: 0;
        padding-bottom: 48%;
        display: block;
    }

    .gallery-item .paper-img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
        position: absolute;
    }

    .gallery-item .preview-img{
        mix-blend-mode: multiply;
        position: absolute;
        transform: translate(-50%, -50%);
        max-width: none;
    }

    .gallery-item .preview-img.right-oriented{
        filter: FlipH;
        -ms-filter: "FlipH";
        -moz-transform: translate(-50%, -50%) scaleX(-1);
        -o-transform: translate(-50%, -50%) scaleX(-1);
        -webkit-transform: translate(-50%, -50%) scaleX(-1);
        transform: translate(-50%, -50%) scaleX(-1);
    }

    @media(max-width: 640px) {
        .breed-name {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 1.3px;
        }
        .breed-desc{
            font-weight: 500;
            letter-spacing: 0.67px;
        }
        .highlights-list-item .desc-cont>* {
            /* flex: 0 100px; */
            text-align: center;
        }
        .highlights-list-item>* p{
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.56px;
            line-height: 1.3;
            /* text-transform: none; */
        }
    }

    .poster-text-wrapper{
        position: absolute;
        transform: translate(-50%, -50%);
        text-transform: uppercase;
        font-family: 'Didact Gothic', sans-serif;
        mix-blend-mode: multiply;
    }
    .poster-text{
        letter-spacing: 0.235em;
        margin-left: 0.235em;
        word-break: keep-all;
        white-space: nowrap;
    }

    .cls-1{
        fill: none;
        stroke: #010101;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 6px;  
    }
</style>

<div class="poster-info">
    <div class="poster-desc-outer">
        <div class="poster-desc">
            <div class="breed-name-outer">
                <h2 class="breed-name">{$appState.breed.text} <span> · {$appState.size.labelText}</span></h2>
            </div>
            <div class="breed-desc-outer">
                <p class="breed-desc">
                    Inspired by modern Scandinavian design, this Giclée print is a tribute to the beauty of your four-legged companion. Created by Swedish artist Emil Tiismann.<br><br> 
                    Printed on a textured 200g high quality art paper, it comes in standard US and EU sizes for easy framing. Packed and shipped in an extra wide protective tube to preserve paper quality.
                </p>
            </div>
        </div>
        <div class="highlights">
            <div class="highlights-list">
                <div class="highlights-list-item">
                    <div class="image-cont">
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs></defs><title>Artboard 1 copy 21</title><polyline class="cls-1" points="142.43 130.14 163.64 130.14 163.64 103.68 118.38 60.77 36.39 60.77 36.39 130.14 55.08 130.14"/><line class="cls-1" x1="83.25" y1="130.14" x2="114.26" y2="130.14"/><circle class="cls-1" cx="69.17" cy="130.14" r="14.09"/><circle class="cls-1" cx="128.34" cy="130.14" r="14.09"/></svg>
                    </div>
                    <div class="desc-cont">
                        <p>Free express shipping</p>
                    </div>
                </div>
                <div class="highlights-list-item">
                    <div class="image-cont">
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs></defs><title>Artboard 1 copy 22</title><circle class="cls-1" cx="100" cy="100" r="53.69"/><polyline class="cls-1" points="129 81.76 93.98 116.79 76.46 99.28"/></svg>
                    </div>
                    <div class="desc-cont">
                        <p>Lifetime guarantee</p>
                    </div>
                </div>
                <div class="highlights-list-item">
                    <div class="image-cont">
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs></defs><title>Artboard 1 copy 23</title><path class="cls-1" d="M152.78,137.84a80.14,80.14,0,0,1-52.78,0,82.17,82.17,0,0,0-26.39-4.48,82.25,82.25,0,0,0-26.39,4.48V66.16a82.41,82.41,0,0,1,26.39-4.47A82.33,82.33,0,0,1,100,66.16a82.17,82.17,0,0,0,26.39,4.48,82.25,82.25,0,0,0,26.39-4.48Z"/><path class="cls-1" d="M47.22,102a82.25,82.25,0,0,1,26.39-4.48A82.17,82.17,0,0,1,100,102a80,80,0,0,0,52.78,0"/><line class="cls-1" x1="89.34" y1="63.29" x2="89.34" y2="134.96"/></svg>
                    </div>
                    <div class="desc-cont">
                        <p>Made in Sweden</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
<div class="poster-gallery">
    {#each paperImgArray as paper,i (i)}
        <div class="gallery-item" class:re-drawing={reDrawing}>
            <div class="thumbnail-outer">
                <img class="paper-img" src={paper.src}/>
                {#if paper.preview}
                    <img class="preview-img" src={previewImgSrc} class:right-oriented={rightOriented} style={`width: ${paper.preview.width}%; left: ${(paper.preview.sizeDependant) ? paper.preview.coords[0][sizeRelation] : paper.preview.coords[0]}%; top: ${paper.preview.coords[1]}%`}>
                {/if}
                {#if paper.text}
                    <div class="poster-text-wrapper" style={`font-size: ${($mobileView) ? paper.text.size*2 : paper.text.size}vw; left: ${paper.text.coords[0]}%; top: ${paper.text.coords[1]}%`} bind:this={previewTextPos}>
                        <div class="poster-text-inner-wrapper">
                            <p class="poster-text">{text}</p>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    {/each}
</div>  