import { test, expect } from "@jest/globals";
import { 
    is_file, 
    get_file_data, 
    get_list_products, 
    get_list_prices,
    collect_cardinfo,
    search_cardname,
    fetch_prices_cardmarket,
    fetch_products_cardmarket
} from "./cardmarket";

// declare constant test data
const FILE_PRODUCTS = "./src/products_singles_1.json"
const FILE_PRICES = "./src/price_guide_1.json"
const CARDINFO = {
    "idProduct": 693202,
    "name": "Sheoldred's Edict",
    "trend": 2.84
}

// test suite
test('test for product file is file.', () => {
    return is_file(FILE_PRODUCTS).then(data => {
        expect(data).toBe(true)
    })
})

test('test for price file is file.', () => {
    return is_file(FILE_PRICES).then(data => {
        expect(data).toBe(true)
    })
})

test('get data from product file.', () => {
    return get_file_data(FILE_PRODUCTS).then(data => {
        expect(data).toHaveProperty("products")
    })
})

test('get list of products from product file.', () => {
    return get_list_products(FILE_PRODUCTS).then(data => {
        expect(Array.isArray(data)).toBeTruthy()
    })
})

test('try to get list of products from price file.', () => {
    return get_list_products(FILE_PRICES).then(data => {
        expect(data).toBeUndefined()
    })
})

test('try to get price list from product file.', () => {
    return get_list_prices(FILE_PRODUCTS).then(data => {
        expect(data).toBeUndefined()
    })
})

test('try to get price list from price file.', () => {
    return get_list_prices(FILE_PRICES).then(data => {
        expect(Array.isArray(data)).toBeTruthy()
    })
})

test(`collect card info for idProduct: ${CARDINFO.idProduct} -> "${CARDINFO.name}"`, () => {
    return collect_cardinfo(CARDINFO.idProduct, FILE_PRODUCTS, FILE_PRICES).then(data => {
        expect(data).toHaveProperty("name")
        expect(data).toHaveProperty("idProduct")
        expect(data).toHaveProperty("trend")
        // console.log(data)
    })
})

test(`search for cardname "${CARDINFO.name}" in list of product.`, () => {
    return search_cardname(CARDINFO.name, FILE_PRODUCTS).then(data => {
        expect(data).toBeTruthy()
        // console.log(data)
    })
})

test(`fetch price data from cardmarket.`, () => {
    return fetch_prices_cardmarket().then(data => {
        expect(data).toBeTruthy()
        const test = JSON.stringify(data)
        console.log(test.slice(0,80))
    })
})

test(`fetch product data from cardmarket.`, () => {
    return fetch_products_cardmarket().then(data => {
        expect(data).toBeTruthy()
        const test = JSON.stringify(data)
        console.log(test.slice(0,80))
    })
})