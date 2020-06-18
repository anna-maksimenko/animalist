<script>
    import { createEventDispatcher } from 'svelte';

    import LabelArrow from './LabelArrow.svelte'
    import SearchInput from '../shared/SearchInput.svelte'
    import TextInput from '../shared/TextInput.svelte'

    import { textState, errorMessage } from '../../../globals.js'
    import { posterTextProcessing, labelTextProcessing } from '../../../helpers.js'

    export let name
    export let icon
    export let text
    export let mode = "list"
    export let search = false
    export let announcementShow = false
    export let announcementHandler = false
    export let tabs = []
    export let selectedTab = {}

    export function closeHandler(){
        dropdownOpen = false
    }

    const dispatch = createEventDispatcher();

    let dropdownElement
    let labelElement
    let dropdownCont
    let dropdownOpen = false
    let dropdownScrollable = false
    let dropdownListContHeight
    let dropdownListHeight

    let scrollElement
    let showTopArrow
    let showBottomArrow

    let textDisplayed = $textState
    let formerText = textDisplayed
    let lettersCounter = 0
    let textOverflow = false
    let showLettersCounter = false
    let labelText

    let announcementTimeout
    let announcementFired = false

    $: {
        dropdownScrollable = (dropdownListContHeight < dropdownListHeight) ? true : false
        showTopArrow = (scrollElement) ? scrollElement.scrollTop > 19 : false
        showBottomArrow = (scrollElement && scrollElement.scrollHeight) ? (scrollElement.scrollHeight - scrollElement.offsetHeight - scrollElement.scrollTop) > 19 : false

        if(scrollElement){
            scrollElement.scrollTop = (scrollElement.querySelector('.selected')) ? scrollElement.querySelector('.selected').offsetTop - 38 : 0
        }
    }

    $: {       
        if(mode === 'text'){
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
            labelText = labelTextProcessing(textProcessed)
        }         
    }

    $: {
        if(announcementShow){
            if(dropdownOpen && !announcementFired){
                announcementTimeout = setTimeout(function(){
                    announcementHandler(true)
                    announcementFired = true
                }, 4000)
            } else if(announcementTimeout && !dropdownOpen){
                clearTimeout(announcementTimeout)
            }
        }        
    }

    // function labelClickHandle(){
        
        // if(dropdownOpen && tabs.length>0){
        // } else if(tabs.length>0){
        //     dropdownOpen = true
        // } else {
        //     dropdownOpen = !dropdownOpen
        // }
    // }

    function listScrollHandler(e){
        showTopArrow = (scrollElement) ? scrollElement.scrollTop > 19 : false
        showBottomArrow = (scrollElement && scrollElement.scrollHeight) ? (scrollElement.scrollHeight - scrollElement.offsetHeight - scrollElement.scrollTop) > 19 : false
    }

    function windowClickHandler(e){
        if (!dropdownElement) return;
        let eventTarget = event.path && (event.path.length > 0) ? event.path[0] : event.target
        let node = eventTarget
        if(dropdownOpen){
            if (dropdownElement.contains(eventTarget) && ( labelElement && !labelElement.contains(eventTarget))) return;
            while (node != null) {
                if (node == dropdownElement || node == dropdownCont) {
                    return;
                } else if(node == labelElement){
                    dropdownOpen = false
                    return
                }
                node = node.parentNode;
            }
            dropdownOpen = false
        } else {
            if (dropdownElement.contains(eventTarget)) {
                dropdownOpen = true
                return
            };
            while (node != null) {
                if (node == dropdownElement || node == dropdownCont || node == labelElement) {
                    dropdownOpen = true
                    return;
                }
                node = node.parentNode;
            }
        }
        
        // activeSelectedValue = undefined;
        // if (input) input.blur();
    }

    function tabClickHandler(tab, e) {        
        dispatch('tabClicked',tab)
    }
</script>

