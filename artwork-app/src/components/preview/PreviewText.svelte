<script>
    export let textMargin
    export let textSize
    export let text
</script>

<style>
    .poster-text-wrapper{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: 37.5%;
        font-size: 0.6184615vw;
        text-transform: uppercase;
        font-family: 'Didact Gothic', sans-serif;
    }
    .poster-text{
        letter-spacing: 0.235em;
        margin-left: 0.235em;
    }
</style>

<div class="poster-text-wrapper" style={`margin-top: ${textMargin}px; font-size: ${textSize}px`}>
    <div class="poster-text-inner-wrapper">
        <p class="poster-text">{text}</p>
    </div>
</div>