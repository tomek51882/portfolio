import { Color, HSL, Vector2 } from "three";

export class Ripple
{
    private lastUpdate:number = 0;
    private created:number;

    position: Vector2;
    lifetime:number = 4;
    shouldBeKilled:boolean = false;
    radius:number;
    strength:number;
    progress:number = 0;
    gridValues:(RippleCubeData|null)[][] ;
    color:Color;
    hsl:HSL;

    static rows:number;
    static cols:number;
    
    constructor(position:Vector2, radius:number,strength:number, color:Color)
    {
        this.position = position;
        this.lastUpdate = Date.now();
        this.created = Date.now();
        this.radius = radius;
        this.strength = strength;
        this.color = color;
        this.hsl = {h:0,s:0,l:0};
        
        color.getHSL(this.hsl);

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
    // colorValue:Color;
    hue:number;
    value:number;

    constructor()
    {
        // this.colorValue = color;
        this.hue = 0;
        this.value = 0 ;
        this.heightValue = 0;
    }
}