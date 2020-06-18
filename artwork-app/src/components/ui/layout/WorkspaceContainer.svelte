<script>
  import {onMount} from 'svelte'

  import innerHeight from 'ios-inner-height'

  import Preview from '../../preview/Preview.svelte'
  import Form from '../layout/Form.svelte'
  import MobileDock from '../mobile-dock/MobileDock.svelte'
  import BoldCurrencyPicker from '../shared/BoldCurrencyPicker.svelte'

  import {breedList, designList, colorList, sizeList, flipList, textState, mobileView, searchString, appSettings, appState, sectionSettings, uiHeight, dockHeight} from '../../../globals.js'
  import {posterTextProcessing, fetchBreed, viewCartHandler, priceCalculate} from '../../../helpers.js'

  export let initSettings

  let viewportHeigth = 0
  let screenHeight = 0
  let trueViewportheight = 0
  let height
  let expectedDockHeight = 133
  let recalculateHook = false
  let scrollPos

  let posterCont  

  let scrollPreviewHandler

  let firstLoaded = false

  let pageLoaded = false
  let componentLoaded = false

  //Sticky
  let dockContainer

  //Reselect defaults based on settings
  function reselectDefaults() {
    if (initSettings) {
      function reMapDefaults(arr, defaultValue) {
        let arrToReMap = arr.map(function (item) {
          let modifiedItem = item;
          if (modifiedItem.selected) {
            delete modifiedItem.selected;
          }
          if (modifiedItem.id === defaultValue) {
            modifiedItem.selected = true
          }
          return modifiedItem
        });
        return arrToReMap;
      }
      function reMapDefaultsBreed(arr, defaultValue) {
        let arrToReMap = arr.map(function (item) {
          let modifiedItem = item;
          if (modifiedItem.selected) {
            delete modifiedItem.selected;
          }
          if (modifiedItem.skuCode === defaultValue) {
            modifiedItem.selected = true
          }
          return modifiedItem
        });
        return arrToReMap;
      }
      (initSettings.cartopen) ? viewCartHandler(): null;
      if(initSettings.setup) {
        const setupArr = initSettings.setup.split('-')
        const breedSetup = 'PR2-'+setupArr[1]
        const designSetup = (setupArr[2] === 'LIN') ? 'line' : 'form'
        const flipSetup = (setupArr[5] === 'L') ? 'left' : 'right'
        let sizeSetup
        let colorSetup
        switch (setupArr[6]) {
          case '50x70': 
            sizeSetup = '50x70cm';
            break;
          case '70x100': 
            sizeSetup = '70x100cm';
            break;
          case '30x40': 
            sizeSetup = '30x40cm';
            break;
          case '18x24': 
            sizeSetup = '18x24inch';
            break;
          case '11x17': 
            sizeSetup = '11x17inch';
            break;
          case '24x36': 
            sizeSetup = '24x36inch';
            break;  
          default: 
            sizeSetup = '30x40cm';
        }
        switch (setupArr[3]) {
          case 'CHO': 
            colorSetup = 'chocolate';
            break;
          case 'BLA': 
            colorSetup = 'black';
            break;
          case 'CRE': 
            colorSetup = 'cream';
            break;
          case 'FLO': 
            colorSetup = 'flora';
            break;
          case 'FOR': 
            colorSetup = 'forest';
            break;
          case 'MOO': 
            colorSetup = 'moon';
            break;  
          default: 
            colorSetup = 'moon';
            break; 
        }
        $breedList = reMapDefaultsBreed($breedList, breedSetup)
        $designList = reMapDefaults($designList, designSetup)
        $colorList = reMapDefaults($colorList, colorSetup)
        $sizeList = reMapDefaults($sizeList, sizeSetup)
        $flipList = reMapDefaults($flipList, flipSetup)        
      }
      if (initSettings.text) {
        let defaultText = initSettings.text
        let processedDefaultText = posterTextProcessing(defaultText)
        $textState = processedDefaultText
      }
    }
  }

  //Handlers for different scroll positioning
  function textFocusHandler(e) {
    scrollPreviewHandler()
  }

  function textBlurHandler(e) {
    // window.scrollTo({top: e.detail, behavior: 'smooth'})
    document.body.style.top = -e.detail+'px'
  }

  function previewLoadHandler(){
    if(/*pageLoaded &&*/ componentLoaded && !firstLoaded){
      let posterCheck
      function scrollToPreview(){
        let announcementBarSize = document.querySelector('.announcement-bar') && document.querySelector('.announcement-bar').offsetHeight
        // let topPosition = ($mobileView) ? scrollPos + posterCont.getBoundingClientRect().top + ((viewportHeigth + 10 < innerHeight()) ? expectedDockHeight/2 : 0) + ((announcementBarSize) ? announcementBarSize/2 : 0) : scrollPos + posterCont.getBoundingClientRect().top
        let topPosition = ($mobileView) ? 0 : scrollPos + posterCont.getBoundingClientRect().top
        window.scrollTo({top: topPosition, behavior: 'smooth'})
        firstLoaded = true
      }
      if(posterCont){
        scrollToPreview()
      } else {
        posterCheck = setInterval(() => {
          if(posterCont){
            scrollToPreview()
            clearInterval(posterCheck)
          }
        }, 200)
      }
    }
  }

  function componentLoaderHandler(){
    componentLoaded = true
    previewLoadHandler()
  }

  //Settings init
  $appSettings.formSettings = {
    formHeading: ($sectionSettings && $sectionSettings['poster-heading']) ? $sectionSettings['poster-heading'] : 'Create artwork',
    breedText: ($sectionSettings && $sectionSettings['dog-select']) ? $sectionSettings['dog-select'] : 'Dog breeed',
    designText: ($sectionSettings && $sectionSettings['style-select']) ? $sectionSettings['style-select'] : 'Design',
    colorText: ($sectionSettings && $sectionSettings['color-select']) ? $sectionSettings['color-select'] : 'Color',
    sizeText: ($sectionSettings && $sectionSettings['size-select']) ? $sectionSettings['size-select'] : 'Size',
    flipText: ($sectionSettings && $sectionSettings['direction-select']) ? $sectionSettings['direction-select'] : 'Flip',
    textText: ($sectionSettings && $sectionSettings['text-select']) ? $sectionSettings['text-select'] : 'Text'
  }

  // Price currency re-calculation
  $: {
    $appSettings.variantPrice = ($appState.variantSelected && $appState.variantSelected.price) ? parseInt($appState.variantSelected.price).toFixed(0) : 0
    let calculatedPrice = priceCalculate($appSettings.variantPrice)
    $appSettings.priceToDisplay = calculatedPrice
  }

  //Preview height adjustment
  $: {
    $uiHeight = ($mobileView) ? innerHeight() - expectedDockHeight : viewportHeigth
  }

  //Trigger re-select
  reselectDefaults()

  onMount(() => {
    $breedList.map((item, index) => {
      if(item.selected && !item.products){
        fetchBreed(breedList, item.id, index)
      }
    })
  })
