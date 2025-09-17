const fs = require('fs')


const book = {
    title: 'Wealth of Nations',
    author: 'Adam Smith'
}

const bookJSON = JSON.stringify(book)
fs.writeFileSync('1-json.json',bookJSON)

const dataBuffer = fs.readFileSync('1-json.json')
const data = JSON.parse(dataBuffer.toString())

data.title = "Grapes of Wrath"
data.author = "Ernest Hemingway"

fs.writeFileSync('1-json.json',JSON.stringify(data))


