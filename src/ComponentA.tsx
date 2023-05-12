import styled from "@emotion/styled";
import React from "react";

interface ComponentAProps
{

}
export function ComponentA(props:ComponentAProps)
{
    return (
    <AppContainer>
        Hello World
    </AppContainer>
    );
}

const AppContainer = styled.div
`
position: absolute;
width: 100%;
height: 100%;
`;