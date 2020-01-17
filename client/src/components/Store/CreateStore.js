import React from 'react'
import gql from 'graphql-tag'
// ---- material-ui imports ----
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// -----------------------------

// material-ui styles
const useStyles = makeStyles(theme => ({
  root: {

  }
}))

function CreateStore (props) {
  const classes = useStyles()
  let createStoreForm = React.createRef()
  const storeFields = {
    companyName: 'companyName', storeName: 'storeName', email: 'email', imageUrl: 'imageUrl', addressOne: 'addressOne',
    addressTwo: 'addressTwo', zipCode: 'zipcode', state: 'state', moHours: 'moHours', tuHours: 'tuHours', weHours: 'weHours',
    thHours: 'thHours', frHours: 'frHours', saHours: 'saHours', suHours: 'suHours', rating: 'rating', wifi: 'wifi', bakery: 'bakery',
     milkAlt: 'milkAlt', indoorSeating: 'indoorSeating', driveThru: 'driveThru',
  }

  async function handleSubmit(event, props) {
    
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event, props)
        }}
        ref={createStoreForm}>
        {Object.keys(storeFields).map(field => {
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
