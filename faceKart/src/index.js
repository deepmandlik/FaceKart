import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter ,   Routes,
  Route, } from "react-router-dom";
  import { createTheme, ThemeProvider } from "@material-ui/core/styles";
  import { red, green, yellow } from "@material-ui/core/colors";
import Home from './pages/home';
import Feature from './pages/feature';

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#455a64",
    },
    secondary: {
      main: "#000000",
    },
    success: {
      main: green.A400,
    },
    warning: {
      main: yellow.A400,
    },
    error: {
      main: red.A400,
    },
    border: {
      main: "#D5D5D5",
      light: "#F1F1F1",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <BrowserRouter>
    <Routes>
      <Route path="/feature" element={<Feature />} /> 
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
