import { supportedUnicodeRanges } from './constants.js'
import { errorMessage, textState, appState, appSettings } from './globals.js'
import { get } from 'svelte/store'
import axios from 'axios'
import { APIEndpoint } from './constants.js'


//Internal functions
function stringCheckForCharacters(str) {
    let invalidArr = [];

    function between(x, min, max) {
        return x >= min && x <= max;
    }

    function missingAlert(arr) {
        let arrInString = arr.join(', ');

        errorMessage.set("We don't support such characters currently: " + arrInString)
    }

    for (let i = 0; i < str.length; i++) {
        let characterToCheck = str.charAt(i);
        let charPresent = false;
        let checkedCode = characterToCheck.charCodeAt(0);
        let checkedCodeHex = checkedCode.toString(16).toUpperCase();

        while (checkedCodeHex.length < 4) {
            checkedCodeHex = "0" + checkedCodeHex;
        }

        for (let j = 0; j < supportedUnicodeRanges.length; j++) {
            if (Array.isArray(supportedUnicodeRanges[j])) {
                if (between(checkedCodeHex, supportedUnicodeRanges[j][0], supportedUnicodeRanges[j][1])) {
                    charPresent = true;
                    break;
                }
            } else {
                if (between(checkedCodeHex, supportedUnicodeRanges[j], supportedUnicodeRanges[j])) {
                    charPresent = true;
                    break;
                }
            }
        }
        if (!charPresent) {
            invalidArr.push("&#x" + checkedCodeHex + ";");
        }
    }
    if (invalidArr.length > 0) {
        let invalidArrToShow = invalidArr.sort().filter(function (item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });

        missingAlert(invalidArrToShow);

        return false;
    }
    if (get(errorMessage) && get(errorMessage).indexOf("We don't support such characters currently: ") >= 0) {
        errorMessage.set('')
    }
    return true;
}

function selectIteminArr(arr, id, fetchBreedFlag) {
    arr.update((arrData) => arrData.map((item, index) => {
        let modItem = item
        if (item.id === id) {
            modItem.selected = true
            if (fetchBreedFlag) {
                if (!item.products) {
                    fetchBreed(arr, item.id, index)
                }
            }

        } else {
            delete modItem.selected
        }
        return modItem
    }))
}

//General logic
export function searchLogic(searchStr, data) {
    if (searchStr === '') {
        return true
    }
    if (typeof data.text === 'undefined') {
        return false
    }
    if (data.tags && data.tags.length > 0) {
        let dataFound = false
        data.tags.split(', ').map(function (item) {
            if (item !== 'no-dropship' && item.toLowerCase().indexOf(searchStr.toLowerCase()) > -1) {
                dataFound = true
            }
        })
        if (dataFound) {
            return dataFound
        }
    }
    if (data.text.toLowerCase().indexOf(searchStr.toLowerCase()) > -1) {
        return true
    }
    return false
}

export function posterTextProcessing(text) {    
    let textToPaste = "",
        textCheck = stringCheckForCharacters(text);
    if (!textCheck) {
        textToPaste = get(textState)
    } else if (text.length > 40) {
        textToPaste = text.substring(0, 40)
    } else {
        textToPaste = text
    }
    return textToPaste.toUpperCase();
}

export function labelTextProcessing(text) {
    let textToPaste = "";
    if ((text.length > 30 || text.split(' ').length > 5) && /\S/.test(text)) {
        textToPaste = text.split(' ').splice(0, 5).join(" ").substring(0, 30) + "...";
    } else if (text.length === 0 || !(/\S/.test(text))) {
        textToPaste = "Optional";
    } else {
        textToPaste = text;
    }
    return textToPaste;
}

export function getJsonFromUrl(url) {
    if (!url) url = location.href;
    let question = url.indexOf("?");
    let hash = url.indexOf("#");
    if (hash == -1 && question == -1) return {};
    if (hash == -1) hash = url.length;
    let query = question == -1 || hash == question + 1 ? url.substring(hash) :
        url.substring(question + 1, hash);
    let result = {};
    query.split("&").forEach(function (part) {
        if (!part) return;
        part = part.split("+").join(" "); // replace every + with space, regexp-free version
        let eq = part.indexOf("=");
        let key = eq > -1 ? part.substr(0, eq) : part;
        let val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
        let from = key.indexOf("[");
        if (from == -1) result[decodeURIComponent(key)] = val;
        else {
            let to = key.indexOf("]", from);
            let index = decodeURIComponent(key.substring(from + 1, to));
            key = decodeURIComponent(key.substring(0, from));
            if (!result[key]) result[key] = [];
            if (!index) result[key].push(val);
            else result[key][index] = val;
        }
    });
    return result;
}

