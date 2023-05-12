import { Color, Vector2, Vector3 } from "three";

export class Cube
{
    arrayPosition:Vector2;
    worldPosition:Vector3;

    constructor(arrayPosition:Vector2, position:Vector3)
    {
        this.arrayPosition = arrayPosition;
        this.worldPosition = position;
    }
}