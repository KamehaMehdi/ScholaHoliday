import React from 'react';

import { Dashboard } from '../src/dashboard';



export default () => {

  const [isConnected, setIsConnected] = React.useState(true);

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      { isConnected ? <Dashboard/> : <Connection/> }
    </div>
  );
}

const Connection = () => {
  return (
    <div>

    </div>
  )
}
