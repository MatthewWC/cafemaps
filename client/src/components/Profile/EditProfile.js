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
import Divider from '@material-ui/core/Divider'
// -----------------------------

//TODO: handle DDOS on register request

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
  },
  image: {
    maxHeight: '250px',
  },
  imageText: {
    margin: theme.spacing(1),
    textTransform: 'capitalize',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '40%'
  },
  imageContainer: {
    position: 'relative',
    width: '100%'
  }
}))

function EditProfile (props) {
  console.log(props)
  // material-ui instance
  const classes = useStyles()
  // element references
  let editProfileForm = React.createRef()
  let successfulText = React.createRef()
  let imageFile = React.createRef()
  let imageEle = React.createRef()

  const { loading, error, data } = useQuery(GET_USER, { variables: { email: localStorage.getItem('email') }})

  async function handleSubmit(event, props){
    let imageUrl

    event.preventDefault()

    try{
      //validate form
      validate(editProfileForm)
      // if image change, upload image
      if(imageFile.current.files[0]){
        const data = new FormData()
        let config = {
          headers: { 'Content-Type': 'multipart/form-data'}
        }
        data.append('file', imageFile.current.files[0])
        imageUrl = await axios.post('http://localhost:4000/upload', data, config)
        imageUrl = imageUrl.data
      }
      // hit database
      await props.client.mutate({
        mutation: gql`
          mutation updateUser($imageUrl: String, $firstName: String, $lastName: String){
            updateUser(imageUrl: $imageUrl, firstName: $firstName, lastName: $lastName){
              token 
              user{
                imageUrl
                firstName 
                lastName
              }
            }
          }`,
        variables: {
          imageUrl: imageUrl || imageEle.current.src,
          firstName: editProfileForm.current.firstName.value,
          lastName: editProfileForm.current.lastName.value
        }
      })
      // if successful, show it
      successfulText.current.hidden = false
    } catch (error) {
      throw new Error('Something bad happend. Contact support.')
    }
  }

  // handles file display when uploaded
  function handleChange(event){
    // if file selected changes
    if(event.target.files[0]){
      let image = URL.createObjectURL(event.target.files[0])
      imageEle.current.src = image
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
        hidden={true}
      >
        Update Successful{``}  <Link href={'./profile'}>view profile!</Link>
      </Typography>
      <div className={classes.editProfile}>
          <div className={classes.imageContainer}>
            <label display='inline-block'>
              <img 
                ref={imageEle}
                src={data.getUser.imageUrl || 'profile_basic.png'} 
                alt='profile' 
                className={classes.image}
                height='auto'
                width='100%'/>
              <input 
                ref={imageFile}
                className={classes.fileInput} 
                type='file'
                accept="image/*"
                onChange={(event) => {
                  handleChange(event)
                }}/>
              <Button 
                component='p'
                variant='contained'
                className={classes.imageText}>Edit Avatar</Button>
            </label>
          </div>
          <Divider/>
        <form
          name='updateUserForm'
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
      imageUrl
      firstName 
      lastName
      email
    }
  }
`