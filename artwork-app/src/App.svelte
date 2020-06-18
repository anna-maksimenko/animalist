<script>
	import { onMount } from "svelte";
	import WatchJS from 'melanke-watchjs';

	import axios from 'axios'

	import { breedList, sizeList, mobileView, appSettings } from "./globals.js"
	import { APIEndpoint } from './constants.js'
	import { getJsonFromUrl } from './helpers.js'

	import SkeletonWorkspace from "./components/skeleton/SkeletonWorkspace.svelte";
	import WorkspaceContainer from "./components/ui/layout/WorkspaceContainer.svelte";

	let data = getBreeds()
	let initSettings = getJsonFromUrl()

	let viewportWidth
	// let boldInitiated = false

	let watch = WatchJS.watch;
	let unwatch = WatchJS.unwatch;
	let callWatchers = WatchJS.callWatchers; 

	$appSettings.boldInitiated = false

	$: $mobileView = viewportWidth < 1024

	//External data call
	async function getBreeds() {
		const response = await axios.get(APIEndpoint+'c-pr2')
		const data = response.data
		
		if (response.status === 200) {
			$breedList = data.breedData.map((item, index) => {
				let modItem = item
				modItem.tab = (item.type === "Print-Dog") ? 'dogs' : 'cats'
				return modItem
			})
			$sizeList = $sizeList.map((item)=>{
				let modItem = item
				modItem.priceText = data.sizeRefObj[item.id].priceText
				return modItem
			})
			var boldCheck = setInterval(function(){
				if(BOLDCURRENCY && !$appSettings.boldInitiated){
					if(!BOLDCURRENCY.currentCurrency){
						BOLDCURRENCY.currentCurrency = 'EUR'
					}
					boldRemap();
					$appSettings.boldInitiated = true;
					clearInterval(boldCheck);
				}
			}, 500)
			return data;
		} else {
			throw new Error(response);
		}
	}

	//Remap bold currency settings upon load + current currency change watcher
	function currentCurrencyWatchHandler(){
	let price = $appSettings.variantPrice
		let rules = BOLDCURRENCY.rateInfo[BOLDCURRENCY.currentCurrency].rules
		let rate = parseFloat(BOLDCURRENCY.rateInfo[BOLDCURRENCY.currentCurrency].rate)
		let rawPrice = price*rate
		
		let adjustedPrice = Object.values(rules).reduce((acc, item) => {
			if(item.low<rawPrice && item.high>rawPrice){
				return item.value
			}
			return acc
		}, rawPrice)
		$appSettings.priceToDisplay = BOLDCURRENCY.moneyFormats[BOLDCURRENCY.currentCurrency].money_format.replace('{{amount_no_decimals}}', adjustedPrice)
	}

	function boldRemap(){
		Object.keys(BOLDCURRENCY.moneyFormats).map(function(key, index) {
			switch(key){
			case 'CHF': 
				BOLDCURRENCY.moneyFormats[key].money_format = BOLDCURRENCY.moneyFormats[key].money_format.replace('{amount}','{amount_no_decimals}').replace('{amount_with_comma_separator}','{amount_no_decimals}');
				BOLDCURRENCY.moneyFormats[key].money_with_currency_format = BOLDCURRENCY.moneyFormats[key].money_format;
				break;
			case 'DKK':
				BOLDCURRENCY.moneyFormats[key].money_format = BOLDCURRENCY.moneyFormats[key].money_format.replace('{amount}','{amount_no_decimals}').replace('{amount_with_comma_separator}','{amount_no_decimals}')+' '+BOLDCURRENCY.moneyFormats[key].currency_symbol;
				BOLDCURRENCY.moneyFormats[key].money_with_currency_format = BOLDCURRENCY.moneyFormats[key].money_format;
				break;
			case 'NOK':
				BOLDCURRENCY.moneyFormats[key].money_format = "{"+"{amount_no_decimals}"+"} " +BOLDCURRENCY.moneyFormats[key].currency_symbol;
				BOLDCURRENCY.moneyFormats[key].money_with_currency_format = BOLDCURRENCY.moneyFormats[key].money_format;
				break;
			default:
				BOLDCURRENCY.moneyFormats[key].money_format = BOLDCURRENCY.moneyFormats[key].money_format.replace('{amount}','{amount_no_decimals}').replace('{amount_with_comma_separator}','{amount_no_decimals}');
				BOLDCURRENCY.moneyFormats[key].money_with_currency_format = BOLDCURRENCY.moneyFormats[key].money_format;
				break;
			}
		});
		BOLDCURRENCY.converter.filterMoneyValues().map(function(item){
			item.removeAttribute('data-'+BOLDCURRENCY.currentCurrency.toLowerCase())
		});
		BOLDCURRENCY.converter.convertAll(BOLDCURRENCY.rateInfo, BOLDCURRENCY.converter.filterMoneyValues(), BOLDCURRENCY.currentCurrency, BOLDCURRENCY.currentCurrency);
		watch(BOLDCURRENCY, 'currentCurrency', currentCurrencyWatchHandler)
	}
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Didact+Gothic&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext');
  
	@font-face {
		font-family: 'AvenirNext-DemiBold';
		src: url(//cdn.shopify.com/s/files/1/0096/7193/4009/t/14/assets/AvenirNext-DemiBold.eot?v=15478981080526998668);
		src: url(//cdn.shopify.com/s/files/1/0096/7193/4009/t/14/assets/AvenirNext-DemiBold.eot?v=15478981080526998668?#iefix) format('embedded-opentype'), url(//cdn.shopify.com/s/files/1/0096/7193/4009/t/14/assets/AvenirNext-DemiBold.woff?v=2637557234256477982) format('woff'), url(//cdn.shopify.com/s/files/1/0096/7193/4009/t/14/assets/AvenirNext-DemiBold.ttf?v=838025361719763881) format('truetype'), url(//cdn.shopify.com/s/files/1/0096/7193/4009/t/14/assets/AvenirNext-DemiBold.svg?v=6213329506843995457#AvenirNext-DemiBold) format('svg');
		font-style: normal;
		font-weight: 600;
	}
	@font-face {
		font-family: 'AvenirNext-Medium';
		src: url(//cdn.shopify.com/s/files/1/0096/7193/4009/t/14/assets/AvenirNext-Medium.eot?v=8623515822580262153);
		src: url(//cdn.shopify.com/s/files/1/0096/7193/4009/t/14/assets/AvenirNext-Medium.eot?v=8623515822580262153?#iefix) format('embedded-opentype'), url(//cdn.shopify.com/s/files/1/0096/7193/4009/t/14/assets/AvenirNext-Medium.woff?v=15396029183678743222) format('woff'), url(//cdn.shopify.com/s/files/1/0096/7193/4009/t/14/assets/AvenirNext-Medium.ttf?v=10519686469466305881) format('truetype'), url(//cdn.shopify.com/s/files/1/0096/7193/4009/t/14/assets/AvenirNext-Medium.svg?v=16960831608624898852#AvenirNext-Medium) format('svg');
		font-style: normal;
		font-weight: 500;
	}
	@font-face {
		font-family: "Avenir Next";
		font-weight: 500;
		font-style: normal;
		src: url("https://fonts.shopifycdn.com/avenir_next/avenirnext_n5.972a96b7a049f12c89d6d1cd0e1b6c9211f7ba14.woff2?h1=ZG9nbWFkZS5jb20&hmac=552b75b5c87622935645f294901061e252525a978bb75c038fb9f9f1a424e9dc") format("woff2"),
			url("https://fonts.shopifycdn.com/avenir_next/avenirnext_n5.9e88d20fa9eb66ba268ac60ab013006ef69a310a.woff?h1=ZG9nbWFkZS5jb20&hmac=58e162dd3b45c731430e05434ea590974afdf9fe801ca980877e8b1ea5e72ab7") format("woff");
	}

	@font-face {
		font-family: "Avenir Next";
		font-weight: 400;
		font-style: normal;
		src: url("https://fonts.shopifycdn.com/avenir_next/avenirnext_n4.7fd0287595be20cd5a683102bf49d073b6abf144.woff2?h1=ZG9nbWFkZS5jb20&hmac=2a8471d122854025d18aaa99d3dd931f6d9fca6daa74733f23354ed36180d047") format("woff2"),
			url("https://fonts.shopifycdn.com/avenir_next/avenirnext_n4.a26a334a0852627a5f36b195112385b0cd700077.woff?h1=ZG9nbWFkZS5jb20&hmac=c72728148e62d7a9f7799b83f7148e481dc79524f2a2ba78ba81bc2848834008") format("woff");
	}

	:global(html){
		height: 100%;
		overflow: auto;
	}

	:global(body){
		height: 100%;
	}

	:global(main){
		padding-bottom: 0 !important;
	}
</style>

<svelte:window bind:innerWidth={viewportWidth}/>

{#await data}
	<SkeletonWorkspace />
{:then}
	<WorkspaceContainer {initSettings} />
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}
