import React from "react";
import { PageContainer } from "../Components/Styled/PageContainer";
import { Box, Container, Divider, Grid, Link, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

export function Contact()
{
  const theme = useTheme();
  return (
    <>
      <PageContainer minHeight={"unset"}>
        <Container sx={{pt:6, pb:6}}>
          <Grid container>
            <Grid item xs={12}>
              <Paper sx={{p:4, display:"flex", flexDirection:"column", textAlign:"center"}}>
                <Typography variant="h4" color={theme.palette.primary.main} sx={{alignSelf:"center", mb:2}}>Looking for contact?</Typography>
                <div>
                </div>
                  <Typography variant="body1" color={theme.palette.primary.main} sx={{alignSelf:"center"}}>Please feel free to reach out to me via email: <Link href="mailto:dev.tomasz.jedrzejczak@gmail.com">dev.tomasz.jedrzejczak@gmail.com</Link></Typography>
                <Typography variant="body1" color={theme.palette.primary.main} sx={{alignSelf:"center"}}>Or connect with me on <Link href="https://www.linkedin.com/in/tomasz-j%C4%99drzejczak-604a151a9/" target="_blank" rel="noreferrer">LinkedIn</Link><OpenInNew fontSize="small"/></Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </PageContainer>
    </>
  )
}