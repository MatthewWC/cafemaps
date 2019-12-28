import React from 'react'
import client from '../apolloClient.js'
import { ApolloProvider } from 'react-apollo'

function App() {
  return(
    <ApolloProvider client={client}>
      <div>
        <h1>
          {console.log(client)}
          test
        </h1>
      </div>
    </ApolloProvider>
  )
}

export default App