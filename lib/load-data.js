const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const readFileAsync = promisify(fs.readFile)

const models = ['pages']

const loadData = () => Promise.all(
  models.map(model => {
    return readFileAsync(path.join(__dirname, '..', 'data', `${model}.json`), 'utf8')
      .then(contents => JSON.parse(contents))
  })
).then(data => {
  return models.reduce((all, model, index) => Object.assign(all, { [model]: data[index] }), {})
})

module.exports = loadData
