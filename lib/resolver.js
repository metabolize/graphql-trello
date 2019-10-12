const Query = {
  getBoard: async (_, {boardId}, {trello}) => Board.create(await trello.get(`/1/boards/${boardId}`)),
  getList: async (_, {listId}, {trello}) => List.create(await trello.get(`/1/lists/${listId}`)),
  getCard: async (_, {cardId}, {trello}) => Card.create(await trello.get(`/1/cards/${cardId}`)),
  getMember: async (_, {memberId}, {trello}) => Member.create(await trello.get(`/1/members/${memberId}`)),
}

class Board {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.url = data.url;
  }

  static create(data) {
    return new Board(data)
  }

  async lists(_, {trello}) {
    const {id} = this
    return (await trello.get(`/1/boards/${id}/lists`)).map(List.create)
  }

  async members(_, {trello}) {
    const{id} = this
    return (await trello.get(`/1/boards/${id}/members`)).map(Member.create)
  }
}

class List {
  constructor({id, name}) {
    this.id = id
    this.name = name
  }

  static create(data) {
    return new List(data)
  }

  async cards(_, {trello}) {
    const {id} = this
    return trello.get(`/1/lists/${id}/cards`, {customFieldItems: 'true'}).map(Card.create)
  }
}

class Card {
  constructor({id, name, url, dateLastActivity, labels, customFieldItems}) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.updatedAt = dateLastActivity;
    this.labels = labels.map(Label.create)
    this.customFieldItems = customFieldItems.map(CustomFieldItem.create)
  }

  static create(data) {
    return new Card(data)
  }

  async members(_, {trello}) {
    const {id} = this
    return (await trello.get(`/1/cards/${id}/members`)).map(Member.create)
  }


  async comments(_, {trello}) {
    const {id} = this
    return (await trello.get(`/1/cards/${id}/actions`, { filter: "commentCard" })).map(Comment.create)
  }
}

class Member {
  constructor({id, username, fullName, avatarHash}) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.avatarHash = avatarHash;
  }

  static create(data) {
    return new Member(data)
  }

  async cards(_, {trello}) {
    const{id} = this
    return (await trello.get(`/1/members/${id}/cards`)).map(Card.create)
  }
}

class Comment {
  constructor({id, data: {text}}) {
    this.id = id
    this.content = text
  }

  static create(data) {
    return new Comment(data)
  }
}

class Label {
  constructor({name, color}) {
    this.name = name;
    this.color = color;
  }

  static create(data) {
    return new Label(data)
  }
}

class CustomFieldItem {
  constructor({ id, idCustomField, idModel, value }) {
    this.id = id
    this.idCustomField = idCustomField
    this.stringValue = value.text
    this.numberValue = value.number === undefined ? undefined : +value.number
    this.dateValue = value.date === undefined ? undefined : new Date(value.date)
    this.boolValue = value.checked === undefined ? undefined : Boolean(value.checked)
  }

  static create(data) {
    return new CustomFieldItem(data)
  }
}

module.exports = { Query }
