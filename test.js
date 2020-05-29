async fakeUserAuth(parent, {githubLogin}, {db}){
    var user = await db.collection('users').findOne({githubLogin})
    if(!user){

    }
    return {
        token : user.githubToken, 
        user
    }
}