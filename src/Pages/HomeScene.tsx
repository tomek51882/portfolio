import { OrbitControls, PerspectiveCamera, useScroll } from "@react-three/drei";
import { CameraProps, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Vector3, Color, Group, Vector2, MathUtils, HSL } from "three";
import { Cube } from "../Models/Cube";
import { CubeMesh } from "../Components/3D/CubeMesh";
import { Ripple, RippleCubeData } from "../Models/Ripple";

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
let red:boolean = false;

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
        const color = red ? new Color(0xff0000) : new Color(0x0000ff);
        red = !red;
        ripples.push(new Ripple(position,10, 1, color));
        console.log(`new Ripple at ${position.x},${position.y}`);
        // console.log(grid[0][0].worldPosition.z);
        // console.log(ripples[0].color.getHSL({h:0, s:0, l:0}));
    }
    useFrame((state)=>{
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
                        //@ts-ignore
                        // groupRef.current.children[y*ROWS+x].material.color = new Color().setHSL(0,1,(0.5*distance/maxAllowedRadius)+0.5);
                        // let newColor = new Color().lerpColors(ripple.color, grid[y][x].startColor, (distance/maxAllowedRadius) );
                        // let newColor = new Color().lerpColors(ripple.color, grid[y][x].startColor, 1-newY );

                        let newColor = new Color().lerpColors(ripple.color, new Color(0x000000), 1-newY );
                        // let newColor = new Color().lerpColors(ripple.color, startColor, 1-newY );
                        ripple.gridValues[y][x].heightValue = newY * ripple.strength;
                        ripple.gridValues[y][x].colorValue = newColor;
                        // ripple.gridValues[y][x].colorValue = ripple.color;
                    }
                }
            });
            ripples = ripples.filter(ripp => {return ripp.shouldBeKilled !== true});
        }



        groupRef.current.children.forEach((child, idx)=>{
            // const childId = y*ROWS+x;
            const y = Math.floor(idx/ROWS);
            const x = idx%ROWS;
            //#region blend v1
            //@ts-ignorea
            child.material.color = ripples.reduce((result:null|Color, item, idx)=>{
                let blended:HSL = {h:0,s:0,l:0};
                let colorToBlend:HSL = {h:0,s:0,l:0};
                if(item.gridValues[y][x].colorValue === null){
                    return null;
                }
                if(result==null)
                {
                    result = item.gridValues[y][x].colorValue.clone();
                }
                // idx === 0 ? item.gridValues[y][x].colorValue.getHSL(blended) : result.getHSL(blended);
                result.getHSL(blended);
                item.gridValues[y][x].colorValue.getHSL(colorToBlend);

                if(colorToBlend.l === 0 || (colorToBlend.h===0 && colorToBlend.l === 0))
                {
                    return result;
                }
                
                // let hueDiff = blended.h-colorToBlend.h;
                // let altMode = Math.abs(hueDiff)>0.5 ? true : false;
                // if(colorToBlend.l===0)
                // {
                //     return result;
                // }
                // altMode ? 
                //     result.setHSL((Math.max(blended.h, colorToBlend.h)+Math.abs(hueDiff)-0.5), 1, (blended.l+colorToBlend.l)/2): 
                //     result.setHSL((blended.h+colorToBlend.h)/2, 1, (blended.l+colorToBlend.l)/2);

                // if(ripples.length===3)
                // {
                //     console.log(`Blended:${blended.h * 360}\nToBlend:${colorToBlend.h * 360}\nDiff:${Math.abs((blended.h-colorToBlend.h)*360)}\nAltMode:${altMode}`);

                // }


                //result.setHSL((colorToBlend.h), 1, (colorToBlend.l))
                //return new Color(0x000000).lerpColors(result, item.gridValues[y][x].colorValue, 0.5);
                return new Color(0x000000).lerpColors(result, item.gridValues[y][x].colorValue, 0.5);;
                //return result.add(item.gridValues[y][x].colorValue);

            // }, new Color(0xff0000).lerp(new Color(0x0000ff), 0.5).lerp(new Color(0x00ff00), 0.5));
            },  null);
            //#endregion

            // for(const ripple of ripples)
            // {
                
            // }

            child.position.z = ripples.reduce((partialSum, item)=> partialSum+item.gridValues[y][x].heightValue, 0) + Math.sin((state.clock.elapsedTime + idx ) / 0.5) / 10;
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

        {/* <EffectComposer multisampling={0}>
        <DepthOfField target={new Vector3(target.x, target.y, target.z)} focalLength={focalLength} bokehScale={bokehScale} focusDistance={focusDistance} focusRange={focusRange}/>
        </EffectComposer> */}
    </>
    )
}