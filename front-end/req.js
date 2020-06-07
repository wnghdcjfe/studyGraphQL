const {request} = require('graphql-request')
const query = `
    query listUsers{
        allUsers{
            name
            avatar
        }
    }
`
request('http://localhost:4000/graphql', query).then(console).catch(console.error)
