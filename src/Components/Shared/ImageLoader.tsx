import { BrokenImage, Warning } from "@mui/icons-material";
import { Box, LinearProgress, Skeleton, Stack, SxProps, Theme, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
interface ImageLoaderProps
{
  url?:string;
  height?:number;
  maxHeight?:number;
}
enum LoaderStatus
{
  LOADING, LOADED, ERROR
}
export function ImageLoader(props:ImageLoaderProps)
{
  const theme = useTheme();

  const [status, setStatus] = useState<LoaderStatus>(LoaderStatus.LOADING);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [image, setImage] = useState<Blob|undefined>();
  
  useEffect(()=>{
    (async()=>{
      try
      {

        if(props.url===undefined)
        {
          setStatus(LoaderStatus.LOADED);
          return;
        }
        let response = await fetch(props.url);
        const contentLength = parseInt(response.headers.get('Content-Length')||"NaN");
        const contentType = response.headers.get('Content-Type');
        const reader = response.body?.getReader();
        if(response.status !== 200 || Number.isNaN(contentLength) || reader==null || contentType==null)
        {
          setStatus(LoaderStatus.ERROR);
          return;
        }
        let receivedBytes = 0;
        let chunks = [];
        while(true && reader!=null)
        {
          const {done, value} = await reader.read();
          if (done) {
            break;
          }
          chunks.push(value);
          receivedBytes += value.length;
          let progress = (receivedBytes/contentLength)*100;
          setLoadingProgress(progress);
          // console.log(progress);
        }
        let chunksAll = new Uint8Array(receivedBytes); 
        let position = 0;
        for(let chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }
        let blob = new Blob(chunks, {type:contentType});
        setImage(blob);
        setStatus(LoaderStatus.LOADED);
      }
      catch(e)
      {
        setStatus(LoaderStatus.ERROR);
      }
    })()
  },[])

  return (
    <>
      {status===LoaderStatus.LOADING && (
      <Box component={"div"} sx={{position:"relative"}}>
        <LinearProgress variant="determinate" value={loadingProgress} sx={{position:"absolute", width:"100%"}}/>
        <Skeleton variant="rectangular" animation="wave"  width={"100%"} height={props.height} style={{maxHeight:props.maxHeight}}/>
      </Box>
      )}
      {status === LoaderStatus.LOADED && (
        <Box component={"div"} sx={{position:"relative", height:props.height, maxHeight:props.maxHeight, width:"100%"}}>
          {image !== undefined && (
            <img src={URL.createObjectURL(image)} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
          )}
        </Box>
      )}
      {status === LoaderStatus.ERROR && (
        <Box component={"div"} sx={{position:"relative", height:props.height, maxHeight:props.maxHeight, backgroundColor:"#3b3b3b"}}>
          <Stack alignItems={"center"} justifyContent={"center"} sx={{height:"100%"}}>
            <Warning fontSize="large" color="error"/>
            <Typography variant="body1">Unable to load image</Typography>
          </Stack>
        </Box>
      )}
    </>
  )
}