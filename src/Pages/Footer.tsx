import React from "react";
import { PageContainer } from "../Components/Styled/PageContainer";
import { Box, Container, Divider, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";

export function Footer()
{
  const theme = useTheme();
  return (
    <>
      <PageContainer minHeight={"unset"} style={{background:"linear-gradient(360deg, #181818 80%, #0d0d0d 95%)"}} sx={{pt:6}}>
        <Container sx={{pb:2}}>
          <Divider/>

          <Stack justifyContent={"space-between"} sx={{mt:2, flexDirection:{xs:"column-reverse", sm:"row"}, textAlign:{xs:"center", sm:"unset"}}} >
            <Typography variant="body1" color={"#5a5a5a"}>© Tomasz Jędrzejczak {new Date().getFullYear()}</Typography>
            <Typography variant="body1" color={"#5a5a5a"}>dev.tomasz.jedrzejczak@gmail.com</Typography>
          </Stack>

          {/* <Grid container sx={{mt:2}} justifyContent={"space-between"}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color={"#5a5a5a"}>© Tomasz Jędrzejczak {new Date().getFullYear()}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color={"#5a5a5a"}>dev.tomasz.jedrzejczak@gmail.com</Typography>
            </Grid>
          </Grid> */}
        </Container>
      </PageContainer>
    </>
  )
}