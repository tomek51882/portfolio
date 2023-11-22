export type Project =
{
  id:number;
  name:String;
  shortDescription?:string;
  fullDescription?:string[];
  alertMessage?:{message:string, alertType:"info"|"warning"};

  thumbnailUrl?:string;
  imageUrls?:string[];
  gitHubUrl?:string;
  summaryChips?:string[];

}