import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import React from 'react'

import { ApolloProvider } from 'react-apollo'
import client from '../apolloClient.js'

import Login from './Login'
import Register from './Register'
import Map from './Map'
import Header from './Header'
import Profile from './Profile'
import Store from './Store'
import CreateStore from './Store/CreateStore'
import EditProfile from './Profile/EditProfile'
import MapView from './MapView'

//TODO: further secure admin endpoints with protected route  
//TODO: fix conditional rendering with redirect "mapView" cant be accessed without login

function App() {

  return(
    <ApolloProvider client={client}>
      <BrowserRouter>     
        <Switch>
          <Route 
            exact path='/map_view'
            render={props => <MapView {...props} client={client}/>}
          />
          <Route
            exact path='/createStore'
            render={props => <CreateStore {...props} client={client}/>}
          />
          <Route
            exact path='/store'
            render={props => <Store {...props} client={client}/>}
          />
          <Route
            exact path='/'
            render={props => <Map {...props} client={client}/>}
          />
          <Route 
            exact path='/register'
            render={props=> localStorage.getItem('token') ? 
             (<Redirect to={{ pathname: '/'}}/>) : (<Register {...props} client={client}/>)}
          />
          <Route 
            exact path='/login' 
            render={props => localStorage.getItem('token') ? 
             (<Redirect to={{ pathname: '/'}}/>) : (<Login {...props} client={client}/>)}
          />
          <ProtectedRoute>
            <Route 
              exact path='/profile'
              render={props => <Profile {...props} client={client}/>}
            />
            <Route 
              exact path='/edit_profile'
              render={props => <EditProfile {...props} client={client}/>}
            />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

// handle logged out
function ProtectedRoute({
  children,
  ...props
}){
  return(
    <Route render={props => {
      return(
        localStorage.getItem('token') ? (children) : (<Redirect to={{ pathname: '/login'}}/>)
      )
    }}/>
  )
}

export default App