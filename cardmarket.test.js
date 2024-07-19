import { test, expect } from "@jest/globals";
import { is_file, get_file_data } from "./cardmarket";

test('file in src is file.', () => {
    return is_file().then(data => {
        expect(data).toBe(true)
    })
})


test('get data in src file.', () => {
    return get_file_data().then(data => {
        expect(data).toHaveProperty("products")
    })
})