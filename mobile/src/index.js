import React from 'react';
import {YellowBox, StatusBar} from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

import Routes from './routes';

function App() {
  return (
    <>
      <Routes />
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </>
  );
}

export default App;
