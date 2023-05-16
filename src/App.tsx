import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Background } from './Components/Background';
import { useTheme } from '@mui/material';
import { Overlay } from './Pages/Overlay';

function App() 
{
  const theme = useTheme();
  const test = useRef();

  // useEffect(()=>{
  // },[])

  return (
    <>
      <Background/>
      <Overlay/>
    </>
  )
}

export default App

