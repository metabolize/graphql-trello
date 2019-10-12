'use strict'

// To set these values locally, copy `example.env` to `.env`.

require('dotenv').config()

module.exports = {
  trelloKey: process.env.TRELLO_KEY,
  trelloToken: process.env.TRELLO_TOKEN,
}
