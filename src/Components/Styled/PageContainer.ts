import { Box, styled } from "@mui/material";

interface PageContainerProps
{
  minHeight?:string;
  backgroundColor?:string;
}
export const PageContainer = styled(Box)
`
position:relative;
min-height: ${(props:PageContainerProps)=> props.minHeight||"100vh"};
background-color: ${(props:PageContainerProps)=> props.backgroundColor||"#0d0d0d"};
`