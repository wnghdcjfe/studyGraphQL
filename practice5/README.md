깃헙인증 + mongoDB / .env파일을 추가해야 함. 
https://github.com/MoonHighway/learning-graphql/blob/master/chapter-05/photo-share-api/index.js
이 예제를 따라 공부한 것.

https://github.com/login/oauth/authorize?client_id=de790a5cb30c3061f49f&scope=user

로 하게 되면 code가 나타남. 
http://localhost:4000/?code=b0a990def1eceb45efef
이런식으로 redirect되면서 code가 나타남.
b0a990def1eceb45efef

mutation {
    githubAuth(code : "b0a990def1eceb45efef"){
        token
        user{
            githubLogin
            name
            avatar
        }
    }
}

토큰 줌.. 
43476b77f87ccc006efbcdb561584ffc092e13bc

{
    "Authorization": "43476b77f87ccc006efbcdb561584ffc092e13bc"
}

query currentUser{
    me{
        githubLogin
        name
        avatar
    }
}

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

mutation {
    addFakeUsers(count : 3){
        name
    }
}

curl -X POST \
-H "Content-Type:application/json" \
--data '{"query" : "{totalUsers, totalPhotos}"}' \
http://localhost:4000/graphql
