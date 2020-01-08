//TODO: profile page
import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
// ---- material-ui imports ----
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'


// -----------------------------

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '90vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1024px',
    padding: '5%'
  },
  profile: {
    textAlign: 'center'
  }
}))

function Profile (props) {
  console.log(localStorage.getItem('email'))
  const classes = useStyles()
  const {loading, error, data} = useQuery(GET_USER,{variables: { email: localStorage.getItem('email')}})

  if(loading) {
    return(
      <div className={classes.root}>
        <h1>Loading....</h1>
      </div>
    )
  }

  if(error){
    return(
      <div className={classes.root}>
        <h1>Something bad has happened. Contact support.</h1>
      </div>
    )
  }

  console.log(data)
  return(
    <div className={classes.root}>
      <h1>{data.getUser.email}</h1>
      <h1>{data.getUser.firstName}</h1>
    </div>
  )
}

export default Profile

const GET_USER = gql`
  query getUser($email: String!){
    getUser(email: $email){
      firstName 
      lastName
      email
    }
  }
`