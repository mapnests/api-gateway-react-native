import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './src/App';
import { name as appName } from './app.json';
import { store } from './src/store';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
