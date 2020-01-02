import React from 'react'
import Page from './Page'
// ---- material-ui imports ----
import Container from '@material-ui/core/Container'
// -----------------------------

function Main () {
  return(
    <Page>
      <Container maxwidth='md'>
        <h1>Main Page</h1>
      </Container>
    </Page>
  )
}

export default Main