const { query } = require('express');
const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

// Data for the example
const authors = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' },
];

const books = [
  { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
  { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
  { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
  { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
  { id: 5, name: 'The Two Towers', authorId: 2 },
  { id: 6, name: 'The Return of the King', authorId: 2 },
  { id: 7, name: 'The Way of Shadows', authorId: 3 },
  { id: 8, name: 'Beyond the Shadows', authorId: 3 },
];

// Connect to port 3000
app.listen(3000, () => console.log('Connect to server 3000'));

// Create AuthorType
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represent author name',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: GraphQLList(BookType),
      resolve: (author) => books.filter((book) => book.authorId === author.id),
    },
  }),
});

// Create BookType
const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represent a book writen by an author',
  // Each book has 3 fields, id, name and authorID
  // No need for resolve since the books variable already have data
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    // Problem statement, we want to get the corresponding author name
    authors: {
      type: AuthorType,
      resolve: (book) => authors.find((author) => author.id === book.authorId),
    },
  }),
});
// Create root query
const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: () => ({
    // Return a single book with passed in id
    book: {
      type: BookType,
      description: 'A single book',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    // Return a list/array of books
    books: {
      type: new GraphQLList(BookType), // list of book types
      description: 'List of books',
      resolve: () => books, //return the books array with id, name and authorId
    },
    // Return a single author with passed in id
    author: {
      type: AuthorType,
      description: 'A single author',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        authors.find((author) => author.id === args.id),
    },
    // Return a list/array of authors
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of authors',
      resolve: () => authors,
    },
  }),
});

// Create Root Mutation Type
const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a Book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        // Create a book with passed in name and authorID
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        // Add book the the collection
        books.push(book);
        // Return the newly created book
        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        // Create an author:
        const author = { id: authors.length + 1, name: args.name };
        // Update authors collection
        authors.push(author);
        // Return the newly created author
        return author;
      },
    },
  }),
});

// Create a schema:
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
// Add graphiql option to give us an acutal user interface to access graphQL server
app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));
