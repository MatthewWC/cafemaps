import React, { Fragment } from 'react'

function Page ({ children, ...otherProps}) {

  return (
    <Fragment>
      <div>
        {children}
      </div>
    </Fragment>
  )
}

export default Page