</script>

<style>
  .poster-cont-inner {
    display: flex;
    min-height: 600px;
  }
  @media screen and (max-width: 1023px) {
    .poster-cont-inner {
      display: block;
    }
  }
  @media screen and (min-width: 1023px) {
    .poster-cont-inner{
    min-height: 575px;
    }
  }
  @media screen and (min-width: 1100px) {
    .poster-cont-inner{
    min-height: 610px;
    }
  }
  @media screen and (min-width: 1200px) {
    .poster-cont-inner{
    min-height: 640px;
    }
  }
  @media screen and (min-width: 1300px) {
    .poster-cont-inner{
      min-height: 660px;
    }
  }
  @media screen and (min-width: 1360px) {
    .poster-cont-inner{
      min-height: 670px;
    }
  }
  .poster-cont-inner > :global(*) {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 50%;
  }
</style>

<svelte:window bind:innerHeight={viewportHeigth} bind:outerHeight={screenHeight} bind:scrollY={scrollPos}/>

<div class="poster-cont" bind:this={posterCont}>
  <div class="poster-cont-inner" bind:offsetHeight={height} bind:this={dockContainer}>
    {#if !$mobileView}
      <Form bind:height={height}/>
    {/if}
    <Preview bind:height={height} bind:scrollPreviewHandler={scrollPreviewHandler} {scrollPos} on:load={componentLoaderHandler}/>
    {#if $mobileView}
      <MobileDock on:textFocused={textFocusHandler} on:textBlured={textBlurHandler} stickyContainer={dockContainer}/>
    {/if}
  </div>
  <BoldCurrencyPicker hidden=true/>
</div>