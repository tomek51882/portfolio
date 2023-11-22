import React, { useState } from "react";
import { PageContainer } from "../Components/Styled/PageContainer";
import { Alert, Box, Button, CardContent, CardHeader, CardMedia, Chip, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, LinearProgress, Paper, Stack, Typography, useTheme } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { OpenInFull, OpenInNew } from "@mui/icons-material";
import { Project } from "../Models/Project";
import { ProjectCard } from "../Components/ProjectCard";
import { ImageLoader } from "../Components/Shared/ImageLoader";

export function MyProjects()
{
  const theme = useTheme();
  const [dialogOpened, setDialogOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project>();

  const projects:Project[] = [
    {
      id:3,
      name:"Procedural Terrain Generator",
      thumbnailUrl:"./thumbs/terrain.jpg",
      shortDescription:"An experiment that was used to learn a little bit about procedurally generated terrain.",
      fullDescription:["In this project for the first time I played a little bit the procedural terrain generation. The main idea was to use Perlin Noise to generate a height map later used by mesh generator to create a chunk of the terrain. Multiple chunks were building interestingly looking terrain.","Later multiple noise maps were used to build even more detailed terrain and few maps were used as a temperature and humidity that could be used to determine what biome should be placed there.","Data for chunks was generated in separate threads and the chunks themself were generated with variable level of details"],
      summaryChips:["Unity", "C#"],
      gitHubUrl:"https://github.com/tomek51882/NXT_TG",
      imageUrls:["./images/terrain1.png","./images/terrain2.png","./images/terrain3.png"],
    },
    {
      id:4,
      name:"Some RPG mechanics",
      thumbnailUrl:"./thumbs/rpg.jpg",
      shortDescription:"Tiny project where I tried to implement some RPG mechanics.",
      fullDescription:["This project was used for implementing some RPG mechanisms and learn a little bit about Unity's Scriptable Objects. This project implements an inventory management, some basic stats, calculating health based on those stats, looting stuff from chests and more."],
      summaryChips:["Unity", "C#"],
      gitHubUrl:"https://github.com/tomek51882/mRPG_Pathfinder",
      imageUrls:["./images/rpg.png"],
    },
    {
      id:5,
      name:"Inventory System",
      thumbnailUrl:"./thumbs/inv.jpg",
      shortDescription:"An Inventory system that uses heavily depends on 2D Codes (Barcodes, QR Codes, DataMatrix) assigned to items.",
      fullDescription:["An attempt to create an Inventory System where user could attach a QR Code (or something else) to an item and later use this code to perform some tasks. The code could be scanned directly in the app using device's camera."],
      summaryChips:[".NET 7", "C#", "Blazor", "WebAPI", "REST API", "Entity Framework", "MySQL", "JWT"],
      imageUrls:["./images/inv.png"],
      alertMessage:{message:"Under development", alertType:"info"}
    },
    {
      id:0,
      name:"Arduino Light Controls",
      thumbnailUrl:"./thumbs/ard.jpg",
      shortDescription:"A PWA React App that utilizes SSDP to discover and connect to a controller board, enabling the discovery and control of other IoT devices (primarily Yeelight Smart Bulbs) over HTTP.",
      fullDescription:["Currently, limited information can be provided about this project. The objective is to achieve wireless control of the lighting system in conjunction with an Arduino board.","The application is hosted on an Arduino board, and due to restricted transfer speed, it can be installed on the device after initiation. Once installed, the application utilizes SSDP to discover and establish a connection with nearby Arduino board. Subsequently, all configuration changes are sent to the Arduino board and, if required, to the connected devices."],
      summaryChips:["TypeScript", "React", "C", "Arduino"],
      imageUrls:["./images/ard1.jpg","./images/ard2.png","./images/ard3.jpg","./images/ard4.jpg"],
      alertMessage:{message:"Development has been suspended", alertType:"warning"}
    },
    {
      id:1,
      name:"CubeShooter",
      thumbnailUrl:"./thumbs/cube.jpg",
      shortDescription:"A basic game prototype in Unity, which was unfortunately abandoned upon starting university.",
      fullDescription:["It was a relatively straightforward game where the main objective was to survive endless waves of blood-hungry cubes. As you progressed, more challenging types of cubes were introduced, increasing the difficulty", "Between maps, player had the opportunity to upgrade their character, unlock new weapons, and allocate points to enhance their character's statistics."],
      summaryChips:["C#", "Unity"],
      gitHubUrl:"https://github.com/tomek51882/CubeShooter",
      imageUrls:["./images/cube1.jpg","./images/cube2.jpg","./images/cube3.jpg","./images/cube4.jpg","./images/cube5.jpg","./images/cube6.jpg"], 
    },
    {
      id:2,
      name:"LED Control",
      thumbnailUrl:"./thumbs/led.jpg",
      shortDescription:"A simple C# application that utilized the serial port for communication with an Arduino, enabling control of WS2812b LEDs connected to the board. The LED patterns were stored on external EEPROM memory.",
      fullDescription:["This application enables control of the WS2812b LED strip connected to an Arduino board. Users can configure the desired appearance of the LED strip within the application and then send the pattern to the Arduino for display. Furthermore, the application allows saving patterns to external EEPROM memory chips, connected to the board, for future use."],
      gitHubUrl:"https://github.com/tomek51882/WS2812b-DotNET-Controller",
      imageUrls:["./images/led1.jpg","./images/led2.jpg","./images/led3_o.png"], 
      summaryChips:["C#", "C", "Arduino"]
    }
  ]

  const handleClose = ()=>{
    setSelectedProject(undefined);
    // setDialogOpen(false);
  };
  
  function openDialog(project:Project)
  {
    setSelectedProject(project);
    // setDialogOpen(true);
  }

  return(
    <>
    <PageContainer minHeight={"unset"}>
      <Box component={"div"}>
        <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro", position:"relative", top:"0", left:"0.5rem", width:"fit-content"}}>{`<MyProjects>`}</Typography>
      </Box>
      <Container>
        <Box component='div' sx={{mb:2}}>
          <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro"}}>{`<Typography variant='h4' color={primary}>`}</Typography>
          <Typography variant='h4' color={theme.palette.primary.main} sx={{ml:4}}>My Projects</Typography>
              <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro"}}>{new String("</Typography>")}</Typography>
        </Box>

        <Grid container spacing={2} alignItems="stretch" justifyContent={"center"} >
          {projects.map((project)=>{
            return <ProjectCard key={project.id} project={project} onClick={(project:Project)=>{openDialog(project)}}/>
          })}
        </Grid>
      </Container>
      <Box component={"div"} sx={{mt:2}}>
        <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro", position:"relative", bottom:"0.5rem", left:"0.5rem", width:"fit-content"}}>{`</MyProjects>`}</Typography>
      </Box>
    </PageContainer>
    <Dialog open={selectedProject!==undefined} onClose={handleClose} maxWidth={"md"} fullWidth={false}>
      {/* <DialogTitle>Test</DialogTitle> */}
      <Carousel sx={{}}>
        {selectedProject?.imageUrls?.map((imageUrl, idx)=>{
          return (
            <Paper key={idx} sx={{ overflow:"hidden"}}>
              <ImageLoader url={imageUrl} height={window.innerHeight/2}/>
              {/* <Box component={"img"} src={imageUrl} sx={{height: "100%", width:"100%", objectFit:"cover" }}/> */}
            </Paper>
          );
        })}
        {/* <Paper sx={{ overflow:"hidden"}}>
          <Box component={"img"} src={"./led1.jpg"} sx={{height: "auto", maxWidth:"100%"}}/>
        </Paper>
        <Paper sx={{ overflow:"hidden"}}>
          <Box component={"img"} src={"./led1.jpg"} sx={{height: "auto", maxWidth:"100%"}}/>
        </Paper>
        <Paper sx={{ overflow:"hidden"}}>
          <Box component={"img"} src={"./led1.jpg"} sx={{height: "auto", maxWidth:"100%"}}/>
        </Paper> */}
      </Carousel>
      <DialogContent>
        {selectedProject?.alertMessage && (
          <Alert variant="outlined" severity={selectedProject.alertMessage.alertType} sx={{mb:2}}>{selectedProject.alertMessage.message}</Alert>
        )}
        {selectedProject?.fullDescription?.map((desc, idx)=>{
          return idx===0 ? <Typography key={idx} variant="body1" sx={{textAlign:"justify"}}>{desc}</Typography> : <Typography key={idx} variant="body1" sx={{textAlign:"justify", mt:2}}>{desc}</Typography>
        })}
        
        {selectedProject?.gitHubUrl && (
          <>
            <Divider sx={{mt:2, mb:2}}/>
            <Stack alignItems={"center"}>
              <Typography variant="h5">Code available at GitHub</Typography>
              <Typography variant="body1">You can find more details there</Typography>
              <Button variant="outlined" fullWidth sx={{mt:2}} endIcon={<OpenInNew/>} onClick={()=>{window.open(selectedProject.gitHubUrl, '_blank','noreferrer');}}>Open in GitHub</Button>
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
    </>
  )
}