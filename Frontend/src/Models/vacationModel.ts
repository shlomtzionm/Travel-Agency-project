export class VacationModel {
  public id: number;
  public location: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public image: File;
  public imageUrl: string;
  public isLiked: boolean;
  public likesCount: number;
}
