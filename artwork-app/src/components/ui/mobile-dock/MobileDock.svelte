<script>
    import {createEventDispatcher, onMount} from 'svelte';
    // import bodyScrollLock from 'body-scroll-lock';
    import { StickyObserver } from '@welt/sticky-observer';

    import MobileDockMenu from './MobileDockMenu.svelte'
    import MobileDockMenuItem from './MobileDockMenuItem.svelte'
    import MobileDockTabsCont from './MobileDockTabsCont.svelte'
    import MobileDockTab from './MobileDockTab.svelte'
    import MobileDockTitle from './MobileDockTitle.svelte'
    import SearchInput from '../shared/SearchInput.svelte'
    import TextInput from '../shared/TextInput.svelte'
    import SelectCustomItem from '../custom-selects/SelectCustomItem.svelte'
    import ButtonWrapperMobile from '../shared/ButtonWrapperMobile.svelte'


    import { BreedIcon, DesignIcon, ColorIcon, FlipIcon, SizeIcon, TextIcon, CloseIcon, DogIcon, CatIcon} from '../../icons/index.js'
    import { breedList, designList, colorList, sizeList, flipList, textState, searchString, sectionSettings, appSettings, appState, errorMessage, dockHeight, uiHeight, mobileView} from '../../../globals.js'
    import { searchLogic, selectBreed, selectDesign, selectItem, posterTextProcessing, priceCalculate} from '../../../helpers.js'

    export let stickyContainer

    let settingsOpen = false
    let selectedMenu
    let selectedTab
    let selectedList

    let dropdownScrollable
    let dropdownListContHeight
    let dropdownListHeight

    let scrollElement
    let showTopArrow = false
    let showBottomArrow = false

    let compWrapper = {
        closeHandler
    }

    let textDisplayed = $textState
    let showLettersCounter = false
    let lettersCounter = 0
    let textOverflow = false
    let formerText

    //Re-scroll functions
    let lastScroll
    const dispatch = createEventDispatcher();

    //Flip rotation
    let flipRotate

    //Scroll blocking
    let dropUp
    let scrollLocked

    //Sticky elements
    let stickyElement
    let stickyPlaceholderFlag = true
    let stickyPlaceholder
    let windowScrollPos

    $: {
        dropdownScrollable = (dropdownListContHeight < dropdownListHeight) ? true : false
        showTopArrow = (scrollElement) ? scrollElement.scrollTop > 19 : false
        showBottomArrow = (scrollElement && scrollElement.scrollHeight) ? (scrollElement.scrollHeight - scrollElement.offsetHeight - scrollElement.scrollTop) > 19 : false


        if(scrollElement){
            scrollElement.scrollTop = (scrollElement.querySelector('.selected')) ? scrollElement.querySelector('.selected').offsetTop - 38 : 0
        }
    }

    $: filteredBreedList = $breedList.filter((item) => {
        return searchLogic($searchString, item)
    })

    $: menuList = [
        {
            icon: BreedIcon,
            name: "Breed",
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
            icon: DesignIcon,
            name: $appSettings.formSettings.designText,
            list: $designList,
        },
        {
            icon: ColorIcon,
            name: $appSettings.formSettings.colorText,
            list: $colorList
        },
        {
            icon: FlipIcon,
            name: $appSettings.formSettings.flipText,
            list: $flipList
        },
        {
            icon: SizeIcon,
            name: $appSettings.formSettings.sizeText,
            tabs: [
                {
                    id: 'us',
                    text: 'US sizes',
                    icon: SizeIcon
                },
                {
                    id: 'eu',
                    text: 'EU sizes',
                    icon: SizeIcon
                }
            ],
            list: $sizeList,
        },
        {
            icon: TextIcon,
            name: $appSettings.formSettings.textText,
            text: true
        }
    ]
    
    $: { 
        if(selectedMenu){
            if(selectedMenu.tabs){
                selectedList = (selectedMenu.name === 'Breed') ? filteredBreedList.filter((item) => item.tab === selectedTab.id) : selectedMenu.list.filter((item) => item.tab === selectedTab.id) 
            } else {
                selectedList = selectedMenu.list
            }
        }
    }

    $: {dropdownScrollable = (selectedMenu && selectedMenu.name === "Breed") ? true : false}

    $: {       
        if(selectedMenu && selectedMenu.name === "Text"){
            let textProcessed = posterTextProcessing(textDisplayed)
            lettersCounter = (textProcessed) ? textProcessed.length : 0
            textDisplayed = textProcessed
            formerText = textProcessed
            $textState = textProcessed
            if(lettersCounter > 0){
                showLettersCounter = true
                if(lettersCounter == 40){
                    textOverflow = true
                } else {
                    textOverflow = false
                }
            } else {
                showLettersCounter = false
            }
        }         
    }

    $: {
        if(stickyPlaceholder){
            if((windowScrollPos > stickyPlaceholder.offsetTop - $uiHeight + $dockHeight - 60) && stickyPlaceholderFlag){
                stickyPlaceholderFlag = false
            } else if((windowScrollPos < stickyPlaceholder.offsetTop - $uiHeight + $dockHeight - 60) && !stickyPlaceholderFlag) {
                stickyPlaceholderFlag = true
            }
        }
    }

    function closeHandler(){
        // if(selectedMenu.text){
        //     textBlurHandler(lastScroll)
        // }
        settingsOpen = false
        selectedMenu = {}
        lastScroll = -(parseFloat(document.body.style.top.substr(0, document.body.style.top.length-2)))
        document.querySelector('body').style.top = null
        scrollLocked = false
        // setTimeout(()=> window.scrollTo({top: lastScroll, behavior: 'auto'}), 5)
        window.scrollTo({top: lastScroll, behavior: 'auto'})
    }

    function menuItemClickHandler(item, e){
        if (selectedMenu && item.name === selectedMenu.name) {
            // if(selectedMenu.text){
            //     textBlurHandler(lastScroll)
            // }
            settingsOpen = false
            selectedMenu = {}
            lastScroll = -(parseFloat(document.body.style.top.substr(0, document.body.style.top.length-2)))
            doc.querySelector('body').style.top = null
            scrollLocked = false
            // setTimeout(()=> window.scrollTo({top: lastScroll, behavior: 'auto'}), 5)
            window.scrollTo({top: lastScroll, behavior: 'auto'})            
        } else {
            const doc = document.documentElement
            let dockPosition = stickyElement.getBoundingClientRect()
            lastScroll = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
            settingsOpen = true
            selectedMenu = item
            if(item.tabs){
                item.list.map((sizeItem) => {
                    if(sizeItem.selected){
                        selectedTab = item.tabs.reduce((acc, tabItem) => {
                            return tabItem.id === sizeItem.tab ? tabItem : acc
                        }, {})
                    }
                })
            }
            let preCalcPos = (-lastScroll+ ((dockPosition.top - ($uiHeight-6) < 0) ? -(dockPosition.top - ($uiHeight-6)) : 0))
            doc.querySelector('body').style.top = (preCalcPos > 0) ? 0 : preCalcPos+'px'
            scrollLocked = true
        }        
    }

    function menuItemFlipHandler(item, e){
        flipRotate = !flipRotate
        let oppositeId = $flipList.reduce((acc, item) => {
            return (!item.selected) ? item.id : acc
        }, undefined)
        selectItem(flipList, oppositeId, false, 'flip')
    }

    function tabClickHandler(tab, e) {
        if(!(selectedTab.id === tab.id)){
            selectedTab = tab
        }        
    }
    
    function listScrollHandler(e){
        showTopArrow = (scrollElement) ? scrollElement.scrollTop > 19 : false
        showBottomArrow = (scrollElement && scrollElement.scrollHeight) ? (scrollElement.scrollHeight - scrollElement.offsetHeight - scrollElement.scrollTop) > 19 : false
    }

    function textFocusHandler() {
        dispatch('textFocused')
    }

    function textBlurHandler(pos) {
        dispatch('textBlured', pos)
    }
