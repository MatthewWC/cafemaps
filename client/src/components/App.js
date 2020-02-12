import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import React from 'react'

import { ApolloProvider } from 'react-apollo'
import client from '../apolloClient.js'

import Login from './Login'
import Register from './Register'
//import Header from './Header'
import Profile from './Profile'
import EditProfile from './Profile/EditProfile'
import MapView from './MapView'
import Admin from './Admin/Admin'

//TODO: further secure admin endpoints with protected route  
//TODO: fix conditional rendering with redirect "mapView" cant be accessed without login

function App() {
  
  return(
    <ApolloProvider client={client}>
      <BrowserRouter>     
        <Switch>
          <Route 
            exact path='/'
            render={props => <MapView {...props} client={client}/>}
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
          <ProtectedAdminRoute>
            <Route
              exact path='/admin'
              render={props => <Admin {...props} client={client}/>}
            />
          </ProtectedAdminRoute>
          <ProtectedUserRoute>
            <Route 
              exact path='/profile'
              render={props => <Profile {...props} client={client}/>}
            />
            <Route 
              exact path='/edit_profile'
              render={props => <EditProfile {...props} client={client}/>}
            />
          </ProtectedUserRoute>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

// handle logged out
function ProtectedUserRoute({
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

function ProtectedAdminRoute({
  children,
  ...props
}){
  return(
    <Route render={props => {
      return(
        localStorage.getItem('role') === 'ADMIN' ? (children) : (<Redirect to={{ pathname: '/'}}/>)
      )
    }}/>
  )
}

export default App