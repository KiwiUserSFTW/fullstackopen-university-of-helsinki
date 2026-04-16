const typeDefs = /* GraphQL */ `
  type Author {
    name: String!
    id: String!
    bookCount: Int!
    born: Int
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String, genres: [String]): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(id: String!, setBornTo: Int!): Author
  }
`;

module.exports = typeDefs;
