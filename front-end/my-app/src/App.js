import React, {Fragment, useEffect } from 'react'
import Users from './Users'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthorizedUser from './AuthorizedUser'
import Photos from './Photos'
import PostPhoto from './PostPhoto'
import { gql } from 'apollo-boost'
import { withApollo } from 'react-apollo'

export const ROOT_QUERY = gql`
    query allUsers {
        totalUsers        
        allUsers { ...userInfo }
        me { ...userInfo }
        allPhotos{
          id
          name
          url
        }
    }

    fragment userInfo on User {
        githubLogin
        name
        avatar
    }
`

const LISTEN_FOR_USERS = gql`
    subscription{
      newUser{
        githubLogin
        name
        avatar
      }
    }
`

const LISTEN_FOR_PHOTOS = gql`
  subscription{
    newPhoto{
      id
      name
      url
    }
  }
` 
const App = ({client}) =>{ 
  useEffect(()=>{   
    let listenForUsers = client.subscribe({query : LISTEN_FOR_USERS}).subscribe(({data : {newUser}}) => {
      const data = client.readQuery({query : ROOT_QUERY})
      data.totalUsers += 1 
      data.allUsers = [
        ...data.allUsers, 
        newUser
      ]
      client.writeQuery({query : ROOT_QUERY, data})
    }) 
    let listenForPhotos = client.subscribe({query : LISTEN_FOR_PHOTOS}).subscribe(({data : {newPhoto}}) =>{
      const data = client.readQuery({query : ROOT_QUERY})
      data.totalPhotos += 1 
      data.allPhotos = [
        ...data.allPhotos, 
        newPhoto
      ]
      client.writeQuery({query : ROOT_QUERY, data}) 
    })
    
    return () =>{ 
      listenForUsers.unsubscribe(); 
      listenForPhotos.unsubscribe();  
      listenForUsers = listenForPhotos = null; 
    }
  }, [])
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component = {() => 
          <Fragment>
            <AuthorizedUser/>
            <Users/>
            <Photos/>
          </Fragment>
        }/>
      <Route path = "/newPhoto" component= {PostPhoto} />
      <Route component= {({location}) => <h1>"{location.pathname}" not found</h1>}/>
      </Switch>
    </BrowserRouter> 
  )
} 
export default withApollo(App)