const fetch = require('node-fetch')
const fs = require('fs')
const {WriteStream} = require('fs-capacitor')
const findBy = (value, array, field='id') => array[array.map(item=>item[field]).indexOf(value)]

const generateFakeUsers = count => 
    fetch(`https://randomuser.me/api/?results=${count}`)
        .then(res => res.json())

const requestGithubToken = credentials => 
    fetch(
        'https://github.com/login/oauth/access_token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(credentials)
        }
    ).then(res => res.json())

const requestGithubUserAccount = token => fetch(`https://api.github.com/user?access_token=${token}`).then(res => res.json())
        
const authorizeWithGithub = async credentials => {
    const { access_token } = await requestGithubToken(credentials)
    const githubUser = await requestGithubUserAccount(access_token) 
    console.log(`깃헙에서 인증받은 토큰 : ${access_token}`)
    return { ...githubUser, access_token }
}

const uploadStream = (stream, path) => 
    new Promise((resolve, reject) => { 
        const capacitor = new WriteStream()  
        const destination = fs.createWriteStream(path);  
        stream.pipe(capacitor)
        capacitor
            .createReadStream() 
            .pipe(destination)
            .on('error', reject)
            .on('finish', resolve)  
    }) 
module.exports = {findBy, authorizeWithGithub, generateFakeUsers, uploadStream}