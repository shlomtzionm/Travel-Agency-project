import { ValidationError } from "./client-errors";
import { Role } from "./enums";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class UserModel {
  public id?: number;
  public  firstName: string;
public  lastName: string;
public  email: string;
public  password: string;
public  roleId?: Role;

public constructor(user:Partial<UserModel>){
  this.id = user.id;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.password = user.password;
  this.roleId = user.roleId
}

public validate(){
  if (!this.firstName) throw new ValidationError("Missing first name.");
  if (!this.lastName) throw new ValidationError("Missing last name.");
  if (!this.email) throw new ValidationError("Missing email.");
  if (!this.password) throw new ValidationError("Missing password.");
  if (!this.roleId) throw new ValidationError("Missing role id.");
  if(this.password.length < 4) throw new ValidationError("Password must be four or more characters");
  if ( !emailRegex.test(this.email)) {
    throw new ValidationError("Invalid email format.");
  }
}
}
