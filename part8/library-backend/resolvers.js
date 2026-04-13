const { GraphQLError } = require("graphql");

const Book = require("./models/book");
const Author = require("./models/author");

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
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

      const books = await Book.find({});
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
        return await book.save();
      } catch (error) {
        throw new GraphQLError(`Adding book failed: ${error.message}`);
      }
    },
    editAuthor: async (root, args) => {
      try {
        return await Author.findByIdAndUpdate(
          args.id,
          {
            born: args.setBornTo,
          },
          { new: true },
        );
      } catch (error) {
        throw new GraphQLError(
          `Editing born value has been failed: ${error.message}`,
        );
      }
    },
  },
};

module.exports = resolvers;
