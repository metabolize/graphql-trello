'use strict'

const gql = require('graphql-tag')
const queryTrello = require('../lib')
const credentials = require('../lib/config')

async function main() {
  const variables = { boardId: process.env.TRELLO_BOARD_ID }

  const { getBoard: board } = await queryTrello({
    query: gql`
      query($boardId: String!) {
        getBoard(boardId: $boardId) {
          id
          name
          url
          lists {
            id
            name
            cards {
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
          members {
            id
            username
            fullName
            avatarHash
          }
        }
      }
    `,
    variables,
    ...credentials,
  })
  console.log(JSON.stringify(board, undefined, 2))
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
