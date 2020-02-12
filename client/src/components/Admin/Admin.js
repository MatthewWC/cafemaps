import React from 'react'
import axios from 'axios'
import gql from 'graphql-tag'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from  '@material-ui/core/TextField'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  adminRoot: {

  },
  form: {

  }
}))

function Admin (props) {
  // M-UI styles instance
  const classes = useStyles()
  // refs
  const formRef = React.useRef()

  async function handleSubmit(event){
    console.log(event)
  }

  return(
    <Grid container className={classes.adminRoot}>
      <form 
        ref={formRef} 
        onSubmit={(event) => { handleSubmit(event)}}
        className={classes.form}
      >
        <TextField/>
      </form>
    </Grid>
  )
}

export default Admin

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
      Store
    }
  }`


