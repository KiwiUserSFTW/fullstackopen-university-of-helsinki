const { GraphQLError } = require("graphql");

const Book = require("./models/book");
const Author = require("./models/author");

const resolvers = {
  Query: {
    bookCount: async () => {
      try {
        const books = await Book.find({});
        return books.length;
      } catch (error) {
        throw new GraphQLError(`Counting books failed: ${error.message}`, {
          extensions: {
            code: "BOOK_COUNT_FAILED",
          },
        });
      }
    },
    authorCount: async () => {
      try {
        const authors = await Author.find({});
        return authors.length;
      } catch (error) {
        throw new GraphQLError(`Counting authors failed: ${error.message}`, {
          extensions: {
            code: "AUTHORS_COUNT_FAILED",
          },
        });
      }
    },
    allBooks: async (root, args) => {
      const filtersMap = [
        {
          name: "author",
          value: args.author,
          transform: async (value) => {
            const author = await Author.findOne({ name: value });

            if (!author) {
              throw new GraphQLError(`Author ${value} not exist`, {
                extensions: {
                  code: "BAD_USER_INPUT",
                  invalidArgs: value,
                },
              });
            }

            return author._id;
          },
        },
        {
          name: "genres",
          value: args.genres || args.genre,
          transform: (value) => {
            if (Array.isArray(value)) {
              return { $all: value };
            }
            return value;
          },
        },
      ];

      try {
        const books = async (queries = {}) =>
          await Book.find(queries).populate("author");
        const activeFilters = filtersMap.filter((filter) => filter.value);

        if (activeFilters.length === 0) return books();

        const queries = {};

        for (const filter of activeFilters) {
          const value = await filter.transform(filter.value);
          if (value) {
            queries[filter.name] = value;
          }
        }

        return books(queries);
      } catch (error) {
        throw new GraphQLError(`Failed to fetch books ${error.message}`, {
          extensions: {
            code: "ALL_BOOKS_QUERY_FAILED",
            error,
          },
        });
      }
    },
    allAuthors: async () => {
      try {
        const books = await Book.find({});
        const authors = await Author.find({});

        return authors.map((author) => {
          const bookCount = books.filter(
            (book) => String(book.author) === String(author._id),
          ).length;

          const { _id, ...args } = author.toObject();
          return { ...args, bookCount, id: _id };
        });
      } catch (error) {
        throw new GraphQLError(`Failed to fetch books ${error.message}`, {
          extensions: {
            code: "ALL_AUTHORS_QUERY_FAILED",
            error,
          },
        });
      }
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
          throw new GraphQLError(`Adding user failed: ${error.message}`, {
            extensions: {
              code: "BAD_USER_INPUT_",
              invalidArgs: args.author,
            },
          });
        }

        author = newAuthor;
      }

      const book = new Book({ ...args, author: author.id });

      try {
        return (await book.save()).populate("author");
      } catch (error) {
        throw new GraphQLError(`Adding book failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        });
      }
    },
    editAuthor: async (root, args) => {
      try {
        return await Author.findByIdAndUpdate(
          args.id,
          {
            born: args.setBornTo,
          },
          { returnDocument: "after" },
        );
      } catch (error) {
        throw new GraphQLError(`Adding user failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT_",
            invalidArgs: args,
            error,
          },
        });
      }
    },
  },
};

module.exports = resolvers;
