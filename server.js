const dataLoader = require('./lib/data-loader')
const express = require('express')
const next = require('next')
// const loadData = require('./lib/data-loader/load-data')
// const reloadData = require('./lib/data-loader/reload-data')

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT
const reloadToken = process.env.DATA_RELOAD_TOKEN

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.post('/api/reload-data/:token', (req, res) => {
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

  server.get('/api/pages/', (req, res) => {
    dataLoader.load('pages')
      .then(pages => res.json(pages))
  })

  server.get('/api/pages/:slug', (req, res) => {
    const slug = req.params.slug
    dataLoader.load('pages')
      .then(pages => pages.find(page => page.slug === slug))
      .then(page => res.json(page))
  })

  server.get('/pages/:slug', (req, res) => {
    const slug = req.params.slug
    app.render(req, res, '/page', { slug })
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, (err) => {
    if (err) {
      console.error('ERROR occured while starting the server')
      throw err
    }

    console.info('Server has started')
    console.log(`> Ready on http://localhost:${port}`)
  })
})
