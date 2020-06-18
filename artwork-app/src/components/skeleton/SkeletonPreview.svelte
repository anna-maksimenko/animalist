<script>
    let width
    let height
    let canvasHeight
    let canvasWidth

    $: {
        if(window.innerWidth > 1023){
            const contAR = width / height
            if (contAR > 1) {
                canvasWidth = width
                canvasHeight = width
            } else {
                canvasWidth = height
                canvasHeight = height
            }
        }
    }
</script>

<style>
    .skeleton-preview-cont-outer{
        background-color: #efefef;
    }
    .skeleton-preview-cont {
        position: relative;
        height: 100%;
        overflow: hidden;
        background-color: #efefef;
    }
    .skeleton-preview-cont-inner {
        height: 100%;
    }
    .skeleton-preview-canvas {
        height: 100%;
        display: flex;
    }
    .skeleton-preview-paper{
        background-color: white;
        width: 60%;
        height: 0;
        padding-bottom: 84.2%;
        max-width: 408px;
        margin: auto;
        max-height: 572px;
    }
    @media (min-width: 1361px) {
        .skeleton-preview-cont-inner{
            max-width: 680px;
            margin: 0 auto;
        } 
    }  
    @media (min-width: 1024px) {
        .skeleton-preview-cont-outer {
            min-height: 575px;
        }
        .skeleton-preview-canvas{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .skeleton-preview-paper{
            padding-bottom: 67.9%;
            margin: 16% 26%;
            width: 100%;
            max-height: none;
            max-width: none;
        }
    }
    @media (max-width: 1023px){
        .skeleton-preview-cont-outer{
            order: 0;
            padding-bottom: 40px;
        }
        .skeleton-preview-cont{
            max-width: 730px;
            margin: 0 auto;
        }
        .skeleton-preview-cont-inner {
            position: relative;
            top: initial;
            left: initial;
            transform: none;
            margin-top: 6%;
            padding-top: 29px;
            margin-bottom: 1.3%;
            padding-bottom: 6%;
        }
        .skeleton-preview-paper {
            width: 82%;
            padding-bottom: 114.3%;
            max-width: none;
            max-height: none;
        }
    }
</style>

<div class="skeleton-preview-cont-outer" bind:offsetWidth={width} bind:offsetHeight={height}>
    <div class="skeleton-preview-cont">
        <div class="skeleton-preview-cont-inner">
            <div class="skeleton-preview-canvas" style={`width: ${canvasWidth}px; height= ${canvasHeight}px`}>
                <div class="skeleton-preview-paper"></div>
            </div>
        </div>
    </div>
</div>