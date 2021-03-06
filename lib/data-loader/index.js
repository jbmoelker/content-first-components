const confirmReload = require('./confirm-reload')
const delay = require('delay')
const dumpData = require('./dump-data')
const loadData = require('./load-data')

let cachedData

/**
 * Load data from memory cache.
 * If data is not cached, try reading data from filesystem (and add to cache).
 * If also not on filesystem, trigger a data dump from CMS (and save to disk and cache).
 *
 * @returns {Promise} resolves data object of all available models.
 */
const loadFromCache = () => {
  if (cachedData) {
    console.log('using cached data')
    return Promise.resolve(cachedData)
  }
  return loadData()
    .then(data => {
      cachedData = data
      console.log('using data from filesystem')
      return Promise.resolve(cachedData)
    })
    .catch(err => {
      console.log('using data from dato cms')
      return dumpData().then(loadFromCache)
    })
}

/**
 * Load data from cache.
 *
 * @param {String} [model]  Model name that corresponds to JSON file (e.g. `pages`).
 * @returns {Promise} resolves with data of given model or all data otherwise.
 */
const load = (model) => {
  return loadFromCache().then(data => model ? data[model] : data)
}

/**
 * Reload data from CMS and return new data.
 *
 * @param {String} [model]  Model name that corresponds to JSON file (e.g. `pages`).
 * @returns {Promise} resolves with data of given model or all data otherwise.
 */
const reload = (model) => {
  const dump = dumpData()

  dump
    .then(delay(10000)) // wait a bit as dato api gets nervous if we confirm before responding to reload request itself
    .then(() => confirmReload({ success: true }))
    .catch(() => confirmReload({ success: false }))

  return dump
    .then(loadData)
    .then(data => {
      cachedData = data
      return Promise.resolve(cachedData)
    })
}

module.exports = {
  dump: dumpData,
  load,
  reload,
}
