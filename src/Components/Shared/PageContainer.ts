import { Box, styled } from "@mui/material";

interface PageContainerProps
{
    backgroundColor?:string;
}
export const PageContainer = styled(Box)
`
min-height: 100vh;
background-color: ${(props:PageContainerProps)=> props.backgroundColor||"unset"}
`