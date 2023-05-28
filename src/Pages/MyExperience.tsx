import React, { forwardRef, useEffect, useState } from "react";
import { PageContainer } from "../Components/Styled/PageContainer";
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Container, Divider, Grid, IconButton, Link, Paper, Stack,  Step,  StepButton,  StepContent,  StepLabel,  Stepper,  Typography, useTheme } from "@mui/material";
import { AssistWalker, DirectionsRun, OpenInNew } from "@mui/icons-material";
import styled from "@emotion/styled";

export const MyExperience = forwardRef( function MyExperience(props,ref)
{
  const theme = useTheme();
  
  return(
    <>
      <PageContainer ref={ref} minHeight={"unset"}>
        <Box component={"div"}>
          <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro", position:"relative", top:"0", left:"0.5rem", width:"fit-content"}}>{`<MyExperience>`}</Typography>
        </Box>
        <Container>
          <Box component='div' sx={{mb:2}}>
              <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro"}}>{`<Typography variant='h4' color={primary}>`}</Typography>
              <Typography variant='h4' color={theme.palette.primary.main} sx={{ml:4}}>My Experience</Typography>
              <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro"}}>{new String("</Typography>")}</Typography>
          </Box>
          {/* <Paper sx={{p:2, backgroundColor:theme.palette.primary.main, mb:2}}>
          </Paper> */}
          <SeparatorContainer><FadedSeparator/></SeparatorContainer>
          <Paper elevation={1} sx={{maxWidth:"800px", mr:"auto", ml:"auto", mt:2}}>
            <Grid container sx={{p:2}}>
              <Grid item sx={{width:128, height:128}}>
                {/* <Box component={"div"} style={{width:"100%", height:"100%", backgroundColor:"magenta"}}></Box> */}
                <img src={"./logos/oxLogo.png"} style={{width:"100%", height:"100%", borderRadius:"4px"}}/>
              </Grid>
              <Grid item xs sx={{pl:2}}>
                <Stack direction={"row"} justifyContent={"space-between"} sx={{flexDirection:{xs:"column", sm:"column", md:"row"}}} >
                  <Box component={"div"} sx={{display:"flex", alignItems:"center"}}>
                    <Typography variant='h6' color={"white"}><Link href="https://openexperience.de/" target="_blank" rel="noreferrer">Open&nbsp;Experience GmbH</Link></Typography>
                    <IconButton><OpenInNew fontSize="small"/></IconButton>
                  </Box>
                  <Typography variant='overline' color={theme.palette.text.disabled}>SEPTEMBER&nbsp;2021 – MARCH&nbsp;2023</Typography>
                </Stack>
                <Typography variant='subtitle1' color={"white"}>Full-stack Developer</Typography>
                <Typography variant='body1' color={"white"} sx={{textAlign:"justify", mt:2}}>I was mainly involved in building a 360-degree image viewer for an innovative new product. Additionally, I maintained a few older services and provided minor technical support.</Typography>
              </Grid>
              <Grid item xs={12}>
              <Divider sx={{color:"white", mb:2, mt:2}} />
                <Stack direction={"row"} gap={1} flexWrap="wrap">
                  <Chip label="JavaScript" />
                  <Chip label="TypeScript" />
                  <Chip label="React" />
                  <Chip label="THREE.JS" />
                  <Chip label="R3F" />
                  <Chip label="WebGL" />
                  <Chip label="Java" />
                  <Chip label="Spring Boot" />
                  <Chip label="REST API" />
                  <Chip label="MySQL" />
                  <Chip label="Microsoft Graph" />
                  <Chip label="Microsoft Azure" />
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          <SeparatorContainer><Separator/></SeparatorContainer>
          <Paper elevation={1} sx={{maxWidth:"800px", mr:"auto", ml:"auto", mt:2}}>
            <Grid container sx={{p:2}}>
              <Grid item sx={{width:128, height:128}}>
                {/* <Box component={"div"} style={{width:"100%", height:"100%", backgroundColor:"magenta"}}></Box> */}
                <img src={"./logos/oxLogo.png"} style={{width:"100%", height:"100%", borderRadius:"4px"}}/>
              </Grid>
              <Grid item xs sx={{pl:2}}>
                <Stack direction={"row"} justifyContent={"space-between"} sx={{flexDirection:{xs:"column", sm:"column", md:"row"}}} >
                  <Box component={"div"} sx={{display:"flex", alignItems:"center"}}>
                    <Typography variant='h6' color={"white"}><Link href="https://openexperience.de/" target="_blank" rel="noreferrer">Open&nbsp;Experience GmbH</Link></Typography>
                    <IconButton><OpenInNew fontSize="small"/></IconButton>
                  </Box>
                  <Typography variant='overline' color={theme.palette.text.disabled}>SEPTEMBER 2021 – MARCH 2023</Typography>
                </Stack>
                <Typography variant='subtitle1' color={"white"}>Intern</Typography>
                <Typography variant='body1' color={"white"} sx={{textAlign:"justify", mt:2}}>My primary responsibility was to develop a new administration service aimed at assisting our customers in managing a growing number of projects. A key aspect of this project involved automating the process of adding construction site plans to each project. This was achieved by implementing a functionality that automatically imported the plans from the Microsoft Teams team drive, based on user configuration, utilizing the Microsoft Graph API.</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{color:"white", mb:2, mt:2}} />
                <Stack direction={"row"} gap={1} flexWrap="wrap">
                  <Chip label="JavaScript" />
                  <Chip label="TypeScript" />
                  <Chip label="React" />
                  <Chip label="Java" />
                  <Chip label="Spring Boot" />
                  <Chip label="REST API" />
                  <Chip label="MySQL" />
                  <Chip label="Microsoft Graph" />
                  <Chip label="Microsoft Azure" />
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Container>

        <Box component={"div"} sx={{mt:2}}>
          <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro", position:"relative", bottom:"0.5rem", left:"0.5rem", width:"fit-content"}}>{`</MyExperience>`}</Typography>
        </Box>
      </PageContainer>
    </>
  )
})

const SeparatorContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
`
const Separator = styled.div`
margin-top: 1rem;
width: 8px;
height: 48px;
border-radius: 8px;
background-color: #1e1e1e;
`
const FadedSeparator = styled.div`
margin-top: 1rem;
width: 8px;
height: 96px;
border-radius: 8px;
background: linear-gradient(180deg, #0d0d0d 10%, #1e1e1e);
`
