import React from 'react'
import gql from 'graphql-tag'
import axios from 'axios'
import storeFields from './storeFields'

// ---- material-ui imports ----
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Checkbox } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
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
    width: '50%'
  }
}))

function CreateStore (props) {
  const classes = useStyles()
  let createStoreForm = React.createRef()
  let imageEle = React.createRef()
  let imageFile = React.createRef()

  async function handleSubmit(event, props) {

    let imageUrl
    let variables = {}
    Object.keys(storeFields).map(field => {
      switch(createStoreForm.current[field].type){
        case 'checkbox':
          return variables[field] = createStoreForm.current[field].checked
        case 'text':
          return variables[field] = createStoreForm.current[field].value
        default:
          return null
      }
    })
 
    event.preventDefault()

    try{
      if(imageFile.current.files[0]){
        const data = new FormData()
        let config = {
          headers: { 'Content-Type': 'multipart/form-data'}
        }
        data.append('file', imageFile.current.files[0])
        imageUrl = await axios.post('http://localhost:4000/createStore', data, config)
        variables.imageUrl = imageUrl.data
        console.log(variables)
      }

      await props.client.mutate({
        mutation: CREATE_STORE,
        variables: variables
      })
      console.log('made it')
    } catch (error){
      console.log(error)
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

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
            <label display='inline-block'>
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
              <Button 
                component='p'
                variant='contained'
                className={classes.imageText}>Edit Avatar</Button>
            </label>
          </div>
      <form
        onSubmit={(event) => {
          handleSubmit(event, props)
        }}
        ref={createStoreForm}>
        {Object.keys(storeFields).map(field => {
          switch(storeFields[field]){
            case '':
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
            case false:
              return <FormControlLabel
                key={field}
                control={ <Checkbox
                  key={field}
                  className={classes.textField}
                  name={field}
                  />
                }
                label={field}
                />
            default:
              return null
          }
        })}
        <Button
          variant='contained'
          type='submit'>
          SUBMIT
        </Button>
      </form>
    </div>
  )
}

export default CreateStore

const CREATE_STORE = gql`
  mutation createStore(
    $companyName: String!,
    $storeName: String!,
    $email: String!,
    $imageUrl: String,
    $addressOne: String!,
    $addressTwo: String,
    $city: String!,
    $state: String!,
    $zipcode: String!,
    $moHours: String,
    $tuHours: String,
    $weHours: String,
    $thHours: String,
    $frHours: String,
    $saHours: String,
    $suHours: String,
    $rating: String,
    $wifi: Boolean,
    $bakery: Boolean,
    $milkAlt: Boolean,
    $indoorSeating: Boolean,
    $driveThru: Boolean,
    $clubCard: Boolean
    ){
      createStore(
        companyName: $companyName
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
        clubCard: $clubCard
        ){
          imageUrl
        }
    }
`

// variables: {
//   companyId: createStoreForm.current.companyId.value,
//   storeName: createStoreForm.current.storeName.value, 
//   email: createStoreForm.current.email.value,
//   imageUrl: createStoreForm.current.imageUrl.value,
//   addressOne: createStoreForm.current.addressOne.value,
//   addressTwo: createStoreForm.current.addressTwo.value,
//   city: createStoreForm.current.city.value,
//   state: createStoreForm.current.state.value,
//   zipcode: createStoreForm.current.zipcode.value, 
//   moHours: createStoreForm.current.moHours.value,
//   tuHours: createStoreForm.current.tuHours.value,
//   weHours: createStoreForm.current.weHours.value,
//   thHours: createStoreForm.current.thHours.value,
//   frHours: createStoreForm.current.frHours.value,
//   saHours: createStoreForm.current.saHours.value,
//   suHours: createStoreForm.current.suHours.value,
//   rating: createStoreForm.current.rating.value, 
//   wifi: createStoreForm.current.wifi.value, 
//   bakery: createStoreForm.current.bakery.value,
//   milkAlt: createStoreForm.current.milkAlt.value, 
//   indoorSeating: createStoreForm.current.indoorSeating.value,
//   driveThru: createStoreForm.current.driveThru.value
// }