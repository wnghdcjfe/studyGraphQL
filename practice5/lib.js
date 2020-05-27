const fetch = require('node-fetch')
const fs = require('fs')

const findBy = (value, arr, filed = 'id') => arr[arr.map(a => a[feild]).indexOf(value)]

const generateFakeUsers = count => fetch(`https://randomuser.me/api/?results=${count}`).then(res => res.json())
const reqGithubToken = credit => fetch('https://github.com/login/oauth/access_token',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify(credit)
}).then(res => res.json())

const reqGithubUserAccount = token => fetch(`https://api.github.com/user?access_token=${token}`).then(res => res.json())

const authorizeWithGithub = async credentials => {
    const { access_token } = await reqGithubToken(credentials)
    const githubUser = await reqGithubUserAccount(access_token)
    return { ...githubUser, access_token }
}

const saveFile = (stream, path) => 
    new Promise((resolve, reject) => {
        stream.on('error', error => {
            if (stream.truncated) {
                fs.unlinkSync(path)
            }
            reject(error)
        }).on('end', resolve)
        .pipe(fs.createWriteStream(path))
    })

const uploadFile = async (file, path) => {
    const { stream } = await file
    return saveFile(stream, path)
}

module.exports = {findBy, authorizeWithGithub, generateFakeUsers, uploadFile}