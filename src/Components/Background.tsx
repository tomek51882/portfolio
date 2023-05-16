import { Canvas } from "@react-three/fiber";
import React from "react";
import { BackgroundScene } from "./3D/BackgroundScene";

export function Background()
{
    return (
        <Canvas>
            <BackgroundScene/>
        </Canvas>
    )
}

// style={{WebkitMaskImage:"linear-gradient(to bottom, black 10%, transparent 90%);"}}