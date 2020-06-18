<script>
    export let animationDelay = 0
</script>

<style>
    .skeleton-select-wrapper {
        width: 100%;
        font-size: 0;
        box-sizing: border-box;
        background-color: #ffffff;
        margin-bottom: 10px;
        height: 39px;
        animation-duration: 1.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background-image: -webkit-linear-gradient(left, #ffffff 0%, #f7f7f7 50%, #ffffff 100%);
        background-repeat: no-repeat;
        background-size: 150% 100%;
    }

    @keyframes placeHolderShimmer {
        0% {
            background-position: -468px 0
        }

        100% {
            background-position: 468px 0
        }
    }

    @keyframes prideShimmer {
        from {
            background-position: top left
        }

        to {
            background-position: top right
        }
    }

    @-webkit-keyframes placeHolderShimmer {
        0% {
            background-position: -468px 0
        }

        100% {
            background-position: 468px 0
        }
    }

    @-webkit-keyframes prideShimmer {
        from {
            background-position: top left
        }

        to {
            background-position: top right
        }
    }

    @media screen and (max-width: 1023px) {
        .skeleton-select-wrapper {
            margin-bottom: 10px;
            height: 47px;
        }
    }
     @media screen and (max-width: 425px) {
        .skeleton-select-wrapper {
            height: 41px;
        }
    }
</style>

<div class="skeleton-select-wrapper" style="animation-delay: {animationDelay}s">
</div>