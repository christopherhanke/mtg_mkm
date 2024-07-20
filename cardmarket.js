import fs from 'node:fs/promises'
import { stringify } from 'node:querystring'

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


export {
    is_file,
    get_file_data,
    get_list_products,
    get_list_prices
}