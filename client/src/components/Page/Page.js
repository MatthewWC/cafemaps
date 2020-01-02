import React, { Fragment } from 'react'
import Header from './Header'

function Page ({ children, ...otherProps}) {

  return (
    <Fragment>
      <Header/>
      <div>
        {children}
      </div>
    </Fragment>
  )
}

export default Page