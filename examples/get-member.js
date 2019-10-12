'use strict'

const gql = require('graphql-tag')
const queryTrello = require('../lib')
const credentials = require('../lib/config')

async function main() {
  const variables = { memberId: process.env.TRELLO_MEMBER_ID }

  const { getMember: member } = await queryTrello({
    query: gql`
      query($memberId: String!) {
        getMember(memberId: $memberId) {
          id
          username
          fullName
          avatarHash
          cards {
            id
            name
            url
            updatedAt
            labels {
              name
              color
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
  console.log(JSON.stringify(member, undefined, 2))
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
