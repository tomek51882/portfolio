import { Color, HSL, Vector2 } from "three";

export class Ripple
{
    private lastUpdate:number = 0;
    private created:number;

    position: Vector2;
    lifetime:number;
    shouldBeKilled:boolean = false;
    radius:number;
    cycles:number;
    strength:number;
    progress:number = 0;
    gridValues:(RippleCubeData|null)[][] ;
    color:Color;

    static rows:number;
    static cols:number;
    
    constructor(position:Vector2, radius:number,strength:number, color:Color, lifetime:number, cycles:number)
    {
        this.position = position;
        this.lastUpdate = Date.now();
        this.created = Date.now();
        this.radius = radius;
        this.strength = strength;
        this.color = color;
        this.lifetime = lifetime;
        this.cycles = cycles;
        // this.hsl = {h:0,s:0,l:0};

        // color.getHSL(this.hsl);

        this.gridValues = [];
        for(let y=0; y<Ripple.rows; y++)
        {
            this.gridValues[y] = [];
            for(let x=0; x<Ripple.cols; x++)
            {
                this.gridValues[y][x] = null;//new RippleCubeData();
            }
        }
    }

    update()
    {
        if(this.lastUpdate-this.created > this.lifetime*1000)
        {
            this.shouldBeKilled = true;
        }
        this.progress = (this.lastUpdate-this.created)/(this.lifetime*1000);
        this.lastUpdate = Date.now();
    }

    public static setMapDimentions(rows:number, cols:number)
    {
        this.rows = rows;
        this.cols = cols;
    }
}

export class RippleCubeData
{
    heightValue:number;
    rawHeight:number;
    //sourceColor:Color - not needed


    constructor()
    {
        this.heightValue = 0;
        this.rawHeight=0;
        
    }
}