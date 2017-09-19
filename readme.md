# Content First Components

Demo setup using [modular content blocks in Dato CMS](https://docs.datocms.com/other/modular-content.html) rendered with a [component per content type using React](components/content.js) and a [Next.js server](https://github.com/zeit/next.js/).


## Getting started

1. Clone the repository
2. Copy `.env.example` to `.env` and set the variables.
3. `npm install` dependencies.
4. `npm run dev` to start development on [`http://localhost:26868`](http://localhost:26868)


## Development

Development requires [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/) (which comes bundled with Node.js).

After installing dependencies using `npm install` the following scripts are available:

`npm run ...` | Description
---|---
`build` | Builds app for production with data from Dato.
`dev` | Starts dev server with file watchers on [`http://localhost:26868`](http://localhost:26868).
`proxy` | Exposes local server to the web. Useful for testing and connecting local setup to Dato CMS.
`start` | Starts production server on [`http://localhost:26868`](http://localhost:26868).