</script>

<svelte:window bind:scrollY={windowScrollPos}/>

<style>
    .setting-container{
        box-sizing: content-box;
        bottom: 0;
        left: 0;
        width: 100%;
        bottom: 0;
        position: absolute;
    }
    .setting-container.sticky-mode{
        position: fixed
    }
    .setting-container:before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 10px;
        box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
        pointer-events: none;
    }
    .settings-inner{
        background-color: #fff;
        position: relative;
    }

    .setting-container .setting-tabs-outer{
        overflow: hidden;
    }

    .overlay{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #000000;
        opacity: 0.6
    }

    .panel{
        position: relative;
        background-color: #fff;
        z-index: 1;
    }

    .setting-tabs-close{
        position: absolute;
        top: -43px;
        right: 20px;
    }

    .setting-tabs-close .close-btn{
        /* padding: 5px; */
        width: 22px;
        height: 22px;
        display: inline-block;
        cursor: pointer;
    }

    .setting-tabs-close .close-btn :global(svg){
        width: 100%;
        height: 100%;
    }

    .select-custom--results .select-custom--results-inner{
        max-height: 338px;
        overflow-y: auto;
    }
    @media (max-width: 1023px){
        .select-custom--results .select-custom--results-inner{
            /* max-height: 341px; */
            max-height: 50vh
        }
    }
    @media (max-width: 1023px) and (min-height: 750px){
        .select-custom--results .select-custom--results-inner{
            /* max-height: 379px; */
        }
    }
    @media (max-width: 374px){
        .select-custom--results .select-custom--results-inner{
            /* max-height: 265px; */
        }
    }
    @media (max-width: 1023px){
        .select-custom--search-dropdown .select-custom--results-inner{
            height: 341px;
        }
    }
    @media (max-width: 1023px) and (min-height: 750px){
        .select-custom--search-dropdown .select-custom--results-inner{
            height: 379px;
        }
    }
    @media (max-width: 374px){
        .select-custom--search-dropdown .select-custom--results-inner{
            height: 265px;
        }
    }
    .select-custom--results ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .select-custom--results .arrow{
        position: absolute;
        left: 0;
        border: none;
        width: calc(100% - 17px);
        height: 38px;
        z-index: 1000;
    }
    @media (max-width: 1023px){
        .select-custom--results .arrow{
            width: 100%;
        }
    }
    .select-custom--results .arrow:before{
        content: '';
        pointer-events: none;
        position: absolute;
        left: 0;
        bottom: 0px; 
        border: none;
        width: 100%;
        height: 57px;
        z-index: 1000;
        /* background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, #ffffff 64%, #ffffff 100%);
        background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,#ffffff 64%,#ffffff 100%);
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,#ffffff 64%,#ffffff 100%); */
        background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, #ffffff 76%, #ffffff 100%);
        background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,#ffffff 76%,#ffffff 100%);
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,#ffffff 76%,#ffffff 100%);
        z-index: 1000;
    }
    .select-custom--results .arrow:after{
        /* content: '';
        position: absolute;
        left: 50%;
        top: 19px;
        border-style: solid;
        height: 0;
        margin-left: -4px;
        margin-top: -2px;
        width: 0;
        border-color: #000000 transparent transparent;
        border-width: 4px 3px 0px;
        z-index: 1000; */
    }
    .select-custom--results .arrow.up{
        top: 0;
    }
    .select-custom--results .arrow.down{
        bottom: 0;
    }
    .select-custom--results .arrow.up:before{
        /* background: -moz-linear-gradient(bottom, rgba(255,255,255,0) 0%, #ffffff 64%, #ffffff 100%); 
        background: -webkit-linear-gradient(bottom, rgba(255,255,255,0) 0%,#ffffff 64%,#ffffff 100%);  
        background: linear-gradient(to top, rgba(255,255,255,0) 0%,#ffffff 64%,#ffffff 100%);  */
        background: -moz-linear-gradient(bottom, rgba(255,255,255,0) 0%, #ffffff 76%, #ffffff 100%); 
        background: -webkit-linear-gradient(bottom, rgba(255,255,255,0) 0%,#ffffff 76%,#ffffff 100%);  
        background: linear-gradient(to top, rgba(255,255,255,0) 0%,#ffffff 76%,#ffffff 100%); 
        top: 0px;
        bottom: auto;
    }
    .select-custom--results .arrow.up:after{
        transform: rotate(-180deg);
    }

    .sticky-placeholder{
        visibility: hidden;
        pointer-events: none;
    }
</style>

<svelte:head>
    {#if scrollLocked}
        <style>
            html, body{
                height: auto !important;
                min-height: 100vh;
                overflow: hidden;
                position: fixed;
                width: 100vw;
            }

            .main-content{
                position: relative;
                z-index: 200;
            }
        </style>
    {/if}
</svelte:head>

<div class="setting-container" bind:offsetHeight={$dockHeight} bind:this={stickyElement} class:sticky-mode={stickyPlaceholderFlag}>
    {#if settingsOpen}
        <div class="overlay" on:click|preventDefault={closeHandler}></div>
    {/if}
    <div class="settings-inner">
        {#if settingsOpen && selectedMenu}
            <div class="setting-tabs-outer" bind:this={dropUp}>
                <div class="setting-tabs-close" >
                    <a class="close-btn" href on:click|preventDefault={closeHandler}>
                        <CloseIcon/>
                    </a>
                </div>
                {#if selectedMenu.tabs}
                    <MobileDockTabsCont>
                        {#each selectedMenu.tabs as tab,i (tab.id)}
                            <MobileDockTab text={tab.text} icon={tab.icon} active={(tab.id === selectedTab.id)} on:click={tabClickHandler.bind(this, tab)}/>
                        {/each}
                    </MobileDockTabsCont>
                {:else}
                    <MobileDockTitle text={selectedMenu.name} icon={selectedMenu.icon}/>
                {/if}
                
                <div class="panel">
                    {#if selectedMenu.name !== 'Text'}
                        {#if selectedMenu.searchable}
                            <SearchInput/>
                        {/if}
                        <div class="select-custom--results" bind:offsetHeight={dropdownListContHeight} class:select-custom--search-dropdown={selectedMenu.searchable}>
                            {#if dropdownScrollable && showTopArrow}
                                <div class="arrow up" ></div>
                            {/if}
                            <div class="select-custom--results-inner" on:scroll={listScrollHandler} bind:this={scrollElement}>
                                <ul bind:offsetHeight={dropdownListHeight}>
                                    {#if selectedMenu.name === 'Breed'}
                                        {#each selectedList as { id, text, selected } ,i (id)}
                                            <SelectCustomItem text={text} {selected} on:click={selectBreed.bind(this, breedList, id, compWrapper)} />
                                        {:else}
                                            <SelectCustomItem text={$sectionSettings['no-breed-text']}></SelectCustomItem>
                                        {/each}
                                    {:else}
                                        {#each selectedList as item ,i (item.id)}
                                            {#if selectedMenu.name === $appSettings.formSettings.designText}
                                                <SelectCustomItem text={item.text} selected={item.selected} on:click={selectDesign.bind(this, designList, item.id, compWrapper, colorList, $appSettings.colorChanged)}/>
                                            {:else if selectedMenu.name === $appSettings.formSettings.colorText}
                                                {#if item.supportedDesigns.some((item) => item === $appState.design.id)}
                                                    <SelectCustomItem text={item.text} mode={"color"} mixed={item.mixed} colorHex={item.colorHex} selected={item.selected} on:click={selectItem.bind(this, colorList, item.id, compWrapper, 'color', $appSettings.colorChanged)}/>
                                                {/if}  
                                            <!-- {:else if selectedMenu.name === $appSettings.formSettings.flipText}
                                                <SelectCustomItem text={item.text} selected={item.selected} on:click={selectItem.bind(this, flipList, item.id, compWrapper, 'flip')}/> -->
                                            {:else if selectedMenu.name === $appSettings.formSettings.sizeText}
                                                <SelectCustomItem text={item.text} mode={"side-note"} sideNote={priceCalculate(item.priceText .match(/(\d+(?:\.\d{1,2})?)/g))} selected={item.selected} on:click={selectItem.bind(this, sizeList, item.id, compWrapper, 'size')}/>
                                            {/if}                                        
                                        {/each}
                                    {/if}
                                </ul>
                            </div>
                            {#if dropdownScrollable && showBottomArrow}
                                <div class="arrow down" ></div>
                            {/if}
                        </div>
                    {:else}
                        <TextInput {lettersCounter} {textOverflow} {showLettersCounter} bind:textDisplayed={textDisplayed} mobile={true} on:focus={textFocusHandler} on:blur={textBlurHandler}/>
                    {/if}
                </div>
            </div>
        {/if}
            
        {#if !settingsOpen}
            <MobileDockMenu>
                {#each menuList as item,i (item.name)}
                    {#if item.name === $appSettings.formSettings.flipText}
                        <MobileDockMenuItem {...item} on:click={menuItemFlipHandler.bind(this, item)} bind:flipRotate={flipRotate}/>
                    {:else}
                        <MobileDockMenuItem {...item} on:click={menuItemClickHandler.bind(this, item)}/>
                    {/if}
                {/each}
            </MobileDockMenu>
        {/if}
        
    </div>
       
    
    {#if !settingsOpen}
        <ButtonWrapperMobile/>
    {/if}
</div>
<div class="sticky-placeholder" style={`height: ${$dockHeight}px`} class:sticky-ph={stickyPlaceholderFlag} bind:this={stickyPlaceholder}></div>
