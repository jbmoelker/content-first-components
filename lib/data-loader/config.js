const path = require('path')
const pkg = require('../../package.json')
const os = require('os')

module.exports = {
  dataDir: path.join(os.tmpdir(), pkg.name, 'data')
}
