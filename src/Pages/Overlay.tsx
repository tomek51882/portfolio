import styled from "@emotion/styled";
import { Construction, DarkMode, GitHub, Home, LightMode, LinkedIn, PauseCircle, PlayCircle, StopCircle, Translate, Work } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef } from "react";
import { PageContainer } from "../Components/Styled/PageContainer";
import { HomePage } from "./HomePage";
import { MyExperience } from "./MyExperience";
import { MyProjects } from "./MyProjects";
import { WorkedOn } from "./WorkedOn";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
interface OverlayProps
{
  playgroundMode:boolean;
  sceneVisible:boolean;
  onClick:()=>void;
  onSceneToggle:()=>void;
}
export function Overlay(props:OverlayProps)
{

  const homeRef = useRef<any>(null!);
  const careerRef = useRef<any>(null!);
  const projectsRef = useRef<any>(null!);
  const theme = useTheme();
  const compact = !useMediaQuery('(min-width:500px)');

    return (
    <>
        {props.playgroundMode===false && (
          <>
            <Stack spacing={1} direction="row" sx={{p:1, position:"fixed", top:0, left:0, width:"100%", zIndex:1, backdropFilter:"blur(6px)", backgroundColor:"#00000033"}} justifyContent={"space-between"}>
              <Box component="div">
                {/* {theme.} */}
                {compact ? (
                  <>
                  <Tooltip title="Home">
                    <IconButton color='primary' onClick={()=>{homeRef.current.scrollIntoView({ behavior: "smooth" })}}>
                      <Home/>
                    </IconButton>
                  </Tooltip>
                <Tooltip title="Career">
                  <IconButton color='primary' onClick={()=>{careerRef.current.scrollIntoView({ behavior: "smooth" })}}>
                    <Work/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Projects">
                  <IconButton color='primary' onClick={()=>{projectsRef.current.scrollIntoView({ behavior: "smooth" })}}>
                    <Construction/>
                  </IconButton>
                </Tooltip>
                  </>
                ) : (
                  <>
                    <Button onClick={()=>{homeRef.current.scrollIntoView({ behavior: "smooth" })}}>Home</Button>
                    <Button onClick={()=>{careerRef.current.scrollIntoView({ behavior: "smooth" })}}>Career</Button>
                    <Button onClick={()=>{projectsRef.current.scrollIntoView({ behavior: "smooth" })}}>Projects</Button>
                  </>
                )}
              </Box>
              <Box component="div"style={{marginRight: "24px", display:"flex"}}>
                {/* <Button>EN</Button>
                */}
                
                {/* <IconButton color='primary'>
                  <Translate/>
                </IconButton> */}
                <Tooltip title="LinkedIn">
                  <IconButton color='primary' onClick={()=>{window.open('https://www.linkedin.com/in/tomasz-j%C4%99drzejczak-604a151a9/', '_blank','noreferrer');}}>
                    <LinkedIn/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="GitHub">
                  <IconButton color='primary' onClick={()=>{window.open('https://github.com/tomek51882', '_blank','noreferrer');}}>
                    <GitHub/>
                  </IconButton>
                </Tooltip>
                <Divider orientation="vertical" flexItem/>
                <Tooltip title="Stop animation" placeholder="bottom-start">
                  <IconButton color='primary' onClick={()=>{props.onSceneToggle()}}>
                    {props.sceneVisible ? <StopCircle color="error"/> : <PlayCircle/>}
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title="Change Language">
                  <IconButton color='primary'>
                    <Translate/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Light Mode">
                  <IconButton color='primary'>
                    <DarkMode/>
                  </IconButton>
                </Tooltip> */}

              </Box>
            </Stack> 
            <OverlayContainer>
                <HomePage ref={homeRef}/>
                <MyExperience ref={careerRef}/>
                <WorkedOn ref={projectsRef}/>
                <MyProjects/>
                <Contact/>
                <Footer/>
              <Typography 
                variant='subtitle1' 
                color={"#5a5a5a"}
                onClick={()=>{props.onClick()}}
                sx={{fontSize:"0.8rem", "&:hover":{cursor:"pointer", textDecoration:"underline", color:"#6a6a6a"}}} 
                style={{ fontFamily:"Source Code Pro", position:"absolute", top:"4rem", right:"1rem"}}
              >
                {`Background playground >`}
              </Typography>
            </OverlayContainer>
          </>
        )}
    </>
    )
}


const OverlayContainer = styled(Box)
`
top:0;
left:0;
position: absolute;
width: 100%;
height: 100vh;
`

