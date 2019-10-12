'use strict'

const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema')
const { Query } = require('./resolver')
const { Trello } = require('./trello')
const { trelloKey, trelloToken } = require('./server-config')

const trello = new Trello(trelloKey, trelloToken)
const context = { trello }

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query },
  context: ({ req }) => context,
})

;(async () => {
  const { url } = await server.listen()
  console.log(`🚀  Server ready at ${url}`)
})()
