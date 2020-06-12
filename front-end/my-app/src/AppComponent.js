
class App extends Component {
  componentDidMount(){
    let {client} = this.props
    this.listenForUsers = client.subscribe({query : LISTEN_FOR_USERS}).subscribe(({data : {newUser}}) => {
      const data = client.readQuery({query : ROOT_QUERY})
      data.totalUsers += 1 
      data.allUsers = [
        ...data.allUsers, 
        newUser
      ]
      client.writeQuery({query : ROOT_QUERY, data})
    }) 
    this.listenForPhotos = client.subscribe({query : LISTEN_FOR_PHOTOS}).subscribe(({data : {newPhoto}}) =>{
      const data = client.readQuery({query : ROOT_QUERY})
      data.totalPhotos += 1 
      data.allPhotos = [
        ...data.allPhotos, 
        newPhoto
      ]
      client.writeQuery({query : ROOT_QUERY, data}) 
    })
  }
  componentWillUnmount(){
    this.listenForUsers.unsubscribe(); 
    this.listenForPhotos.unsubscribe();   
  }
  render(){
    return(
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
} 
export default withApollo(App)