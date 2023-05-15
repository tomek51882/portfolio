import { OrbitControls, PerspectiveCamera, useScroll, Stats, OrthographicCamera } from "@react-three/drei";
import { CameraProps, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Vector3, Color, Group, Vector2, MathUtils, HSL } from "three";
import { Cube } from "../Models/Cube";
import { CubeMesh } from "../Components/3D/CubeMesh";
import { Ripple, RippleCubeData } from "../Models/Ripple";
import {  Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";

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
let transitionWave:Ripple|null = null;
let themeChanged = false;
let c:number = 0;
const LIGHT_COLOR = new Color(0xffffff);
const DARK_COLOR = new Color(0x000000);
let DEFAULT_COLOR = DARK_COLOR;

const DARK_BACKGROUND_COLOR = new Color(0x010101);
const LIGHT_BACKGROUND_COLOR = new Color(0xcccccc);
// const DEFAULT_COLOR = new Color(0xffffff);
let darkTheme = true;

export function HomeScene(props:HomeSceneProps)
{
    
  const cameraRef = useRef<CameraProps>();
  const scroll = useScroll();
  const groupRef = useRef<Group>(null!);
  const bgRef = useRef<Color>(null!);

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
    console.log(cameraRef);
    Ripple.setMapDimentions(ROWS, COLS);
    setGrid(grid);
    createRipple(new Vector2(ROWS/2, COLS/2), Math.floor(Math.random()*(30-20))+20, 2 );
    bgRef.current.set(DARK_BACKGROUND_COLOR);
    setInterval(()=>{
        // createRipple(new Vector2(Math.floor(Math.random()*ROWS), Math.floor(Math.random()*COLS)), Math.floor(Math.random()*(20-10))+10, Math.random()*(2-0.5)+0.5 );
        // createRipple(new Vector2(Math.floor(Math.random()*ROWS), Math.floor(Math.random()*COLS)), Math.floor(Math.random()*(20-10))+10, Math.random()*(2-0.5)+0.5 );
        createRipple(new Vector2(Math.floor(Math.random()*ROWS), Math.floor(Math.random()*COLS)), Math.floor(Math.random()*(30-20))+20, Math.random()*(2-0.5)+0.5 );
        createRipple(new Vector2(Math.floor(Math.random()*ROWS), Math.floor(Math.random()*COLS)), Math.floor(Math.random()*(30-20))+20, Math.random()*(2-0.5)+0.5 );
    }, 12000);
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


    function createRipple(position:Vector2, range:number, strength:number)
    {
        const color = new Color().setHSL(Math.random()*1,1,0.5);
        // let color; 
        // if(c===0) 
        // { 
        //     color = new Color(0xff0000); 
        // } 
        // else if(c===1) 
        // { 
        //     color = new Color(0x00ff00); 
        // }  
        // else 
        // { 
        //     color = new Color(0x0000ff); 
        // } 
        // c++; 
        // if(c>2) c=0; 

        const ripple = new Ripple(position,range, strength, color, 18);

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
    }
    function changeTheme()
    {
        if(transitionWave!=null)
        {
            return;
        }
        
        console.log(`Transition Wave created`);
        const tWave = new Ripple(new Vector2(COLS/2, ROWS/2), 0,0,new Color(), 3);
        for(let y=0; y<ROWS; y++)
        {
            for(let x=0; x<COLS; x++)
            {
                tWave.gridValues[y][x] = new RippleCubeData();
            }
        }
        transitionWave = tWave;

    }
    function dropCubes()
    {

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
                        
                        const tVal = 2*Math.PI*ripple.progress;
                        const dVal = Math.PI*normalizedDistance;
                        let newY = 0;
                        if(tVal > dVal)
                        {
                            // newY =  (Math.sin((tVal-dVal)*(1/(1-(dVal/Math.PI)))) * Math.cos(dVal/2));

                            // newY =  Math.sin((tVal-dVal)*(1/(1-(dVal/Math.PI)))) * (1-normalizedDistance);
                            newY =  Math.sin(1*(tVal-dVal)) * (1-ripple.progress) * (1-normalizedDistance);
                            // if((tVal-dVal)>(Math.PI/2))
                            // {
                            //     newY = 100
                            // }
                            // else
                            // {
                            //     newY =  Math.tan((tVal-dVal)) * (1-ripple.progress) * (1-normalizedDistance);
                                
                            // }
                        }

                        ripple.gridValues[y][x]!.heightValue = newY * ripple.strength;
                        ripple.gridValues[y][x]!.rawHeight = newY;
                    }
                }
            });
            ripples = ripples.filter(ripp => {return ripp.shouldBeKilled !== true});
        }
        if(transitionWave!==null)
        {
            transitionWave.update();

            const mostFarthestPosition = grid[0][0].worldPosition;
            
            for(let y=0; y<ROWS; y++)
            {
                for(let x=0; x<COLS; x++)
                {
                    const distance = (x-transitionWave.position.x)*(x-transitionWave.position.x) + (y-transitionWave.position.y)*(y-transitionWave.position.y);
                    const maxAllowedRadius = (mostFarthestPosition.x-transitionWave.position.x)*(mostFarthestPosition.x-transitionWave.position.x) + (mostFarthestPosition.y-transitionWave.position.y)*(mostFarthestPosition.y-transitionWave.position.y);
                    const normalizedDistance = distance/maxAllowedRadius;

                    const tVal = 2*Math.PI*transitionWave.progress;
                    const dVal = Math.PI*normalizedDistance;
                    let newY = 0;
                    if(tVal > dVal)
                    {
                        if((tVal-dVal)<(Math.PI/2))
                        {
                            newY =  -Math.tan((tVal-dVal)) * (1-transitionWave.progress) * (1-normalizedDistance) ;
                        }
                        if((tVal-dVal)>(Math.PI/2) && (tVal-dVal)<(Math.PI*3/2))
                        {
                            newY = 100;
                        }
                        if((tVal-dVal)>(Math.PI*3/2))
                        {
                            newY =  -Math.tan((tVal-dVal)) * (1-transitionWave.progress) * (1-normalizedDistance) ;
                        }
                    }
                    transitionWave.gridValues[y][x]!.heightValue = newY;
                }
            }
            DEFAULT_COLOR = new Color().lerpColors(LIGHT_COLOR, DARK_COLOR, darkTheme===true? 1-transitionWave.progress : transitionWave.progress)
            bgRef.current.lerpColors(LIGHT_BACKGROUND_COLOR, DARK_BACKGROUND_COLOR, darkTheme===true? 1-transitionWave.progress : transitionWave.progress);
            if(transitionWave.shouldBeKilled===true)
            {
                transitionWave = null;
                themeChanged = false;
                darkTheme = !darkTheme;
                console.log(`Transition Wave destroyed`,darkTheme);
            }
        }

        groupRef.current.children.forEach((child, idx)=>{
            
            // if(child.visible===false)
            // {
            //     return;
            // }
            // const childId = y*ROWS+x;
            const y = Math.floor(idx/ROWS);
            const x = idx%ROWS;
            
            let finalColor = null; //new Color(0x000000);
            let finalHSL:HSL = {h:0,s:0,l:0};
            let combinedHeight = 0;
            let amountOfRipplesInCell = 0;
            
            //nakładanie się kolorów fal
            for(const ripple of ripples)
            {
                if(ripple.gridValues[y][x]==null)
                {
                    continue;
                }
                if(finalColor==null)
                {
                    finalColor = new Color(0x000000);
                }
                amountOfRipplesInCell++;

                const rawHeightValue = ripple.gridValues[y][x]!.rawHeight;
                let r:number = finalColor.r + ripple.color.r*(rawHeightValue*1.2);
                let g:number = finalColor.g + ripple.color.g*(rawHeightValue*1.2);
                let b:number = finalColor.b + ripple.color.b*(rawHeightValue*1.2);

                finalColor = new Color(MathUtils.clamp(r,0,1),MathUtils.clamp(g,0,1),MathUtils.clamp(b,0,1));
                finalHSL = finalColor.getHSL(finalHSL);
                combinedHeight += rawHeightValue;
            }

            //final lerp
            if(finalColor==null)
            {
                //@ts-ignore
                child.material.color = DEFAULT_COLOR.clone();
            }
            else if((new Set([finalColor.r,finalColor.g,finalColor.b])).size !== 1)
            {
                // console.log(1-Math.abs(0.5-finalHSL.l)/0.5)
                //@ts-ignore
                child.material.color = new Color().lerpColors(DEFAULT_COLOR, new Color().setHSL(finalHSL.h,1,finalHSL.l), 1-Math.abs(0.5-finalHSL.l)/0.5 );
            }
            else
            {
                //@ts-ignore
                child.material.color = DEFAULT_COLOR.clone();
                
            }

            //nakładanie się wysokości fal
            let heightValue = ripples.reduce((partialSum, item)=> partialSum+(item.gridValues[y][x]?.heightValue||0), 0);
            if(transitionWave!==null)
            {
                heightValue += transitionWave.gridValues[y][x]!.heightValue;
            }
            child.position.z =  heightValue //;+ Math.sin((state.clock.elapsedTime + x%2*Math.PI + y%2*Math.PI + idx ) / 2) / 40;
            // child.position.z =  heightValue + Math.sin((state.clock.elapsedTime + idx ) / 0.5) / 10; 

        })
    })

    return (
    <>
        {/* <color attach="background" args={["#211f28"]} /> */}
        {/* <color attach="background" args={["#e2e2e2"]} /> */}
        <color ref={bgRef} attach="background" args={["#111111"]} />
        {/* <color attach="background" args={["#e7e7e7"]} /> */}

        <OrbitControls 
        enablePan={false} 
        enableDamping={false} 
        enableZoom={false} 
        enableRotate={false}
        target={new Vector3(0,0,0)} 
        autoRotate={true}
        autoRotateSpeed={0.2}
        />
        {/* <PerspectiveCamera 
            makeDefault 
            ref={cameraRef}
            position={[4.98, 4.11, 6.42]}
        />   */}
        <PerspectiveCamera 
            makeDefault 
            ref={cameraRef}
            // position={[0,20,0]}
            position={[9,3.5,9]}
            // position={[12,3.5,12]}
            fov={50}
        />    
        {/* <gridHelper/>
        <axesHelper/> */}


        <ambientLight color={new Color(0xb0b0b0)}/>
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
                            // return( <CubeMesh key={y*10+x} position={cubeData.worldPosition} onClick={()=>{createRipple(cubeData.arrayPosition, 40,4)}}/>)
                            return( <CubeMesh key={y*10+x} position={cubeData.worldPosition} onClick={()=>{changeTheme()}}/>)
                        })
                        
                        )
                    })}
            </group>
        </mesh>

        {/* <CubeMesh position={new Vector2(2,0)} id={new Vector2(12,0)} color={new Color(0xff0000)}/> */}

        {/* <Stats/> */}

        {/* <EffectComposer resolutionScale={0}>
            <DepthOfField blendFunction={4}/>
        </EffectComposer> */}
    </>
    )
}