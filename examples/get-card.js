'use strict'

const gql = require('graphql-tag')
const queryTrello = require('../lib')
const credentials = require('../lib/config')

async function main() {
  const variables = { cardId: process.env.TRELLO_CARD_ID }

  const { getCard: card } = await queryTrello({
    query: gql`
      query($cardId: String!) {
        getCard(cardId: $cardId) {
          id
          name
          url
          updatedAt
          labels {
            name
            color
          }
          members {
            id
            username
            fullName
            avatarHash
          }
          comments {
            id
            content
          }
        }
      }
    `,
    variables,
    ...credentials,
  })
  console.log(JSON.stringify(card, undefined, 2))
}

if (require.main === module) {
  ;(async () => {
    try {
      await main()
      process.exit(0)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  })()
}
