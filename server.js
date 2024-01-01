/* const express = require("express");
const app = express();
const port = 3000;
const {buildSchema} = require("graphql");
// const {createHandler} = require("graphql-http");
const {graphqlHTTP} = require("express-graphql");




const schema = buildSchema(
    type Query{
        test:String
    }
    )
    
    const resolvers = {
        test:()=> "success"
    }
    

app.use("/graphql" , graphqlHTTP({schema , rootValue ,resolvers , graphiql:true }))

app.listen( port, () => {
  console.log(`the server is working on port : ${port}`);
}); */

const express = require("express");
const { createHandler } = require ('graphql-http/lib/use/express');
const { schema } = require ( './user');

// Create a express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
const app = express();
const port = 3000;
app.all('/graphql', createHandler({ schema }));

app.listen(port , ()=>{
    console.log(` Listening to port ${port}`);
});
