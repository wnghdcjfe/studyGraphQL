const { authorizeWithGithub } = require('../lib')
const fetch = require('node-fetch')
const { ObjectID } = require('mongodb')
const { uploadStream } = require('../lib')
const path = require('path') 
const {WriteStream} = require('fs-capacitor')
module.exports = {

  async postPhoto(parent, args, { db, currentUser, pubsub }) {

    if (!currentUser) {
      throw new Error('only an authorized user can post a photo')
    } 
    const newPhoto = {
      ...args.input,
      userID: currentUser.githubLogin,
      created: new Date()
    }   
    const { insertedId } = await db.collection('photos').insertOne(newPhoto) 
    console.log(`
    
      새로운 사진이 등록되었습니다 ${insertedId}
    
    `)   
    
    newPhoto.id = insertedId
    const photo_path =  path.join(__dirname, '../assets/photos', `${newPhoto.id}.jpg`)
    //Promise로 래핑되어있는 것을 푼다.  
    const { createReadStream } = await args.input.file    
    const stream = createReadStream(photo_path);    
    await uploadStream(stream, photo_path) 
    pubsub.publish('photo-added', { newPhoto })  
    return newPhoto

  },

  async tagPhoto(parent, args, { db }) {

    await db.collection('tags').replaceOne(args, args, { upsert: true })

    return db.collection('photos').findOne({ _id: ObjectID(args.photoID) })

  },

  async githubAuth(parent, { code }, { db }) {

    let {
      message,
      access_token,
      avatar_url,
      login,
      name
    } = await authorizeWithGithub({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code
    })

    if (message) {
      throw new Error(message)
    }

    let latestUserInfo = {
      name,
      githubLogin: login,
      githubToken: access_token,
      avatar: avatar_url
    }   
    const { ops:[user], result } = await db.collection('users').replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true }) 
    console.log("유저정보를 받았습니다.")
    console.log(user) 
    result.upserted && pubsub.publish('user-added', { newUser: user })

    return { user, token: access_token }
  
  },

  addFakeUsers: async (parent, { count }, { db, pubsub}) => {
    const RANDOM_USER_API = `https://randomuser.me/api/?results=${count}`
    const { results } = await fetch(RANDOM_USER_API).then(res => res.json())
    const users = results.map(r => ({
      githubLogin: r.login.username,
      name: `${r.name.first} ${r.name.last}`,
      avatar: r.picture.thumbnail,
      githubToken: r.login.sha1
    }))
    console.log(users)

    await db.collection('users').insertMany(users)
    
    const newUsers = await db.collection('users')
                             .find()
                             .sort({ _id: -1 })
                             .limit(count)
                             .toArray()
    console.log(newUsers)
    newUsers.forEach(newUser => pubsub.publish('user-added', {newUser}))
      

    return users
  },

  async fakeUserAuth(parent, { githubLogin }, { db }) {
    var user = await db.collection('users').findOne({ githubLogin })

    if (!user) {
      throw new Error(`Cannot find user with githubLogin "${githubLogin}"`)
    }

    return {
      token: user.githubToken,
      user
    }
  }

}