const { GraphQLError } = require("graphql");

const Book = require("./models/book");
const Author = require("./models/author");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
];

/* do not have to work just yet:
allBooks query with parameters
bookCount field of an author object
author field of a book
editAuthor mutation
*/

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const filtersMap = [
        {
          name: "author",
          value: args.author,
          condition: (value, filterValue) => value === filterValue,
        },
        {
          name: "genres",
          value: args.genre,
          condition: (array, filterValue) => array.includes(filterValue),
        },
      ];

      const activeFilters = filtersMap.filter((filter) => filter.value);

      const filteredBooks = (filters) =>
        books.filter((book) =>
          filters.every(({ name, value, condition }) =>
            condition(book[name], value),
          ),
        );

      return activeFilters.length ? filteredBooks(activeFilters) : books;
    },
    allAuthors: async () => {
      const books = await Book.find({});
      const authors = await Author.find({});

      return authors.map((author) => {
        const bookCount = books.filter(
          (book) => String(book.author) === String(author._id),
        ).length;

        const { _id, ...args } = author.toObject();
        return { ...args, bookCount, id: _id };
      });
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        const newAuthor = new Author({ name: args.author });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError(`Adding user failed: ${error.message}`);
        }

        author = newAuthor;
      }

      const book = new Book({ ...args, author: author.id });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(`Adding book failed: ${error.message}`);
      }

      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);

      if (!author) {
        return null;
      }

      const editedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name === args.name ? editedAuthor : author,
      );

      return editedAuthor;
    },
  },
};

module.exports = resolvers;
