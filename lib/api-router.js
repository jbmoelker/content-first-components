require('dotenv').config();
const dataLoader = require('./data-loader')
const express = require('express');
const router = express.Router();

const reloadToken = process.env.DATA_RELOAD_TOKEN

router.post('/reload-data/:token', (req, res) => {
  if (reloadToken && reloadToken === req.params.token) {
    dataLoader.reload()
      .then(newData => {
        res.json(newData)
        console.log('Data reloaded.')
      })
      .catch(error => {
        res.status(500).json({ status: 'Error loading data.' })
        console.error('Error reloading data', error)
      })
  } else {
    res.status(401).json({ status: 'Invalid token.' })
  }
})

router.get('/:model/', (req, res) => {
  const { model } = req.params
  dataLoader.load('pages')
    .then(pages => res.json(pages))
})

router.get('/:model/:slug', (req, res) => {
  const { model, slug } = req.params
  dataLoader.load(model)
    .then(pages => pages.find(page => page.slug === slug))
    .then(page => res.json(page))
})

module.exports = router
