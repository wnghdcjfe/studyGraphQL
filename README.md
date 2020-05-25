# studyGraphQL
악사야 풍악을 울려라

공부방법
0. 그래프 QL 공식사이트
1. 책예제 : https://github.com/MoonHighway/learning-graphql/tree/master/chapter-03
 - 3장 : http://snowtooth.moonhighway.com/
2. 승원 : https://velog.io/@cadenzah/graphql-node-01-introduction
3. 채팅 : https://medium.com/wasd/graphql%EA%B3%BC-react%EB%A1%9C-%EC%B1%84%ED%8C%85-%EA%B5%AC%ED%98%84-server-side-672a289c9d14
4. 책 훑어보기 

## 질문사항
1. 왜 String!이 아폴로에서 안먹는거야..
```
const typeDefs = gql`
    type Query {
        hello : String!
이렇게 하면 안되지? 
"Cannot use GraphQLNonNull \"String!\" from another module or realm.
```

## 요약사항

```
const typeDefs = gql` 
    type Query {
        books : [Book]
    }
    type Book {
        title : String, author : String
    } 
`
```
이런식으로 Book클래스를 밑에다 놓아도 됨. 

graphQl docs와 apollo docs간의 차이점이 있으니 참고해야함. graphql을 공부할 때는 docs로 보고 예제 실행할 때는 apollo를 기준으로 하면 쉬움
```
mutation{
  createMessage(input :{
    author :"f", 
    content :"hope is a good thing"
  }) {
    id
  }
}
```
이런식으로 GraphiQL에는 날리지만 실제 보낼 때는
post로 
```
  body: JSON.stringify({
    query,
    variables: {
      input: {
        author,
        content,
      }
    }
  })
```
이렇게 해서 날린다. 
쿼리에는
```
var author = 'andy';
var content = 'hope is a good thing';
var query = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`; 
```
이런형식으로 담기게 된다. 

GraphQL에서 한글은 안됨

type를 지정할 때 resolver와 같은 이름으로 지정해야 한다. 