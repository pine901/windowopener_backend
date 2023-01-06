import React from 'react';
import ReactDOM from 'react-dom';
import App from './ReactApp';
import {Provider} from 'react-redux'
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import store from './redux/store'
import '../css/app.css'
import constants from './config/constants';

const themes = {
  dark: constants.PUBLIC_URL + '/css/dark-theme.css',
  light: constants.PUBLIC_URL + '/css/light-theme.css',
};

ReactDOM.render(
  /*Redux Provider is included access the store values from anywhere inside the child components.*/
  <Provider store={store()}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme="dark" insertionPoint="styles-insertion-point">
      <App/>
    </ThemeSwitcherProvider>
  </Provider>,
  document.getElementById('app'),
);
