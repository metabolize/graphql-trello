'use strict'

const gql = require('graphql-tag')
const queryTrello = require('../lib')
const credentials = require('../lib/config')

async function main() {
  const variables = { listId: process.env.TRELLO_LIST_ID }

  const { getList: list } = await queryTrello({
    query: gql`
      query($listId: String!) {
        getList(listId: $listId) {
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
      }
    `,
    variables,
    ...credentials,
  })
  console.log(JSON.stringify(list, undefined, 2))
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
