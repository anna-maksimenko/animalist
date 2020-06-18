import { writable, readable, derived } from "svelte/store"

function returnSelectedItem(arr) {
    return arr.reduce((acc, item) => {
        return (item.selected) ? item : acc
    }, '')
}

export const breedList = writable([])

export const designList = writable([
    {
        id: 'line',
        text: 'Line',
        selected: true
    }, {
        id: 'form',
        text: 'Form'
    }
])

export const colorList = writable([
    {
        id: 'chocolate',
        colorHex: '#a48568',
        text: 'Chocolate',
        supportedDesigns: [
            "form",
            "line"
        ]
    },
    {
        id: 'cream',
        colorHex: '#f1d5b1',
        text: 'Cream',
        supportedDesigns: [
            "form",
            "line"
        ]
    },
    {
        id: 'flora',
        colorHex: '#f1c6b1',
        text: 'Flora',
        supportedDesigns: [
            "form",
            "line"
        ]
    }, 
    {
        id: 'forest',
        colorHex: '#547061',
        text: 'Forest',
        supportedDesigns: [
            "form",
            "line"
        ]
    },
    {
        id: 'moon',
        colorHex: '#192937',
        text: 'Moon',
        supportedDesigns: [
            "form",
            "line"
        ]
    },
    {
        id: 'black',
        colorHex: '#161616',
        text: 'Black',
        selected: true,
        supportedDesigns: [
            "form",
            "line"
        ]
    }
])

export const flipList = writable([
    {
        id: 'left',
        text: 'Left'
    },
    {
        id: 'right',
        text: 'Right',
        selected: true
    }
])

export const sizeList = writable([
    {
        id: '11x17inch',
        labelText: '11 x 17 inch',
        text: 'S / 11 x 17 inch',
        priceText: '€59',
        maskImageSrc: '//cdn.shopify.com/s/files/1/0096/7193/4009/t/21/assets/11_x_17ncs.jpg?v=15719793448830142099',
        tab: 'us'
    },
    {
        id: '30x40cm',
        labelText: '30 x 40 cm',
        text: 'S / 30 x 40 cm',
        priceText: '€59',
        selected: true,
        maskImageSrc: '//cdn.shopify.com/s/files/1/0096/7193/4009/t/21/assets/30_x_40ncs.jpg?v=10125488387443084475',
        tab: 'eu'
      },
    {
        id: '18x24inch',
        labelText: '18 x 24 inch',
        text: 'M / 18 x 24 inch',
        priceText: '€75',
        maskImageSrc: '//cdn.shopify.com/s/files/1/0096/7193/4009/t/21/assets/18_x_24ncs.jpg?v=15466101332995518527',
        tab: 'us'
      },
    {
        id: '50x70cm',
        labelText: '50 x 70 cm',
        text: 'M / 50 x 70 cm',
        priceText: '€75',
        maskImageSrc: '//cdn.shopify.com/s/files/1/0096/7193/4009/t/21/assets/50_x_70ncs.jpg?v=7023782380098658035',
        tab: 'eu'
    }, {
        id: '24x36inch',
        labelText: '24 x 36 inch',
        text: 'L / 24 x 36 inch',
        priceText: '€95',
        maskImageSrc: '//cdn.shopify.com/s/files/1/0096/7193/4009/t/21/assets/24_x_36ncs.jpg?v=14128380608087237592',
        tab: 'us'
    },
    {
        id: '70x100cm',
        labelText: '70 x 100 cm',
        text: 'L / 70 x 100 cm',
        priceText: '€95',
        maskImageSrc: '//cdn.shopify.com/s/files/1/0096/7193/4009/t/21/assets/70_x_100ncs.jpg?v=4706496976915697606',
        tab: 'eu'
    }
])

export const textState = writable('')

export const appState = derived(
    [breedList, designList, colorList, flipList, sizeList, textState],
    ([$breedList, $designList, $colorList, $flipList, $sizeList, $textState]) => {
        let selectionObj = {
            breed: returnSelectedItem($breedList),
            design: returnSelectedItem($designList),
            color: returnSelectedItem($colorList),
            flip: returnSelectedItem($flipList),
            size: returnSelectedItem($sizeList),
            text: $textState
        }

        let queryObj = {}
        let queryString
        let productSelected = selectionObj.breed.products[selectionObj.breed.text + '  [' + selectionObj.design.text + '-' + selectionObj.color.text + ']']
        

        function buildQuery(obj) {
            let str = [];
            for (let p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
            return str.join("&");
        }

        selectionObj.variantSelected = (productSelected && productSelected.variants) ? productSelected.variants.reduce(function (acc, item) {
            if (item.option1 === "Vertical" && item.option2 === selectionObj.flip.text && item.option3 === selectionObj.size.id) {
                return item;
            }
            return acc
        }, '') : null
        
        let breedCode = selectionObj.breed.skuCode
        let designCode = (selectionObj.design.id === 'form') ? 'FOR' : 'LIN'
        let colorCode
        let sizeCode
        let flipCode = (selectionObj.flip.id === 'left') ? 'L' : 'R'
        let orientationCode = 'V'
        switch (selectionObj.size.id) {
            case '50x70cm':
                sizeCode = '50x70';
                break;
            case '70x100cm':
                sizeCode = '70x100';
                break;
            case '30x40cm':
                sizeCode = '30x40';
                break;
            case '18x24inch':
                sizeCode = '18x24';
                break;
            case '11x17inch':
                sizeCode = '11x17';
                break;
            case '24x36inch':
                sizeCode = '24x36';
                break;
            default:
                sizeCode = '30x40';
        }
        switch (selectionObj.color.id) {
            case 'chocolate':
                colorCode = 'CHO';
                break;
            case 'black':
                colorCode = 'BLA';
                break;
            case 'cream':
                colorCode = 'CRE';
                break;
            case 'flora':
                colorCode = 'FLO';
                break;
            case 'forest':
                colorCode = 'FOR';
                break;
            case 'moon':
                colorCode = 'MOO';
                break;
            default:
                colorCode = 'BLA';
        }
        queryObj.setup = breedCode + '-' + designCode + '-' + colorCode + '-' + orientationCode + '-' + flipCode + '-' + sizeCode;
        (selectionObj.text) ? queryObj.text = selectionObj.text : null
        queryString = buildQuery(queryObj)
        history.replaceState({}, 'Create artwork', location.pathname + ((queryString) ? '?' + queryString : ''))

        return selectionObj
    }
)

export const errorMessage = writable('')

export const sectionSettings = readable(window.sectionSettings)

export const mobileView = writable(false)

export const searchString = writable('')

export const uiHeight = writable('')

export const dockHeight = writable('')

export const appSettings = writable({
    announcementOpen: false,
    colorChanged: false,
    addedToCart: false,
    itemInCart: false,
    variantPrice: 0,
    priceToDisplay: 0,
    currencyToDisplay: '€'
})