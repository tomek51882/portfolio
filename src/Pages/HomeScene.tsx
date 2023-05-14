import { OrbitControls, PerspectiveCamera, useScroll } from "@react-three/drei";
import { CameraProps, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Vector3, Color, Group, Vector2, MathUtils, HSL } from "three";
import { Cube } from "../Models/Cube";
import { CubeMesh } from "../Components/3D/CubeMesh";
import { Ripple, RippleCubeData } from "../Models/Ripple";
import {  Bloom, EffectComposer } from "@react-three/postprocessing";

//https://stackoverflow.com/questions/31121628/finding-all-points-in-certain-radius-of-another-point
//https://stackoverflow.com/questions/74417694/find-all-points-in-a-radius-of-one-point-python
//(x+h)^2+(y+v)^2=r^2
//https://sbcode.net/react-three-fiber/lerp/


interface HomeSceneProps 
{

}

const ROWS = 20;
const COLS = 20;
let ripples:Ripple[] = [];
let c:number = 0;
const DEFAULT_COLOR = new Color(0x050505);
// const DEFAULT_COLOR = new Color(0xffffff);

export function HomeScene(props:HomeSceneProps)
{
    
  const cameraRef = useRef<CameraProps>();
  const scroll = useScroll();
  const groupRef = useRef<Group>(null!);

  const [grid, setGrid] = useState<Cube[][]>([]);

  useEffect(()=>{
    let grid:any[][] = [];
    for(let y=0; y<ROWS; y++)
    {
        grid[y] = [];
        for(let x=0; x<COLS; x++)
        {
            grid[y][x] = new Cube(new Vector2(x,y), new Vector3(x-((COLS-1)/2),y-((ROWS-1)/2),0));
        }
    }
    console.log(grid);
    Ripple.setMapDimentions(ROWS, COLS);
    setGrid(grid);
  },[])
  
//   useFrame((state)=>{
//     // console.log(groupRef);
    // groupRef.current.children.forEach((child, idx)=>{
    //     const elapsed = state.clock.elapsedTime;
        
    //     // child.position.x = Math.tan((elapsed + idx ) / 1) / 1;
    //     child.position.y = Math.sin((elapsed + idx ) / 0.5) / 10;
    //     // child.position.y = Math.tan((elapsed + idx ) / 2) *2;
    //     // child.rotation.x = Math.sin((elapsed + idx ) / 1) / 6;
    //     // child.rotation.y = Math.tan((elapsed + idx ) / 1) / 6;
    //     // child.rotation.z = Math.sin((elapsed + idx ) / 1) / 6;
    // })
//     // console.log(scroll.offset>1 ? 100 : scroll.offset/1 * 100);
//   })


    function createRipple(position:Vector2)
    {
        //const childId = position.y*ROWS+position.x;
        // const color = new Color().setHSL(Math.random()*1,1,0.5);
        let color;
        if(c===0)
        {
            color = new Color(0xff0000);
        }
        else if(c===1)
        {
            color = new Color(0x00ff00);
        } 
        else
        {
            color = new Color(0x0000ff);
        }
        c++;
        if(c>2) c=0;

        const ripple = new Ripple(position,30, 2, color);

        for(let x=Math.floor(ripple.position.x - ripple.radius/2); x<=ripple.position.x+ ripple.radius/2 ; x++)
        {
            if(x<0 || x>COLS-1) continue;
            for(let y=Math.floor(ripple.position.y - ripple.radius/2); y<=ripple.position.y+ ripple.radius/2 ; y++)
            {
                if(y<0 || y>ROWS-1) continue;
                const distance = (x-ripple.position.x)*(x-ripple.position.x) + (y-ripple.position.y)*(y-ripple.position.y);
                const maxAllowedRadius = (ripple.radius/2)*(ripple.radius/2);
                if(distance > maxAllowedRadius)
                {
                    continue;
                }
                ripple.gridValues[y][x] = new RippleCubeData();
            }
        }


        ripples.push(ripple);
        console.log(`new Ripple at ${position.x},${position.y}`);
        // console.log(grid[0][0].worldPosition.z);
        // console.log(ripples[0].color.getHSL({h:0, s:0, l:0}));
    }
    useFrame((state)=>{

        //tworzenie mapy fali
        if(ripples.length!==0)
        {
            ripples.forEach((ripple,idx) => {
                ripple.update();
                if(ripple.shouldBeKilled===true){
                    console.log("ripple removed")
                    return;
                }; 

                for(let x=Math.floor(ripple.position.x - ripple.radius/2); x<=ripple.position.x+ ripple.radius/2 ; x++)
                {
                    if(x<0 || x>COLS-1) continue;
                    for(let y=Math.floor(ripple.position.y - ripple.radius/2); y<=ripple.position.y+ ripple.radius/2 ; y++)
                    {
                        if(y<0 || y>ROWS-1) continue;
                        if(ripple.gridValues[y][x] == null)
                        {
                            continue;
                        }
                        const distance = (x-ripple.position.x)*(x-ripple.position.x) + (y-ripple.position.y)*(y-ripple.position.y);
                        const maxAllowedRadius = (ripple.radius/2)*(ripple.radius/2);
                        if(distance > maxAllowedRadius)
                        {
                            continue;
                        }
                        const normalizedDistance = distance/maxAllowedRadius
                        
                        const tVal = Math.PI*ripple.progress;
                        const dVal = Math.PI*normalizedDistance;
                        let newY = 0;
                        if(tVal > dVal)
                        {
                            newY =  (Math.sin((tVal-dVal)*(1/(1-(dVal/Math.PI)))) * Math.cos(dVal/2));
                        }
                        //let newColor = new Color().lerpColors(ripple.color, DEFAULT_COLOR, 1-newY ); 

                        ripple.gridValues[y][x]!.heightValue = newY * ripple.strength;
                        ripple.gridValues[y][x]!.rawHeight = newY;
                    }
                }
            });
            ripples = ripples.filter(ripp => {return ripp.shouldBeKilled !== true});
        }

        //blendowanie fal
        groupRef.current.children.forEach((child, idx)=>{
            // const childId = y*ROWS+x;
            const y = Math.floor(idx/ROWS);
            const x = idx%ROWS;

            let finalColor = null;
            let finalHue = null;
            let finalValue = 0;

            for(const ripple of ripples)
            {
                //Blend when there is only one ripple
                if(ripple.gridValues[y][x]==null)
                {
                    continue;
                }
                if(finalColor==null)
                {
                    finalColor = new Color().lerpColors(DEFAULT_COLOR, ripple.color, ripple.gridValues[y][x]!.rawHeight);
                    continue;
                }
                // let blendedSoFar:HSL = {h:0,s:0,l:0}; 
                // let colorToBlend:HSL = {h:0,s:0,l:0}; 
                // finalColor.getHSL(blendedSoFar); 
                // ripple.color.getHSL(colorToBlend);
                let r:number = finalColor.r + ripple.color.r*ripple.gridValues[y][x]!.heightValue;
                let g:number = finalColor.g + ripple.color.g*ripple.gridValues[y][x]!.heightValue;
                let b:number = finalColor.b + ripple.color.b*ripple.gridValues[y][x]!.heightValue;

                finalColor = new Color(MathUtils.clamp(r,0,1),MathUtils.clamp(g,0,1),MathUtils.clamp(b,0,1));
                // let col1 = (1-Math.abs(0.5-blendedSoFar.l)/0.5); //How far the color is from HUE V=100%
                // console.log(blendedSoFar.h, col1);

                //finalColor.lerpColors(DEFAULT_COLOR, finalColor,col1);
            }

            //final blend

            //final lerp

            const heightValue = ripples.reduce((partialSum, item)=> partialSum+(item.gridValues[y][x]?.heightValue||0), 0);


            //@ts-ignore
            // child.material.color = finalColor;
            child.material.color = finalColor === null ? DEFAULT_COLOR : finalColor;
            // child.material.emissive= new Color(0xffffff)
            // console.log(child.material );

            child.position.z =  heightValue + Math.sin((state.clock.elapsedTime + idx ) / 0.5) / 10;
        })
    })

    return (
    <>
        <color attach="background" args={["#211f28"]} />

        <OrbitControls 
        enablePan={false} 
        enableDamping={false} 
        enableZoom={true} 
        enableRotate={true}
        target={new Vector3(0,0,0)} 
        autoRotate={false}
        autoRotateSpeed={0.2}
        />
        <PerspectiveCamera 
            makeDefault 
            ref={cameraRef}
            position={[4.98, 4.11, 6.42]}
        />    
        <gridHelper/>
        <axesHelper/>


        <ambientLight color={new Color(0x666666)}/>
        {/* <SpotLight angle={0.34} intensity={14} attenuation={8} distance={8} color={"#4040dd"} position={[-1,4,2]} penumbra={0} />
        <SpotLight angle={0.25} intensity={8} attenuation={8} distance={8} color={"#bb3333"} position={[2,4,-2]} penumbra={1} /> */}

        {/* <pointLight position={[3,1,2]} color="white"/> */}
        <directionalLight  position={[3,4,2]} color="white" />
        <mesh rotation-x={-Math.PI/2} >
            <group ref={groupRef}>

                {grid.map((rowItem, y)=>{
                    return (
                        rowItem.map((colItem, x)=>{
                            const cubeData = grid[y][x];
                            return( <CubeMesh key={y*10+x} position={cubeData.worldPosition} onClick={()=>{createRipple(cubeData.arrayPosition)}}/>)
                        })
                        
                        )
                    })}
            </group>
        </mesh>

        {/* <CubeMesh position={new Vector2(2,0)} id={new Vector2(12,0)} color={new Color(0xff0000)}/> */}

        {/* <Stats/> */}

        {/* <EffectComposer multisampling={0}> */}
        {/* <DepthOfField target={new Vector3(target.x, target.y, target.z)} focalLength={focalLength} bokehScale={bokehScale} focusDistance={focusDistance} focusRange={focusRange}/> */}
        {/* </EffectComposer> */}
    </>
    )
}