<script>
    import SkeletonForm from "./SkeletonForm.svelte";
    import SkeletonPreview from "./SkeletonPreview.svelte";

    import SkeletonSelect from "./SkeletonSelect.svelte";
    import SkeletonButton from "./SkeletonButton.svelte";
    import SkeletonMobileButtonWrapper from "./SkeletonMobileButtonWrapper.svelte";
</script>

<style>
    .skeleton-cont{
        position: absolute;
        z-index: 100;
        width: 100%;
        background-color: #faf9f6;
    }
    .skeleton-cont-inner{
        min-height: 100vh;
        height: 100vh;
        display: flex;
    }

    .skeleton-cont-inner > :global(div){
        flex-grow: 0;
        flex-shrink: 0;
        width: 50%;
        flex-basis: 50%;
    }

    @media screen and (max-width: 1023px) {
        .skeleton-cont-inner {
            flex-direction: column;
            height: auto !important;
            min-height: 575px;
        }
        .skeleton-cont-inner > :global(div){
            width: 100%;
        }
    }
</style>

<div class="skeleton-cont">
	<div class="skeleton-cont-inner">
        <SkeletonForm>
            {#each new Array(6) as item,i (i)}
                <SkeletonSelect animationDelay={i*0.05}/>
            {/each}
            <SkeletonButton/>
        </SkeletonForm>
        <SkeletonPreview/>
        <SkeletonMobileButtonWrapper/>
  	</div>
</div>