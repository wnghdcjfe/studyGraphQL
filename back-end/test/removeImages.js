
const { MongoClient } = require('mongodb')

require('dotenv').config() 
const MONGO_DB = process.env.DB_HOST 
const main = async() =>{
    const client = await MongoClient.connect(MONGO_DB, { useUnifiedTopology: true })
    const db = client.db() 
    db.collection('photos').deleteMany({})
    `
        photos라는 collection의 전부가 삭제되었습니다.
    `
} 
main();