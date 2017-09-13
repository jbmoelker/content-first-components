require('dotenv').config()
const dataLoader = require('./lib/data-loader')
const apiRouter = require('./lib/api-router')
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT

const app = next({ dev })
const server = express()

const startServer = () => server.listen(port, (err) => {
	if (err) throw err;
	console.log(`> Ready on http://localhost:${port}`);
});

server.use('/api', apiRouter)
server.get('/pages/:slug', (req, res) => app.render(req, res, '/page', { slug: req.params.slug }))
server.get('*', app.getRequestHandler())

app.prepare().then(startServer)
