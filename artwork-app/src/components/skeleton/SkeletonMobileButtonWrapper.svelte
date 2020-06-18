<style>
    .skeleton-button-wrapper-mobile{
        padding: 23px 19px 46px;
        max-width: 640px;
        margin: 0 auto;
        width: 100%;
    }

    @media (min-width: 1024px) {
        .skeleton-button-wrapper-mobile{
            display: none;
        }
    }
    @media (max-width: 1023px) {
        .skeleton-button-wrapper-mobile{
            z-index: 1;
            position: relative;
            margin-top: -49px;
            padding: 23px 19px 67px;
        }
        .skeleton-button{
            height: 51px;
            background-color: #000;
        }
    }
</style>

<div class="skeleton-button-wrapper-mobile skeleton-button-wrapper">
    <div class="skeleton-button"></div>
</div>