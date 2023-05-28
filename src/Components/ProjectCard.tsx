import React from "react";
import { Project } from "../Models/Project";
import { Paper, CardHeader, CardMedia, CardContent, Typography, Button, Divider, Stack, Chip, Grid, Box, useTheme } from "@mui/material";
import { ImageLoader } from "./Shared/ImageLoader";

interface ProjectCardProps
{
  project:Project;
  onClick?:(project:Project)=>void;
}
export function ProjectCard(props:ProjectCardProps)
{
  const theme = useTheme();
  return (
    <>
      <Grid item sm={12} md={4} sx={{maxWidth:{sm:"600px",md:"unset"}}}>
        <Paper sx={{display:"flex", flexDirection:"column", height:"100%"}}>
          <CardHeader title={props.project.name}/>
          <ImageLoader url={props.project.thumbnailUrl} height={194}/>
          
          {/* <Box component={"div"} sx={{height:194, border:"1px solid red"}}>

          </Box> */}
          {/* <CardMedia component="img" height="194" src={props.project.thumbnailUrl}/> */}
          <CardContent sx={{flexGrow:1}}>
            <Typography variant='body1' color={theme.palette.primary.main}  sx={{textAlign:"justify", mt:2}}>{props.project.shortDescription}</Typography>
            
          </CardContent>
          <Box component={"div"} sx={{p:2}}>
            {props.project.fullDescription && props.onClick && (
              <Button size="small" fullWidth variant="outlined" onClick={()=>{props.onClick?.(props.project)}}>Learn More</Button>
            )}
            <Divider sx={{mt:2, mb:2}}/>
            <Stack direction={"row"} gap={1} flexWrap="wrap">
              {props.project.summaryChips?.map((chip, idx)=>{return <Chip key={idx} label={chip}/>})}
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </>
  )
}