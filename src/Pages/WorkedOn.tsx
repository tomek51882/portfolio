import React, { forwardRef } from "react";
import { PageContainer } from "../Components/Styled/PageContainer";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Chip, Container, Divider, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import { ImageLoader } from "../Components/Shared/ImageLoader";

export const WorkedOn = forwardRef( function WorkedOn(props,ref)
{
  const theme = useTheme();
  return(
    <>
    <PageContainer ref={ref} minHeight={"unset"}>
      <Box component={"div"}>
        <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro", position:"relative", top:"0", left:"0.5rem", width:"fit-content"}}>{`<WorkedOn>`}</Typography>
      </Box>
      <Container>
        <Box component='div' sx={{mb:2}}>
            <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro"}}>{`<Typography variant='h4' color={primary}>`}</Typography>
          <Typography variant='h4' color={theme.palette.primary.main} sx={{ml:4}}>Few projects I worked on:</Typography>
              <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro"}}>{new String("</Typography>")}</Typography>
        </Box>

        <Grid container spacing={2} alignItems="stretch" justifyContent={"center"}>
          <Grid item sm={12} md={6} sx={{maxWidth:{sm:"600px",md:"unset"}}}>
              <Paper sx={{display:"flex", flexDirection:"column", height:"100%"}}>
                <CardHeader title="360° Image Viewer for DIGIBAU"/>
                {/* <CardMedia component="img" height="194" src={viewerScreen}/> */}
                <ImageLoader url="./images/oxViewer.jpg" height={194}/>
                <CardContent sx={{flexGrow:1}}>
                  <Typography variant='body1' color={theme.palette.primary.main}  sx={{textAlign:"justify"}}>
                  Designed and developed a 360-degree image viewer for an innovative device created by the company. I took charge of designing the entire application architecture, ensuring seamless integration and coordination among the various components of the app.
                  </Typography>
                </CardContent>
                <Box component={"div"} sx={{p:2}}>
                  <Divider sx={{mt:2, mb:2}}/>
                  <Stack direction={"row"} gap={1} flexWrap="wrap">
                    <Chip label="TypeScript" />
                    <Chip label="React" />
                    <Chip label="Three.JS" />
                    <Chip label="R3F" />
                    <Chip label="WebGL" />
                  </Stack>
                </Box>
              </Paper>
          </Grid>
          <Grid item sm={12} md={6} sx={{maxWidth:{sm:"600px",md:"unset"}}}>
              <Paper sx={{display:"flex", flexDirection:"column", height:"100%"}}>
                <CardHeader title="Projektverwaltung"/>
                {/* <CardMedia component="img" height="194" src={pm2Screen}/> */}
                <ImageLoader url="./images/oxPm2.png" height={194}/>
                <CardContent sx={{flexGrow:1}}>
                  <Typography variant='body1' color={theme.palette.primary.main}  sx={{textAlign:"justify"}}>
                  Designed, developed, and maintained the administration service, which was also published as an add-on in the Microsoft Teams Store. The key feature involved automatic synchronization of files between the team's drive and project files stored on the company's server using the Microsoft Graph API.
                  </Typography>
                </CardContent>
                <Box component={"div"} sx={{p:2}}>
                  <Divider sx={{mt:2, mb:2}}/>
                  <Stack direction={"row"} gap={1} flexWrap="wrap">
                    <Chip label="TypeScript" />
                    <Chip label="Java" />
                    <Chip label="React" />
                    <Chip label="Spring Boot" />
                    <Chip label="REST API" />
                    <Chip label="Microsoft Graph" />
                    <Chip label="MySQL" />
                  </Stack>
                </Box>
              </Paper>
          </Grid>
        </Grid>
      </Container>
      <Box component={"div"} sx={{mt:2}}>
        <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro", position:"relative", bottom:"0.5rem", left:"0.5rem", width:"fit-content"}}>{`</WorkedOn>`}</Typography>
      </Box>
    </PageContainer>
    </>
  )
})