import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React from "react";

interface SectionContainerProps{
  title:string;
  childred:JSX.Element;
}
export function SectionContainer(props:SectionContainerProps)
{
  return(
    <>
      <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro", position:"absolute", top:"4rem", left:"0.5rem"}}>{`<${props.title}>`}</Typography>
      {props.childred}
      <Typography variant='subtitle1' color={"#5a5a5a"} sx={{fontSize:"0.8rem"}} style={{fontFamily:"Source Code Pro", position:"absolute", bottom:"0.5rem", left:"0.5rem"}}>{`</${props.title}>`}</Typography>
    </>
  )
}

const FunContainer = styled.div`

`