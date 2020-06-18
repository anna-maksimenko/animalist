<script>
    import { onMount } from 'svelte'
    import { slide } from 'svelte/transition'

    import { BreedIconD, DesignIconD, ColorIconD, FlipIconD, SizeIconD, TextIconD, CatIcon, DogIcon} from '../../icons/index.js'
    import { breedList, designList, colorList, flipList, sizeList, appState, sectionSettings, searchString, appSettings, uiHeight } from '../../../globals.js'
    import { displayText, selectItem, selectBreed, selectDesign, searchLogic, addToCartHandler, viewCartHandler, priceCalculate } from '../../../helpers.js'

    import AnnouncementBar from './AnnouncementBar.svelte'
    import SelectCustom from '../custom-selects/SelectCustom.svelte'
    import SelectCustomItem from '../custom-selects/SelectCustomItem.svelte'
    import BoldCurrencyPicker from '../shared/BoldCurrencyPicker.svelte'

    let breedComponent
    let designComponent
    let colorComponent
    let flipComponent
    let sizeComponent

    let selectedBreedTab = {}
    let selectedSizeTab = {}

    $: filteredBreedList = $breedList.filter((item) => {
        if(selectedBreedTab){
            if(item.tab === selectedBreedTab.id){
                return searchLogic($searchString, item)
            }
        } else {
            return searchLogic($searchString, item)
        }
        return false
    })

    $: filteredSizeList = $sizeList.filter((item) => {
        if(selectedSizeTab){
            if(item.tab === selectedSizeTab.id){
                return true
            }
        } else {
            return true
        }
        return false
    })

    $: menuList = [
        {
            icon: BreedIconD,
            name: $appSettings.formSettings.breedText,
            list: filteredBreedList,
            searchable: true,
            tabs: [
                {
                    id: 'cats',
                    text: 'Cats',
                    icon: CatIcon
                },
                {
                    id: 'dogs',
                    text: 'Dogs',
                    icon: DogIcon
                }
            ],
        },
        {
            icon: DesignIconD,
            name: $appSettings.formSettings.designText,
            list: $designList,
        },
        {
            icon: ColorIconD,
            name: $appSettings.formSettings.colorText,
            list: $colorList
        },
        {
            icon: FlipIconD,
            name: $appSettings.formSettings.flipText,
            list: $flipList
        },
        {
            icon: SizeIconD,
            name: $appSettings.formSettings.sizeText,
            tabs: [
                {
                    id: 'us',
                    text: 'US sizes',
                    icon: SizeIconD
                },
                {
                    id: 'eu',
                    text: 'EU sizes',
                    icon: SizeIconD
                }
            ],
            list: $sizeList,
        },
        {
            icon: TextIconD,
            name: $appSettings.formSettings.textText,
            text: true
        }
    ]

    function announcementHandler(openState){
        if(openState){
            $appSettings.announcementOpen = true
        } else {
            $appSettings.announcementOpen = false
        }        
    }

    function sizeTabClickHandler(e) {
        selectedSizeTab = e.detail
    }

    function breedTabClickHandler(e) {
        selectedBreedTab = e.detail
    }

    onMount(() => {
        selectedSizeTab = menuList[4].tabs[menuList[4].tabs.findIndex(item => item.id === $appState.size.tab)]
        selectedBreedTab = menuList[0].tabs[menuList[0].tabs.findIndex(item => item.id === $appState.breed.tab)]
        if(window.theme && window.theme.customCartHandler){
            window.theme.customCartHandler.getCart().then(function(e){
                if(e.items && e.items.length > 0){
                    $appSettings.itemInCart = true
                }
            })
        }        
    })
</script>