<style>
    .select-custom{
        position: relative;
        cursor: pointer;
    }   
    @media screen and (min-width: 1024px) {
        .select-custom:hover .select-custom--label-inner{
            transform: translateY(-2px);
        }
    }
    .select-custom.opened {
        -webkit-box-shadow: 18px 20px 19px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 18px 20px 19px rgba(0, 0, 0, 0.1);
        box-shadow: 18px 20px 19px rgba(0, 0, 0, 0.1);
    }
    @media screen and (min-width: 1024px) {
        .select-custom.opened .select-custom--label-inner{
            transform: translateY(-2px);
        }
    }
    @media screen and (max-width: 1023px) {
        .select-custom.opened {
            -webkit-box-shadow: 0 18px 21px rgba(0, 0, 0, 0.29);
            -moz-box-shadow: 0 18px 21px rgba(0, 0, 0, 0.29);
            box-shadow: 0 18px 21px rgba(0, 0, 0, 0.29);
        }
    }
    
    .select-custom ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }   

    .select-custom--label{
        width: 100%;   
        display: block;
        position: relative;
        padding-left: 8px;
        padding-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #444;
        font-family: 'AvenirNext-Medium';
        font-size: 14px;
        border: none;
        border-radius: 0;
        box-sizing: border-box;
        letter-spacing: 1.09px;
        line-height: 1em;
        text-transform: none;
        text-align: right;
        padding: 8px 40px 8px 12px;
        cursor: pointer;
        box-shadow: inset #efefef 0 -1px 0 0;
        user-select: none;
        /* pointer-events: none; */
    }
    @media screen and (max-width: 1023px) {
        .select-custom--label {
            padding: 8px 44px 8px 18px;
        }
    }
    @media screen and (max-width: 425px) {
        .select-custom--label {
            padding: 5px 34px 5px 13px; 
        }
    }
    @media screen and (max-width: 479px) {
        .select-custom--label {
            font-size: 10px;
        }
    }
    .content {
        display: flex;
        align-items: center;
        justify-items: flex-start;
        width: 100%;
        color: #414141;
        color: #000000;
        position: relative;
    }
    .content > .selection-text {
        flex-grow: 1;
        text-align: right;
        text-transform: none;
        font-size: 12px;
        font-family: Avenir Next;
        padding-left: 35px;
        min-width: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 1.4;
    }
    @media screen and (max-width: 1023px) {
        .content > .selection-text {
            font-size: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .content > .selection-name {
        font-size: 12px;
        margin-top: 0.1em;
        text-transform: uppercase;
    }
    .content .svg {
        margin-right: 10px;
        height: 31px;
    }
    @media screen and (max-width: 1023px) {
        .content .svg {
            margin-right: 18px;
        }
    }
    @media screen and (max-width: 425px) {
        .content .svg {
            margin-right: 8px;
        }
    }
    .content .svg :global(svg) {
        width: 25px;
        height: 100%;
    }

    .content .svg :global(svg > *) {
        stroke-width: 9px;
    }

    .content span {
        letter-spacing: 1.09px;
        line-height: 1;
    }

    .select-custom--dropdown{
        position: absolute;
        bottom: 1px;
        width: 100%;
        z-index: 10;
    }
    .select-custom--dropdown-inner{
        background-color: white;
        display: block;
        position: absolute;
        z-index: 1051;
        font-family: 'AvenirNext-Medium';
        font-size: 14px;
        text-transform: uppercase;
        box-sizing: border-box;
        border: none;
        border-top: 1px solid #faf9f6;
        border-radius: 0;
        box-shadow: 18px 20px 19px rgba(0, 0, 0, 0.1);

        width: 100%;
    }
    
    .select-custom--search-dropdown .select-custom--results-inner{
        max-height: 338px;
        overflow-y: auto;
    }
    @media (max-width: 1023px){
        .select-custom--search-dropdown .select-custom--results-inner{
            max-height: 341px;
        }
    }
    @media (max-width: 1023px) and (min-height: 750px){
        .select-custom--search-dropdown .select-custom--results-inner{
            max-height: 379px;
        }
    }
    @media (max-width: 374px){
        .select-custom--search-dropdown .select-custom--results-inner{
            max-height: 265px;
        }
    }
    .select-custom--search-dropdown .arrow{
        position: absolute;
        left: 0;
        border: none;
        width: calc(100% - 17px);
        height: 38px;
        z-index: 1000;
    }
    @media (max-width: 1023px){
        .select-custom--search-dropdown .arrow{
            width: 100%;
        }
    }
    .select-custom--search-dropdown .arrow:before{
        content: '';
        pointer-events: none;
        position: absolute;
        left: 0;
        bottom: 0px; 
        border: none;
        width: 100%;
        height: 57px;
        z-index: 1000;
        background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, #ffffff 64%, #ffffff 100%);
        background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,#ffffff 64%,#ffffff 100%);
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,#ffffff 64%,#ffffff 100%);
        z-index: 1000;
    }
    .select-custom--search-dropdown .arrow:after{
        content: '';
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
        z-index: 1000;
    }
    .select-custom--search-dropdown .arrow.up{
        top: 0;
    }
    .select-custom--search-dropdown .arrow.down{
        bottom: 0;
    }
    .select-custom--search-dropdown .arrow.up:before{
        background: -moz-linear-gradient(bottom, rgba(255,255,255,0) 0%, #ffffff 64%, #ffffff 100%); 
        background: -webkit-linear-gradient(bottom, rgba(255,255,255,0) 0%,#ffffff 64%,#ffffff 100%);  
        background: linear-gradient(to top, rgba(255,255,255,0) 0%,#ffffff 64%,#ffffff 100%); 
        top: 0px;
        bottom: auto;
    }
    .select-custom--search-dropdown .arrow.up:after{
        transform: rotate(-180deg);
    }
    
    .select-custom--tabbed-dropdown .select-custom--dropdown-inner{
        border-top: none;
    }

    .select-custom--tabs {
        display: flex;
        width: 100%;
        overflow: hidden;
    }
    .select-custom--tab{
        display: flex;
        flex-grow: 1;
        align-items: center;
        padding: 11px 12px;
        box-shadow: inset 0 -1px 0 0 #faf9f6;
        position: relative;
        user-select: none;
    }

    .select-custom--tab > * {
        transform: translateY(-2px);
    }

    .select-custom--tab .tab-icon{
        width: 25px;
        height: 25px;
        align-self: center;
        margin-right: 10px;
    }

    .select-custom--tab .tab-icon :global(svg>*){
        stroke: #d3d3d3
    }

    .select-custom--tab span{
        color: #d3d3d3;
        font-family: "AvenirNext-Medium";
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 1.09px;
        line-height: 1;
        text-transform: uppercase;
        margin-top: 0.1em;
    }
    
    .select-custom--tab:after{
        content: '';
        box-shadow: 0 19px 24px rgba(0, 0, 0, 0.5);
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .select-custom--tab.active{
        z-index: 1;
    }
    
    .select-custom--tab.active:after{
        opacity: 1;
    }

    .select-custom--tab.active span{
        color: #000000;
    }

    .select-custom--tab.active .tab-icon :global(svg>*){
        stroke: #000;
    }
</style>

<svelte:window on:mousedown={windowClickHandler}/>

<div class="select-custom" class:opened={dropdownOpen} bind:this={dropdownElement} >

    {#if dropdownOpen && tabs.length>0}
        <div class="select-custom--tabs">
                {#each tabs as tab,i (tab.id)}
                    <div class="select-custom--tab" class:active={tab.id === selectedTab.id} on:click={tabClickHandler.bind(this,tab)}>
                        <div class="tab-icon">
                            <svelte:component this={tab.icon} />
                        </div>
                        <span>{tab.text}</span>
                    </div>
                {/each}
        </div>
    {:else}
        <div class="select-custom--label" bind:this={labelElement}>
            <div class="select-custom--label-inner">
                <div class="content">
                    <div class="svg">
                        <svelte:component this={icon} />
                    </div>
                    <span class="selection-name">{name}</span>
                    <span class="selection-text">{text}</span>
                    <LabelArrow/>
                </div>
            </div>
        </div>
    {/if} 
    {#if dropdownOpen}
        <div class="select-custom--dropdown" class:select-custom--search-dropdown={search} class:select-custom--tabbed-dropdown={!!tabs} bind:this={dropdownCont}>
            <div class="select-custom--dropdown-inner">
                {#if mode === "list"}
                    {#if search}
                        <SearchInput/>
                    {/if}
                    <div class="select-custom--results" bind:offsetHeight={dropdownListContHeight}>
                        {#if dropdownScrollable && showTopArrow}
                            <div class="arrow up" ></div>
                        {/if}
                        <div class="select-custom--results-inner" on:scroll={listScrollHandler} bind:this={scrollElement}>
                            <ul bind:offsetHeight={dropdownListHeight}>
                                <slot></slot>
                            </ul>
                        </div>
                        {#if dropdownScrollable && showBottomArrow}
                            <div class="arrow down" ></div>
                        {/if}
                    </div>
                {:else if mode === "text"}
                    <TextInput {lettersCounter} {textOverflow} {showLettersCounter} bind:textDisplayed={textDisplayed}/>
                {/if}
            </div>
        </div>
    {/if}
</div>

