## command 
```js
nodemon index.js
```

### 깃헙인증 + mongoDB / .env파일을 추가해야 함. 
https://github.com/MoonHighway/learning-graphql/blob/master/chapter-05/photo-share-api/index.js
이 예제를 따라 공부한 것.  
## 토큰 받기
1. github.com/login/oauth/authorize?client_id=<USER_CLIENT_ID>&scope=user
2. http://localhost:3000/?code=<YOUR_CODE>  
3. 토큰을 받아 사용하면 됨. (깃헙에서 인증받은 코드 : 라고 서버에 뜨게 만듬)
```
{
    "Authorization": "fbc8c019fee72e88a77373f7612c2ca20648196c"
}
```
## GraphQL Query
```
query currentUser{
    me{
        githubLogin
        name
        avatar
    }
} 
mutation {
    addFakeUsers(count : 3){
        name
    }
}
``` 