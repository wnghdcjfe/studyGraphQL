var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input MessageInput{
    content : String 
    author : String
  }
  type Message {
    id : ID!
    content : String
    author : String
  }
  type Message2 { 
    content : String
    author : String
  }

  type Query {
    getMessage(id : ID!) : Message
  }
  type Mutation {
    createMessage(input : MessageInput) : Message
    createMessage2(input : MessageInput) : Message2
    updateMessage(id : ID!, input : MessageInput) : Message
  } 
`);

// If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}
class Message2 {
  constructor({content, author}) { 
    this.content = content;
    this.author = author;
  }
}


let obj = {}
const root = {
  getMessage : ({id}) =>{
    if(!obj[id]) throw new Error("이런 아이디가 없네. ")
    return new Message(id, obj[id])
  }, 
  createMessage : ({input}) =>{
    const id = require('crypto').randomBytes(10).toString('hex')
    obj[id] = input
    return new Message(id, input)
  }, 
  createMessage2 : ({input}) =>{
    const id = require('crypto').randomBytes(10).toString('hex')
    obj[id] = input
    return new Message2(input)
  }, 
  updateMessage : ({id, input}) => {
    if(!obj[id])throw new Error("이런 아이디가 없네. ")
    obj[id] = input
    return new Message(id, input)
  }
}
const app = express(); 
app.use('/graphql', graphqlHTTP({
  schema : schema, 
  rootValue : root, 
  graphiql : true
}))
app.listen(12011, () => console.log("서버시작")) 
/*
mutation {
  createMessage(input: {
    author: "andy",
    content: "hope is a good thing",
  }) {
    id
  }
}
mutation {
  createMessage2(input: {
    author: "andy",
    content: "hope is a good thing",
  })
  {
    content
    author
  }
}
*/