//Selection logic
export async function fetchBreed(arr, handle, index, callback) {
    const response = await axios.get(APIEndpoint + 'breed/' + handle + '.json')
    const data = response.data
    if (response.status === 200) {
        arr.update((arrData) => {
            arrData[index].products = data
            return arrData
        })
        if(callback){
            callback()
        }
    } else {
        throw new Error(response);
    }
}

export function displayText(arr, textToReturn = 'text') {
    return arr.reduce((acc, item) => {
        return (item.selected) ? item[textToReturn] : acc
    }, {})
}

export function selectItem(arr, id, closeHandlerComponent, type, colorChanged, e) {
    selectIteminArr(arr, id)
    if(closeHandlerComponent){
        closeHandlerComponent.closeHandler()
        if (closeHandlerComponent.$$.ctx[1] === 'color') {
            colorChanged = true
        }
    }
}

export function selectBreed(arr, id, closeHandlerComponent, e) {
    selectIteminArr(arr, id, true)
    closeHandlerComponent.closeHandler()
}

export function selectDesign(arr, id, closeHandlerComponent, colorArr, colorChanged, e) {
    let selectedColor = get(appState).color.id
    // if (id === 'mosaic') {
    //     switch (selectedColor) {
    //         case 'white':
    //             selectIteminArr(colorArr, 'black')
    //             break;
    //         case 'red':
    //             selectIteminArr(colorArr, 'pink');
    //             break;
    //         case 'forest':
    //             selectIteminArr(colorArr, 'green');
    //             break;
    //         case 'moon':
    //             selectIteminArr(colorArr, 'blue');
    //             break;
    //         case 'flora':
    //             selectIteminArr(colorArr, 'brown');
    //             break;
    //         default:
    //             break;
    //     }
    // } else if (id === 'form') {
    //     switch (selectedColor) {
    //         case 'white':
    //             selectIteminArr(colorArr, 'black');
    //             break;
    //         case 'pink':
    //             selectIteminArr(colorArr, 'red');
    //             break;
    //         default:
    //             break;
    //     }

    // } else {
    //     if (colorChanged) {
    //         switch (id) {
    //             case 'red':
    //                 selectIteminArr(colorArr, 'pink');
    //                 break;
    //             case 'forest':
    //                 selectIteminArr(colorArr, 'green');
    //                 break;
    //             case 'moon':
    //                 selectIteminArr(colorArr, 'blue');
    //                 break;
    //             case 'flora':
    //                 selectIteminArr(colorArr, 'brown');
    //                 break;
    //             default:
    //                 break;
    //         }
    //     } else {
    //         selectIteminArr(colorArr, 'white');
    //     }
    // }
    selectIteminArr(arr, id)
    closeHandlerComponent.closeHandler()
}

//Carts
export function addToCartHandler() {
    let cartDataObj = {
        id: get(appState).variantSelected.id,
        quantity: 1
    }
    if (get(appState).text !== "") {
        cartDataObj.properties = {}
        cartDataObj.properties.Text = get(appState).text
    }

    if (window.theme && window.theme.customCartHandler) {
        window.theme.customCartHandler.addItemFromForm(cartDataObj).then(function (data) {
            BOLDCURRENCY.cartDoctor.refresh().then(function () {
                BOLDCURRENCY.cartDoctor.updateCart()
                if (!get(appSettings).addedToCart) {
                    appSettings.update((data) => {
                        let modData = data
                        modData.addedToCart = true
                        return modData
                    })
                }                
                document.querySelector('.ajax-cart__toggle').click()
            });
        });
    }

}

export function viewCartHandler() {
    document.querySelector('.ajax-cart__toggle').click()
}

//Currency calculations
export function priceCalculate(price){
    if (get(appSettings).boldInitiated && window.BOLDCURRENCY && window.BOLDCURRENCY.currentCurrency && BOLDCURRENCY.rateInfo[BOLDCURRENCY.currentCurrency]) {
        let rules = BOLDCURRENCY.rateInfo[BOLDCURRENCY.currentCurrency].rules
        let rate = parseFloat(BOLDCURRENCY.rateInfo[BOLDCURRENCY.currentCurrency].rate)
        let rawPrice = price * rate
        let adjustedPrice = Object.values(rules).reduce((acc, item) => {
            if (item.low < rawPrice && item.high > rawPrice) {
                return item.value
            }
            return acc
        }, rawPrice)
        return BOLDCURRENCY.moneyFormats[BOLDCURRENCY.currentCurrency].money_format.replace('{{amount_no_decimals}}', adjustedPrice).replace('{{amount}}', adjustedPrice).replace('{{amount_with_comma_separator}}', adjustedPrice)
    }
    return 0
}