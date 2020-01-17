import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
// ---- material-ui imports ----
import { makeStyles } from '@material-ui/core/styles'
import { TableCell } from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
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
  storeAddress: {
    
  },
  upper: {
    display: 'flex',
    flexDirection: 'row'
  },
  upperLeft: {
    
  },
  upperRight: {

  },
  lower: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

function Store(){
  // material-ui styles instance
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_STORE, { variables: { id: 'd2338371-c21c-448d-9e52-975dcf4a9dc2' }})

  if(loading){
    return(
      <div className={classes.root}>
        <p>Loading...</p>
      </div>
    )
  }

  if(error){
    console.log(error)
    return(
      <div className={classes.root}>
        <p>error</p>
      </div>
    )
  }

  const hours = { 
    Monday: data.getStore.moHours, 
    Tuesday: data.getStore.tuHours, 
    Wednesday: data.getStore.weHours,
    Thursday: data.getStore.thHours,
    Friday: data.getStore.frHours,
    Saturday: data.getStore.saHours,
    Sunday: data.getStore.suHours
  }

  return(
    <div className={classes.root}>
      <div className={classes.upper}>
        <div className={classes.upperLeft}>
          <p>Future Image</p>
          <p>{data.getStore.rating}</p>
        </div>
        <div className={classes.upperRight}>
          <div className={classes.title}>
            <h1>{data.getStore.storeName}</h1>
          </div>
          <div className={classes.address}>
            <h3>{data.getStore.addressOne}</h3>
            <h3>{data.getStore.addressTwo}</h3>
            <h3>{data.getStore.zipcode}</h3>
            <h3>{data.getStore.state}</h3>
          </div>
          <div>
          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {
                  Object.keys(hours).map(day => {
                  return <TableCell key={day}>{day}</TableCell>
                  })
                }
              </TableRow>
              <TableRow>
                { Object.keys(hours).map(day => {
                    return <TableCell key={day}>{hours[day]}</TableCell>
                  })
                }  
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
          </div>
        </div>
      </div>
      <div className={classes.lower}>
        <div className={classes.features}>
          <p>Im future features</p>
        </div>
        <div className={classes.description}>
          <p>Im a future description</p>
        </div>
      </div>
    </div>
  )
}

export default Store

/* <p>{data.getStore.storeName}</p>
<p>{data.getStore.addressOne}</p>
<p>{data.getStore.addressTwo}</p>
<p>{data.getStore.city}</p>
<p>{data.getStore.state}</p>
<p>{data.getStore.zipcode}</p>
<p>{data.getStore.rating}</p>
<p>{data.getStore.wifi}</p>
<p>{data.getStore.bakery}</p>
<p>{data.getStore.milkAlt}</p>
<p>{data.getStore.indoorSeating}</p>
<p>{data.getStore.driveThru}</p> */

const GET_STORE = gql`
  query getStore($id: String!){
    getStore(id: $id){
      storeName
      email
      addressOne
      addressTwo
      city
      state
      zipcode
      moHours
      tuHours
      weHours
      thHours
      frHours
      saHours
      suHours
      rating
      wifi
      bakery
      milkAlt
      indoorSeating
      driveThru
    }
  }`