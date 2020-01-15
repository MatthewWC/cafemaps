import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import validate from '../../tools/validator.js'
import axios from 'axios'

// ---- material-ui imports ----
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Input from '@material-ui/core/Input'
import Divider from '@material-ui/core/Divider'
// -----------------------------

// material-ui styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1024px',
    padding: '5%'
  },
  editProfile: {
    textAlign: 'center', 
    width: '100%',
    maxWidth: '300px'
  },
  textField: {
    width: '100%'
  },
  successfulText: {
    textAlign: 'center',
    maxHeight: '50px'
  },
  fileInput: {
    display: 'none'
  }
}))

function EditProfile (props) {
  console.log(props)
  // material-ui instance
  const classes = useStyles()
  // element references
  let editProfileForm = React.createRef()
  let successfulText = React.createRef()

  const { loading, error, data } = useQuery(GET_USER, { variables: { email: localStorage.getItem('email') }})

  async function handleSubmit(event, props){
    event.preventDefault()

    axios.post("http://localhost:4000/upload")
    try{
      await validate(editProfileForm)
      const results = await props.client.mutate({
        mutation: gql`
          mutation updateUser($firstName: String, $lastName: String){
            updateUser(firstName: $firstName, lastName: $lastName){
              token 
              user{
                firstName 
                lastName
              }
            }
          }`,
        variables: {
          firstName: editProfileForm.current.firstName.value,
          lastName: editProfileForm.current.lastName.value
        }
      })
      successfulText.current.hidden = false
      console.log(results.data.updateUser )
    } catch (error) {
      console.log(error)
    }
  }

  if(loading) {
    return(
      <div className={classes.root}>
        <h1>Loading....</h1>
      </div>
    )
  }

  if(error){
    console.log(error)
    return(
      <div className={classes.root}>
        <h1>{error.message}</h1>
      </div>
    )
  }

  return(
    <div className={classes.root}>
      <Typography 
        className={classes.successfulText}
        ref={successfulText} 
        hidden={true}>
        Update Successful
        <Link
          href={'./profile'}>
          view profile!
        </Link>
      </Typography>
      <div className={classes.editProfile}>
          <div>
            <label display='inline-block'>
              <img src={data.getUser.imageUrl ||'profile_basic.png'} alt='profile' height='auto' width='100%'/>
              <input className={classes.fileInput} type='file'/>
            </label>
          </div>
          <Divider/>
        <form
          ref={editProfileForm}
          onSubmit={(event) => {
            handleSubmit(event, props)
          }}>
          <TextField
            className={classes.textField}
            name='firstName'
            margin='normal'
            variant='outlined'
            label='First Name'
            defaultValue={data.getUser.firstName}
            InputLabelProps={{
              shrink: true,
            }}
            type='text'/>
            <TextField
            className={classes.textField}
            name='lastName'
            margin='normal'
            variant='outlined'
            label='Last Name'
            defaultValue={data.getUser.lastName}
            InputLabelProps={{
              shrink: true,
            }}
            type='text'/>
            <Button
              variant='contained'
              type='submit'
            >
              Update Profile
            </Button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile

const GET_USER = gql`
  query getUser($email: String!){
    getUser(email: $email){
      firstName 
      lastName
      email
    }
  }
`