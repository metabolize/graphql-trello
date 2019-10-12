'use strict'

const { graphql } = require('graphql')
const { print } = require('graphql/language/printer')
const { makeExecutableSchema } = require('graphql-tools')
const { typeDefs } = require('./schema')
const { Query } = require('./resolver')
const { Trello } = require('./trello')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: { Query },
})

function queryToString(query) {
  return typeof query === 'string' ? query : print(query)
}

module.exports = async function queryTrello({
  query,
  variables,
  trelloKey,
  trelloToken,
}) {
  const trello = new Trello(trelloKey, trelloToken)
  const context = { trello }

  const { data, errors } = await graphql(
    schema,
    queryToString(query),
    undefined,
    context,
    variables
  )
  if (errors) {
    throw errors[0]
  } else {
    return data
  }
}
