// Carddata defines the data structure for the local database

class Carddata {
    constructor(id, name, count=0) {
        this.id = id // id for precise identifaction in product list
        this.name = name // cardname, not precise because of reprints
        this.count = count // count in collection
        this.prices = [] // list of prices {date:, price:}
    }

    // declaring how to stringify class objects
    toJSON() {
        return {
            '@type': 'Carddata',
            id: this.id,
            name: this.name,
            count: this.count,
            prices: this.prices
        }
    }
}

// declaring a reviver function for the Carddata class
function carddata_reviver(key, value) {
    if (value?.['@type'] === 'Carddata') {
        const card = new Carddata(value.id, value.name, value.count)
        card.prices = value.prices
        return card
    }
    return value
}


export {
    Carddata,
    carddata_reviver
}