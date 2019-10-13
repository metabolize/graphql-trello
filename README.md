# trello-apollo

[GraphQL][] interface to the [Trello REST API][]

[graphql]: https://graphql.org/
[trello rest api]: https://developers.trello.com/reference/

## Usage

There are two ways of using this package:

1. As a library for running GraphQL queries locally.
2. Deploy your own [Apollo-based GraphQL server][apollo-server] e.g. to Heroku.

[apollo-server]: https://www.apollographql.com/docs/apollo-server/

### As a library

Install the package:

```sh
npm install @metabolize/graphql-trello
```

```js
// Pass a GraphQL string or use `graphql-tag` to pass in a parsed query.
const gql = require('graphql-tag')
const queryTrello = require('../lib')

const credentials = {
  trelloKey: '...',
  trelloToken: '...',
}

const boardID = '...'

async function main() {
  const variables = { boardId }

  const { getBoard: board } = await queryTrello({
    query: gql`
      query($boardId: String!) {
        getBoard(boardId: $boardId) {
          id
          name
          lists {
            id
            name
            cards {
              id
              name
              comments {
                id
                content
              }
            }
          }
          members {
            id
            username
          }
        }
      }
    `,
    variables,
    ...credentials,
  })

  console.log(JSON.stringify(board, undefined, 2))

  return board
}
```

See the [examples](examples) directory for more!

### Deploy your own server

Fill this in.

## Acknowledgements

Adapted from [graphql-trello][] by [Luke Horvat][].

[graphql-trello]: https://github.com/lukehorvat/graphql-trello
[luke horvat]: https://github.com/lukehorvat

## License

This project is licensed under the MIT License.
