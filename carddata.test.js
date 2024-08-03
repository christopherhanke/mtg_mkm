import { test, expect } from "@jest/globals"
import { Carddata, carddata_reviver } from "./carddata"

const TEST_CARD = new Carddata(1, 'Test', 2)

test(`Test Carddata structure.`, () => {
    expect(TEST_CARD).toHaveProperty("id")
    expect(TEST_CARD).toHaveProperty("name")
    expect(TEST_CARD).toHaveProperty("count")
    expect(TEST_CARD).toHaveProperty("prices")
})

test('Test Carddata stringify', () => {
    const card_str = JSON.stringify(TEST_CARD)
    expect(card_str).toContain("Carddata")
})

test('Test to parse a string back to Carddata', () => {
    const card_str = JSON.stringify(TEST_CARD)
    const card = JSON.parse(card_str, carddata_reviver)
    expect(card).not.toHaveProperty("@type")
    expect(card).toHaveProperty("prices")
})

test('Test to set price data in object', () => {
    const card = new Carddata(2, 'My Card', 1)
    card.prices.push({date: "2024-08-04", price: 8.15})
    card.prices.push({date: "2024-08-01", price: 8})
    expect(card.prices).toHaveLength(2)
    for (let i=0; i < card.prices.length; i++) {
        expect(card.prices[i]).toHaveProperty("date")
        expect(card.prices[i]).toHaveProperty("price")
    }
})