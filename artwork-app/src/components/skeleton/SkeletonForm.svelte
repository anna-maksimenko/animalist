<style>
    .skeleton-form-cont-outer {
        background-color: #faf9f6;
        z-index: 1;
        position: relative;

        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
    }

    .skeleton-form-cont {
        max-width: 640px;
        margin: 0 auto;
        height: 100%;
        z-index: 3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #faf9f6;
    }

    .skeleton-form-cont-inner{
        -webkit-transition: opacity .2s ease;
        -moz-transition: opacity .2s ease;
        -o-transition: opacity .2s ease;
        transition: opacity .2s ease;
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: auto;
    }

    .skeleton-form {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        margin-top: 20px;
        padding: 0 80px;
    }

    @media (min-width: 1024px){
        .skeleton-form-cont-outer{
            order: 1;
            background-color: #fff;
            min-height: 575px;
        }
        .skeleton-form-cont{
            background-color: #fff;
        }
    }
    @media screen and (max-width: 1023px) {
        .skeleton-form-cont-outer {
            display: none;
        }
        .skeleton-form-cont {
            display: block;
        }
        .skeleton-form {
            padding: 20px 19px 0 19px;
            margin-top: 45px;
        }
        .skeleton-form :global(.skeleton-select-wrapper:nth-last-child(2)) {
            margin-bottom: -20px;
        }
    }
</style>

<div class="skeleton-form-cont-outer">
    <div class="skeleton-form-cont">
        <div class="skeleton-form-cont-inner">
            <div class="skeleton-form">
                <slot></slot>
            </div>
        </div>
    </div>
</div>