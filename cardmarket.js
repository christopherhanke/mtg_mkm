import fs from 'node:fs/promises'

const MY_FILE = "./src/products_singles_1.json"

async function is_file() {
    try {
        //chekc for file
        const file = await fs.stat(MY_FILE)
        return file.isFile()
    
    //error handling
    } catch (err) {
        console.log(err.message)
        return
    }
    
}

async function get_file_data() {
    try {
        //read file to JSON
        const data = JSON.parse(await fs.readFile(MY_FILE))
        
        //check for property products and return data from file
        if (data.hasOwnProperty("products")) {
            return data
        }
        
        //error handling
        else {
            throw new Error(`File "${MY_FILE}" has no property "products"`)
        }
    } catch (err) {
        console.log(err.message)
        return
    }
}


export {
    is_file,
    get_file_data
}