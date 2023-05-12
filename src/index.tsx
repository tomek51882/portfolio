import './style.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

let rootNode:ReactDOM.Root|undefined;

export function start()
{
    // ReportSoftwareVersion();
    console.log("Creating root container...");
    rootNode = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

    const primaryColor = '#00ff89';
    const secondaryColor = '#00894f';
    const theme = createTheme({
      palette: {
        mode: 'light',
        primary: {main: primaryColor},
        secondary: {main: secondaryColor},
        contrastThreshold:2
      }
    });

    rootNode.render(
        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <App/>
          </ThemeProvider>
        </React.StrictMode>
    );
}

function ReportSoftwareVersion()
{
  const devMode = process.env.REACT_APP_DEVELOPMENT_BUILD==="development"?true:false;
  console.log(`%cApp version: v${process.env.REACT_APP_VERSION} %c${devMode===true ? 'Dev': ""}`, "color:unset", "color:crimson");
}