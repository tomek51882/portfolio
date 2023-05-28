import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { BackgroundScene } from "./3D/BackgroundScene";
import { useIsInViewport } from "../Utils/useIsInViewport";
interface BackgroundSceneProps
{
  playgroundMode:boolean;
  onExitPlayground:()=>void;
}
export function Background(props:BackgroundSceneProps)
{
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const isInViewport1 = useIsInViewport(canvasRef);
  // console.log(isInViewport1);
  // throw "123";
  // canvasRef.current.
    return (
        <Canvas ref={canvasRef} style={{position:"fixed"}}>
          <BackgroundScene isInViewport={isInViewport1} playgroundMode={props.playgroundMode} onExitPlayground={()=>{props.onExitPlayground()}}/>
        </Canvas>
    )
}
// style={{WebkitMaskImage:"linear-gradient(to bottom, black 10%, transparent 90%);"}}

