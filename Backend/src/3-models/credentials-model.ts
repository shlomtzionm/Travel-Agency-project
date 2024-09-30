import { ValidationError } from "./client-errors";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class CredentialsModel {
    public email: string;
    public password: string;

    public constructor(user: CredentialsModel) {
        this.email = user.email;
        this.password = user.password;
    }

  public validate(){
    if (!this.email) throw new ValidationError("Missing email.");
    if (!this.password) throw new ValidationError("Missing password.");
    if(this.password.length < 5) throw new ValidationError("Password must be more then five characters");
    if ( !emailRegex.test(this.email)) {
      throw new ValidationError("Invalid email format.");
    }
  }
  }

