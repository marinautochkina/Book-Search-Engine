
const typeDefs = `
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

   type Auth {
    token: ID!
    user: User
  }

  type Query {
    me(_id: String, username: String): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: ID!): Book
    deleteBook(book: ID!): Book
  }
`;

module.exports = typeDefs;