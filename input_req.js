const axios = require('axios');
const age = 28
const dream = "아무래도 걱정돼 음식이나"
const name = "싸가시지"
const query = `mutation createHong($input : HongInput){
    createHong(input : $input){
        age
    }
}`;
axios.post('http://127.0.0.1:12010/graphql',{
    query : query, 
    variables : {
        input : {
            age, 
            dream, 
            name, 
        }
    }
}).then(res => console.log(res.data)).catch(e => console.log(e))