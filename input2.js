var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql'); 
const cors = require('cors')
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`  
  input HongInput{
    age : Int!
    dream : String!
    name : String!
  }
  type Hong{
    age : Int!
    dream : String!
    name : String!
  }
  type Query {
    rollDice(numDice : Int!, numSides : Int) : [Int]
    hello : String!
  }  
  type Mutation {
    createHong(input : HongInput) : Hong 
  }
`);   
let obj = {}
const root = {
  hello : () => "풍악을 울려라!" ,  
  rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }, 
  createHong : ({input}) => {
    console.log(input)
    obj[input.name] = {
      age : input.age, 
      dream : input.dream, 
      name : input.name,  
    }
    return obj[input.name]
  }
}
const app = express(); 
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema : schema, 
  rootValue : root, 
  graphiql : true
}))
app.listen(12010, () => console.log("서버시작")) 

/* 
query {
  rollDice(numDice : 1 numSides : 2)
  hello
}

mutation {
  createHong(input : {age : 28, dream : "개발자", name : "아무래도"})
}
mutation {
  createHong(input: {
    age : 28, 
    dream : "개발자", 
    name : "아무래도" 
  }){
    age
    dream
  }
}
*/