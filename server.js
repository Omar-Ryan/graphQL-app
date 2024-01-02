const express = require("express");
const app = express();
const port = 3000;
const { buildSchema } = require("graphql");
// const {createHandler} = require("graphql-http");
const { graphqlHTTP } = require("express-graphql");
require("./connection");
const User = require("./modules/Users");

const schema = buildSchema(`
    type User {
        name : String!
        email:String!
    }

    input UserInput {
        name:String!
        email:String!
        password : String!
    }

    type Query{
        test:String
    }

    type Mutation {
        userCreate(input:UserInput) : User
    }

`);

const userQueries = {
  test: () => "success",
};

const userMutations = {
  userCreate: async ({ input }) => {
    const { name, email, password } = input;
    const UserCreated = new User({ name, email, password });
    await UserCreated.save();
    return {
      name,
      email,
    };
  },
};

const resolvers = {
  ...userQueries,
  ...userMutations,
};

app.use("/graphql", graphqlHTTP({ schema, resolvers, graphiql: true }));

app.listen(port, () => {
  console.log(`the server is working on port : ${port}`);
});