<style>
    .form-cont-outer {
        background-color: #faf9f6;
        z-index: 1;
        position: relative;
        position: sticky;
        top: 0;
    }
    @media screen and (min-width: 1023px) {
        .form-cont-outer{
            min-height: 575px;
        }
    }
    @media screen and (min-width: 1100px) {
        .form-cont-outer{
            min-height: 610px;
        }
    }
    @media screen and (min-width: 1200px) {
        .form-cont-outer{
            min-height: 640px;
        }
    }
    @media screen and (min-width: 1300px) {
        .form-cont-outer{
            min-height: 660px;
        }
    }
    @media screen and (min-width: 1360px) {
        .form-cont-outer{
            min-height: 670px;
        }
    }
    @media screen and (min-width: 1024px) {
        .form-cont-outer {
            max-width: 50%;
            order: 1;
            background-color: #fff;
            box-shadow: inset 0 1px 0 0 #efefef, inset 0 -1px 0 0 #efefef;
        }
    }
    .form-cont {
    max-width: 640px;
    margin: 0 auto;
    height: 100%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #faf9f6;
    }
    @media screen and (min-width: 1024px) {
    .form-cont {
        background-color: #fff;
        box-shadow: inset 0 1px 0 0 #efefef, inset 0 -1px 0 0 #efefef;
    }
    }
    @media screen and (max-width: 1023px) {
    .form-cont {
        display: block;
    }
    }
    .form-cont-inner{
    -webkit-transition: opacity .2s ease;
    -moz-transition: opacity .2s ease;
    -o-transition: opacity .2s ease;
    transition: opacity .2s ease;
    /* opacity: 0; */
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    }
    form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0 80px;
    }
    @media screen and (max-width: 1200px) {
    form {
        padding: 0 40px;
    }
    }
    @media screen and (max-width: 1023px) {
    form {
        padding: 20px 19px 0 19px;
    }
    }
    form > :global(*) {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .headline-wrapper {
        padding-bottom: 27px;
        text-align: center;
        position: relative;
        margin-bottom: 15px;
    }
    @media screen and (max-width: 1023px) {
    .headline-wrapper {
        padding-bottom: 19px;
        margin-bottom: 0;
    }
    }
    .headline {
    color: #000;
    font-family: 'AvenirNext-Medium';
    font-size: 20px;
    line-height: 1.3;
    text-transform: uppercase;
    letter-spacing: 2.2px;
    }
    @media screen and (max-width: 1023px) {
    .headline {
        font-size: 18px;
    }
    }
    @media screen and (max-width: 1023px) {
    .headline {
        font-size: 14px;
        line-height: 1.867142;
    }
    }
    form :global(input[type="button"]) {
        background-color: #000;
        color: #fff;
        text-transform: uppercase!important;
    }
    .select2-container--default .select2-results__option {
    font-family: 'AvenirNext-Medium';
    color: #000;
    font-size: 12px;
    text-transform: initial;
    letter-spacing: 1.27px;
    line-height: 1.14;
    padding: 12px 17px;
    }
    .select2-container--default .select2-results__option span {
    font-family: 'AvenirNext-Medium';
    font-size: 12px;
    text-transform: initial;
    }
    
    form .button-wrapper {
        display: block;
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
        user-select: none;
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
    .post-add-to-cart-container{
        flex-direction: column;
    }
    .post-add-to-cart-container button{
        background-color: transparent;
        text-transform: uppercase!important;
        font-family: 'AvenirNext-DemiBold';
        letter-spacing: 1.69px;
        color: #000;
        display: block;
        min-width: 100%;
        padding: 18px 41px 14px 41px;
        margin-top: 17px;
        border: 2px solid #000;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
        line-height: 1.1;
        position: relative;
        font-size: 13px;
        user-select: none;
    }
    .post-add-to-cart-container button:after{
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        outline: 2px #000 solid;
        transition: outline 0.1s linear;
    }
    .post-add-to-cart-container button:hover:after{
        outline: 3px solid #000;
    }

    .post-add-to-cart-container button.create-artwork{
        background-color: #000;
        color: #fff;
        margin-top: 17px;
    }

    .notice{
        text-align: center;
        padding-top: 22px;
        text-transform: uppercase;
    }
    @media screen and (max-width: 1023px) {
        .notice{
            text-align: center;
        }
    }
    .notice p{
        color: #414141;
        font-family: "AvenirNext-Medium";
        /* font-size: 12px; */
        font-weight: 500;
        /* letter-spacing: 0.93px; */
        line-height: 2.166666;
        font-size: 11px;
        letter-spacing: 0.185em;
    }

    @media (max-width: 1023px) {
        .button-wrapper-desktop{
            display: none;
        }
    }
</style>

<div class="form-cont-outer" style={`height: ${$uiHeight}px`}>
    <AnnouncementBar bind:announcementOpen={$appSettings.announcementOpen}/>
    <div class="form-cont">
        <div class="form-cont-inner">
            <form action="" 
                on:keypress={(e) => {
                    var key = e.charCode || e.keyCode || 0;     
                    if (key == 13) {
                        e.preventDefault();
                    }
                }} 
                on:submit|preventDefault>
                <div class="headline-wrapper">
                    <h1 class="headline">{$appSettings.formSettings.formHeading}</h1>
                </div>
                <SelectCustom name={$appSettings.formSettings.breedText} text={displayText($breedList)} icon={menuList[0].icon} search={true} bind:searchString={$searchString} bind:this={breedComponent} {announcementHandler} announcementShow={true} tabs={menuList[0].tabs} selectedTab={selectedBreedTab} on:tabClicked={breedTabClickHandler}>
                    {#each filteredBreedList as { id, text, selected } ,i (id)}
                        <SelectCustomItem text={text} {selected} on:click={selectBreed.bind(this, breedList, id, breedComponent)} />
                    {:else}
                        <SelectCustomItem text={$sectionSettings['no-breed-text']}></SelectCustomItem>
                    {/each}
                </SelectCustom>
                <SelectCustom name={$appSettings.formSettings.designText} text={displayText($designList)} icon={menuList[1].icon} bind:this={designComponent}>
                    {#each $designList as { id, text, selected } ,i (id)}
                        <SelectCustomItem text={text} {selected} on:click={selectDesign.bind(this, designList, id, designComponent, colorList, $appSettings.colorChanged)}/>
                    {/each}
                </SelectCustom>
                <SelectCustom name={$appSettings.formSettings.colorText} text={displayText($colorList)} icon={menuList[2].icon} bind:this={colorComponent}>
                    {#each $colorList as item ,i (item)}
                        {#if item.supportedDesigns.some((item) => item === $appState.design.id)}
                            <SelectCustomItem text={item.text} mode={"color"} mixed={item.mixed} colorHex={item.colorHex} selected={item.selected} on:click={selectItem.bind(this, colorList, item.id, colorComponent, 'color', $appSettings.colorChanged)}/>
                        {/if}                    
                    {/each}
                </SelectCustom>
                <SelectCustom name={$appSettings.formSettings.flipText} text={displayText($flipList)} icon={menuList[3].icon} bind:this={flipComponent}>
                    {#each $flipList as { id, text, selected } ,i (id)}
                        <SelectCustomItem text={text} {selected} on:click={selectItem.bind(this, flipList, id, flipComponent, 'flip')}/>
                    {/each}
                </SelectCustom>
                <SelectCustom name={$appSettings.formSettings.sizeText} text={displayText($sizeList, 'labelText')} icon={menuList[4].icon} bind:this={sizeComponent} tabs={menuList[4].tabs} selectedTab={selectedSizeTab} on:tabClicked={sizeTabClickHandler}>
                    {#each filteredSizeList as { id, text, priceText, selected } ,i (id)}
                        <SelectCustomItem text={text} mode={"side-note"} sideNote={priceCalculate(priceText.match(/(\d+(?:\.\d{1,2})?)/g))} {selected} on:click={selectItem.bind(this, sizeList, id, sizeComponent, 'size')}/>
                    {/each}
                </SelectCustom>
                <SelectCustom name={$appSettings.formSettings.textText} text={$appState.text || 'Optional'} icon={menuList[5].icon} mode={"text"}/>
                
                <div class="button-wrapper-desktop button-wrapper">
                    <button type="submit" id="add-to-cart" class="add-to-cart" class:text-hidden={!($appSettings.variantPrice !== 0) || !($appSettings.priceToDisplay !== 0)} on:click|preventDefault={addToCartHandler}>Add to cart <div class="price-cont">  /  <div class="">{@html $appSettings.priceToDisplay}</div></div></button>
                    {#if $appSettings.addedToCart || $appSettings.itemInCart }
                        <div class="post-add-to-cart-container" in:slide>
                            <button type="button" class="view-cart" on:click|preventDefault={viewCartHandler}>View cart</button>
                        </div>
                    {/if}
                    

                    <div class="submit-cont">
                    </div>
                    <div class="notice"><p>{$sectionSettings['shipping-copy']}</p></div>
                </div>
            </form>
        </div>
    </div>
    <div class="poster-bold-cont">
        <div class="poster-bold-cont-inner">
            <div class="poster-bold-cont-wrapper">
                <BoldCurrencyPicker/>
            </div>
        </div>
    </div>
</div>