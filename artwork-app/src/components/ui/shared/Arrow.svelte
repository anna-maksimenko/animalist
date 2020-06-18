<script>

</script>

<style>
    /*Arrow animation*/
    .arrow-cont{
        position: fixed;
        bottom: 20px;
        display: none;
        left: 50%;
        transform: translatex(-50%);
        z-index:2;
    }
    @media screen and (min-width: 1024px) {
        .arrow-cont{
            display: none !important;
        }
    }
    .arrow-round {
        position: relative;
        width: 48px;
        height: 48px;
        transform: rotate(180deg);  
        border-radius: 100%;

        background-color: black;
        box-shadow: black 0 0 0 0;
        transition: box-shadow 0.5s, background-color 0.5s;
        animation-name: bounceCircle;
        animation-duration:1.3s;
        animation-delay: 0.5s;
        animation-iteration-count:1;
        animation-timing-function: ease-out;
    }
    #arrow-cta{
        width:100%;
        height: 100%;
        border-radius: 100%;
        cursor: pointer; 
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(0px);
    }


    #arrow-cta svg{
        fill: white;
        stroke-width: 2px;
        stroke: black;
        width: 24px;
        height: 24px;
        margin-top: -6px;
        transform: translateY(0px);
        animation-name: bounceArrow;
        animation-delay: 0.5s;
        animation-duration:1.3s;
        animation-iteration-count:1;
        animation-timing-function: ease-out;
    }

    @keyframes bounceCircle {
        0% {transform: translateY(0px) rotate(180deg);}
        20% {transform: translateY(5px) rotate(180deg);}
        40% {transform: translateY(-3px) rotate(180deg);}
        60% {transform: translateY(2px) rotate(180deg);}
        80% {transform: translateY(-1px) rotate(180deg);}
        100% {transform: translateY(0px) rotate(180deg);}
    }
    @keyframes bounceArrow {
        0% {transform: translateY(0px);}
        20% {transform: translateY(12px);}
        40% {transform: translateY(-8px);}
        60% {transform: translateY(5px);}
        80% {transform: translateY(-3px);}
        100% {transform: translateY(0px);}
    }
</style>

<div class="arrow-cont">
    <div class="arrow-round">
    <div id="arrow-cta">
        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.148 10.398l-1.297 1.289q-0.148 0.148-0.352 0.148t-0.352-0.148l-4.148-4.148-4.148 4.148q-0.148 0.148-0.352 0.148t-0.352-0.148l-1.297-1.289q-0.148-0.148-0.148-0.355t0.148-0.355l5.797-5.789q0.148-0.148 0.352-0.148t0.352 0.148l5.797 5.789q0.148 0.148 0.148 0.355t-0.148 0.355z">
        </path>
        </svg>
    </div>
    </div>
</div>