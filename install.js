/**
 * @module status-codes/install
 * @env node
 * It reads the statuses list from json file and saves it as the .js file which exports the statuses object
 */

try {
    const fs = require('fs')
    const path = require('path')
    const util = require('util')
    const pureStatuses = fs.readFileSync('./statuses.json')
    const statuses = JSON.parse(pureStatuses)
    fs.writeFileSync(path.join(__dirname, 'statuses.js'), `module.exports = ${util.inspect(statuses)}`)
} catch (e) {
    console.error('Can not convert statuses.json to statuses.js. Error:', e)
    process.exit(1)
}
