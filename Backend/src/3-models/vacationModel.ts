import { UploadedFile } from "express-fileupload";
import { ValidationError } from "./client-errors";

export class VacationModel {
  public id: number;
  public  location: string;
public  description: string;
public  startDate: Date;
public  endDate: Date;
public  price: number;
public  image?: UploadedFile;
public isSaved : boolean


public constructor(vacation:Partial<VacationModel>){
  this.id =vacation.id;
  this.location = vacation.location;
  this.description = vacation.description;
  this.startDate = vacation.startDate;
  this.endDate= vacation.endDate ;
  this.price = vacation.price;
  this.image = vacation.image;
  this.isSaved = vacation.isSaved;

}

public validateAdd(){
  if (!this.location) throw new ValidationError("Missing location.");
  if (!this.description) throw new ValidationError("Missing description.");
  if (!this.startDate) throw new ValidationError("Missing start date.");
  if (!this.endDate) throw new ValidationError("Missing end date.");
  if (!this.price) throw new ValidationError("Missing price.");
  if (!this.image) throw new ValidationError("Missing image.");
  if (this.price < 0) throw new ValidationError("Price can't be negative.");
  if (this.price >10000) throw new ValidationError("Price can't be more then 10,000.");
  if (new Date(this.startDate) < new Date()) {
    throw new ValidationError("Start date must be in the future");
  }
  if (new Date(this.endDate) < new Date(this.startDate)) {
    throw new ValidationError("End date cant be before start date");
  }
}

public validateUpdate(){
  if (!this.location) throw new ValidationError("Missing location.");
  if (!this.description) throw new ValidationError("Missing description.");
  if (!this.startDate) throw new ValidationError("Missing start date.");
  if (!this.endDate) throw new ValidationError("Missing end date.");
  if (!this.price) throw new ValidationError("Missing price.");
  if (this.price < 0) throw new ValidationError("Price can't be negative.");
  if (this.price >10000) throw new ValidationError("Price can't be more then 10,000.");
  if (new Date(this.endDate) < new Date(this.startDate)) {
    throw new ValidationError("End date cant be before start date.");
  }
}
}
