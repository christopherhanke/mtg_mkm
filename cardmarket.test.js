import { test, expect } from "@jest/globals";
import { is_file, get_file_data, get_list_products } from "./cardmarket";

const FILE_PRODUCTS = "./src/products_singles_1.json"
const FILE_PRICES = "./src/price_guide_1.json"

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
        expect(typeof data).toBe("object")
    })
})

test('try to get list of products from price file.', () => {
    return get_list_products(FILE_PRICES).then(data => {
        expect(data).toBeUndefined()
    })
})