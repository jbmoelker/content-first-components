const express = require('express')
const next = require('next')
const loadData = require('./lib/load-data')
const reloadData = require('./lib/reload-data')

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT
const reloadToken = process.env.DATA_RELOAD_TOKEN

const app = next({ dev })
const handle = app.getRequestHandler()

Promise.all([
  loadData(),
  app.prepare(),
])
.then(([ data ]) => {
  const server = express()

  server.post('/api/reload-data/:token', (req, res) => {
    if (reloadToken && reloadToken === req.params.token) {
      reloadData()
        .then(newData => {
          data = newData
          res.json(data)
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
    res.json(data.pages)
  })

  server.get('/api/pages/:slug', (req, res) => {
    const slug = req.params.slug
    const page = data.pages.find(page => page.slug === slug)
    res.json(page)
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
