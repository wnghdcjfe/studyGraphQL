# studyGraphQL
악사야 풍악을 울려라 

공부방법
0. 그래프 QL 공식사이트[완료]
 - Getting Started
 - Running Express + GraphQL
 - GraphQL Clients
 - Basic Types
 - Passing Arguments
 - Object Types
 - Mutations and Input Types

여까지 하면 된다. 

1. 책예제 : https://github.com/MoonHighway/learning-graphql [완료] 

## 책보면서 주의할 점. 
deprecated된 것도 많고 npm install했을 때 안되는 것도 있음. 
```
1. insertedIds가 아니라 insertedId이다. 
2. compose는 사라진지 오래이다. lodash의 compose를 이용하자. 
3. File upload property ‘stream’ is deprecated. Use ‘createReadStream()’ instead.
4. react-apollo버전 때문이다. 지금 버전은 3.x, 근데 책의 버전은 2.x라서 Query컴포넌트가 없음.  
```

2. GraphQL - Node Tutorial : https://velog.io/@cadenzah/graphql-node-01-introduction

3. 채팅 : https://medium.com/wasd/graphql%EA%B3%BC-react%EB%A1%9C-%EC%B1%84%ED%8C%85-%EA%B5%AC%ED%98%84-server-side-672a289c9d14

4. 책 훑어보기  

## GraphQL 쿼리
```
subscription {
  new Photo{
    url
    category
    postedBy{
      githubLogin
      avatar
    }
  }
}
```


## env설정 
```
DB_HOST=mongodb://localhost:27017/practice
CLIENT_ID=
CLIENT_SECRET=
REACT_APP_CLIENT_ID

```
클라이언트 아이디는 gihub > setting > oauthApps 에 있다. 
리액트클라이언트 아이디로 다시 써줘야 하는데 리액트의 npm start를 할 때 이런 명으로 안쓰면 읽지를 못한다. 


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

좋은 링크 : https://gist.github.com/eveporcello/12c0f5070fd1c0bc3d9f02906f7743a8

아폴로 서버를 사용할 떄는 resolvers 에
```js
Query : {

}, 
Mutation : {

}, 
Subscription : {

}, 
Photo : {
  
}
```

이렇게 정리해서 한 객체에 집어넣게 된다. 

그러나 그냥 root해서 넣는 아폴로 서비스가 아닌 graphqlHTTP를 사용할 때는 root를 이용해서 넣어야 한다. 

input을 했으면 type도 무조건 설정해주어야 한다. 
```js
  input MessageInput{
    content : String 
    author : String
  }
  type Message {
    id : ID!
    content : String
    author : String
  }
```

input 은 말그대로 argument에나 쓰이는 것이며 그것을 인자로 받아서 반환할 "반환형이 무조건 필요하다. 또한 input은 새로운 변수명을 써야 한다. input 이름, type 이름 이런식으로 이름이 중복되면 안된다는 것이다. 즉, input 이름input 이런식의 변수명이 좋다. 

mutation을 할 때는 반환형을 반드시 표기해준다. 예를 들어 
```
mutation {
  createHong(input: {
    age : 28, 
    dream : "개발자", 
    name : "아무래도" 
  })
}
```

이렇게 하면 안되고

```
mutation {
  createHong(input: {
    age : 28, 
    dream : "개발자", 
    name : "아무래도" 
  })
}
```

이렇게 해야 한다. 
```
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
```

요청을 보낼때도 원래의 스키마에 맞게 보내야 한다 그렇지 않다면 400번의 애러를 반환한다. 이렇게 비즈니스 로직에서 처리를 하는게 아니라 Type처리로 한번에 해결하는 장점이 있다. 
```
const query = `mutation createHong($input : HongInput){
    createHong(input : $input){
        age
    }
}`;
```
이런식으로 해야 하는데 이렇게 age나 그런것들을 안맞춰준다면 바로 애러를 뿜어낸다. 훌륭하다. 


역시나 구조분해가 가능하다. 
즉, 이런식의 코딩이 가능한 것. 
```
        allPhotos : (parent, {after}) => {
            console.log(after)
            return photos
        }
```
parent는 나중에 url할 때 활용하는 것이고 after 등 다른 인자들을 받을 때 이렇게 하면 더 좋다.  


input 에 value를 넣을 때는 이렇게 넣으면 됨. (플레이그라운드 기준)
```
mutation post($input : PostPhotoInput!){
    postPhoto(input : $input){
        id
        url
        postedBy{
            name
            avatar
        }
    }
}

{
  "input": {
  	"name": "홍철"
	}
}
``` 
 

 