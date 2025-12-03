export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String
    createdAt: String
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  input CreatePostInput {
    title: String!
    content: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }
`;
