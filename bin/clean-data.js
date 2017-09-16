#!/usr/bin/env node
const chalk = require('chalk')
const config = require('../lib/data-loader/config')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))

rimraf(config.dataDir)
  .then(() => console.log(chalk.green(`✓ Removed ${chalk.bold(config.dataDir)}`)))
  .catch(err => console.error(chalk.red('❌ Error removing data directory'), err))
