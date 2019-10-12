const Promise = require('bluebird')
const _Trello = require('node-trello')
const throttle = require('p-throttle')

class Trello {
  constructor(key, token) {
    let trello = Promise.promisifyAll(new _Trello(key, token))
    // http://help.trello.com/article/838-api-rate-limits
    let throttledGet = throttle(trello.getAsync.bind(trello), 100, 10000)

    this.get = (...args) => Promise.resolve(throttledGet.apply(null, args))
  }
}

module.exports = { Trello }
