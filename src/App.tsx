import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Background } from './Components/Background';
import { useTheme } from '@mui/material';
import { Overlay } from './Pages/Overlay';
import { BackgroundErrorBoundary } from './Components/BackgroundErrorBoundary';
import { Leva } from 'Leva';

function App() 
{
  const theme = useTheme();
  const test = useRef();
  const [playgroundMode, setPlaygroundMode] = useState<boolean>(false);
  const [sceneVisible, setSceneVisible] = useState<boolean>(true);

  function handleToggle(enabled:boolean)
  {
    if(sceneVisible===false)
    {
      setSceneVisible(true);
    }
    setPlaygroundMode(enabled);
  }
  function toggleScene()
  {
    // console.log("toggl")
    setSceneVisible(!sceneVisible);
  }

  return (
    <>
      <Leva hidden={playgroundMode===false}/>
        {sceneVisible && (
          <BackgroundErrorBoundary>
            <Background playgroundMode={playgroundMode} onExitPlayground={()=>{handleToggle(false)}}/>
          </BackgroundErrorBoundary>
        )}
      <Overlay sceneVisible={sceneVisible} playgroundMode={playgroundMode} onClick={()=>{handleToggle(true)}} onSceneToggle={()=>{toggleScene()}}/>
    </>
  )
}

export default App

