import fs from 'node:fs/promises'
import { stringify } from 'node:querystring'

async function is_file(file) {
    try {
        //check for file
        const data = await fs.stat(file)
        return data.isFile()
    } catch (err) {
        console.log(err.message)
        return
    }
    
}

async function get_file_data(file) {
    try {
        //read file to JSON object
        const data = JSON.parse(await fs.readFile(file))
        return data
    } catch (err) {
        console.log(err.message)
        return
    }
}

async function get_list_products(file) {
    let list_products = []
    try {
        // get data from file and check for products
        const data = await get_file_data(file)
        if (data.hasOwnProperty("products")) {
            list_products = data.products
        } else {
            throw new Error(`File "${file}" has no property "products"`)
        }
    } catch (err) {
        console.log(err.message)
        return
    }
    console.log(`list of products contains ${list_products.length} entries`)
    if (list_products.length > 0) {
        console.log(list_products[0])
        
    }
    return list_products
}


export {
    is_file,
    get_file_data,
    get_list_products
}