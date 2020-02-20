import React from 'react'
import axios from 'axios'
import gql from 'graphql-tag'
import validate from '../../tools/validator'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from  '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormHelperText from '@material-ui/core/FormHelperText'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  adminRoot: {
    height: '90vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1024px',
    padding: '5%'
  },
  form: {

  },
  textField: {

  },
  checkbox: {

  },
  image: {
    height: '100px',
    width: '100px'
  },
  imageContainer: {
    position: 'relative',
    width: '50%'
  }
}))

function Admin (props) {
  // object to map input fields
  const storeFields = {
    companyName: 'String',
    latitude: 'Float',
    longitude: 'Float',
    storeName: 'String',
    email: 'String',
    addressOne: 'String',
    addressTwo: 'String',
    city: 'String',
    state: 'String',
    zipcode: 'String',
    moHours: 'String',
    tuHours: 'String',
    weHours: 'String',
    thHours: 'String',
    frHours: 'String',
    saHours: 'String',
    suHours: 'String',
    rating: 'String',
    wifi: 'Boolean',
    bakery: 'Boolean',
    milkAlt: 'Boolean',
    indoorSeating: 'Boolean',
    driveThru: 'Boolean',
    roastery: 'Boolean'
  }
  // M-UI styles instance
  const classes = useStyles()
  // refs
  let formRef = React.useRef()
  let imageEle = React.useRef()
  let imageFile = React.useRef()
  let errorText = React.useRef()

  async function handleSubmit(event, props){
    event.preventDefault()
    
    let imageUrl 
    let variables = {}
    // map form to build variables object
    Object.keys(storeFields).map(field => {
      switch(formRef.current[field].type){
        case 'checkbox':
          return variables[field] = formRef.current[field].checked
        case 'text':
          return variables[field] = formRef.current[field].value
        case 'number': 
          return variables[field] = parseFloat(formRef.current[field].value)
        default:
          return null
      }
    })
    // only issue with this i see atm, is that you could in theory save images to AWS without actually createing a store
    // because it's a two part process. S3 doesnt seem to double save the same image anyways though, and worst case
    // admins should still be able to delete the images in S3 aslong as they have access.
    try{
      validate(formRef)
      // if theres a file in the file input state
      if(imageFile.current.files[0]){
        // instantiate new form data
        const data = new FormData()
        // build header before sending to server
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        // append the file to form data
        data.append('file', imageFile.current.files[0])
        // attempt to send file to backend, and AWS S3 bucket
        imageUrl = await axios.post('http://localhost:4000/createStore', data, config)
        // if successful attach imageurl to object we plan to send to create store resolver
        variables.imageUrl = imageUrl.data
        console.log(variables)

        const store = await props.client.mutate({
          mutation: CREATE_STORE,
          variables: variables
        })
        console.log(store)
      } 
    }
    catch( error ){
      let errMsg
      // handle unsuccessful response
      errMsg = error.toString().lastIndexOf(':') + 1
      errorText.current.innerHTML = error.toString().substring(errMsg, 75)
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

  return(
    <Grid container className={classes.adminRoot}>
      <div className={classes.imageContainer}>
        <label>
          <img 
            ref={imageEle}
            src={'profile_basic.png'} 
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
        </label>
      </div>
      <form
        name='createStoreForm'
        ref={formRef} 
        onSubmit={(event) => { handleSubmit(event, props)}}
        className={classes.form}
      >
        {Object.keys(storeFields).map(field => {
          switch(storeFields[field]){
            case 'String':
              return <TextField 
              key={field}
              className={classes.textField}
              name={field}
              margin='normal'
              variant='outlined'
              label={field}
              InputLabelProps={{
                shrink: true,
              }}
              type='text'/>
            case 'Boolean':
              return <FormControlLabel
                key={field}
                control={ <Checkbox
                  key={field}
                  className={classes.checkbox}
                  name={field}
                  />
                }
                label={field}
                />
            case 'Float':
              return <TextField
                key={field}
                className={classes.textField}
                name={field}
                margin='normal'
                variant='outlined'
                label={field}
                inputProps={{ step: 'any' }}
                InputLabelProps={{
                  shrink: true,
                }}
                type='number'
                step='any'
                />
            default:
              return null
          }
        })}
        <FormHelperText
          className={classes.errors}
          ref={errorText}
          error={true}
        >
        </FormHelperText>
        <Button
          type='submit'
          variant='contained'>
          SUBMIT
        </Button>
      </form>
    </Grid>
  )
}

export default Admin

// imageUrl and email should default to companys if not supplied
const CREATE_STORE = gql`
  mutation createStore( 
    $companyName: String!,
    $latitude: Float!,
    $longitude: Float!,
    $storeName: String!,
    $email: String,
    $imageUrl: String,
    $addressOne: String!,
    $addressTwo: String,
    $city: String!,
    $state: String!,
    $zipcode: String!,
    $moHours: String!,
    $tuHours: String!,
    $weHours: String!,
    $thHours: String!,
    $frHours: String!,
    $saHours: String!,
    $suHours: String!,
    $rating: String,
    $wifi: Boolean,
    $bakery: Boolean,
    $milkAlt: Boolean,
    $indoorSeating: Boolean,
    $driveThru: Boolean,
    $roastery: Boolean
  ){
    createStore(
      companyName: $companyName,
      latitude: $latitude,
      longitude: $longitude,
      storeName: $storeName,
      email: $email,
      imageUrl: $imageUrl,
      addressOne: $addressOne,
      addressTwo: $addressTwo,
      city: $city,
      state: $state,
      zipcode: $zipcode,
      moHours: $moHours,
      tuHours: $tuHours,
      weHours: $weHours,
      thHours: $thHours,
      frHours: $frHours,
      saHours: $saHours,
      suHours: $suHours,
      rating: $rating,
      wifi: $wifi,
      bakery: $bakery,
      milkAlt: $milkAlt,
      indoorSeating: $indoorSeating,
      driveThru: $driveThru,
      roastery: $roastery
    ){
      storeName
    }
  }`