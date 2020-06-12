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

이 때 잘 안될 떄가 있는데 1번 url말고 localhost:4000 이렇게 들어가서 리다이렉트를 시켜서 하는게 좋다. 토큰이 갱신되어야 하므로. 

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