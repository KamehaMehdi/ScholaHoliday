import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import { Dashboard } from '../src/dashboard';


export default () => {

  const client = new ApolloClient({
    uri: 'http://127.0.0.1:8765/ql'
  })

  return (
    <ApolloProvider client={client}>
      <div style={{display:'flex', justifyContent:'center', marginTop: 100}}>
        <Dashboard/>
      </div>
    </ApolloProvider>
  );
}
