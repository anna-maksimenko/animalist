<script>
    import {onMount} from 'svelte'

    export let hidden = false

    let pickerParent

    onMount(() => {
        let checkTimer
        
        if(window.svelteLoadPickers){            
            document.dispatchEvent(window.svelteLoadPickers)
        } else {
            checkTimer = setInterval(()=>{
                if(window.svelteLoadPickers){
                    clearInterval(checkTimer)
                    document.dispatchEvent(window.svelteLoadPickers)
                }
            },200)
        }
        
        let currencyListItems = document.querySelectorAll('.currencyList li')
        
        for( let i = 0; i < currencyListItems.length; i++ ){
            currencyListItems[i].addEventListener("click", function(e) {
                e.stopPropagation();
                for( let j = 0; j < currencyListItems.length; j++ ){
                    if(currencyListItems[j].classList.contains('selected')){
                        currencyListItems[j].classList.remove('selected')
                    }
                }
                e.currentTarget.classList.add('selected');
            });
        }
        

        return () => {
            BOLDCURRENCY.converter.pickers = BOLDCURRENCY.converter.pickers.filter((item)=>{
                if(item === pickerParent.firstChild){
                    return false
                }
                return true
            })
            BOLDCURRENCY.converter.refresh()
        }
    })
</script>

<style>
    .hidden-picker{
        visibility: hidden;
        pointer-events: none;
        position: absolute;
        top: -5000px;
    }
    .currencyList{
        bottom: 47px;
    }
</style>

<span style="display:none;" class="BOLD-mc-picker-mnt" data-open="up" data-bold-mc-picker-mnt bind:this={pickerParent} class:hidden-picker={hidden}></span>