export type Project =
{
  id:number;
  name:String;
  shortDescription?:string;
  fullDescription?:string[];
  alertMessage?:string;

  thumbnailUrl?:string;
  imageUrls?:string[];
  gitHubUrl?:string;
  summaryChips?:string[];

}