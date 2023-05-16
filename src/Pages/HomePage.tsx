import { LightMode } from "@mui/icons-material";
import { Stack, Button, IconButton, Typography, Divider, Box } from "@mui/material";
import React from "react";
import { PageContainer } from "../Components/Shared/PageContainer";

export function HomePage()
{
  return (
    <>
      <PageContainer style={{background:"linear-gradient(0deg, #0d0d0d 0%, transparent 20%)"}}>
        
        <Box component="div" style={{ padding: "1rem", position: "absolute", top:"50vh", transform: "translate(0%, -50%)", maxWidth:"min-content"}} >
          <Typography variant='h2' color={"primary"} sx={{textShadow:"4px 4px 5px black"}} >Tomasz&nbsp;Jędrzejczak</Typography>
          <Typography variant='h4' color={"primary"} sx={{textShadow:"4px 4px 5px black"}} >Software&nbsp;Developer</Typography>
          <Divider sx={{m:1}}/>
          {/* <Typography variant='body1' color={"primary"} sx={{fontStyle:"italic"}}>Hi! Nice to see you, hope you will have a great time!</Typography> */}
          <Typography variant='body1' color={"primary"} sx={{fontStyle:"italic",textShadow:"4px 4px 5px black"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut diam vel sapien feugiat vehicula. Ut id ante at mi ultricies fermentum at sed risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce lacinia volutpat massa.</Typography>
        </Box>
      </PageContainer>
    </>
  )
}

