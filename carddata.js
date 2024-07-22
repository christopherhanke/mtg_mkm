// Carddata defines the data structure for the local database

class Carddata {
    constructor(id, name, count=0) {
        this.id = id // id for precise identifaction in product list
        this.name = name // cardname, not precise because of reprints
        this.count = count // count in collection
        this.prices = [] // list of prices {date:price}
    }

    toJSON() {
        return 
    }
}

function carddata_reviver(key, value) {
    if (true) {
        return
    }
}

function main() {
    const test = new Carddata(1, "Test", 2)
    console.log(test)
    console.log(JSON.stringify(test))
}

main()

export {
    Carddata
}