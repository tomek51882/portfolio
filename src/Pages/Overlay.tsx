import styled from "@emotion/styled";
import { DarkMode, GitHub, LightMode, LinkedIn, PauseCircle, Translate } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { PageContainer } from "../Components/Shared/PageContainer";
import { HomePage } from "./HomePage";
import { MyExperience } from "./MyExperience";
import { MyProjects } from "./MyProjects";

export function Overlay()
{
    return (
    <>
        <Stack spacing={1} direction="row" sx={{p:1, position:"fixed", top:0, left:0, width:"100%", zIndex:1, backdropFilter:"blur(6px)", backgroundColor:"#00000033"}} justifyContent={"space-between"}>
          <Box component="div">
            <Button>Career</Button>
            <Button>My Projects</Button>

          </Box>
          <Box component="div" style={{marginRight:"24px", display:"flex"}}>
            {/* <Button>EN</Button>
             */}
             
             {/* <IconButton color='primary'>
              <Translate/>
            </IconButton> */}
            <Tooltip title="LinkedIn">
              <IconButton color='primary'>
                <LinkedIn/>
              </IconButton>
            </Tooltip>
            <Tooltip title="GitHub">
              <IconButton color='primary'>
                <GitHub/>
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem/>
            <Tooltip title="Stop animation">
              <IconButton color='primary'>
                <PauseCircle/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Change Language">
              <IconButton color='primary'>
                <Translate/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Light Mode">
              <IconButton color='primary'>
                <DarkMode/>
              </IconButton>
            </Tooltip>

          </Box>
        </Stack> 
        <OverlayContainer>
            <HomePage/>
            <MyExperience/>
            <MyProjects/>
        </OverlayContainer>
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

