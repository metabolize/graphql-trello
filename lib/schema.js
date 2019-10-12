const gql = require("graphql-tag")

const typeDefs = gql`
  type Query {
    getBoard(boardId: String!): Board!
    getList(listId: String!): List!
    getCard(cardId: String!): Card!
    getMember(memberId: String!): Member!
  }

  type Board {
    id: String!
    name: String!
    url: String!
    lists: [List]!
    members: [Member]!
  }

  type List {
    id: String!
    name: String!
    cards: [Card]!
  }

  type Card {
    id: String!
    name: String!
    url: String!
    updatedAt: String!
    labels: [Label]!
    members: [Member]!
    comments: [Comment]!
    customFieldItems: [CustomFieldItem]!
  }

  type Member {
    id: String!
    username: String!
    fullName: String!
    avatarHash: String
    cards: [Card]!
  }

  type Comment {
    id: String!
    content: String!
  }

  type Label {
    name: String!
    color: String!
  }

  type CustomFieldItem {
    id: String!
    idCustomField: String!
    stringValue: String
    numberValue: Float
    dateValue: String
    boolValue: Boolean
  }
`

module.exports = { typeDefs }
