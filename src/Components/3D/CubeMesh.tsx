import React, { useRef, useState } from "react";
import { BufferGeometry, Color, Material, MathUtils, Mesh, Vector2, Vector3 } from "three";
import { Cube } from "../../Models/Cube";
import { useFrame } from "@react-three/fiber";

interface CubeMeshProps
{
    position:Vector3;
    onClick?:()=>void;
    // ref?:React.RefObject<Mesh>;
}
export function CubeMesh(props:CubeMeshProps)
{
    const [hovered, setHover] = useState<boolean>(false);
    const meshRef = useRef<Mesh>(null!);

    function handleClick()
    {
        props.onClick?.();
    }
    return (
        <mesh ref={meshRef} position={props.position} onClick={(e)=>{e.stopPropagation();handleClick(); }}>
            <boxGeometry args={[1, 1, 1]}/>
            {/* <meshStandardMaterial color={props.startColor}/> */}
            <meshStandardMaterial/>
        </mesh>
    )
}

class CubeMeshClickEvent
{

}