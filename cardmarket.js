import fs from 'node:fs/promises'
import { PRICES_URL, PRODUCTS_URL } from './src/src'

async function is_file(file) {
    try {
        // check for file
        const data = await fs.stat(file)
        return data.isFile()
    } catch (err) {
        console.log(err.message)
        return
    }  
}

async function get_file_data(file) {
    try {
        // read file to JSON object
        const data = JSON.parse(await fs.readFile(file))
        return data
    } catch (err) {
        console.log(err.message)
        return
    }
}

async function get_list_products(file) {
    let list_products
    try {
        // get data from file and check for products
        const data = await get_file_data(file)
        if (data.hasOwnProperty("products")) {
            // wrap data in array
            list_products = Array.from(data.products)
        } else {
            throw new Error(`File "${file}" has no property "products"`)
        }
    } catch (err) {
        // return undefined, call can handle undefined data
        console.log(err.message)
        return
    }
    return list_products
}

async function get_list_prices(file) {
    let list_prices
    try {
        // get data from file and check for prices
        const data = await get_file_data(file)
        if (data.hasOwnProperty("priceGuides")) {
            // wrap data in array
            list_prices = Array.from(data.priceGuides)
        } else {
            throw new Error(`File "${file} has no property "priceGuides"`)
        }
    } catch (err) {
        // return undefined, call can handle undefined data
        console.log(err.message)
        return
    }
    return list_prices
}

async function collect_cardinfo(idProduct, file_products, file_prices) {
    const cardinfo = {}
    const list_products = await get_list_products(file_products)
    const list_prices = await get_list_prices(file_prices)
    
    // check for name in product data
    // when card is found add name and id to cardinfo
    for (let i = 0; i < list_products.length; i++) {
        if (list_products[i].idProduct === idProduct) {
            cardinfo.idProduct = idProduct
            cardinfo.name = list_products[i].name
            break
        }
    }
    // return undefined if cardname is not found
    if (!(cardinfo.hasOwnProperty("idProduct"))) {
        console.log("idProduct not found")
        return
    }
    // search for product id in price list
    // when found add trend price to cardinfo
    for (let i = 0; i < list_prices.length; i++) {
        if (list_prices[i].idProduct === cardinfo.idProduct) {
            cardinfo.trend = list_prices[i].trend
            break
        }
    }
    // return undefined when price is not found
    if (!(cardinfo.hasOwnProperty("trend"))) {
        console.log(`Why has the card "${cardinfo.name} no trend price?`)
        return
    }
    return cardinfo
}

async function search_cardname(name, file_products) {
    const list_cardname = []
    const list_products = await get_list_products(file_products)
    
    // check list of products for name
    // add productid to list of cardname
    for (let i = 0; i < list_products.length; i++) {
        if (list_products[i].name === name) {
            list_cardname.push(list_products[i].idProduct)
        }
    }
    // check for no entries then return undefined
    if (list_cardname.length < 1) {
        return
    }
    return list_cardname
}

async function fetch_prices_cardmarket() {
    // fetch cardmarket prices data
    try {
        const prices_response = await fetch(PRICES_URL)
        if (!prices_response.ok) {
            throw new Error(`Response status: ${prices_response.status}`)
        }
        const prices_json = await prices_response.json()
        return prices_json
    } catch (err) {
        // error handling and return undefined
        console.log(err.message)
        return
    }
}

async function fetch_products_cardmarket() {
    // fetch cardmarket products data
    try {
        const products_response = await fetch(PRODUCTS_URL)
        if (!products_response.ok) {
            throw new Error(`Response status: ${products_response.status}`)
        }
        const products_json = await products_response.json()
        return products_json
    } catch (err) {
        // error handling and return undefined
        console.log(err.message)
        return
    }
}


export {
    is_file,
    get_file_data,
    get_list_products,
    get_list_prices,
    collect_cardinfo,
    search_cardname,
    fetch_prices_cardmarket,
    fetch_products_cardmarket
}