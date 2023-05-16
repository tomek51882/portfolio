import React, { useEffect, useState } from "react";
import { PageContainer } from "../Components/Shared/PageContainer";
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Container, Divider, Grid, IconButton, Paper, Stack,  Step,  StepButton,  StepContent,  StepLabel,  Stepper,  Typography, useTheme } from "@mui/material";
import { AssistWalker, DirectionsRun, OpenInNew } from "@mui/icons-material";
import styled from "@emotion/styled";
// import OxLogo from "../pobrane.png";
const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];
const oxLogo = "data:image/png;base64,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";
export function MyExperience()
{
  const theme = useTheme();
  const [currentWork, setCurrentWork] = useState<number>(0);
  
  return(
    <>
      <PageContainer>
        <Container sx={{mt:3}}>
              <Typography variant='caption' color={theme.palette.text.disabled}>{new String("<Typography variant='h4' color={theme.palette.primary.main}>")}</Typography>
              <Typography variant='h4' color={theme.palette.primary.main}>My Experience</Typography>
              <Typography variant='caption' color={theme.palette.text.disabled}>{new String("</Typography>")}</Typography>
            {/* <Paper sx={{p:2, backgroundColor:theme.palette.primary.main, mb:2}}>
            </Paper> */}
            <SeparatorContainer><FadedSeparator/></SeparatorContainer>
            <Paper elevation={1} sx={{maxWidth:"800px", mr:"auto", ml:"auto", mt:2}}>
              <Grid container sx={{p:2}}>
                <Grid item sx={{width:128, height:128}}>
                  {/* <Box component={"div"} style={{width:"100%", height:"100%", backgroundColor:"magenta"}}></Box> */}
                  <img src={oxLogo} style={{width:"100%", height:"100%", borderRadius:"4px"}}/>
                </Grid>
                <Grid item xs sx={{pl:2}}>
                  <Stack direction={"row"} justifyContent={"space-between"} >
                    <Box component={"div"} sx={{display:"flex", alignItems:"center"}}>
                      <Typography variant='h6' color={"white"}>Open Experience GmbH</Typography>
                      <IconButton><OpenInNew fontSize="small"/></IconButton>
                    </Box>
                    <Typography variant='overline' color={theme.palette.text.disabled}>SEPTEMBER 2021 – MARCH 2023</Typography>
                  </Stack>
                  <Typography variant='subtitle1' color={"white"}>Software Engineer</Typography>
                  
                  <Typography variant='body1' color={"white"}>I was involved into building a 360 degree image viewer for a innovative but fundamentally flawed product that have a really grim future.</Typography>
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
                    <Chip label="MySQL" />
                    <Chip label="Microsoft Graph" />
                    <Chip label="Microsoft Azure" />
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
            
            {/* <SeparatorContainer><Separator/></SeparatorContainer>
            <Paper elevation={1} sx={{maxWidth:"800px", mr:"auto", ml:"auto", mt:2}}>
              <Box component={"div"} sx={{p:2, textAlign:"center"}}>
                <Typography variant='body1' color={"white"} >Getting Bachelor Degree: IT Engineer</Typography>
              </Box>
            </Paper> */}
            <SeparatorContainer><Separator/></SeparatorContainer>
            <Paper elevation={1} sx={{maxWidth:"800px", mr:"auto", ml:"auto", mt:2}}>
              <Grid container sx={{p:2}}>
                <Grid item sx={{width:128, height:128}}>
                  {/* <Box component={"div"} style={{width:"100%", height:"100%", backgroundColor:"magenta"}}></Box> */}
                  <img src={oxLogo} style={{width:"100%", height:"100%", borderRadius:"4px"}}/>
                </Grid>
                <Grid item xs sx={{pl:2}}>
                  <Stack direction={"row"} justifyContent={"space-between"} >
                    <Box component={"div"} sx={{display:"flex", alignItems:"center"}}>
                      <Typography variant='h6' color={"white"}>Open Experience GmbH</Typography>
                      <IconButton><OpenInNew fontSize="small"/></IconButton>
                    </Box>
                    <Typography variant='overline' color={theme.palette.text.disabled}>SEPTEMBER 2021 – MARCH 2023</Typography>
                  </Stack>
                  <Typography variant='subtitle1' color={"white"}>Intern</Typography>
                  
                  <Typography variant='body1' color={"white"}>Nothing much</Typography>
                </Grid>
                <Grid item xs={12}>
                <Divider sx={{color:"white", mb:2, mt:2}} />
                  <Stack direction={"row"} gap={1} flexWrap="wrap">
                    <Chip label="JavaScript" />
                    <Chip label="TypeScript" />
                    <Chip label="React" />
                    <Chip label="Java" />
                    <Chip label="Spring Boot" />
                    <Chip label="MySQL" />
                    <Chip label="Microsoft Graph" />
                    <Chip label="Microsoft Azure" />
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
        </Container>
      </PageContainer>
    </>
  )
}

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