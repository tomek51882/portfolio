import React, { useEffect, useRef, useState } from 'react'
import { ComponentA } from './ComponentA'
import styled from '@emotion/styled'
import {OrbitControls, PerspectiveCamera, Scroll, ScrollControls, SpotLight, Stats} from "@react-three/drei";
import { CameraProps, Canvas } from '@react-three/fiber';
import { AppBar, Box, Button, Container, Divider, IconButton, Stack, Theme, Toolbar, Typography, useTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Menu } from '@mui/icons-material';
import { HomeScene } from './Pages/HomeScene';

function App() 
{
  const theme = useTheme();

  return (
    <>
      {/* <div style={{position:"absolute", zIndex:100, width:"100%", backdropFilter:"blur(4px)"}}>
        <Box component="div" sx={{p:1}}>
          <Stack spacing={1} direction="row">
            <Button>Career</Button>
            <Button>My Projects</Button>
          </Stack>
        </Box>
        <Divider color='primary'/>
      </div> */}
      <Canvas id='test123'>
        <ScrollControls pages={3} damping={0.2} style={{right:"-18px", width:"unset"}}> 
          <HomeScene/>
          {/* <Test html>
            <ThemeProvider theme={theme}>
              <Box component="div" style={{padding: "1rem", position: "absolute", top:"50vh", transform: "translate(0%, -50%)"}} >
                <Typography variant='h2' color={"primary"} >Tomasz Jędrzejczak</Typography>
                <Typography variant='h4' color={"primary"} >Software Developer</Typography>
              </Box>

              <Box component="div" style={{padding: "1rem", position: "absolute", top:"100vh"}} >
                <Container sx={{backdropFilter:"blur(4px)", backgroundColor:"#0000002e", borderRadius:"5px", pt:2, pb:2}}>
                  <Typography variant='h4' color={"primary"} >Career</Typography>
                  <Divider color='primary' sx={{mb:2}}/>
                  <Typography variant='h4' color={"primary"}> Open Experience - Junior Developer</Typography>
                  <Typography variant='h6' color={"secondary"}> SEPTEMBER 2021 – MARCH 2023, KARLSRUHE, GERMANY</Typography>
                  <Box component="div">
                    <Typography variant='body1' color={"primary"}>
                    Full Stack Developer. Main tasks: Improving and maintaining the Open Experience Application available in Microsoft Teams. Development of the 360° pictures viewer using Three.JS.
                    </Typography>
                  </Box>
                  <Divider color='primary' sx={{mb:2, mt:2}}/>
                  <Typography variant='h4' color={"primary"}> Open Experience - Intern</Typography>
                  <Typography variant='h6' color={"secondary"}> SEPTEMBER 2020 – FEBRUARY 2021, KARLSRUHE, GERMANY</Typography>
                  <Box component="div" >
                    <Typography variant='body1' color={"primary"}>
                      Design and develop from scratch Open Experience application for Microsoft Teams with file synchronization between Open Experience and Microsoft Sharepoint using Microsoft Graph, ReactJS, Spring Boot, MySQL
                    </Typography>
                  </Box>
                </Container>
              </Box>

              <Box component="div" style={{padding: "1rem", position: "absolute", top:"200vh"}} >
                <Typography variant='body1' color={"primary"} >Page 3</Typography>
              </Box>
            </ThemeProvider>
          </Test> */}
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default App

const Test = styled(Scroll)`
width: 100%
`

const BoxDiv = styled.div`
border: 1px solid red;
position: relative;
height:100vh
`;