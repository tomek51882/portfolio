import { LightMode } from "@mui/icons-material";
import { Stack, Button, IconButton, Typography, Divider, Box } from "@mui/material";
import React, { forwardRef, useRef } from "react";
import { PageContainer } from "../Components/Styled/PageContainer";

export const HomePage = forwardRef( function HomePage(props, ref)
{

  return (
    <>
      <PageContainer ref={ref} style={{background:"linear-gradient(0deg, #0d0d0d 5%, transparent 20%)"}}>
        <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro", position:"absolute", top:"4rem", left:"0.5rem"}}>{`<HomeView>`}</Typography>
        <Box component="div" style={{ padding: "1rem", position: "absolute", top:"50vh", transform: "translate(0%, -50%)", maxWidth:"min-content"}} >
          <Typography variant='h2' color={"primary"} sx={{textShadow:"4px 4px 5px black"}} >Tomasz&nbsp;Jędrzejczak</Typography>
          <Typography variant='h4' color={"primary"} sx={{textShadow:"4px 4px 5px black"}} >Software&nbsp;Engineer</Typography>
          <Divider sx={{m:1}}/>
          {/* <Typography variant='body1' color={"primary"} sx={{fontStyle:"italic"}}>Hi! Nice to see you, hope you will have a great time!</Typography> */}
          <Typography variant='body1' color={"primary"} sx={{fontStyle:"italic",textShadow:"4px 4px 5px black", textAlign:"justify"}}>
          Hello! I'm a passionate software engineer with a strong foundation in computer science.
          </Typography>
          <Typography variant='body1' color={"primary"} sx={{mt:2,fontStyle:"italic",textShadow:"4px 4px 5px black", textAlign:"justify"}}>
          I had the opportunity to work as a full-stack developer, primarily utilizing TypeScript and Java to develop web applications. Although my professional experience lies in different technologies, 
          I have been actively pursuing personal projects using C#, specifically working with .NET Core platform and frameworks like Blazor and EF.
          </Typography>
        </Box>
        <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro", position:"absolute", bottom:"0.5rem", left:"0.5rem"}}>{`</HomeView>`}</Typography>
      </PageContainer>
    </>
  )
});
